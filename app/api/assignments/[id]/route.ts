import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Assignment from '@/models/Assignment';
import { verifyToken } from '@/lib/jwt';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    await connectDB();

    const assignment = await Assignment.findOne({
      _id: id,
      userId: decoded.userId,
    }).select('-__v');

    if (!assignment) {
      return NextResponse.json(
        { error: 'Assignment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      assignment: {
        id: assignment._id,
        question: assignment.question,
        answer: assignment.answer,
        createdAt: assignment.createdAt,
        updatedAt: assignment.updatedAt,
      },
    });
  } catch (error) {
    console.error('Get assignment error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assignment' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    await connectDB();

    const assignment = await Assignment.findOneAndDelete({
      _id: id,
      userId: decoded.userId,
    });

    if (!assignment) {
      return NextResponse.json(
        { error: 'Assignment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Assignment deleted successfully',
    });
  } catch (error) {
    console.error('Delete assignment error:', error);
    return NextResponse.json(
      { error: 'Failed to delete assignment' },
      { status: 500 }
    );
  }
}

