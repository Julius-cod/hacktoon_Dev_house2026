# 🚀 Guia de Setup Rápido - FeatureBridge AI

> Complete setup em 10 minutos (teste local) ou 30 minutos (com Firebase)

## Opção 1: Setup Rápido (SEM Firebase - Para Testes)

Se você quer testar rápido sem configurar Firebase:

### Backend

```bash
cd backend
npm install

# Criar arquivo .env (valores fake é ok para testes)
cat > .env << EOF
FIREBASE_PROJECT_ID=demo-project
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nDEMO_KEY\n-----END PRIVATE KEY-----
FIREBASE_CLIENT_EMAIL=firebase@demo.iam.gserviceaccount.com
OPENAI_API_KEY=sk-demo-key
PORT=3000
EOF

npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse: **http://localhost:5173** 🎉

---

## Opção 2: Setup Completo (COM Firebase + OpenAI)

### Passo 1: Firebase Setup

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Clique "Criar Projeto"
3. Nome: `featurebridge-ai`
4. Criar projeto
5. Menu lateral → Configurações do Projeto → Contas de Serviço
6. Clique "Gerar chave privada" (novo JSON)
7. Copie dados do JSON para `.env`

### Passo 2: OpenAI Setup

1. Acesse [OpenAI Platform](https://platform.openai.com/api-keys)
2. Clique "Create new secret key"
3. Copie a chave para `OPENAI_API_KEY` no `.env`

### Passo 3: Configurar Variáveis

**backend/.env**
```env
FIREBASE_PROJECT_ID=seu_project_id
FIREBASE_PRIVATE_KEY=seu_private_key
FIREBASE_CLIENT_EMAIL=seu_email@firebase.com
OPENAI_API_KEY=sk-seu-api-key
PORT=3000
```

**frontend/.env.local** (opcional)
```env
VITE_API_URL=http://localhost:3000/api
VITE_USER_ID=demo-user-123
```

### Passo 4: Rodar Backend

```bash
cd backend
npm install
npm run dev
```

Você verá:
```
🚀 Server running on http://localhost:3000
📊 Health check: http://localhost:3000/health
```

### Passo 5: Rodar Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse: **http://localhost:5173** ✨

---

## 🧪 Testar Feedback Widget

1. Abra http://localhost:5173
2. Clique no botão 💬 flutuante (canto inferior direito)
3. Digite seu feedback
4. Clique "Enviar"

Se funcionar, você verá:
- ✅ Alert "Feedback enviado com sucesso!"
- 📊 Backend recebeu POST em `/api/feedback`
- 💾 Dados salvos em Firebase

---

## 🔗 Testar Endpoints da API

### Criar Feedback
```bash
curl -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "text": "Dark mode would be awesome!"
  }'
```

### Processar com IA
```bash
curl -X POST http://localhost:3000/api/feedback/process \
  -H "Content-Type: application/json" \
  -d '{"feedbackId": "seu_feedback_id"}'
```

### Listar Feedbacks
```bash
curl http://localhost:3000/api/feedbacks
```

### Listar Tickets
```bash
curl http://localhost:3000/api/tickets
```

### Insights
```bash
curl http://localhost:3000/api/insights
```

---

## 📁 Estrutura de Pastas Esperadas

```
hacktoon_Dev_house2026/
├── backend/
│   ├── src/
│   ├── .env              # NÃO COMMIT (gitignore)
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   ├── .env.local        # Opcional
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

---

## ⚠️ Troubleshooting

### "Cannot find module 'firebase-admin'"
```bash
cd backend && npm install
```

### "API está retornando 500"
1. Verificar se `.env` tem valores corretos
2. Verificar logs do Firebase Console
3. Verificar se OpenAI API key é válida

### "Frontend não conecta ao backend"
1. Verificar se backend está rodando em `http://localhost:3000`
2. Verificar CORS: que frontend acesse `/api` route

### "Firestore não existe"
1. Ir em Firebase Console
2. Firestore Database → Criar BD (Start em modo teste)

---

## 🎯 Checklist de Setup

- [ ] Backend instalado e rodando
- [ ] Frontend instalado e rodando
- [ ] Feedback widget aparece (botão flutuante)
- [ ] Consegue enviar feedback
- [ ] Feedback aparece no Firebase
- [ ] Endpoints API respondem (testar com curl)
- [ ] OpenAI classifica feedback corretamente

---

## ⚡ Próx imospassos

1. **Customizar UI/UX** - Adicionar mais validações, feedback visual
2. **GitHub Integration** - Auto-criar issues no GitHub
3. **Audio Support** - Usar Whisper API para transcrever áudio
4. **Deploy** - Push para Vercel + Firebase

---

**Built for hacktoon 2026** 🚀
