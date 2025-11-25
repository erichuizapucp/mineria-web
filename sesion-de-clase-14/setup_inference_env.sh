#!/bin/bash
set -e

APP_DIR="/home/ec2-user/api-app"
HOME_DIR="$HOME"

echo "=== 1. Preparando el directorio de la aplicación ==="
mkdir -p $APP_DIR

echo "=== 2. Copiando server.py y el directorio 'model' desde $HOME a $APP_DIR ==="
# Asume que server.py y model/ están en el directorio $HOME del usuario.
cp $HOME_DIR/server.py $APP_DIR/

# Cambiar al directorio de la aplicación para instalar el entorno virtual
cd $APP_DIR

echo "=== 3. Actualizando paquetes del sistema ==="
sudo dnf update -y

echo "=== 4. Instalando Python 3 y pip ==="
sudo dnf install -y python3 python3-pip

echo "=== 5. Creando y activando entorno virtual ==="
python3 -m venv venv

echo "=== 6. Instalando dependencias (FastAPI, Uvicorn, TensorFlow, Numpy, Pydantic) ==="
source venv/bin/activate
pip install --upgrade pip
pip install fastapi uvicorn tensorflow numpy pydantic

echo "========================================================"
echo "=== Instalación Completa. Ejecuta 'run.sh' para iniciar el servidor. ==="
echo "========================================================"