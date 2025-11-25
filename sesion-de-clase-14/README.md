## copiar archivos al servidor EC2 y configurar entorno
scp -i mineria-web.pem server.py ec2-user@ec2-35-173-236-87.compute-1.amazonaws.com:
scp -i mineria-web.pem setup_inference_env.sh ec2-user@ec2-35-173-236-87.compute-1.amazonaws.com:
scp -i mineria-web.pem run.sh ec2-user@ec2-35-173-236-87.compute-1.amazonaws.com:

## copiar modelo al servidor EC2
scp -i mineria-web.pem model.tar.gz ec2-user@ec2-35-173-236-87.compute-1.amazonaws.com:
tar -xzvf model.tar.gz -C /home/ec2-user/api-app/

## Conectarse al servidor EC2
chmod 400 "mineria-web.pem"
ssh -i mineria-web.pem ec2-user@ec2-35-173-236-87.compute-1.amazonaws.com

## Ejecutar script de configuración del entorno
chmod +x setup_inference_env.sh
./setup_inference_env.sh

## Iniciar la aplicación
chmod +x run.sh
./run

## N8N
Host: http://localhost:5678
Contraseña: MineriaWeb20252