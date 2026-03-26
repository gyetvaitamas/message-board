import { Inbox } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
        <Inbox className="h-6 w-6" />
      </div>

      <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-100">
        No messages yet
      </h3>

      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Be the first visitor to post something to the board.
      </p>
    </div>
  );
}
