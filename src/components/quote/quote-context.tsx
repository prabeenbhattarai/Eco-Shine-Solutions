"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { QuoteModal } from "./quote-modal";

type QuoteContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <QuoteContext.Provider value={{ isOpen, open, close }}>
      {children}
      <QuoteModal open={isOpen} onClose={close} />
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within a QuoteProvider");
  return ctx;
}
