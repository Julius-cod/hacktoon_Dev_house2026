# 🚀 Guia de Deploy - FeatureBridge AI

## Opção 1: Deploy Rápido (Recomendado para Hackathon)

### Frontend - Vercel

**Método 1: Via CLI**
```bash
npm install -g vercel

cd frontend
vercel
# Responda as perguntas:
# - Which scope: Seu username
# - Linked to project: Create new
# - Project name: featurebridge-ai
# - Framework preset: Vite
# - Root directory: frontend

# Deploy automático! ✨
```

**Método 2: Via GitHub**
1. Push seu código para GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique "Import Project"
4. Conecte seu repo GitHub
5. Clique Deploy ✨

### Backend - Firebase Functions

**Passo 1: Instalar Firebase CLI**
```bash
npm install -g firebase-tools
firebase login
```

**Passo 2: Inicializar Firebase**
```bash
cd backend
firebase init functions
# Pergunta:
# - Qual projeto? Seu Firebase project ID
# - TypeScript? Yes
```

**Passo 3: Deploy**
```bash
firebase deploy --only functions
```

Seu backend estará em:
```
https://REGION-seu-project.cloudfunctions.net/api
```

---

## Opção 2: Deploy com Docker (Heroku/Railway)

### Dockerfile (backend)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
EXPOSE 3000
```

### Deploy no Railway
1. Acesse [railway.app](https://railway.app)
2. Clique "New Project" → "Deploy from GitHub"
3. Conecte seu repositório
4. Selecione pasta `backend`
5. Adicione variáveis de ambiente (.env vars)
6. Deploy!

---

## ⚙️ Configurar Variáveis de Ambiente

### Vercel (Frontend)
```bash
cd frontend
vercel env add VITE_API_URL https://seu-backend.vercel.app/api
```

### Firebase Functions / Railway (Backend)
1. Dashboard do serviço
2. Environment Variables
3. Adicione:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_PRIVATE_KEY` (com \n escapados)
   - `FIREBASE_CLIENT_EMAIL`
   - `OPENAI_API_KEY`

---

## 📊 URLs de Produção

- **Frontend**: https://seu-frontend.vercel.app
- **Backend**: https://seu-backend-region.cloudfunctions.net
- **API**: https://seu-backend-region.cloudfunctions.net/api

Configure no frontend:
```bash
VITE_API_URL=https://seu-backend-region.cloudfunctions.net/api
```

---

## ✅ Checklist de Deploy

- [ ] Código commitado no GitHub
- [ ] Variáveis de ambiente configuradas
- [ ] Build passa (npm run build)
- [ ] API health check passa
- [ ] Feedback widget funciona em produção
- [ ] Firebase Firestore configurado
- [ ] CORS habilitado para seu domínio

---

## 🔒 Segurança Pro Produção

1. **Habilitar Firebase Auth**
   ```bash
   # Firebase Console → Authentication → Enable
   ```

2. **Configurar Firestore Security Rules**
   ```
   match /feedbacks/{document=**} {
     allow read, write: if request.auth != null;
   }
   ```

3. **Rate Limiting** (implementar)
   ```typescript
   // middleware/rateLimit.ts
   import rateLimit from 'express-rate-limit';
   
   export const feedbackLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 min
     max: 10 // 10 requests
   });
   ```

4. **HTTPS Obrigatório**
   - Vercel: automático ✓
   - Firebase: automático ✓

---

## 📈 Monitoramento

### Firebase Console
- Firestore → Banco de dados
- Functions → Logs e métricas
- Authentication → Usuários

### Vercel Analytics
- Acesse seu dashboard
- Integre com Google Analytics

---

**Status: Pronto para hackatho!** 🎉
