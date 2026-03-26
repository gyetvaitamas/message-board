import EmptyState from "@/components/empty-state";
import MessageItem from "@/components/message-item";
import type { Message } from "@/types/message";

type MessageListProps = {
  messages: Message[];
};

export default function MessageList({ messages }: MessageListProps) {
  return (
    <section aria-labelledby="messages-heading">
      <div className="mb-4">
        <h2
          id="messages-heading"
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
        >
          Messages
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Latest posts appear at the top.
        </p>
      </div>

      {messages.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {messages.map(message => (
            <MessageItem key={message.id} message={message} />
          ))}
        </div>
      )}
    </section>
  );
}
