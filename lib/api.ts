import { API_MESSAGES_ENDPOINT } from "@/lib/constants";
import type { ApiResponse, Message } from "@/types/message";

type DeleteMessageResponse = {
  id: string;
};

async function parseApiResponse<T>(
  response: Response,
): Promise<ApiResponse<T>> {
  const payload = (await response
    .json()
    .catch(() => null)) as ApiResponse<T> | null;

  if (!payload) {
    return {
      data: null,
      error: {
        message: response.ok
          ? "Unexpected response from server."
          : "Request failed.",
      },
    };
  }

  if (!response.ok) {
    return {
      data: null,
      error: {
        message: payload.error?.message ?? "Request failed.",
      },
    };
  }

  return payload;
}

export async function createMessage(
  content: string,
): Promise<ApiResponse<Message>> {
  try {
    const response = await fetch(API_MESSAGES_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    return parseApiResponse<Message>(response);
  } catch {
    return {
      data: null,
      error: {
        message: "Unable to save message. Please try again.",
      },
    };
  }
}

export async function deleteMessage(
  id: string,
): Promise<ApiResponse<DeleteMessageResponse>> {
  try {
    const response = await fetch(`${API_MESSAGES_ENDPOINT}/${id}`, {
      method: "DELETE",
    });

    return parseApiResponse<DeleteMessageResponse>(response);
  } catch {
    return {
      data: null,
      error: {
        message: "Unable to delete message. Please try again.",
      },
    };
  }
}
