# Git 提交脚本
# 使用方法: .\git-commit.ps1 [commit_message]
# 如果不提供commit_message，默认使用"update"

param(
    [string]$CommitMessage = "update"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "            Git 提交脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 检查是否在Git仓库中
if (-not (Test-Path ".git")) {
    Write-Host "错误：当前目录不是Git仓库！" -ForegroundColor Red
    Read-Host "按回车键退出"
    exit 1
}

Write-Host ""
Write-Host "正在执行Git操作..." -ForegroundColor Yellow
Write-Host "提交消息: $CommitMessage" -ForegroundColor Green
Write-Host ""

try {
    # 执行git add .
    Write-Host "[1/4] 添加所有文件到暂存区..." -ForegroundColor Blue
    git add .
    if ($LASTEXITCODE -ne 0) {
        throw "git add 失败"
    }

    # 检查是否有文件被修改
    $stagedFiles = git diff --cached --name-only
    if ($stagedFiles) {
        Write-Host "[2/4] 文件已添加到暂存区" -ForegroundColor Green
    } else {
        Write-Host "[2/4] 没有文件需要提交" -ForegroundColor Yellow
        Write-Host "操作完成！" -ForegroundColor Green
        Read-Host "按回车键退出"
        exit 0
    }

    # 执行git commit
    Write-Host "[3/4] 提交更改..." -ForegroundColor Blue
    git commit -m $CommitMessage
    if ($LASTEXITCODE -ne 0) {
        throw "git commit 失败"
    }

    # 执行git push
    Write-Host "[4/4] 推送到远程仓库..." -ForegroundColor Blue
    git push
    if ($LASTEXITCODE -ne 0) {
        throw "git push 失败"
    }

    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "           操作完成！" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "提交消息: $CommitMessage" -ForegroundColor White
    Write-Host "时间: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor White
    Write-Host ""

} catch {
    Write-Host "错误：$($_.Exception.Message)" -ForegroundColor Red
    Read-Host "按回车键退出"
    exit 1
}

Read-Host "按回车键退出" 