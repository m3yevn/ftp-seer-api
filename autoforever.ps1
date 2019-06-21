
   $nodePath = 'C:\Program Files\nodejs\npm.cmd'
   $install = 'install --save --prefix $PSScriptRoot'
   Start-Process -FilePath $nodePath -verb runAs -ArgumentList $install -Wait;
   $foreverPath = 'C:\Users\e_swen\AppData\Roaming\npm\forever.cmd'
   $start = "--uid mesftp-server --append -w start server.js";
   Start-Process -FilePath $foreverPath -verb runAs -ArgumentList $start -Wait;
