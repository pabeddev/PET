Write-Host "Cliente de desarrollo PET"
Write-Host "Iniciando cliente de desarrollo..."
if (-not (Test-Path -Path "../client/node_modules")) {
  Write-Host "Instalando dependencias..."
  npm install
}else{
  Write-Host "Dependencias ya instaladas"
}
cd ../client
npm run start