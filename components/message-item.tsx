"use client";

import { LoaderCircle, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { deleteMessage } from "@/lib/api";
import { formatHungarianDateTime } from "@/lib/date";
import { cn } from "@/lib/utils";
import type { Message } from "@/types/message";

type MessageItemProps = {
  message: Message;
};

export default function MessageItem({ message }: MessageItemProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function removeMessage() {
    const result = await deleteMessage(message.id);

    if (result.error) {
      toast.error(result.error.message);
      return;
    }

    toast.success("Message deleted.");
    router.refresh();
  }

  function handleDelete() {
    startTransition(() => {
      void removeMessage();
    });
  }

  return (
    <article className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
            {formatHungarianDateTime(message.created_at)}
          </p>

          <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-zinc-900 dark:text-zinc-100">
            {message.content}
          </p>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          aria-label="Delete message"
          className={cn(
            "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-zinc-600 dark:focus-visible:ring-offset-zinc-900",
            isPending
              ? "border-zinc-200 bg-zinc-100 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-400"
              : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
          )}
        >
          {isPending ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              <span className="hidden sm:inline">Deleting...</span>
            </>
          ) : (
            <>
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Delete</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
