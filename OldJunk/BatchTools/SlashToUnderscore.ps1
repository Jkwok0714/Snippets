Get-ChildItem -Recurse | Rename-Item -NewName { $_.Name -replace "-", "_" }