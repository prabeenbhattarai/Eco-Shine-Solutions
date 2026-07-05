"use client";

import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { useQuote } from "./quote-context";

/**
 * Button that opens the global quote modal. Mirrors the <Button> API
 * (variant/size/className) and accepts an extra onClick that runs first
 * (e.g. to close a mobile menu before the popup opens).
 */
export function QuoteButton({
  onClick,
  children,
  ...props
}: ComponentProps<typeof Button>) {
  const { open } = useQuote();
  return (
    <Button
      {...props}
      onClick={(e) => {
        onClick?.(e);
        open();
      }}
    >
      {children}
    </Button>
  );
}
