import { NextResponse } from "next/server";

import { createMessageRecord, getMessages } from "@/lib/supabase";
import { validateCreateMessageBody } from "@/lib/validation";
import type { ApiResponse, Message } from "@/types/message";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const messages = await getMessages();

    return NextResponse.json<ApiResponse<Message[]>>({
      data: messages,
      error: null,
    });
  } catch {
    return NextResponse.json<ApiResponse<Message[]>>(
      {
        data: null,
        error: { message: "Unable to load messages." },
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const validatedBody = validateCreateMessageBody(body);

  if (!validatedBody.success) {
    return NextResponse.json<ApiResponse<Message>>(
      {
        data: null,
        error: { message: validatedBody.error },
      },
      { status: 400 },
    );
  }

  try {
    const message = await createMessageRecord(validatedBody.data.content);

    return NextResponse.json<ApiResponse<Message>>(
      {
        data: message,
        error: null,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json<ApiResponse<Message>>(
      {
        data: null,
        error: { message: "Unable to save message. Please try again." },
      },
      { status: 500 },
    );
  }
}
