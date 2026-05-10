#!/bin/bash

# 🚀 Script de Déploiement Netlify
# Utilisation: chmod +x deploy.sh && ./deploy.sh

echo "🎮 Appiotti Game Shop - Déploiement Netlify"
echo "============================================"
echo ""

# Vérifier si Netlify CLI est installé
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI n'est pas installé."
    echo "📦 Installation: npm install -g netlify-cli"
    exit 1
fi

# Vérifier la connexion
echo "🔍 Vérification de la connexion Netlify..."
netlify status

if [ $? -ne 0 ]; then
    echo ""
    echo "🔐 Connectez-vous à Netlify :"
    netlify login
fi

echo ""
echo "📋 Build du projet..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Le build a échoué. Vérifiez les erreurs ci-dessus."
    exit 1
fi

echo ""
echo "✅ Build réussi !"
echo ""
echo "🚀 Déploiement sur Netlify..."
echo ""
echo "Choisissez une option :"
echo "1) Déploiement de production (--prod)"
echo "2) Déploiement de test (draft)"
echo ""
read -p "Votre choix (1/2) : " choice

if [ "$choice" = "1" ]; then
    echo ""
    echo "🌍 Déploiement en PRODUCTION..."
    netlify deploy --prod --dir=dist
else
    echo ""
    echo "🧪 Déploiement de TEST..."
    netlify deploy --dir=dist
fi

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Déploiement réussi !"
    echo ""
    echo "📝 Prochaines étapes :"
    echo "1. Configurez les variables d'environnement dans le dashboard Netlify"
    echo "2. Mettez à jour YOUR_BACKEND_URL dans netlify.toml"
    echo "3. Testez votre site"
    echo ""
else
    echo ""
    echo "❌ Le déploiement a échoué."
    echo "Vérifiez les erreurs ci-dessus et réessayez."
    echo ""
fi
