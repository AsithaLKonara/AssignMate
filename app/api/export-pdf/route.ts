import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import { z } from 'zod';

const exportSchema = z.object({
  text: z.string().min(1, 'Text is required'),
  title: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = exportSchema.parse(body);

    const doc = new PDFDocument({
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    const chunks: Buffer[] = [];

    doc.on('data', (chunk) => {
      chunks.push(chunk);
    });

    // Add title if provided
    if (validatedData.title) {
      doc.fontSize(20).text(validatedData.title, { align: 'center' });
      doc.moveDown();
    }

    // Add content
    doc.fontSize(12).text(validatedData.text, {
      align: 'left',
      lineGap: 5,
    });

    doc.end();

    // Wait for the PDF to be generated
    await new Promise<void>((resolve) => {
      doc.on('end', () => {
        resolve();
      });
    });

    const buffer = Buffer.concat(chunks);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="assignment-${Date.now()}.pdf"`,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }

    console.error('PDF export error:', error);
    return NextResponse.json(
      { error: 'Failed to export PDF' },
      { status: 500 }
    );
  }
}

