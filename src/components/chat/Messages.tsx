"use client";

import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCheck } from "lucide-react";
import { Message } from "./types";

type Props = {
  thread: Message[];
  endRef: React.RefObject<HTMLDivElement | null>;
};

export default function Messages({ thread, endRef }: Props) {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="sticky top-0 z-10 flex justify-center">
        <span className="rounded-full bg-background px-3 py-1 text-xs text-muted-foreground shadow">Today</span>
      </div>
      <div className="space-y-3 mt-4">
        {thread.map((m) => (
          <div key={m.id} className={`flex ${m.fromMe ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow ${
                m.fromMe ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-background rounded-bl-sm"
              }`}
            >
              {m.image ? (
                <div className="relative mb-2 h-40 w-64 overflow-hidden rounded-md">
                  <Image src={m.image} alt="attachment" fill className="object-cover" unoptimized />
                </div>
              ) : null}
              {m.text ? <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p> : null}
              <div className={`mt-1 flex items-center gap-1 text-[10px] ${m.fromMe ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                <span>{m.time}</span>
                {m.fromMe ? <CheckCheck className="h-3.5 w-3.5" /> : null}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div ref={endRef} />
    </ScrollArea>
  );
}
