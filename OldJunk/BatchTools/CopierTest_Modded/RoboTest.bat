@echo off
SETLOCAL EnableDelayedExpansion


rem Init Vars
set UFlag=yes
set LFlag=no
set usmtpath=\\sc-emc00002\deploy$\USMT\



echo **************************************
echo *                                    *
echo *        The Lame Robocopier         *
echo *           "RickCopy 0.1"           *
echo *   ~Embodiment of Inefficiency~     *
echo *                                    *
echo **************************************
echo.
echo.

rem set the current working directory
set currdir=%~dp0

echo This batch file to be run on destination system.
echo Robocopy's flags are set to:
echo *Exclude old duplicate files
echo *Exclude system files
echo *Include all subdirectories.
echo *Retain metadata.
echo.
echo By default, will copy C:\ contents to \\[hostname]\C$
echo USMT will be run for user profile settings.
echo.
echo =====================================
echo.

rem set the target system.
:setTarget
echo.
echo Enter the source hostname. Alternatively, enter...
echo    -'e' to exit.
echo    -'c' for custom local paths
echo    -'t' for L flag (testing)
echo    -'u' for USMT off
set /p target=Input: 
if not defined target goto setTarget

Rem Parse through the options entered. Continue if nothing special
if "%target%"=="e" goto exit
if "%target%"=="girl" goto textart
if "%target%"=="c" goto customMigrate
if "%target%"=="l" (
    set Lflag=yes
    goto setTarget
)
if "%target%"=="u" (
    set Uflag=yes
    goto setTarget
)
Rem Else
set option=Exclude
goto :networkMigrate

:customMigrate
echo.
set option=All
echo Custom migrate uses exact path to migrate and includes subdirectories.
echo Be sure to include final backslash.
echo e.g. C:\Users\
set /p finalin=Enter the input path: 
set /p finalout=Enter the output path: 
echo.
echo Input: %finalin%
echo Input: %finalout%
set /p inop=Proceed (y/n/e)?:
if "%inop%"=="n" goto customMigrate
if "%inop%"=="e" goto setTarget
goto generalMigrate

:networkMigrate
rem See if system is even online
echo.
echo Checking connection...
ping -n 1 %target% | find "TTL=" >nul
if errorlevel 1 (
    echo Target offline.
    echo.
    echo XXXXXXXXXXXXXXXX
    echo.
    goto :setTarget
) else (
    echo Target online. Mapping %target%\C$ to Y:\
    rem Mapping the target drive...
    dir Y:\ >nul 2>nul
    if errorlevel 1 (
        net use /del Y:
    )
    rem net use y: \\%target%\c$
    set finalin=\\%target%\C$
    set finalout=C:\
)

:setAdmin
rem set /p admin=Enter your admin account (admin-xxx):
rem if not defined admin goto setAdmin

Rem Build the folder exclude list
Set file=%currdir%ExcludeList.txt
for /f "usebackq tokens=*" %%D in (%file%) do (
    If NOT "!dirs!"=="" (
        Set dirs=!dirs! "%finalin%%%D"
    ) Else (
        Set dirs="%finalin%%%D"
    )
)




:generalMigrate
powercfg -h off

Rem set date
for /f %%a in ('wmic os get localdatetime ^| find "."') do set dts=%%a
set ymd=%dts:~0,8%

Rem Robocopy
echo.
echo Input Source: %finalin%
echo Output Destination: %finalout%

timeout /T 5
echo.
echo ===============
echo Copy Initiate!!
echo ===============
echo.
if "%Uflag%"=="no" (
    rem USMT turned on by default. Run USMT
    rem Check local OS version
    set oldcomp=%target%
    ver | find "10.0" > nul
    if errorlevel = 0 (
        rem Win 10 found
	echo Found Windows 10...
        call "%usmtpath%USMT5-win10\remote1-run.cmd"
    ) else (
        echo Found Windows non-10...
        call "%usmtpath%remote1-run.cmd"
    )
)


if "%Lflag%"=="yes" (
    if "%Option%"=="Exclude" (
        robocopy /E %finalin% %finalout% /ETA /XO /R:1 /W:5 /LOG:%finalout%Robolog_%ymd%.txt /TEE /XA:SHT /XD !dirs!
        rem regedit /e %currdir%backup\CustomDictionaries.reg "HKEY_CURRENT_USER\Software\Microsoft\Shared Tools\Proofing tools\Custom Dictionaries"
        rem regedit /c /s %currdir%backup\CustomDictionaries.reg

        :checkD
        rem Check if D drive exists since this option is a full migration.
        echo.
        echo.
        if exist \\%target%\d$ (
            echo Seems to be a D drive. Copying...
            
            robocopy /E \\%target%\D$ %finalout%old-D-Drive /ETA /XO /R:1 /W:5 /LOG:%finalout%Robolog_D_%ymd%.txt /TEE /XA:SHT
        ) else (
            echo Doesn't appear to be a D drive.
        )
    ) else (
        robocopy /E %finalin% %finalout% /ETA /XO /R:1 /W:5 /LOG:%finalout%Robolog_%ymd%.txt /TEE /XA:SHT
    )
) else (
    if "%Option%"=="Exclude" (
        robocopy /E %finalin% %finalout% /ETA /XO /R:1 /W:5 /L /XA:SHT /XD !dirs!
    ) else (
        robocopy /E %finalin% %finalout% /ETA /XO /R:1 /W:5 /L /XA:SHT
    )
)

echo.
rem Export applications list
echo Exporting Applications list.
wmic product get name > %finalout%AppsList.txt



:done
rem Unmapping the target drive...
dir Y:\ >nul 2>nul
if errorlevel 1 (
    net use /del Y:
)
:exit
ENDLOCAL
pause
exit



















:textart
echo.
echo.
echo.
echo _______ad88888888888888888888888a, 
echo ________a88888"8888888888888888888888, 
echo ______,8888"__"P88888888888888888888b, 
echo ______d88_________`""P88888888888888888, 
echo _____,8888b_______________""88888888888888, 
echo _____d8P'''__,aa,______________""888888888b 
echo _____888bbdd888888ba,__,I_________"88888888, 
echo _____8888888888888888ba8"_________,88888888b 
echo ____,888888888888888888b,________,8888888888 
echo ____(88888888888888888888,______,88888888888, 
echo ____d888888888888888888888,____,8___"8888888b 
echo ____88888888888888888888888__.;8'"""__(888888 
echo ____8888888888888I"8888888P_,8"_,aaa,__888888 
echo ____888888888888I:8888888"_,8"__`b8d'__(88888 
echo ____(8888888888I'888888P'_,8)__________88888 
echo _____88888888I"__8888P'__,8")__________88888 
echo _____8888888I'___888"___,8"_(._.)_______88888 
echo _____(8888I"_____"88,__,8"_____________,8888P 
echo ______888I'_______"P8_,8"_____________,88888) 
echo _____(88I'__________",8"__M""""""M___,888888' 
echo ____,8I"____________,8(____"aaaa"___,8888888 
echo ___,8I'____________,888a___________,8888888) 
echo __,8I'____________,888888,_______,888888888 
echo _,8I'____________,8888888'`-===-'888888888' 
echo ,8I'____________,8888888"________88888888" 
echo 8I'____________,8"____88_________"888888P 
echo 8I____________,8'_____88__________`P888" 
echo 8I___________,8I______88____________"8ba,. 
echo (8,_________,8P'______88______________88""8bma,. 
echo _8I________,8P'_______88,______________"8b___""P8ma, 
echo _(8,______,8d"________`88,_______________"8b_____`"8a 
echo __8I_____,8dP_________,8X8,________________"8b.____:8b 
echo __(8____,8dP'__,I____,8XXX8,________________`88,____8) 
echo ___8,___8dP'__,I____,8XxxxX8,_____I,_________8X8,__,8 
echo ___8I___8P'__,I____,8XxxxxxX8,_____I,________`8X88,I8 
echo ___I8,__"___,I____,8XxxxxxxxX8b,____I,________8XXX88I, 
echo ___`8I______I'__,8XxxxxxxxxxxxXX8____I________8XXxxXX8, 
echo ____8I_____(8__,8XxxxxxxxxxxxxxxX8___I________8XxxxxxXX8, 
echo ___,8I_____I[_,8XxxxxxxxxxxxxxxxxX8__8________8XxxxxxxxX8, 
echo ___d8I,____I[_8XxxxxxxxxxxxxxxxxxX8b_8_______(8XxxxxxxxxX8, 
echo ___888I____`8,8XxxxxxxxxxxxxxxxxxxX8_8,_____,8XxxxxxxxxxxX8 
echo ___8888,____"88XxxxxxxxxxxxxxxxxxxX8)8I____.8XxxxxxxxxxxxX8 
echo __,8888I_____88XxxxxxxxxxxxxxxxxxxX8_`8,__,8XxxxxxxxxxxxX8" 
echo __d88888_____`8XXxxxxxxxxxxxxxxxxX8'__`8,,8XxxxxxxxxxxxX8" 
echo __888888I_____`8XXxxxxxxxxxxxxxxX8'____"88XxxxxxxxxxxxX8" 
echo __88888888bbaaaa88XXxxxxxxxxxxXX8)______)8XXxxxxxxxxXX8" 
echo __8888888I,_``""""""8888888888888888aaaaa8888XxxxxXX8" 
echo __(8888888I,______________________.__```"""""88888P" 
echo ___88888888I,___________________,8I___8,_______I8" 
echo ____"""88888I,________________,8I'____"I8,____;8" 
echo ___________`8I,_____________,8I'_______`I8,___8) 
echo ____________`8I,___________,8I'__________I8__:8' 
echo _____________`8I,_________,8I'___________I8__:8 
echo ______________`8I_______,8I'_____________`8__(8 
echo _______________8I_____,8I'________________8__(8; 
echo _______________8I____,8"__________________I___88, 
echo ______________.8I___,8'_______________________8"8, 
echo ______________(PI___'8_______________________,8,`8, 
echo _____________.88'____________,@@___________.a8X8,`8, 
echo _____________(88_____________@@@_________,a8XX888,`8, 
echo ____________(888_____________@@'_______,d8XX8"__"b_`8, 
echo ___________.8888,_____________________a8XXX8"____"a_`8, 
echo __________.888X88___________________,d8XX8I"______9,_`8, 
echo _________.88:8XX8,_________________a8XxX8I'_______`8__`8, 
echo ________.88'_8XxX8a_____________,ad8XxX8I'________,8___`8, 
echo ________d8'__8XxxxX8ba,______,ad8XxxX8I"__________8__,__`8, 
echo _______(8I___8XxxxxxX888888888XxxxX8I"____________8__II__`8 
echo _______8I'___"8XxxxxxxxxxxxxxxxxxX8I'____________(8__8)___8; 
echo ______(8I_____8XxxxxxxxxxxxxxxxxX8"______________(8__8)___8I 
echo ______8P'_____(8XxxxxxxxxxxxxxX8I'________________8,_(8___:8 
echo _____(8'_______8XxxxxxxxxxxxxxX8'_________________`8,_8____8 
echo _____8I________`8XxxxxxxxxxxxX8'___________________`8,8___;8 
echo _____8'_________`8XxxxxxxxxxX8'_____________________`8I__,8' 
echo _____8___________`8XxxxxxxxX8'_______________________8'_,8' 
echo _____8____________`8XxxxxxX8'________________________8_,8' 
echo _____8_____________`8XxxxX8'________________________d'_8' 
echo _____8______________`8XxxX8_________________________8_8' 
echo _____8________________"8X8'_________________________"8" 
echo _____8,________________`88___________________________8 
echo _____8I________________,8'__________________________d) 
echo _____`8,_______________d8__________________________,8 
echo ______(b_______________8'_________________________,8' 
echo _______8,_____________dP_________________________,8' 
echo _______(b_____________8'________________________,8' 
echo ________8,___________d8________________________,8' 
echo ________(b___________8'_______________________,8' 
echo _________8,_________a8_______________________,8' 
echo _________(b_________8'______________________,8' 
echo __________8,_______,8______________________,8' 
echo __________(b_______8'_____________________,8' 
echo ___________8,_____,8_____________________,8' 
echo ___________(b_____8'____________________,8' 
echo ____________8,___d8____________________,8' 
echo ____________(b__,8'___________________,8' 
echo _____________8,,I8___________________,8' 
echo _____________I8I8'__________________,8' 
echo _____________`I8I__________________,8' 
echo ______________I8'_________________,8' 
echo ______________"8_________________,8' 
echo ______________(8________________,8' 
echo ______________8I_______________,8' 
echo ______________(b,___8,________,8) 
echo ______________`8I___"88______,8i8, 
echo _______________(b,__________,8"8") 
echo _______________`8I__,8______8)_8_8 
echo ________________8I__8I______"__8_8 
echo ________________(b__8I_________8_8 
echo ________________`8__(8,________b_8, 
echo _________________8___8)________"b"8, 
echo _________________8___8(_________"b"8 
echo _________________8___"I__________"b8, 
echo _________________8________________`8) 
echo _________________8_________________I8 
echo _________________8_________________(8 
echo _________________8,_________________8, 
echo _________________Ib_________________8) 
echo _________________(8_________________I8 
echo __________________8_________________I8 
echo __________________8_________________I8 
echo __________________8,________________I8 
echo __________________Ib________________8I 
echo __________________(8_______________(8' 
echo ___________________8_______________I8 
echo ___________________8,______________8I 
echo ___________________Ib_____________(8' 
echo ___________________(8_____________I8 
echo ___________________`8_____________8I 
echo ____________________8____________(8' 
echo ____________________8,___________I8 
echo ____________________Ib___________8I 
echo ____________________(8___________8' 
echo _____________________8,_________(8 
echo _____________________Ib_________I8 
echo _____________________(8_________8I 
echo ______________________8,________8' 
echo ______________________(b_______(8 
echo _______________________8,______I8 
echo _______________________I8______I8 
echo _______________________(8______I8 
echo ________________________8______I8, 
echo ________________________8______8_8, 
echo ________________________8,_____8_8' 
echo _______________________,I8_____"8" 
echo ______________________,8"8,_____8, 
echo _____________________,8'_`8_____`b 
echo ____________________,8'___8______8, 
echo ___________________,8'____(a_____`b 
echo __________________,8'_____`8______8, 
echo __________________I8/______8______`b, 
echo __________________I8-/_____8_______`8, 
echo __________________(8/-/____8________`8, 
echo ___________________8I/-/__,8_________`8 
echo ___________________`8I/--,I8________-8) 
echo ____________________`8I,,d8I_______-8) 
echo ______________________"bdI"8,_____-I8 
echo ___________________________`8,___-I8' 
echo ____________________________`8,,--I8 
echo _____________________________`Ib,,I8 
echo ______________________________`I8I
pause
goto exit