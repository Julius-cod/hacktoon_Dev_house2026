# FeatureBridge Backend

Node.js + Express backend para o FeatureBridge AI Dashboard.

## 🚀 Quick Start

```bash
cd backend
npm install
cp .env.example .env
# Configure suas variáveis de ambiente
npm run dev
```

## 📁 Estrutura

```
src/
├── index.ts              # Entry point
├── config/
│   └── firebase.ts       # Firebase Admin SDK config
├── services/
│   ├── ai.service.ts     # OpenAI GPT integração
│   ├── feedback.service.ts
│   └── ticket.service.ts
└── routes/
    └── api.ts            # API endpoints
```

## 🔑 Variáveis de Ambiente

```env
FIREBASE_PROJECT_ID=seu_project_id
FIREBASE_PRIVATE_KEY=sua_chave_privada
FIREBASE_CLIENT_EMAIL=seu_email
OPENAI_API_KEY=sua_openai_api_key
PORT=3000
```

## 📡 API Endpoints

### Feedback
- `POST /api/feedback` - Criar novo feedback
- `POST /api/feedback/process` - Processar com AI
- `GET /api/feedbacks` - Listar feedbacks

### Tickets
- `GET /api/tickets` - Listar tickets
- `PATCH /api/ticket/:ticketId` - Atualizar ticket

### Insights
- `GET /api/insights` - Analytics e métricas

## 🔗 Integração com Frontend

Endpoint base: `http://localhost:3000/api`

```javascript
// Exemplo
fetch('http://localhost:3000/api/feedback', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    text: 'Feature request: dark mode'
  })
})
```
