rem Check if D drive exists
echo.
echo.
dir D:\ >nul 2>nul
if errorlevel 1 (
    echo D drive does not exist.
) else (
    echo D drive exists.
)