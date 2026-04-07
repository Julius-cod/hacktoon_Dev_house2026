import { db } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

export interface Ticket {
  ticketId: string;
  feedbackId: string;
  userId: string;
  title: string;
  description: string;
  type: 'Bug' | 'Feature' | 'Question';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Closed';
  labels: string[];
  githubIssueNumber?: number;
  externalId?: string;
  createdAt: string;
  updatedAt: string;
}

export async function createTicket(
  feedbackId: string,
  userId: string,
  title: string,
  description: string,
  type: 'Bug' | 'Feature' | 'Question',
  priorityScore: number
): Promise<Ticket> {
  const ticketId = uuidv4();
  const now = new Date().toISOString();

  const priority = mapScoreToPriority(priorityScore);

  const ticket: Ticket = {
    ticketId,
    feedbackId,
    userId,
    title,
    description,
    type,
    priority,
    status: 'Open',
    labels: [type, priority],
    createdAt: now,
    updatedAt: now,
  };

  await db.collection('tickets').doc(ticketId).set(ticket);
  return ticket;
}

export function mapScoreToPriority(
  score: number
): 'Low' | 'Medium' | 'High' | 'Critical' {
  if (score >= 80) return 'Critical';
  if (score >= 60) return 'High';
  if (score >= 40) return 'Medium';
  return 'Low';
}

export async function updateTicket(ticketId: string, updates: Partial<Ticket>) {
  await db.collection('tickets').doc(ticketId).update({
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

export async function getTicket(ticketId: string): Promise<Ticket | null> {
  const doc = await db.collection('tickets').doc(ticketId).get();
  return (doc.data() as Ticket) || null;
}

export async function getUserTickets(userId: string, limit = 50) {
  const query = await db
    .collection('tickets')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();

  return query.docs.map(doc => doc.data() as Ticket);
}

export async function getRecentTickets(limit = 20) {
  const query = await db
    .collection('tickets')
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();

  return query.docs.map(doc => doc.data() as Ticket);
}

export async function getTicketsByStatus(status: string, limit = 50) {
  const query = await db
    .collection('tickets')
    .where('status', '==', status)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();

  return query.docs.map(doc => doc.data() as Ticket);
}
