@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ========================================
echo            Git 提交脚本
echo ========================================

:: 检查是否在Git仓库中
git status >nul 2>&1
if errorlevel 1 (
    echo 错误：当前目录不是Git仓库！
    pause
    exit /b 1
)

:: 获取commit消息参数
set "commit_msg=%1"
if "%commit_msg%"=="" (
    set "commit_msg=update"
)

echo.
echo 正在执行Git操作...
echo 提交消息: %commit_msg%
echo.

:: 执行git add .
echo [1/4] 添加所有文件到暂存区...
git add .
if errorlevel 1 (
    echo 错误：git add 失败！
    pause
    exit /b 1
)

:: 检查是否有文件被修改
git diff --cached --quiet
if errorlevel 1 (
    echo [2/4] 文件已添加到暂存区
) else (
    echo [2/4] 没有文件需要提交
    echo 操作完成！
    pause
    exit /b 0
)

:: 执行git commit
echo [3/4] 提交更改...
git commit -m "%commit_msg%"
if errorlevel 1 (
    echo 错误：git commit 失败！
    pause
    exit /b 1
)

:: 执行git push
echo [4/4] 推送到远程仓库...
git push
if errorlevel 1 (
    echo 错误：git push 失败！
    pause
    exit /b 1
)

echo.
echo ========================================
echo           操作完成！
echo ========================================
echo 提交消息: %commit_msg%
echo 时间: %date% %time%
echo.

pause