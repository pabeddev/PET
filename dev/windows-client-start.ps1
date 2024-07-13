Write-Host "Cliente de desarrollo PET"
Write-Host "Iniciando cliente de desarrollo..."
if (-not (Test-Path -Path "../client/node_modules")) {
  Write-Host "Instalando dependencias..."
  npm install --prefix ../client
}else{
    Write-Host "Dependencias ya instaladas"
}

# Existe el archivo .env?
if (-not (Test-Path -Path "../client/.env")) {
  Write-Host "Creando archivo .env..."
  New-Item -Path "../client" -Name ".env" -ItemType "file"
  # agregar las variables de entorno al archivo .env
  Add-Content -Path "../client/.env" -Value 'REACT_APP_URL_API_DEV="http://localhost:3030/"'
  Add-Content -Path "../client/.env" -Value 'REACT_APP_URL_API_PRODUCTION=""'
}else{
    Write-Host "Archivo .env ya existe"
    # quitar todo el contenido del archivo .env
    Clear-Content -Path "../client/.env"
    # agregar las variables de entorno al archivo .env
    Add-Content -Path "../client/.env" -Value 'REACT_APP_URL_API_DEV="http://localhost:3030/"'
    Add-Content -Path "../client/.env" -Value 'REACT_APP_URL_API_PRODUCTION=""'
}

npm run start --prefix ../client
