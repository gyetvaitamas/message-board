import { z } from "zod";

import { MAX_MESSAGE_LENGTH } from "@/lib/constants";

export const messageIdSchema = z.string().uuid("Invalid message id.");

export const messageContentSchema = z
  .string()
  .min(1, "Message cannot be empty.")
  .max(
    MAX_MESSAGE_LENGTH,
    `Message must be ${MAX_MESSAGE_LENGTH} characters or less.`,
  );

export const createMessageBodySchema = z.object({
  content: z.string(),
});

export function normalizeMessageContent(value: string) {
  return value.replace(/\r\n?/g, "\n").trim();
}

export function validateMessageContent(value: string) {
  return messageContentSchema.safeParse(normalizeMessageContent(value));
}

export function validateCreateMessageBody(input: unknown) {
  const parsedBody = createMessageBodySchema.safeParse(input);

  if (!parsedBody.success) {
    return {
      success: false as const,
      error: "Invalid request body.",
    };
  }

  const parsedContent = validateMessageContent(parsedBody.data.content);

  if (!parsedContent.success) {
    return {
      success: false as const,
      error: parsedContent.error.issues[0]?.message ?? "Invalid message.",
    };
  }

  return {
    success: true as const,
    data: {
      content: parsedContent.data,
    },
  };
}

export function validateMessageId(value: string) {
  const parsedId = messageIdSchema.safeParse(value);

  if (!parsedId.success) {
    return {
      success: false as const,
      error: parsedId.error.issues[0]?.message ?? "Invalid message id.",
    };
  }

  return {
    success: true as const,
    data: parsedId.data,
  };
}
