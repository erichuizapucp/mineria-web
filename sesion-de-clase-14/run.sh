#!/bin/bash
set -e

# ==============================================================================
# CONFIGURACIÓN
# ==============================================================================
APP_DIR="/home/ec2-user/api-app"

echo "=== 1. Navegando al directorio de la aplicación ==="
cd $APP_DIR

echo "=== 2. Activando entorno virtual ==="
source venv/bin/activate

echo "========================================================"
echo "=== 3. Iniciando Servidor Uvicorn en 0.0.0.0:8000 ==="
echo "=== (Presiona Ctrl+C para detenerlo) ==="
echo "========================================================"

# Inicia el servidor. Lee server.py porque el directorio actual es $APP_DIR.
uvicorn server:app --host 0.0.0.0 --port 8000