import { OpenAI } from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function classifyFeedback(text: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a feedback classifier. Analyze the feedback and classify it as one of: Bug, Feature, Question. Also detect sentiment: Positive, Neutral, Negative. Return JSON format: {type: "Bug"|"Feature"|"Question", sentiment: "Positive"|"Neutral"|"Negative", title: "brief title", description: "one line description"}',
      },
      {
        role: 'user',
        content: text,
      },
    ],
    temperature: 0.7,
  });

  try {
    const content = response.choices[0].message.content || '{}';
    return JSON.parse(content);
  } catch {
    return {
      type: 'Question',
      sentiment: 'Neutral',
      title: text.substring(0, 50),
      description: text.substring(0, 100),
    };
  }
}

export async function calculatePriority(
  sentiment: string,
  type: string,
  text: string
): Promise<number> {
  let score = 50;

  if (sentiment === 'Negative') score += 30;
  if (type === 'Bug') score += 20;
  if (text.length > 100) score += 10;

  return Math.min(100, score);
}
