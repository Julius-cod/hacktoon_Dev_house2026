# 🎯 FeatureBridge AI - Transformando Feedback em Tickets com IA

> **Hackathon MVP** | Node.js + React | OpenAI Integration

## 📋 Visão Geral

**FeatureBridge AI** transforma feedback de usuários em tickets estruturados automaticamente:
- 🎤 Widget flutuante para coletar feedback (texto/áudio)
- 🤖 Classificação automática com GPT (Bug/Feature/Question)
- 😊 Análise de sentimento em tempo real
- 📊 Dashboard com insights e priorização
- 🔗 Integração automática com GitHub Issues ou Linear

## ⚡ Tech Stack

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | React + TypeScript + TailwindCSS |
| **Backend** | Node.js + Express |
| **Banco** | Firebase Firestore |
| **AI** | OpenAI GPT-3.5 Turbo + Whisper |
| **Deploy** | Vercel + Firebase Functions |

## 📁 Estrutura do Projeto

```
hacktoon_Dev_house2026/
├── frontend/                 # React Dashboard
│   ├── src/
│   │   ├── pages/           # Dashboard, Feedback, Tickets, Insights
│   │   ├── components/      # Layout, Widgets
│   │   └── assets/
│   ├── package.json
│   └── README.md
├── backend/                  # Node.js Express API
│   ├── src/
│   │   ├── index.ts         # Entry point
│   │   ├── config/          # Firebase config
│   │   ├── services/        # Business logic
│   │   └── routes/          # API endpoints
│   ├── package.json
│   └── README.md
└── README.md                 # Este arquivo
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Firebase Account (gratuito)
- OpenAI API Key

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Configure Firebase + OpenAI no .env
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Acesse: http://localhost:5173

## 📡 API Endpoints

### Feedback Management
```
POST   /api/feedback           # Criar novo feedback
POST   /api/feedback/process   # Processar com IA
GET    /api/feedbacks          # Listar feedbacks
```

### Tickets
```
GET    /api/tickets            # Listar tickets
PATCH  /api/ticket/:id         # Atualizar ticket
```

### Analytics
```
GET    /api/insights           # Stats e insights
```

## 🎯 Fluxo Principal

```
User enviar feedback (widget)
        ↓
Backend recebe (POST /api/feedback)
        ↓
GPT classifica + gera título
        ↓
Calcula prioridade
        ↓
Cria ticket (salva no Firestore)
        ↓
Dashboard atualiza em tempo real
```

## 🔧 Configuração de Variáveis

### Backend (.env)
```env
FIREBASE_PROJECT_ID=seu_project_id
FIREBASE_PRIVATE_KEY=sua_chave_privada
FIREBASE_CLIENT_EMAIL=seu_email@firebase.com
OPENAI_API_KEY=sk-...
PORT=3000
```

### Frontend (.env.local - opcional)
```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=FeatureBridge AI
```

## 📊 Arquitetura de Banco de Dados

### Firestore Collections

**feedbacks**
```javascript
{
  feedbackId: "uuid",
  userId: "user123",
  text: "string",
  type: "Bug|Feature|Question",
  sentiment: "Positive|Neutral|Negative",
  priorityScore: 85,
  status: "pending|processed|ticketCreated",
  createdAt: "ISO8601",
}
```

**tickets**
```javascript
{
  ticketId: "uuid",
  feedbackId: "uuid",
  title: "string",
  description: "string",
  priority: "Low|Medium|High|Critical",
  status: "Open|In Progress|Closed",
  labels: ["Bug", "High Priority"],
  createdAt: "ISO8601",
}
```

**users** (opcional)
```javascript
{
  userId: "uuid",
  name: "string",
  email: "string",
  createdAt: "ISO8601",
}
```

## 🎨 Features Dashboard

✅ **Resumo Diário**
- Total feedback recebido
- Tickets criados automaticamente
- Sentimento médio
- Prioridade média

✅ **Gerenciamento**
- Listar feedbacks com status
- Visualizar tickets por coluna (To Do, In Progress, Review, Done)
- Filtrar por prioridade e tipo

✅ **Insights**
- Gráficos de sentimento
- Distribuição de tipos
- Feedback por semana
- Performance de IA (acurácia)

✅ **Actions**
- Criar ticket manualmente
- Revisar sugestões de IA
- Exportar relatórios
- Configurar preferências

## 🔐 Segurança

- Firebase Auth (opcional para fase 1)
- CORS habilitado apenas para domínios autorizados
- Variáveis de ambiente protegidas
- Rate limiting (a implementar)

## 📈 Próximas Features (Pós-MVP)

- [ ] GitHub Issues integration automática
- [ ] Transcrição de áudio (Whisper API)
- [ ] Webhook para eventos de mudança
- [ ] Email notifications
- [ ] Team collaboration
- [ ] SLA tracking
- [ ] Custom priority rules

## 🎬 Deploy

### Vercel (Frontend)
```bash
cd frontend
vercel deploy
```

### Firebase Functions (Backend)
```bash
cd backend
firebase deploy --only functions
```

## 📞 Suporte

Para erros ou dúvidas, considere:
1. Verificar logs do Firebase Console
2. Validar OPENAI_API_KEY
3. Verificar CORS na solicitação

## 📝 License

MIT - Hackathon 2026

---

**Built with ❤️ for FeatureBridge AI | © 2026**