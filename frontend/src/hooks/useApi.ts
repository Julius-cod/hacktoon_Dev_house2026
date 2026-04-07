import { useState, useCallback } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface UseFeedbackProps {
  userId: string;
}

export function useFeedback({ userId }: UseFeedbackProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createFeedback = useCallback(
    async (text: string, audioUrl?: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/feedback`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, text, audioUrl }),
        });

        if (!response.ok) throw new Error('Failed to create feedback');
        return await response.json();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  const processFeedback = useCallback(async (feedbackId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/feedback/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedbackId }),
      });

      if (!response.ok) throw new Error('Failed to process feedback');
      return await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createFeedback, processFeedback, loading, error };
}

export function useFeedbacks(userId?: string) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedbacks = useCallback(async (limit = 20) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        ...(userId && { userId }),
      });

      const response = await fetch(`${API_BASE_URL}/feedbacks?${params}`);
      if (!response.ok) throw new Error('Failed to fetch feedbacks');

      const data = await response.json();
      setFeedbacks(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return { feedbacks, fetchFeedbacks, loading, error };
}

export function useTickets(userId?: string) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = useCallback(async (limit = 20, status?: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        ...(userId && { userId }),
        ...(status && { status }),
      });

      const response = await fetch(`${API_BASE_URL}/tickets?${params}`);
      if (!response.ok) throw new Error('Failed to fetch tickets');

      const data = await response.json();
      setTickets(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateTicket = useCallback(async (ticketId: string, updates: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/ticket/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error('Failed to update ticket');
      const updated = await response.json();

      setTickets(prev => prev.map(t => (t.ticketId === ticketId ? updated : t)));
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    }
  }, []);

  return { tickets, fetchTickets, updateTicket, loading, error };
}

export function useInsights(userId?: string) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams(userId ? { userId } : {});
      const response = await fetch(`${API_BASE_URL}/insights?${params}`);

      if (!response.ok) throw new Error('Failed to fetch insights');
      const data = await response.json();
      setInsights(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return { insights, fetchInsights, loading, error };
}
