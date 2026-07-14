🚀 RAG Code Generator
Generador Inteligente de Código con Supabase, Ollama y Re-ranking Local








📖 Descripción

RAG Code Generator es un sistema de Retrieval-Augmented Generation (RAG) diseñado para generar aplicaciones web automáticamente utilizando una base de conocimiento almacenada en Supabase y modelos de inteligencia artificial ejecutándose completamente de forma local mediante Ollama.

El proyecto combina:

🔍 Búsqueda vectorial con pgvector
🧠 Embeddings mediante nomic-embed-text
📊 Re-ranking semántico con Transformers.js
💻 Generación de código con Qwen2.5-Coder
⚡ Backend en Node.js
🌐 Frontend HTML, CSS y JavaScript

Todo el procesamiento del modelo se realiza localmente, evitando depender de servicios externos.

✨ Características
✅ Generación automática de sistemas web
✅ Arquitectura RAG
✅ Re-ranking local
✅ Compatible con Supabase
✅ Integración con Ollama
✅ Vista previa del código generado
✅ Código HTML/CSS/JS listo para ejecutar
✅ Uso de embeddings
✅ Optimizado para equipos con GPU NVIDIA RTX
🏗 Arquitectura
                 Usuario
                    │
                    ▼
             Frontend (HTML)
                    │
                    ▼
          Backend (Express.js)
                    │
       ┌────────────┴─────────────┐
       ▼                          ▼
Ollama (Embeddings)          Supabase
nomic-embed-text             pgvector
       │                          │
       └────────────┬─────────────┘
                    ▼
         Re-ranking Local
        (Transformers.js)
                    │
                    ▼
      Ollama (Qwen2.5-Coder)
                    │
                    ▼
        Código HTML/CSS/JS
                    │
                    ▼
           Vista Previa Live
🛠 Tecnologías
Tecnología	Uso
Node.js	Backend
Express	API REST
Supabase	Base de datos
pgvector	Búsqueda vectorial
Ollama	Modelos IA locales
nomic-embed-text	Embeddings
Qwen2.5-Coder	Generación de código
Transformers.js	Re-ranking
HTML/CSS/JS	Frontend
📂 Estructura del proyecto
rag-re/
│
├── index.js
├── index.html
├── package.json
├── .env
├── README.md
└── node_modules/
⚙ Instalación
1. Clonar el proyecto
git clone https://github.com/tuusuario/rag-code-generator.git

cd rag-re
2. Instalar dependencias
npm install

o

npm install @supabase/supabase-js dotenv express cors node-fetch @xenova/transformers
3. Configurar variables

Crear un archivo:

.env
SUPABASE_URL=TU_URL
SUPABASE_KEY=TU_KEY
PORT=3000
4. Instalar modelos
ollama pull qwen2.5-coder:7b

ollama pull nomic-embed-text
5. Ejecutar
node index.js

Servidor:

http://localhost:3000