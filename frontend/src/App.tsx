import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import FeedbackInbox from './pages/FeedbackInbox';
import Tickets from './pages/Tickets';
import Insights from './pages/Insights';
import Settings from './pages/Settings';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="feedback" element={<FeedbackInbox />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="insights" element={<Insights />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;