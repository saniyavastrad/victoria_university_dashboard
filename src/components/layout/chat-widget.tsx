"use client";

import { useState } from "react";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {/* Chat box */}
      <div
        className={`w-80 max-w-[90vw] overflow-hidden rounded-2xl border bg-white shadow-xl transition-all duration-200 ease-out ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b bg-slate-50 px-4 py-2">
          <div className="text-sm font-medium text-slate-900">Support</div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 text-xs text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label="Close chat"
          >
            ×
          </button>
        </div>

        <div className="flex max-h-80 flex-col gap-3 overflow-y-auto px-4 py-3 text-sm">
          <div className="self-start rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-2 text-slate-800">
            Hi there! 👋
          </div>
          <div className="self-start rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-2 text-slate-800">
            How may I help you today?
          </div>
          <div className="self-end rounded-2xl rounded-br-sm bg-sky-600 px-3 py-2 text-white">
            This is a demo chat. Messages are not sent anywhere yet.
          </div>
        </div>

        <div className="border-t bg-slate-50 px-3 py-2">
          <div className="flex items-center gap-2 rounded-full border bg-white px-3 py-1.5">
            <input
              type="text"
              placeholder="How may I help you?"
              className="h-7 flex-1 border-none bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400"
              disabled
            />
            <button
              type="button"
              className="rounded-full bg-sky-600 px-3 py-1 text-[11px] font-medium text-white opacity-60"
              disabled
            >
              Send
            </button>
          </div>
          <p className="mt-1 text-[10px] text-slate-400">
            Demo only – chat will be powered by AI later.
          </p>
        </div>
      </div>

      {/* Floating button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <div className="absolute inset-0 scale-110 rounded-full bg-sky-900/25 blur-[2px]" aria-hidden="true" />
        <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#1D4ED8] text-white shadow-lg shadow-sky-900/30">
          <span className="text-lg leading-none">☺</span>
        </div>
      </button>
    </div>
  );
}
