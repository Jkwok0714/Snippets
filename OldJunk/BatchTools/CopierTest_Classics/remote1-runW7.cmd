
@rem Where the USMT exe are located - without architecture folder which is determined below.
:set usmtcmd=\\sc-fs1\mdt_store\usmt
:set usmtcmd=\\10.84.166.107\deploy\usmt
set usmtcmd=\\sc-emc00002\deploy$\USMT


:setold
@set /p oldcomp=Old computer name: 
@if "%oldcomp%x"=="x" goto setold

@echo . 

:setadmin
@set /p adminname=Your admin- account name (admin-xxx): 
@if "%adminname%x"=="x" goto setadmin

start %usmtcmd%\mousemove.exe

%usmtcmd%\psexec.exe \\%oldcomp% -u marvell\%adminname% -h cmd /c %usmtcmd%\usmt1-scan-old-comp.cmd
rem %usmtcmd%\usmt1-scan-old-comp.cmd

: pause

%usmtcmd%\usmt1-load-new-comp.cmd %oldcomp%
rem %usmtcmd%\psexec.exe \\%oldcomp% -u marvell\%adminname% -h cmd /c %usmtcmd%\usmt1-load-new-comp.cmd %oldcomp%

