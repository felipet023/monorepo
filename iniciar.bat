@echo off 
echo Abriendo el proyecto en VS code ...

cd /d "%~dp0"
code . 
exit 

REM Si VS no esta en la variable den entorno phat, hay que colocar la ruta oara que se ejeute 