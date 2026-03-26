import { MessageSquareText } from "lucide-react";

import ThemeToggle from "@/components/theme-toggle";
import { APP_NAME } from "@/lib/constants";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
          <MessageSquareText className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            {APP_NAME}
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Public short messages, newest first.
          </p>
        </div>
      </div>

      <ThemeToggle />
    </header>
  );
}
