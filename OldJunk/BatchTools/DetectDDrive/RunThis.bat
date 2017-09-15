@echo off
rem set the current working directory
set currdir=%~dp0


:loop
set /p target=Set the Target system to check: 


rem %currdir%\psexec.exe \\%target% cmd /c SentBug.cmd

if "%target%"=="exit" goto exit
ping %target%
echo =============================
if exist \\%target%\c$ echo C Exist
if exist \\%target%\d$ (
    echo D Exist
) else (
    echo D no exist
)

goto loop

:exit
pause
exit
