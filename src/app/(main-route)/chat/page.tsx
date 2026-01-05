"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Sidebar from "@/components/chat/Sidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import Messages from "@/components/chat/Messages";
import Composer from "@/components/chat/Composer";
import AdSummary from "@/components/chat/AdSummary";
import type { Conversation, Message as Msg, AdSummary as Ad } from "@/components/chat/types";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockConversations: Conversation[] = [
  {
    id: "c1",
    name: "Rahim Electronics",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    lastMessage: "Ok, final price naki?",
    lastTime: "10:21",
    unread: 2,
  },
  {
    id: "c2",
    name: "Jannat Realty",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    lastMessage: "Kal dekhte ashben?",
    lastTime: "09:12",
  },
  {
    id: "c3",
    name: "Bike Hub BD",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    lastMessage: "Registration ache",
    lastTime: "Yesterday",
  },
];

const mockThread: Msg[] = [
  { id: "m1", fromMe: false, text: "Assalamu Alaikum, available?", time: "10:05" },
  {
    id: "m2",
    fromMe: true,
    text: "Walikum Salam, yes available. Cash on delivery possible.",
    time: "10:06",
  },
  {
    id: "m3",
    fromMe: false,
    text: "Final price koto diben?",
    time: "10:10",
  },
  {
    id: "m4",
    fromMe: true,
    text: "Price slightly negotiable. Apni koto bolchen?",
    time: "10:15",
  },
  {
    id: "m5",
    fromMe: false,
    image: "https://images.pexels.com/photos/6078123/pexels-photo-6078123.jpeg",
    time: "10:20",
  },
  { id: "m6", fromMe: false, text: "Etai to?", time: "10:20" },
  { id: "m7", fromMe: true, text: "Yes, exact model.", time: "10:21" },
];

const adSummary: Ad = {
  title: "Refurbished iPhone 13 (128GB)",
  price: "৳ 58,500",
  image: "https://images.pexels.com/photos/6078123/pexels-photo-6078123.jpeg",
  location: "Dhaka, Bangladesh",
  posted: "2 hours ago",
  link: "/ads/electronics/iphone-13",
};

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string>(mockConversations[0].id);
  const [input, setInput] = useState("");
  const [thread, setThread] = useState<Msg[]>(mockThread);
  const endRef = useRef<HTMLDivElement | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!query) return mockConversations;
    return mockConversations.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setThread((t) => [
      ...t,
      { id: Math.random().toString(36).slice(2), fromMe: true, text, time: "now" },
    ]);
    setInput("");
  };

  const pickImage = () => {
    fileInputRef.current?.click();
  };

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      // For simplicity only preview images for now
      setPreviewUrl(null);
      setDialogOpen(true);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setDialogOpen(true);
  };

  const confirmSendImage = () => {
    if (previewUrl) {
      setThread((t) => [
        ...t,
        { id: Math.random().toString(36).slice(2), fromMe: true, image: previewUrl, time: "now" },
      ]);
    }
    setDialogOpen(false);
    // Do not revoke immediately to keep showing in thread; in real app upload & store URL
  };

  const active = useMemo(() => mockConversations.find((c) => c.id === activeId)!, [activeId]);

  return (
    <>
      <div className="screen-height bg-muted/30">
        <div className="mx-auto px-4 py-6">
          <div className="grid gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)_360px]">
            {/* Sidebar (desktop) */}
            <Sidebar
              className="hidden lg:block rounded-xl border bg-card"
              conversations={filtered}
              activeId={activeId}
              onSelect={(id) => setActiveId(id)}
              query={query}
              setQuery={setQuery}
            />

            {/* Mobile Sheet trigger */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden inline-flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" /> Chats
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[90vw] sm:w-96">
                <SheetHeader className="p-4">
                  <SheetTitle>Chats</SheetTitle>
                </SheetHeader>
                <Sidebar
                  className="rounded-none"
                  conversations={filtered}
                  activeId={activeId}
                  onSelect={(id) => {
                    setActiveId(id);
                    setSheetOpen(false);
                  }}
                  query={query}
                  setQuery={setQuery}
                />
              </SheetContent>
            </Sheet>

            {/* Thread */}
            <ScrollArea className="rounded-xl border bg-card flex flex-col h-[calc(100vh-200px)]">
              <ChatHeader name={active.name} avatar={active.avatar} />
              <Separator />

              <Messages thread={thread} endRef={endRef} />
              <Composer
                input={input}
                setInput={setInput}
                onSend={send}
                onPickImage={pickImage}
                fileInput={fileInputRef}
                onFileChange={onFileChange}
              />
            </ScrollArea>

            {/* Ad summary */}
            <AdSummary ad={adSummary} />
          </div>
        </div>
      </div>

      {/* Attachment preview dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send attachment</DialogTitle>
          </DialogHeader>
          {previewUrl ? (
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-md">
              <Image src={previewUrl as string} alt="preview" fill className="object-cover" unoptimized />
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Preview not available. Send this file?</div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={confirmSendImage}>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}