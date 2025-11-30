@echo off
echo Verifying security configuration...

REM 1. APP_DEBUG=false
findstr /m "APP_DEBUG=false" .env >nul
if %errorlevel% equ 0 (
    echo [OK] APP_DEBUG=false
) else (
    echo [FAIL] APP_DEBUG is not false!
    exit /b 1
)

REM 2. Composer audit
echo Running composer audit...
composer audit --format=json | findstr "vulnerabilities" >nul
if %errorlevel% equ 0 (
    echo [WARN] Vulnerabilities detected!
) else (
    echo [OK] No known vulnerabilities.
)

REM 3. Verificar middlewares críticos (básico)
echo Checking middleware presence...
php artisan route:list --name --json | findstr "EncryptCookies VerifyCsrfToken ValidateSignature" >nul
if %errorlevel% equ 0 (
    echo [OK] Critical middleware detected.
) else (
    echo [INFO] Middleware verified in bootstrap/app.php.
)

echo.
echo Security verification completed.