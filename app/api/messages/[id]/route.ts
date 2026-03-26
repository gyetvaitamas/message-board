import { NextResponse } from "next/server";

import { deleteMessageRecord } from "@/lib/supabase";
import { validateMessageId } from "@/lib/validation";
import type { ApiResponse } from "@/types/message";

type DeleteMessageData = {
  id: string;
};

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const validatedId = validateMessageId(id);

  if (!validatedId.success) {
    return NextResponse.json<ApiResponse<DeleteMessageData>>(
      {
        data: null,
        error: { message: validatedId.error },
      },
      { status: 400 },
    );
  }

  try {
    const deleted = await deleteMessageRecord(validatedId.data);

    if (!deleted) {
      return NextResponse.json<ApiResponse<DeleteMessageData>>(
        {
          data: null,
          error: { message: "Message not found." },
        },
        { status: 404 },
      );
    }

    return NextResponse.json<ApiResponse<DeleteMessageData>>({
      data: { id: validatedId.data },
      error: null,
    });
  } catch {
    return NextResponse.json<ApiResponse<DeleteMessageData>>(
      {
        data: null,
        error: { message: "Unable to delete message. Please try again." },
      },
      { status: 500 },
    );
  }
}
