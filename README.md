# local-ai

## Web UI

https://github.com/open-webui/open-webui

docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main

## Vector DB
Chroma DB (https://docs.trychroma.com/)
docker run -v ./chroma-data:/data -p 8000:8000 chromadb/chroma

## LLM
Gemma 3

## Ollama
