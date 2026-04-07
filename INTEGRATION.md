# 📚 Guia de Integração - Como Usar FeatureBridge AI

## 1️⃣ Usar o Widget de Feedback (No Seu Site)

### Opção A: Copiar o Componente

```typescript
// No seu site/app React
import FeedbackWidget from './components/FeedbackWidget';

export default function App() {
  return (
    <div>
      <YourContent />
      <FeedbackWidget userId="your-user-id" />
    </div>
  );
}
```

### Opção B: Carregar via Script (Futuro)

```html
<!-- Adicione no seu site -->
<script src="https://featurebridge.ai/widget.js"></script>
<script>
  FeatureBridge.init({
    userId: 'user123',
    apiUrl: 'https://seu-backend.com/api',
    position: 'bottom-right' // bottom-right, bottom-left, top-right
  });
</script>
```

---

## 2️⃣ Usar os Custom Hooks

### useF feedback - Criar feedback

```typescript
import { useFeedback } from '@/hooks/useApi';

function MyComponent() {
  const { createFeedback, loading, error } = useFeedback({ 
    userId: 'user123' 
  });

  const handleSubmit = async (text) => {
    try {
      const feedback = await createFeedback(text);
      console.log('Feedback criado:', feedback);
    } catch (err) {
      console.error('Erro:', err);
    }
  };

  return (
    <div>
      <button 
        onClick={() => handleSubmit('Dark mode, por favor!')}
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar Feedback'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
```

### useFeedbacks - Listar feedbacks

```typescript
import { useFeedbacks } from '@/hooks/useApi';

function FeedbackList() {
  const { feedbacks, fetchFeedbacks, loading } = useFeedbacks('user123');

  useEffect(() => {
    fetchFeedbacks(50); // Buscar últimos 50
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      {feedbacks.map(fb => (
        <div key={fb.feedbackId}>
          <p>{fb.text}</p>
          <small>{fb.type} - {fb.sentiment}</small>
          <small>Prioridade: {fb.priorityScore}</small>
        </div>
      ))}
    </div>
  );
}
```

### useTickets - Gerenciar tickets

```typescript
import { useTickets } from '@/hooks/useApi';

function TicketManager() {
  const { 
    tickets, 
    fetchTickets, 
    updateTicket, 
    loading 
  } = useTickets('user123');

  useEffect(() => {
    fetchTickets(20, 'Open'); // Últimos 20 abertos
  }, []);

  const moveToInProgress = async (ticketId) => {
    try {
      await updateTicket(ticketId, { status: 'In Progress' });
      await fetchTickets(20); // Refreshar
    } catch (error) {
      alert('Erro ao atualizar');
    }
  };

  return (
    <div>
      {tickets.map(ticket => (
        <div key={ticket.ticketId} className="ticket-card">
          <h3>{ticket.title}</h3>
          <p>{ticket.description}</p>
          <button onClick={() => moveToInProgress(ticket.ticketId)}>
            Começar agora
          </button>
        </div>
      ))}
    </div>
  );
}
```

### useInsights - Analytics

```typescript
import { useInsights } from '@/hooks/useApi';

function Analytics() {
  const { insights, fetchInsights } = useInsights('user123');

  useEffect(() => {
    fetchInsights();
  }, []);

  if (!insights) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Total Feedback: {insights.totalFeedback}</h2>
      <p>Bugs: {insights.byType.bug}</p>
      <p>Features: {insights.byType.feature}</p>
      <p>Positivo: {insights.bySentiment.positive}</p>
      <p>Negativo: {insights.bySentiment.negative}</p>
      <p>Prioridade Média: {insights.avgPriority}</p>
    </div>
  );
}
```

---

## 3️⃣ Llamadas HTTP Diretas (Sem React)

### JavaScript Puro

```javascript
const API_URL = 'http://localhost:3000/api';

async function sendFeedback(userId, text) {
  const response = await fetch(`${API_URL}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, text })
  });
  
  if (!response.ok) {
    throw new Error(`Erro: ${response.status}`);
  }
  
  return await response.json();
}

async function getFeedbacks(userId) {
  const params = new URLSearchParams({ userId, limit: 20 });
  const response = await fetch(`${API_URL}/feedbacks?${params}`);
  return await response.json();
}

async function processFeedback(feedbackId) {
  const response = await fetch(`${API_URL}/feedback/process`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ feedbackId })
  });
  return await response.json();
}

// Usar
sendFeedback('user123', 'Add dark mode please!')
  .then(fb => console.log('Feedback enviado:', fb))
  .catch(err => console.error('Erro:', err));
```

### Python / Node.js (Backend)

```python
import requests

API_URL = 'http://localhost:3000/api'

def send_feedback(user_id, text):
    response = requests.post(
        f'{API_URL}/feedback',
        json={'userId': user_id, 'text': text}
    )
    return response.json()

def get_feedbacks(user_id, limit=20):
    response = requests.get(
        f'{API_URL}/feedbacks',
        params={'userId': user_id, 'limit': limit}
    )
    return response.json()

# Usar
feedback = send_feedback('user123', 'Teste')
print(feedback)
```

---

## 4️⃣ Integrar no Dashboard Existente

### Exemplo: Adicionar Widget em Settings

```typescript
// pages/Settings.tsx
import FeedbackWidget from '@/components/FeedbackWidget';
import { useUser } from '@/context/UserContext';

export default function Settings() {
  const { user } = useUser();

  return (
    <div className="p-8">
      <h1>Configurações</h1>
      
      {/* Suas settings aqui */}
      
      {/* Widget no final */}
      {user && <FeedbackWidget userId={user.id} />}
    </div>
  );
}
```

### Exemplo: Mostrar Feedback no Dashboard

```typescript
// pages/Dashboard.tsx
import { useFeedbacks } from '@/hooks/useApi';
import { useUser } from '@/context/UserContext';

export default function Dashboard() {
  const { user } = useUser();
  const { feedbacks, fetchFeedbacks, loading } = useFeedbacks(user?.id);

  useEffect(() => {
    fetchFeedbacks(10);
  }, []);

  return (
    <div>
      <h2>Últimos Feedbacks Recebidos</h2>
      
      {loading && <p>Carregando...</p>}
      
      {feedbacks.map(fb => (
        <div key={fb.feedbackId} className="p-4 border rounded">
          <p className="font-bold">{fb.text.substring(0, 50)}...</p>
          <span className="badge">{fb.type}</span>
          <span className="badge">{fb.sentiment}</span>
          <span className="badge">Prioridade: {fb.priorityScore}</span>
        </div>
      ))}
    </div>
  );
}
```

---

## 5️⃣ Processar Feedback com IA

### Flow Completo

```typescript
import { useFeedback } from '@/hooks/useApi';

function AutoProcessing() {
  const { createFeedback, processFeedback } = useFeedback({ userId: 'user123' });

  const handleAutoProcess = async (text) => {
    try {
      // 1. Criar feedback
      const feedback = await createFeedback(text);
      console.log('1. Feedback criado:', feedback.feedbackId);
      
      // 2. Processar com IA
      const result = await processFeedback(feedback.feedbackId);
      console.log('2. Classificação:', result.classification);
      console.log('3. Ticket criado:', result.ticket);
      
      alert(`
        ✅ Processado!
        Tipo: ${result.classification.type}
        Sentimento: ${result.classification.sentiment}
        Prioridade: ${result.priorityScore}/100
      `);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleAutoProcess(e.target.feedback.value);
    }}>
      <textarea name="feedback" />
      <button>Processar</button>
    </form>
  );
}
```

---

## 6️⃣ Personalizar Tema

### Mudar Cores Primárias

```css
/* src/index.css */
:root {
  --primary-50: #eef2ff;
  --primary-100: #e0e7ff;
  --primary-500: #6366f1;      /* Mude aqui */
  --primary-600: #4f46e5;      /* Mude aqui */
  --primary-700: #4338ca;      /* Mude aqui */
}
```

### TailwindCSS Config

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          500: '#6366f1',  // Customize aqui
          600: '#4f46e5',
          700: '#4338ca',
        }
      }
    }
  }
}
```

---

## 7️⃣ Deploy Seu Setup

### Frontend + Backend Juntos

```bash
# Frontend
cd frontend
npm run build
vercel deploy ./dist

# Backend
cd ../backend
npm run build
firebase deploy --only functions

# Resultado:
# Frontend: https://seu-app.vercel.app
# Backend: https://region-project.cloudfunctions.net/api
```

---

## 🐛 Troubleshooting Comum

### Widget não aparece
```javascript
// Verificar se está no escopo correto
console.log('Component rodando?', <YourComponent />);
// Verificar CSS classes TailwindCSS estão carregadas
```

### API retorna 404
```javascript
// Verificar se backend está rodando
fetch('http://localhost:3000/health')
  .then(r => r.json())
  .then(data => console.log('Backend OK:', data));
```

### Feedback não salva no Firestore
```javascript
// Verificar .env values
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);
// Verificar Firebase console
// firebase.google.com → Firestore Database
```

### IA não classifica
```javascript
// Verificar OpenAI key
console.log('API key length:', process.env.OPENAI_API_KEY.length);
// Testar skill no OpenAI playground
```

---

**Integração completa e pronta para uso!** 🚀
