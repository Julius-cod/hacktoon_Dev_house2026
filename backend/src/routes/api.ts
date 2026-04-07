import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as feedbackService from '../services/feedback.service';
import * as ticketService from '../services/ticket.service';
import * as aiService from '../services/ai.service';

const router = Router();

// POST /api/feedback - Create new feedback
router.post('/feedback', async (req: Request, res: Response) => {
  try {
    const { userId, text, audioUrl } = req.body;

    if (!userId || !text) {
      return res.status(400).json({ error: 'userId and text are required' });
    }

    const feedback = await feedbackService.createFeedback(userId, text, audioUrl);
    res.status(201).json(feedback);
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ error: 'Failed to create feedback' });
  }
});

// POST /api/feedback/process - Process feedback with AI
router.post('/feedback/process', async (req: Request, res: Response) => {
  try {
    const { feedbackId } = req.body;

    if (!feedbackId) {
      return res.status(400).json({ error: 'feedbackId is required' });
    }

    const feedback = await feedbackService.getFeedback(feedbackId);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    // Classify with AI
    const classification = await aiService.classifyFeedback(feedback.text);
    const priorityScore = await aiService.calculatePriority(
      classification.sentiment,
      classification.type,
      feedback.text
    );

    // Update feedback
    await feedbackService.updateFeedback(feedbackId, {
      type: classification.type,
      sentiment: classification.sentiment,
      priorityScore,
      status: 'processed',
    });

    // Create ticket
    const ticket = await ticketService.createTicket(
      feedbackId,
      feedback.userId,
      classification.title || feedback.text.substring(0, 50),
      classification.description || feedback.text,
      classification.type,
      priorityScore
    );

    // Update feedback with ticket reference
    await feedbackService.updateFeedback(feedbackId, {
      ticketId: ticket.ticketId,
      status: 'ticketCreated',
    });

    res.json({
      feedback,
      classification,
      ticket,
      priorityScore,
    });
  } catch (error) {
    console.error('Error processing feedback:', error);
    res.status(500).json({ error: 'Failed to process feedback' });
  }
});

// GET /api/feedbacks - Get feedbacks for dashboard
router.get('/feedbacks', async (req: Request, res: Response) => {
  try {
    const { userId, limit = 20 } = req.query;

    let feedbacks;
    if (userId) {
      feedbacks = await feedbackService.getUserFeedbacks(userId as string, parseInt(limit as string));
    } else {
      feedbacks = await feedbackService.getRecentFeedbacks(parseInt(limit as string));
    }

    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
});

// GET /api/tickets - Get tickets for dashboard
router.get('/tickets', async (req: Request, res: Response) => {
  try {
    const { userId, status, limit = 20 } = req.query;

    let tickets;
    if (userId) {
      tickets = await ticketService.getUserTickets(userId as string, parseInt(limit as string));
    } else if (status) {
      tickets = await ticketService.getTicketsByStatus(status as string, parseInt(limit as string));
    } else {
      tickets = await ticketService.getRecentTickets(parseInt(limit as string));
    }

    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// GET /api/insights - Get insights/stats
router.get('/insights', async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    let feedbacks;
    if (userId) {
      feedbacks = await feedbackService.getUserFeedbacks(userId as string, 100);
    } else {
      feedbacks = await feedbackService.getRecentFeedbacks(100);
    }

    const insights = {
      totalFeedback: feedbacks.length,
      byType: {
        bug: feedbacks.filter(f => f.type === 'Bug').length,
        feature: feedbacks.filter(f => f.type === 'Feature').length,
        question: feedbacks.filter(f => f.type === 'Question').length,
      },
      bySentiment: {
        positive: feedbacks.filter(f => f.sentiment === 'Positive').length,
        neutral: feedbacks.filter(f => f.sentiment === 'Neutral').length,
        negative: feedbacks.filter(f => f.sentiment === 'Negative').length,
      },
      avgPriority: feedbacks.length > 0 
        ? (feedbacks.reduce((sum, f) => sum + f.priorityScore, 0) / feedbacks.length).toFixed(1)
        : 0,
    };

    res.json(insights);
  } catch (error) {
    console.error('Error fetching insights:', error);
    res.status(500).json({ error: 'Failed to fetch insights' });
  }
});

// PATCH /api/ticket/:ticketId - Update ticket
router.patch('/ticket/:ticketId', async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const updates = req.body;

    await ticketService.updateTicket(ticketId, updates);
    const updated = await ticketService.getTicket(ticketId);

    res.json(updated);
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ error: 'Failed to update ticket' });
  }
});

export default router;
