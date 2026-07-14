import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';
import { pipeline } from '@xenova/transformers';
import 'dotenv/config';

// Importaciones para manejo de archivos locales y ejecución de comandos
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir la interfaz del frontend automáticamente desde la raíz
// Guarda tu HTML como 'public/index.html' o en la raíz y cámbialo aquí
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Inicializar el Reranker local
let reranker;
async function initReranker() {
    try {
        reranker = await pipeline('feature-extraction', 'Xenova/bge-reranker-base');
        console.log("Reranker cargado con éxito.");
    } catch (err) {
        console.error("Error al cargar el Reranker:", err);
    }
}
initReranker();

// 1. Endpoint para buscar y responder (RAG + Re-ranking)
app.post('/api/preguntar', async (req, res) => {
    const { pregunta } = req.body;

    if (!pregunta) {
        return res.status(400).json({ error: 'La pregunta es requerida.' });
    }

    try {
        const embeddingRes = await fetch('http://127.0.0.1:11434/api/embeddings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: 'nomic-embed-text', prompt: pregunta })
        });
        const embeddingData = await embeddingRes.json();
        const queryEmbedding = embeddingData.embedding;

        const { data: documentos, error } = await supabase.rpc('buscar_documentos', {
            query_embedding: queryEmbedding,
            match_threshold: 0.3,
            match_count: 10
        });

        if (error) throw error;

        let contextoInyectado = "";
        let mejoresDocumentos = [];

        if (documentos && documentos.length > 0) {
            const resultadosConScore = await Promise.all(documentos.map(async (doc) => {
                const out = await reranker(pregunta, { pooling: 'mean', normalize: true });
                const outDoc = await reranker(doc.contenido, { pooling: 'mean', normalize: true });
                const score = out.data.reduce((acc, val, i) => acc + val * outDoc.data[i], 0);
                return { ...doc, score };
            }));

            mejoresDocumentos = resultadosConScore
                .sort((a, b) => b.score - a.score)
                .slice(0, 3);

            contextoInyectado = mejoresDocumentos.map(d => d.contenido).join("\n\n");
        }

        const promptSistema = `Eres un asistente experto en desarrollo de software. Generas aplicaciones web funcionales (HTML, CSS, JS) en un solo bloque de código limpio.
Utilizas el siguiente contexto de base de datos para guiar tus respuestas:
${contextoInyectado}`;

        const ollamaRes = await fetch('http://127.0.0.1:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'qwen2.5-coder:7b',
                prompt: `Pregunta del usuario: ${pregunta}\n\nGenera la solución en código HTML/CSS/JS listo para usar.`,
                system: promptSistema,
                stream: false
            })
        });

        const ollamaData = await ollamaRes.json();
        
        return res.json({
            respuesta: ollamaData.response,
            contexto_utilizado: mejoresDocumentos
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error en el proceso de RAG', detalles: err.message });
    }
});

// 2. Endpoint para abrir VS Code (Mejorado contra errores de HTML)
app.post('/api/abrir-vscode', (req, res) => {
    const { codigo } = req.body;

    if (!codigo) {
        return res.status(400).json({ error: 'No se recibió ningún código.' });
    }

    try {
        const rutaArchivo = path.join(__dirname, 'sistema_generado.html');

        // Guardamos el contenido localmente
        fs.writeFileSync(rutaArchivo, codigo, 'utf-8');

        // Ejecutamos de forma asíncrona pero manejamos el resultado con JSON estrictos
        exec(`code "${rutaArchivo}"`, (error, stdout, stderr) => {
            if (error) {
                console.error("Error al ejecutar 'code':", error);
                // Si falla, respondemos en formato JSON para que el front no se rompa con HTML erróneo
                return res.status(500).json({ 
                    error: 'VS Code no pudo abrirse automáticamente. Comprueba que "code" esté en tu variable PATH de sistema.',
                    detalles: stderr || error.message
                });
            }
            
            return res.json({ mensaje: 'Archivo guardado y abierto en VS Code con éxito', ruta: rutaArchivo });
        });

    } catch (err) {
        console.error("Error de escritura:", err);
        return res.status(500).json({ error: 'Error al procesar/escribir el archivo localmente.', detalles: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor RAG corriendo en http://localhost:${PORT}`);
});