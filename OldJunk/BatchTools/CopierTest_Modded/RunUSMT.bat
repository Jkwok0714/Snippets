@echo off
set usmtpath=\\sc-emc00002\deploy$\USMT\


rem USMT turned on by default. Run USMT
rem Check local OS version
set oldcomp=%target%
ver | find "10.0" > nul
if errorlevel = 0 (
    rem Win 10 found
    echo Found Windows 10...
    start "%usmtpath%USMT5-win10\remote1-run.cmd"
) else (
    echo Found Windows non-10...
    start "%usmtpath%remote1-run.cmd"
)
echo USMT Done!
pause
