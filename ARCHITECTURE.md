# 🏗️ Arquitetura Detalhada - FeatureBridge AI

## Diagrama Geral

```
┌─────────────────────────────────────────────────────────────┐
│                     USUÁRIO FINAL                           │
└──────────┬──────────────────────────────────────────────────┘
           │
           │ Clica feedback widget
           ▼
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND (React + TypeScript)                  │
├─────────────────────────────────────────────────────────────┤
│  • Layout.tsx (Sidebar + Main)                              │
│  • FeedbackWidget (Botão Flutuante)                         │
│  • FeedbackModal (Texto/Audio)                              │
│  • Pages (Dashboard, Tickets, Insights, etc)               │
│  • Context (UserContext)                                    │
│  • Hooks (useApi, useFeedback, useTickets, etc)            │
│  • Styles (TailwindCSS)                                     │
└──────────┬──────────────────────────────────────────────────┘
           │
           │ HTTP POST /api/feedback
           │ {"userId": "...", "text": "..."}
           │
           ▼
┌─────────────────────────────────────────────────────────────┐
│            BACKEND (Node.js + Express)                      │
├─────────────────────────────────────────────────────────────┤
│  src/routes/api.ts (POST /feedback)                         │
│           │                                                  │
│           ▼                                                  │
│  src/services/feedback.service.ts                           │
│  → createFeedback() → salva em Firestore                    │
│           │                                                  │
│           └─→ Feedback criado com status: "pending"         │
└──────────┬──────────────────────────────────────────────────┘
           │
           │ Evento: novo feedback
           │
           ▼
┌─────────────────────────────────────────────────────────────┐
│           AI PROCESSING (OpenAI GPT)                        │
├─────────────────────────────────────────────────────────────┤
│  src/services/ai.service.ts                                 │
│  → classifyFeedback()                                       │
│     • Tipo: Bug|Feature|Question                            │
│     • Sentimento: Positive|Neutral|Negative                 │
│     • Titulo: gerado                                        │
│     • Descrição: resumida                                   │
│           │                                                  │
│           ▼                                                  │
│  → calculatePriority()                                      │
│     • Score 0-100 baseado em:                               │
│     • Sentimento negativo (+30)                             │
│     • Tipo Bug (+20)                                        │
│     • Comprimento texto (+10)                               │
└──────────┬──────────────────────────────────────────────────┘
           │
           │ AI Classificação completa
           │
           ▼
┌─────────────────────────────────────────────────────────────┐
│         DATABASE (Firebase Firestore)                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📄 COLLECTIONS:                                             │
│                                                              │
│  ├─ feedbacks                                               │
│  │  ├─ feedbackId                                           │
│  │  ├─ userId                                               │
│  │  ├─ text                                                 │
│  │  ├─ type (Bug|Feature|Question)                          │
│  │  ├─ sentiment (Positive|Neutral|Negative)                │
│  │  ├─ priorityScore (0-100)                                │
│  │  ├─ status (pending|processed|ticketCreated)             │
│  │  ├─ ticketId (referência)                                │
│  │  └─ timestamps                                           │
│  │                                                          │
│  ├─ tickets                                                 │
│  │  ├─ ticketId                                             │
│  │  ├─ feedbackId                                           │
│  │  ├─ title                                                │
│  │  ├─ description                                          │
│  │  ├─ priority (Low|Medium|High|Critical)                  │
│  │  ├─ status (Open|In Progress|Closed)                     │
│  │  ├─ labels [tipo, prioridade]                            │
│  │  └─ timestamps                                           │
│  │                                                          │
│  └─ users                                                   │
│     ├─ userId                                               │
│     ├─ name                                                 │
│     ├─ email                                                │
│     └─ timestamps                                           │
│                                                              │
└──────────┬──────────────────────────────────────────────────┘
           │
           │ Frontend faz GET /api/feedbacks
           │ Frontend faz GET /api/tickets
           │ Frontend faz GET /api/insights
           │
           ▼
┌─────────────────────────────────────────────────────────────┐
│          FRONTEND (Atualiza em tempo real)                 │
├─────────────────────────────────────────────────────────────┤
│  Dashboard mostra:                                          │
│  • Feedback recebido (com classificação)                    │
│  • Tickets criados automaticamente                          │
│  • Insights (gráficos, estatísticas)                        │
│  • Kanban board com tickets                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Estrutura de Pastas

```
/backend
├── src/
│   ├── index.ts                    # Entry point do servidor
│   ├── config/
│   │   └── firebase.ts             # Inicialização Firebase Admin SDK
│   ├── services/
│   │   ├── ai.service.ts           # OpenAI integration
│   │   ├── feedback.service.ts     # CRUD feedback
│   │   └── ticket.service.ts       # CRUD tickets
│   └── routes/
│       └── api.ts                  # Todas as rotas da API
├── package.json
├── tsconfig.json
├── .env.example
└── .gitignore

/frontend
├── src/
│   ├── main.tsx                    # React root
│   ├── App.tsx                     # Router setup
│   ├── index.css                   # TailwindCSS + custom vars
│   ├── components/
│   │   ├── Layout.tsx              # Sidebar + Main layout
│   │   ├── FeedbackModal.tsx       # Modal de feedback
│   │   └── FeedbackWidget.tsx      # Botão flutuante
│   ├── pages/
│   │   ├── Dashboard.tsx           # Home page
│   │   ├── FeedbackInbox.tsx       # Lista de feedbacks
│   │   ├── Tickets.tsx             # Kanban board
│   │   ├── Insights.tsx            # Analytics
│   │   └── Settings.tsx            # Configurações
│   ├── hooks/
│   │   └── useApi.ts               # Custom hooks para API
│   ├── context/
│   │   └── UserContext.tsx         # User context
│   └── assets/                     # Imagens, ícones
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.example
└── .gitignore
```

---

## 🔄 Fluxo de Dados (Data Flow)

### 1️⃣ Criar Feedback

```
User escribe no widget
    ↓
FeedbackModal.handleSubmit()
    ↓
useFeedback.createFeedback(text)
    ↓
POST /api/feedback
    ↓
backend: routes/api.ts (POST handler)
    ↓
services/feedback.service.ts::createFeedback()
    ↓
Firebase Firestore: INSERT feedbacks collection
    ↓
Return feedback com ID e status="pending"
    ↓
Frontend: Alert "Enviado com sucesso"
```

### 2️⃣ Processar com IA

```
Backend: POST /api/feedback/process recebe feedbackId
    ↓
services/feedback.service.ts::getFeedback(feedbackId)
    ↓
services/ai.service.ts::classifyFeedback(text)
    ↓
OpenAI API call com prompt
    ↓
Parse resposta JSON:
  {
    "type": "Bug",
    "sentiment": "Negative",
    "title": "...",
    "description": "..."
  }
    ↓
services/ai.service.ts::calculatePriority(score)
    ↓
services/ticket.service.ts::createTicket()
    ↓
Firebase Firestore: INSERT tickets collection
    ↓
UPDATE feedbacks com ticketId + status="ticketCreated"
    ↓
Return completo ao frontend
```

### 3️⃣ Mostrar no Dashboard

```
Frontend: useEffect(() => fetchFeedbacks())
    ↓
GET /api/feedbacks
    ↓
backend: query Firestore feedbacks
    ↓
Return array de feedbacks
    ↓
Frontend: setState(feedbacks)
    ↓
Render FeedbackInbox com dados
```

---

## 🔌 API Endpoints Detalhado

### Feedback Endpoints

#### POST /api/feedback
```javascript
// Request
{
  userId: "user123",
  text: "Dark mode é uma feature crucial!",
  audioUrl?: "https://storage.../audio.wav"  // opcional
}

// Response (201)
{
  feedbackId: "uuid",
  userId: "user123",
  text: "Dark mode é uma feature crucial!",
  type: "Question",
  sentiment: "Neutral",
  priorityScore: 50,
  status: "pending",
  createdAt: "2026-04-07T09:00:00Z"
}
```

#### POST /api/feedback/process
```javascript
// Request
{
  feedbackId: "uuid-123"
}

// Response (200)
{
  feedback: { ...updated feedback },
  classification: {
    type: "Feature",
    sentiment: "Positive",
    title: "Dark Mode Feature Request",
    description: "User requesting dark mode implementation"
  },
  ticket: {
    ticketId: "uuid",
    feedbackId: "uuid",
    title: "Dark Mode Feature Request",
    priority: "High",
    status: "Open"
  },
  priorityScore: 75
}
```

#### GET /api/feedbacks?userId=...&limit=20
```javascript
// Response (200)
[
  {
    feedbackId: "uuid",
    userId: "user123",
    text: "...",
    type: "Bug",
    sentiment: "Negative",
    priorityScore: 85,
    status: "ticketCreated",
    createdAt: "..."
  },
  // ... mais feedbacks
]
```

### Tickets Endpoints

#### GET /api/tickets?limit=20&status=Open
```javascript
// Response (200)
[
  {
    ticketId: "uuid",
    feedbackId: "uuid",
    title: "Login button não responde em mobile",
    description: "Usuário não consegue fazer login no iPhone",
    type: "Bug",
    priority: "Critical",
    status: "Open",
    labels: ["Bug", "Critical"],
    createdAt: "..."
  }
]
```

#### PATCH /api/ticket/:ticketId
```javascript
// Request
{
  status: "In Progress",
  labels: ["Bug", "Critical", "Mobile"]
}

// Response (200)
{
  // ticket atualizado
}
```

### Analytics Endpoints

#### GET /api/insights?userId=...
```javascript
// Response (200)
{
  totalFeedback: 247,
  byType: {
    bug: 84,
    feature: 98,
    question: 65
  },
  bySentiment: {
    positive: 120,
    neutral: 87,
    negative: 40
  },
  avgPriority: 67.3
}
```

---

## 🔐 Segurança (Security)

### Input Validation
- Todos os inputs são validados no backend
- Métodos POST requerem campos obrigatórios
- Limite de tamanho de texto (5000 chars)

### CORS
```typescript
app.use(cors());
// Pode limitar para produção:
// app.use(cors({
//   origin: process.env.ALLOWED_ORIGINS?.split(','),
//   credentials: true
// }))
```

### Rate Limiting (A implementar)
```typescript
const feedbackLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10 // máx 10 feedbacks por user
});
app.post('/api/feedback', feedbackLimiter, handler);
```

### Environment Variables
- Nunca commitar `.env`
- Usar `.gitignore`
- Firebase keys protegidas
- OpenAI API key protegida

---

## ⚡ Performance

### Frontend
- Code splitting com React.lazy()
- Image optimization (TailwindCSS)
- CSS minified (build process)
- Gzip compression (Vercel default)

### Backend
- Database indexing em Firestore
- API response caching (TODO)
- Batch operations (multi-get)
- Compression middleware

### Database
- Firestore indexes automáticos
- Denormalization para reads rápidos
- Subcollections para nested data

---

## 🧪 Testing Strategy

### Manual Testing
```bash
# Health check
curl http://localhost:3000/health

# Create feedback
curl -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"userId": "test", "text": "test"}'

# Get feedbacks
curl http://localhost:3000/api/feedbacks

# Process with AI
curl -X POST http://localhost:3000/api/feedback/process \
  -H "Content-Type: application/json" \
  -d '{"feedbackId": "..."}'
```

### Unit Tests (TODO)
```typescript
// feedback.service.test.ts
describe('Feedback Service', () => {
  it('should create feedback', async () => {
    const feedback = await createFeedback('uid', 'test');
    expect(feedback.feedbackId).toBeDefined();
  });
});
```

---

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│           GitHub Repository                     │
├─────────────────────────────────────────────────┤
│  ├─ /frontend → auto-deploy to Vercel          │
│  └─ /backend → auto-deploy to Firebase Fn      │
└──────────────┬────────────────┬────────────────┘
               │                │
       ┌───────▼────────┐   ┌───▼────────────────┐
       │   Vercel CDN   │   │  Firebase Fn       │
       ├────────────────┤   ├────────────────────┤
       │ React App      │   │ Express API        │
       │ Static assets  │   │ Rate limiting      │
       │ Fast geo dist  │   │ Auto-scaling       │
       └────────┬───────┘   └─────────┬──────────┘
                │                     │
        HTTPS   │                     │ HTTPS
                └──────────┬──────────┘
                           │
                    ┌──────▼──────────┐
                    │  Google Cloud   │
                    │  - Firestore    │
                    │  - Auth (TODO)  │
                    └─────────────────┘
```

---

**Arquitetura escalável e production-ready para hackathon** ✨
