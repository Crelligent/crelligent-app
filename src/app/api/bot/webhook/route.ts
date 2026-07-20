import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';

const botResponseSchema = z.object({
  reply: z.string().describe("The conversational, empathetic, WhatsApp-style reply to the user"),
  extractedData: z.object({
    intent: z.enum(['log_sale', 'log_restock', 'unknown']).describe("The core intent of the user's message"),
    item: z.string().describe("The item being sold or bought (e.g. 'cement', 'rice', 'general_goods')"),
    quantity: z.number().describe("The numerical quantity"),
    unit: z.string().describe("The unit (e.g. bags, pieces, kg)"),
    revenue_or_cost: z.string().describe("The monetary value (e.g. '40000', 'unknown')")
  })
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, userId } = body;

    const { object } = await generateObject({
      model: anthropic('claude-3-5-sonnet-20240620'),
      schema: botResponseSchema,
      system: `You are the ESRE Vitals Bot, an intelligent copilot for informal economy micro-businesses in Africa. 
      Your goal is to converse with traders, logging their daily sales, restocks, and expenses via natural language.
      Keep your 'reply' extremely short, supportive, and WhatsApp-friendly (use emojis). 
      If a user mentions a sale or restock, extract the exact quantities and amounts into 'extractedData', and confidently confirm in your reply that you have updated their ledger.
      If they ask for business advice, provide brief, actionable ESRE methodology tips.`,
      prompt: message
    });

    console.log(`[ESRE Bot] Saving to ledger for user ${userId}:`, object.extractedData);

    return NextResponse.json({
      success: true,
      reply: object.reply,
      extractedData: object.extractedData
    });

  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
