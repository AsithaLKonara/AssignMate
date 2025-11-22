import { NextRequest, NextResponse } from 'next/server';

// Dynamic import for pdf-parse to work with Turbopack
const pdfParse = async () => {
  const pdfModule = await import('pdf-parse');
  return pdfModule;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a PDF file.' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse PDF
    const pdfModule = await pdfParse();
    const pdf = (pdfModule as any).default || pdfModule;
    const data = await pdf(buffer);
    const extractedText = data.text.trim();

    if (!extractedText) {
      return NextResponse.json(
        { error: 'No text could be extracted from the PDF' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      text: extractedText,
      pages: data.numpages,
    });
  } catch (error) {
    console.error('PDF parsing error:', error);
    return NextResponse.json(
      { error: 'Failed to parse PDF. Please ensure the file is a valid PDF.' },
      { status: 500 }
    );
  }
}

