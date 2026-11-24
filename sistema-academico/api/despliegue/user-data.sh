#!/bin/bash
# Script de "User data" para la instancia EC2 (Amazon Linux 2023).
# Instala Node, descarga SOLO la carpeta del proyecto desde la rama dev
# y deja la API corriendo como servicio en el puerto 80. No necesita SSH.

dnf install -y nodejs git

git clone --depth 1 --filter=blob:none --sparse --branch dev \
  https://github.com/Mariangell-dev/CALLING.git /opt/calling
cd /opt/calling
git sparse-checkout set sistema-academico/api

cd /opt/calling/sistema-academico/api
npm ci --omit=dev

cat > /etc/systemd/system/api-notas.service <<'SERVICIO'
[Unit]
Description=API sistema academico (Express)
After=network.target

[Service]
WorkingDirectory=/opt/calling/sistema-academico/api
ExecStart=/usr/bin/node src/servidor.js
Environment=PORT=80
Restart=always

[Install]
WantedBy=multi-user.target
SERVICIO

systemctl daemon-reload
systemctl enable --now api-notas
