'use client';

import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCheck } from 'lucide-react';
import { Message } from './types';

type Props = {
  thread: Message[];
  endRef: React.RefObject<HTMLDivElement | null>;
};

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const daysDiff = (a: Date, b: Date) => {
  const ms = startOfDay(a).getTime() - startOfDay(b).getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
};

const formatDayLabel = (date: Date) => {
  const now = new Date();
  const diff = daysDiff(now, date);

  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff > 1 && diff < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
  }).format(date);
};

const dayKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export default function Messages({ thread, endRef }: Props) {
  return (
    <ScrollArea className="min-h-0 flex-1 p-4">
      <div className="space-y-3 mt-4">
        {thread.map((m, idx) => {
          const created = new Date(m.createdAt);
          const currentKey = Number.isNaN(created.getTime())
            ? null
            : dayKey(created);

          const prev = idx > 0 ? thread[idx - 1] : null;
          const prevCreated = prev ? new Date(prev.createdAt) : null;
          const prevKey =
            prevCreated && !Number.isNaN(prevCreated.getTime())
              ? dayKey(prevCreated)
              : null;

          const showSeparator = currentKey && currentKey !== prevKey;
          const label =
            showSeparator && currentKey ? formatDayLabel(created) : null;

          return (
            <div key={m.id}>
              {label ? (
                <div className="flex justify-center py-1">
                  <span className="rounded-full bg-background px-3 py-1 text-xs text-muted-foreground shadow">
                    {label}
                  </span>
                </div>
              ) : null}
              <div
                className={`flex ${m.fromMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow ${
                    m.fromMe
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-background rounded-bl-sm'
                  }`}
                >
                  {m.image ? (
                    <div className="relative mb-2 h-40 w-64 overflow-hidden rounded-md">
                      <Image
                        src={m.image}
                        alt="attachment"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : null}
                  {m.text ? (
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {m.text}
                    </p>
                  ) : null}
                  <div
                    className={`mt-1 flex items-center gap-1 text-[10px] ${m.fromMe ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}
                  >
                    <span>{m.time}</span>
                    {m.fromMe ? <CheckCheck className="h-3.5 w-3.5" /> : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div ref={endRef} />
    </ScrollArea>
  );
}
