import { db } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

export interface Feedback {
  feedbackId: string;
  userId: string;
  text: string;
  audioUrl?: string;
  type: 'Bug' | 'Feature' | 'Question';
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  priorityScore: number;
  status: 'pending' | 'processed' | 'ticketCreated';
  ticketId?: string;
  createdAt: string;
  updatedAt: string;
}

export async function createFeedback(
  userId: string,
  text: string,
  audioUrl?: string
): Promise<Feedback> {
  const feedbackId = uuidv4();
  const now = new Date().toISOString();

  const feedback: Feedback = {
    feedbackId,
    userId,
    text,
    audioUrl,
    type: 'Question',
    sentiment: 'Neutral',
    priorityScore: 50,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };

  await db.collection('feedbacks').doc(feedbackId).set(feedback);
  return feedback;
}

export async function updateFeedback(feedbackId: string, updates: Partial<Feedback>) {
  await db.collection('feedbacks').doc(feedbackId).update({
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

export async function getFeedback(feedbackId: string): Promise<Feedback | null> {
  const doc = await db.collection('feedbacks').doc(feedbackId).get();
  return (doc.data() as Feedback) || null;
}

export async function getUserFeedbacks(userId: string, limit = 50) {
  const query = await db
    .collection('feedbacks')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();

  return query.docs.map(doc => doc.data() as Feedback);
}

export async function getRecentFeedbacks(limit = 20) {
  const query = await db
    .collection('feedbacks')
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();

  return query.docs.map(doc => doc.data() as Feedback);
}
