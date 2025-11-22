import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

const rewriteSchema = z.object({
  answer: z.string().min(1, 'Answer is required'),
});

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const body = await request.json();
    const validatedData = rewriteSchema.parse(body);

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Rewrite the following text to be clear, natural, and human-like. Maintain the original meaning and structure, but improve clarity, flow, and readability. Use a conversational yet professional tone.',
        },
        {
          role: 'user',
          content: validatedData.answer,
        },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    const rewrittenAnswer = response.choices[0]?.message?.content;

    if (!rewrittenAnswer) {
      return NextResponse.json(
        { error: 'Failed to rewrite answer' },
        { status: 500 }
      );
    }

    return NextResponse.json({ answer: rewrittenAnswer });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API error: ${error.message}` },
        { status: 500 }
      );
    }

    console.error('Rewrite error:', error);
    return NextResponse.json(
      { error: 'Failed to rewrite answer' },
      { status: 500 }
    );
  }
}

