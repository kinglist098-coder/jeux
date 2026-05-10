# 🚀 Script de Déploiement Netlify (PowerShell)
# Utilisation: .\deploy.ps1

Write-Host "🎮 Appiotti Game Shop - Déploiement Netlify" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Netlify CLI est installé
$netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue
if (-not $netlifyInstalled) {
    Write-Host "❌ Netlify CLI n'est pas installé." -ForegroundColor Red
    Write-Host "📦 Installation: npm install -g netlify-cli" -ForegroundColor Yellow
    exit 1
}

# Vérifier la connexion
Write-Host "🔍 Vérification de la connexion Netlify..." -ForegroundColor Yellow
netlify status

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "🔐 Connectez-vous à Netlify :" -ForegroundColor Yellow
    netlify login
}

Write-Host ""
Write-Host "📋 Build du projet..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Le build a échoué. Vérifiez les erreurs ci-dessus." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Build réussi !" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Déploiement sur Netlify..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Choisissez une option :" -ForegroundColor Cyan
Write-Host "1) Déploiement de production (--prod)" -ForegroundColor White
Write-Host "2) Déploiement de test (draft)" -ForegroundColor White
Write-Host ""
$choice = Read-Host "Votre choix (1/2)"

if ($choice -eq "1") {
    Write-Host ""
    Write-Host "🌍 Déploiement en PRODUCTION..." -ForegroundColor Green
    netlify deploy --prod --dir=dist
} else {
    Write-Host ""
    Write-Host "🧪 Déploiement de TEST..." -ForegroundColor Magenta
    netlify deploy --dir=dist
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Déploiement réussi !" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Prochaines étapes :" -ForegroundColor Cyan
    Write-Host "1. Configurez les variables d'environnement dans le dashboard Netlify" -ForegroundColor White
    Write-Host "2. Mettez à jour YOUR_BACKEND_URL dans netlify.toml" -ForegroundColor White
    Write-Host "3. Testez votre site" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Le déploiement a échoué." -ForegroundColor Red
    Write-Host "Vérifiez les erreurs ci-dessus et réessayez." -ForegroundColor White
    Write-Host ""
}
