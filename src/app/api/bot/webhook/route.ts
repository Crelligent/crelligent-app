import { NextResponse } from 'next/server';

function simulateLLMParsing(message: string) {
  const lowerMsg = message.toLowerCase();
  
  const quantityMatch = lowerMsg.match(/(\d+)\s*(bags?|cartons?|pieces?|pcs?|kg)/i);
  const amountMatch = lowerMsg.match(/(?:for\s*)?(?:₦|n)?(\d+[k,m]?)/i);
  
  const isSale = lowerMsg.includes('sold') || lowerMsg.includes('gave') || lowerMsg.includes('paid');
  const isPurchase = lowerMsg.includes('bought') || lowerMsg.includes('restocked');

  if (isSale) {
    return {
      intent: 'log_sale',
      item: 'general_goods',
      quantity: quantityMatch ? parseInt(quantityMatch[1]) : 1,
      unit: quantityMatch ? quantityMatch[2] : 'units',
      revenue: amountMatch ? amountMatch[1] : 'unknown',
      reply: `Recorded. You sold ${quantityMatch ? quantityMatch[0] : 'some items'} for ₦${amountMatch ? amountMatch[1] : 'an unknown amount'}. I have updated your daily ledger.`
    };
  } else if (isPurchase) {
    return {
      intent: 'log_restock',
      item: 'general_goods',
      quantity: quantityMatch ? parseInt(quantityMatch[1]) : 1,
      unit: quantityMatch ? quantityMatch[2] : 'units',
      cost: amountMatch ? amountMatch[1] : 'unknown',
      reply: `Got it. Restocked ${quantityMatch ? quantityMatch[0] : 'some items'}. Your inventory has been updated.`
    };
  }

  return {
    intent: 'unknown',
    reply: `I didn't quite catch that. Could you tell me what you sold or bought today? (e.g. "I sold 5 bags of rice for 40k")`
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, userId } = body;

    const parsedData = simulateLLMParsing(message);
    console.log(`[ESRE Bot] Saving to ledger for user ${userId}:`, parsedData);

    return NextResponse.json({
      success: true,
      reply: parsedData.reply,
      extractedData: parsedData
    });

  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
