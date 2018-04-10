REM Installs appcom interactive live template configuration
@echo off
echo Installing appcom interactive live templates configuration...

setlocal enableDelayedExpansion

for /D %%i in ("%userprofile%"\.AndroidStudio*) do call :copy_template "%%i"
for /D %%i in ("%userprofile%"\.IdeaIC*) do call :copy_template "%%i"
for /D %%i in ("%userprofile%"\.IntelliJIdea*) do call :copy_template "%%i"

echo.
echo Restart AndroidStudio and enjoy your livetemplates
pause
exit /b

REM sub function for copy template files
:copy_template
set template_dir=%~1\config\templates
echo Installing to "!template_dir!"
xcopy /s /i templates "!template_dir!"
echo Done.
echo.
exit /b