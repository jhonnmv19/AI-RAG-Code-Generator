# 🚀 RAG Code Generator

<div align="center">

### Generador Inteligente de Código utilizando RAG, Supabase y Ollama

Genera aplicaciones web automáticamente mediante **Retrieval-Augmented Generation (RAG)** utilizando una base de conocimiento en **Supabase**, modelos de **Ollama** ejecutándose de forma local y un sistema de **Re-ranking semántico**.

---

![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-black?logo=express)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)
![Ollama](https://img.shields.io/badge/Ollama-Local_AI-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

</div>

---

# 📖 Descripción

**RAG Code Generator** es una aplicación que implementa la arquitectura **Retrieval-Augmented Generation (RAG)** para generar proyectos web automáticamente.

El sistema consulta una base de conocimiento almacenada en **Supabase** utilizando búsqueda vectorial con **pgvector**, recupera los documentos más relevantes mediante **embeddings**, realiza un **re-ranking semántico** usando **Transformers.js** y finalmente genera código utilizando **Qwen2.5-Coder** ejecutándose completamente de forma local mediante **Ollama**.

Todo el procesamiento de inteligencia artificial ocurre localmente, ofreciendo mayor privacidad, menor latencia y evitando depender de servicios externos.

---

# ✨ Características

- 🚀 Generación automática de código HTML, CSS y JavaScript
- 🧠 Arquitectura RAG completa
- 🔍 Búsqueda semántica mediante embeddings
- 📊 Re-ranking inteligente de resultados
- 💾 Integración con Supabase
- ⚡ Backend desarrollado con Express.js
- 🌐 Frontend HTML + CSS + JavaScript
- 🤖 Modelos ejecutándose localmente con Ollama
- 📑 Vista previa del código generado
- 📂 Base de conocimiento personalizada
- 🔐 Sin depender de APIs externas
- 🖥 Compatible con Windows, Linux y macOS

---

# 🏗 Arquitectura del Sistema

```text
                    Usuario
                       │
                       ▼
             Frontend (HTML/CSS/JS)
                       │
                       ▼
              Express.js (API REST)
                       │
      ┌────────────────┴─────────────────┐
      ▼                                  ▼
 Ollama (Embeddings)               Supabase
 nomic-embed-text                  pgvector
      │                                  │
      └────────────────┬─────────────────┘
                       ▼
          Re-ranking Semántico Local
             (Transformers.js)
                       │
                       ▼
      Ollama (Qwen2.5-Coder:7B)
                       │
                       ▼
      Generación Automática de Código
                       │
                       ▼
             Vista Previa del Resultado
```

---

# ⚙ Flujo de funcionamiento

```text
Usuario escribe un prompt
          │
          ▼
Se genera el embedding del prompt
          │
          ▼
Supabase busca documentos similares
          │
          ▼
Transformers.js reordena los resultados
          │
          ▼
Qwen2.5-Coder recibe el contexto
          │
          ▼
Genera el código solicitado
          │
          ▼
Se muestra el resultado en pantalla
```

---

# 🛠 Tecnologías Utilizadas

| Tecnología | Función |
|------------|----------|
| Node.js | Backend |
| Express.js | API REST |
| HTML5 | Interfaz |
| CSS3 | Estilos |
| JavaScript | Frontend |
| Supabase | Base de datos |
| PostgreSQL | Motor de base de datos |
| pgvector | Búsqueda vectorial |
| Ollama | Ejecución local de modelos IA |
| nomic-embed-text | Embeddings |
| Qwen2.5-Coder | Generación de código |
| Transformers.js | Re-ranking semántico |
| dotenv | Variables de entorno |
| CORS | Comunicación Frontend-Backend |

---

# 📂 Estructura del Proyecto

```text
rag-re/
│
├── index.js                 # Servidor principal
├── index.html               # Interfaz web
├── package.json
├── package-lock.json
├── .env
├── README.md
│
├── node_modules/
│
└── assets/
    ├── css/
    ├── js/
    └── images/
```

---

# 📦 Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/rag-code-generator.git

cd rag-re
```

---

## 2. Instalar dependencias

```bash
npm install
```

O instalar manualmente:

```bash
npm install express
npm install cors
npm install dotenv
npm install node-fetch
npm install @supabase/supabase-js
npm install @xenova/transformers
```

---

# 🔑 Configuración

Crear un archivo llamado:

```
.env
```

y agregar:

```env
SUPABASE_URL=TU_SUPABASE_URL
SUPABASE_KEY=TU_SUPABASE_ANON_KEY
PORT=3000
```

---

# 🤖 Instalación de modelos Ollama

Instalar el modelo de generación:

```bash
ollama pull qwen2.5-coder:7b
```

Instalar el modelo de embeddings:

```bash
ollama pull nomic-embed-text
```

Verificar modelos instalados:

```bash
ollama list
```

---

# ▶ Ejecutar el proyecto

```bash
node index.js
```

Servidor:

```
http://localhost:3000
```

---

# 💬 Ejemplos de Prompts

```text
Crear una página de inicio para una universidad.
```

```text
Generar un CRUD de estudiantes usando HTML, CSS y JavaScript.
```

```text
Crear un dashboard administrativo responsive.
```

```text
Diseñar una página de login moderna.
```

```text
Crear una calculadora científica.
```

---

# 📚 Arquitectura RAG

El sistema sigue las siguientes etapas:

1. El usuario escribe una solicitud.
2. Se genera un embedding mediante **nomic-embed-text**.
3. Supabase realiza una búsqueda vectorial utilizando **pgvector**.
4. Se recuperan los documentos más relevantes.
5. Transformers.js realiza el re-ranking semántico.
6. El contexto se envía a **Qwen2.5-Coder**.
7. El modelo genera el código solicitado.
8. El frontend muestra el resultado.

---

# 🚀 Ventajas

- IA completamente local
- Mayor privacidad
- Sin consumo de APIs comerciales
- Fácil de ampliar
- Compatible con cualquier base de conocimiento
- Generación rápida
- Arquitectura escalable
- Bajo costo operativo

---

# 📈 Requisitos

- Node.js 20 o superior
- Ollama instalado
- Supabase
- PostgreSQL con pgvector
- 8 GB de RAM (mínimo recomendado)
- GPU NVIDIA RTX (opcional, mejora el rendimiento)

---

# 🔮 Mejoras Futuras

- Exportación automática de proyectos
- Generación de aplicaciones React
- Compatibilidad con Vue
- Compatibilidad con Angular
- Integración con Docker
- Autenticación de usuarios
- Historial de generaciones
- Streaming de respuestas
- Editor de código integrado
- Soporte para múltiples modelos de IA

---

# 👨‍💻 Autor

**Jhonn Alan Meneses Veizaga**

Estudiante de Ingeniería de Sistemas

Universidad Privada Domingo Savio (UPDS)

Cochabamba - Bolivia

---

# 📄 Licencia

Este proyecto se distribuye bajo la licencia **MIT**.

Puedes utilizarlo, modificarlo y distribuirlo libremente respetando los términos de la licencia.

---

<div align="center">

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub.

**Desarrollado con ❤️ utilizando Node.js, Supabase y Ollama.**

</div>
