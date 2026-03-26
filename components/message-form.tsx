"use client";

import type { FormEvent } from "react";
import { LoaderCircle, SendHorizontal } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createMessage } from "@/lib/api";
import { MAX_MESSAGE_LENGTH } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { validateMessageContent } from "@/lib/validation";

export default function MessageForm() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const normalizedLength = useMemo(
    () => content.replace(/\r\n?/g, "\n").trim().length,
    [content],
  );

  async function submitMessage(validContent: string) {
    const result = await createMessage(validContent);

    if (result.error) {
      setError(result.error.message);
      toast.error(result.error.message);
      return;
    }

    setContent("");
    setError(null);
    toast.success("Message saved.");
    router.refresh();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validatedContent = validateMessageContent(content);

    if (!validatedContent.success) {
      setError(validatedContent.error.issues[0]?.message ?? "Invalid message.");
      return;
    }

    setError(null);

    startTransition(() => {
      void submitMessage(validatedContent.data);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label htmlFor="message-content" className="sr-only">
        Message content
      </label>

      <textarea
        id="message-content"
        name="content"
        rows={5}
        value={content}
        disabled={isPending}
        onChange={event => {
          setContent(event.target.value);
          if (error) {
            setError(null);
          }
        }}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "message-form-error" : "message-form-help"}
        placeholder="Write your message here..."
        className="block w-full resize-y rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-6 text-zinc-900 shadow-sm transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:focus:bg-zinc-900 dark:focus-visible:ring-zinc-600"
      />

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p
            id="message-form-help"
            className="text-sm text-zinc-600 dark:text-zinc-400"
          >
            Plain text only. Leading and trailing whitespace will be trimmed.
          </p>

          {error ? (
            <p
              id="message-form-error"
              role="alert"
              className="text-sm text-rose-600 dark:text-rose-400"
            >
              {error}
            </p>
          ) : null}
        </div>

        <div className="shrink-0 text-right">
          <p
            className={cn(
              "text-xs",
              normalizedLength > MAX_MESSAGE_LENGTH
                ? "text-rose-600 dark:text-rose-400"
                : "text-zinc-500 dark:text-zinc-400",
            )}
          >
            {normalizedLength}/{MAX_MESSAGE_LENGTH}
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            "inline-flex min-w-32 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white transition focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-zinc-600 dark:focus-visible:ring-offset-zinc-900",
            isPending
              ? "bg-zinc-400 dark:bg-zinc-700"
              : "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200",
          )}
        >
          {isPending ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <SendHorizontal className="h-4 w-4" />
              Save message
            </>
          )}
        </button>
      </div>
    </form>
  );
}
