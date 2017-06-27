powershell -Command "(New-Object Net.WebClient).DownloadFile('https://the.earth.li/~sgtatham/putty/latest/w32/putty-0.69-installer.msi', 'app/temp/putty.msi')"
call msiexec /i "C:\Users\karkat\git\vroom\app\temp\putty.msi" /qb /L*v "C:\Users\karkat\Desktop\results.text"
exit
