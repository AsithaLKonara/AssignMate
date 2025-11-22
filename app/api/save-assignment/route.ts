import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Assignment from '@/models/Assignment';
import { verifyToken } from '@/lib/jwt';
import { z } from 'zod';

const saveSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
});

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = saveSchema.parse(body);

    await connectDB();

    const assignment = await Assignment.create({
      question: validatedData.question,
      answer: validatedData.answer,
      userId: decoded.userId,
    });

    return NextResponse.json(
      {
        message: 'Assignment saved successfully',
        assignment: {
          id: assignment._id,
          question: assignment.question,
          answer: assignment.answer,
          createdAt: assignment.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Save assignment error:', error);
    return NextResponse.json(
      { error: 'Failed to save assignment' },
      { status: 500 }
    );
  }
}

