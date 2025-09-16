@echo off
setlocal enabledelayedexpansion

REM Iterate through all directories in the current location.
for /d %%d in (*) do (
    set "folderName=%%d"
    
    REM Check if the folder name contains "-old".
    echo "!folderName!" | findstr /i /c:"-old" >nul
    if errorlevel 1 (
        REM "-old" was not found, so process this folder.
        
        REM Count files in the directory.
        set "count=0"
        for /f %%c in ('dir /b /a-d "!folderName!" 2^>nul ^| find /c /v ""') do set "count=%%c"

        timeout /t 5 >nul

        echo Processing folder: "!folderName!", File count: !count!
        
        REM Check if file count is 100 or more.
        if !count! geq 100 (
            echo Folder "!folderName!" has 100 or more files. Archiving...
            set "targetFolderName=!folderName!-old"
            
            REM Create the "-old" directory if it doesn't exist.
            if not exist "!targetFolderName!" (
          echo Creating directory: "!targetFolderName!"
          md "!targetFolderName!"
            )
            
            echo Moving files from "!folderName!" to "!targetFolderName!"
            REM Iterate over files and move them one by one, printing the name.
            for %%f in ("!folderName!\*") do (
              echo Moving file: "%%~nxf"
              move "%%f" "!targetFolderName!\" >nul
            )
        ) else (
            echo Folder "!folderName!" has less than 100 files. No action taken.
        )

        if defined targetFolderName (
            set "oldFolderCount=0"
            for /f %%c in ('dir /b /a-d "!targetFolderName!" 2^>nul ^| find /c /v ""') do set "oldFolderCount=%%c"
            echo Current file count in "!targetFolderName!": !oldFolderCount!
            set "targetFolderName="
        )
    ) else (
        echo Ignoring folder: "!folderName!"
    )
)

echo.
echo Script finished.
endlocal
pause
