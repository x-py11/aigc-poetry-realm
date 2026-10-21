@echo off
title AIGC 诗境 · 本地开发服务器
cd /d "%~dp0"

echo.
echo  ============================================
echo    AIGC 诗境 · 中国古典诗词 AI 影像创作平台
echo                一 键 启 动
echo  ============================================
echo.

where node >nul 2>nul
if errorlevel 1 goto :no_node

netstat -ano | findstr /r /c:":32108 .*LISTENING" >nul 2>nul
if not errorlevel 1 goto :already

if exist "node_modules" goto :deps_ok
echo 首次运行，正在安装依赖，约 1-3 分钟，请稍候…
call npm install
if errorlevel 1 goto :install_fail

:deps_ok
echo 正在启动开发服务器：http://localhost:32108/
echo 启动完成后会自动打开浏览器；关闭本窗口即可停止服务。
echo.
start "" cmd /c "ping 127.0.0.1 -n 6 >nul & start http://localhost:32108/"
call npm run dev -- --port 32108

echo.
echo 服务器已停止，按任意键关闭窗口。
pause >nul
exit /b 0

:no_node
echo [错误] 未检测到 Node.js，请先安装 Node.js v18 或更高版本。
echo 下载地址：https://nodejs.org/
pause
exit /b 1

:already
echo 检测到开发服务器已在运行，正在打开浏览器…
start http://localhost:32108/
exit /b 0

:install_fail
echo.
echo [错误] 依赖安装失败，请检查网络或 Node.js 环境后重试。
pause
exit /b 1
