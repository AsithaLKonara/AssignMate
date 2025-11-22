import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

const questionSchema = z.object({
  question: z.string().min(1, 'Question is required').max(10000, 'Question is too long'),
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
    const validatedData = questionSchema.parse(body);

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful academic assistant. Provide clear, comprehensive, and well-structured answers to assignment questions. Use proper formatting and organize your response logically.',
        },
        {
          role: 'user',
          content: validatedData.question,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const answer = response.choices[0]?.message?.content;

    if (!answer) {
      return NextResponse.json(
        { error: 'Failed to generate answer' },
        { status: 500 }
      );
    }

    return NextResponse.json({ answer });
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

    console.error('Answer generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate answer' },
      { status: 500 }
    );
  }
}

