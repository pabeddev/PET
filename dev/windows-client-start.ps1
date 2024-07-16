Write-Host "Iniciando cliente de desarrollo PET..."
cd ..\client

if (Test-Path .\node_modules) {
    Write-Host "Node modules encontrados, iniciando cliente..."
} else {
    Write-Host "Node modules no encontrados, instalando dependencias..."
    npm install
}

# Verificar si el archivo .env existe
if (Test-Path .\.env) {
    Write-Host "Archivo .env encontrado..."
} else {
    Write-Host "Archivo .env no encontrado, creando archivo .env..."
    Copy-Item .\example.env .\.env
}

Write-Host "Iniciando cliente..."
npm run start