import { getAnswer, GetAnswerParams } from "@/lib/action";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, pdfId, requestId } = body as GetAnswerParams;

    if (!question || !pdfId) {
      return NextResponse.json(
        { success: false, error: 'Missing question or pdfId' },
        { status: 400 }
      );
    }

    const response = await getAnswer({ question, pdfId, requestId });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}