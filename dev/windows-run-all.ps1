Write-Host "Proyecto de desarrollo PET"
Start-Process powershell {..\dev\windows-server-start.ps1} 
Start-Sleep -s 5
Start-Process powershell {..\dev\windows-client-start.ps1}