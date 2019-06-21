#No need to built NodeJS project

#CleanUp Node_modules with rimraf
rimraf .\node_modules

#Copy Publish content folder to deploy
$target= "C:\Users\e_swen\Documents\MESFTP-Server-Deploy"
Write-Output "Copying from this folder to deploy folder...."
Write-Output "......"
Write-Output "......"
Write-Output "......"
Write-Output "......"
Set-Location $target
$gitFolder = "\.git"
$excludeGit = Join-Path $PSScriptRoot $gitFolder 
Get-ChildItem -Path  $target -Recurse -Exclude ("autopull.ps1","autoforever.ps1")| Select-Object -ExpandProperty FullName | Where-Object {$_ -notlike $excludeGit} | Sort-Object length -Descending |Remove-Item -force 
Copy-Item -Path (Get-Item -Path "$PSScriptRoot\*" -Exclude ('.git','autodeploy*.ps1')).FullName -Destination $target -Recurse -Force
#Init git and add all content
$DeployOrigin = "https://github.com/weitze/FTP-Server_Deploy.git"
git init
git remote add origin $DeployOrigin
#Push the code to origin
Write-Output "Commit and Push the Deploy folder content to Remote Git...."
Write-Output "......"
Write-Output "......"
Write-Output "......"
Write-Output "......"
$date = Get-Date
git add .
git commit -am "automated commit$date"
git push -f origin prod
#Save credentials for server
$password = ConvertTo-SecureString "P@ssw0rd789" -AsPlainText -Force
$cred= New-Object System.Management.Automation.PSCredential ("e_swen", $password )
#Pssession to server
$deploy = New-PSSession -ComputerName sam2141.office.amsiag.com -Credential $cred -Name deploy
Write-Output "Remote connecting to server...."
Write-Output "......"
Write-Output "......"
Write-Output "......"
Write-Output "......"
#Go to deploying directory and git pull
Invoke-Command -Session $deploy -ScriptBlock {
   Write-Output "Setting Git in Remote Server...."
   Write-Output "......"
   Write-Output "......"
   Write-Output "......"
   Write-Output "......"
   $DeployOrigin = "https://github.com/weitze/FTP-Server_Deploy.git"
   $GitExe = 'C:\Program Files\Git\cmd\git.exe' -f $env:SystemDrive;
   $DeployPath = 'C:\inetpub\wwwroot\MESFTP-SERVER\'
   $init = "-C $DeployPath init";
   $add = "-C $DeployPath remote add origin $DeployOrigin";
   Start-Process -FilePath $GitExe -verb runAs -ArgumentList $init -Wait;
   Start-Process -FilePath $GitExe -verb runAs -ArgumentList $add -Wait;
   }

Remove-PSSession -Name deploy
   Write-Output "Deployment Ended....."
   Set-Location $PSScriptRoot