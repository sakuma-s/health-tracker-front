# ビルド
npm run build

# コピー（古いファイルを削除してから）
Remove-Item -Recurse -Force C:\projects\health-tracker\src\main\resources\static\search\*
Copy-Item -Recurse -Force C:\projects\health-tracker-front\dist\* C:\projects\health-tracker\src\main\resources\static\search

# dist/index.htmlから最新のJS・CSSファイル名を取得
$indexContent = Get-Content C:\projects\health-tracker-front\dist\index.html -Raw
$jsFile = [regex]::Match($indexContent, 'assets/(index-[a-zA-Z0-9]+\.js)').Groups[1].Value
$cssFile = [regex]::Match($indexContent, 'assets/(index-[a-zA-Z0-9]+\.css)').Groups[1].Value

# list.htmlを読み込んで書き換え
$listPath = "C:\projects\health-tracker\src\main\resources\templates\records\list.html"
$listContent = Get-Content $listPath -Raw
$listContent = $listContent -replace 'assets/index-[a-zA-Z0-9]+\.js', "assets/$jsFile"
$listContent = $listContent -replace 'assets/index-[a-zA-Z0-9]+\.css', "assets/$cssFile"
Set-Content $listPath $listContent -NoNewline

Write-Host "Done: JS=$jsFile CSS=$cssFile"