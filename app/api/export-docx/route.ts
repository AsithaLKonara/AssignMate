import { NextRequest, NextResponse } from 'next/server';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { z } from 'zod';

const exportSchema = z.object({
  text: z.string().min(1, 'Text is required'),
  title: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = exportSchema.parse(body);

    // Split text into paragraphs
    const paragraphs = validatedData.text
      .split('\n\n')
      .filter((p) => p.trim())
      .map((text) => new Paragraph({
        children: [new TextRun(text.trim())],
        spacing: { after: 200 },
      }));

    const children: Paragraph[] = [];

    // Add title if provided
    if (validatedData.title) {
      children.push(
        new Paragraph({
          children: [new TextRun({
            text: validatedData.title,
            bold: true,
            size: 28,
          })],
          alignment: 'center',
          spacing: { after: 400 },
        })
      );
    }

    children.push(...paragraphs);

    const doc = new Document({
      sections: [
        {
          children,
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="assignment-${Date.now()}.docx"`,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('DOCX export error:', error);
    return NextResponse.json(
      { error: 'Failed to export DOCX' },
      { status: 500 }
    );
  }
}

