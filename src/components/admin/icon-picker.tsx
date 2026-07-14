"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { iconRegistry, iconOptions, DEFAULT_ICON_KEY } from "@/lib/icons";

/** Compact icon picker: a button showing the current icon + name that opens a
    mega-menu style panel of labelled icons. Writes the chosen key into a hidden
    input so it posts with the surrounding form. */
export function IconPicker({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string;
}) {
  const initial =
    defaultValue && defaultValue in iconRegistry ? defaultValue : DEFAULT_ICON_KEY;
  const [selected, setSelected] = useState(initial);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const Selected = iconRegistry[selected];

  return (
    <div className="relative max-w-xs" ref={ref}>
      <input type="hidden" name={name} value={selected} />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 rounded-btn border border-border bg-card px-3 py-2.5 text-sm text-foreground transition-colors hover:border-brand-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
      >
        <span className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-600/15 dark:text-brand-300">
            <Selected className="h-5 w-5" />
          </span>
          <span className="font-semibold">{selected}</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-full z-30 mt-2 w-[min(28rem,calc(100vw-3rem))] rounded-card border border-border bg-card p-2 shadow-lg shadow-black/10"
        >
          <div className="grid max-h-72 grid-cols-2 gap-1 overflow-y-auto sm:grid-cols-3">
            {iconOptions.map((key) => {
              const Icon = iconRegistry[key];
              const active = key === selected;
              return (
                <button
                  key={key}
                  type="button"
                  role="option"
                  aria-selected={active}
                  title={key}
                  onClick={() => {
                    setSelected(key);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2.5 rounded-btn px-2.5 py-2 text-left text-xs font-medium transition-colors ${
                    active
                      ? "bg-brand-600 text-white"
                      : "text-foreground hover:bg-surface-2"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="truncate">{key}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
