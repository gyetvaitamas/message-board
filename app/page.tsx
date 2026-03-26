import Header from "@/components/header";
import MessageForm from "@/components/message-form";
import MessageList from "@/components/message-list";
import { getMessages } from "@/lib/supabase";
import type { Message } from "@/types/message";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let messages: Message[] = [];
  let loadError: string | null = null;

  try {
    messages = await getMessages();
  } catch {
    loadError = "Unable to load messages right now. Please refresh the page.";
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-6 sm:px-6 lg:py-10">
      <Header />

      <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Share a message
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Post a short public message. Newest messages appear first.
          </p>
        </div>

        <div className="mt-5">
          <MessageForm />
        </div>
      </section>

      {loadError ? (
        <p
          role="alert"
          className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300"
        >
          {loadError}
        </p>
      ) : null}

      <div className="mt-6">
        <MessageList messages={messages} />
      </div>
    </main>
  );
}
