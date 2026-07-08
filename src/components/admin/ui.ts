/* Shared class strings for admin forms, so every editor looks identical. */

export const labelCls = "block text-sm font-semibold text-foreground";

export const inputCls =
  "mt-1.5 block w-full rounded-btn border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400";

export const textareaCls = `${inputCls} min-h-28 leading-relaxed`;

export const primaryBtnCls =
  "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-btn bg-gradient-brand px-6 text-sm font-semibold text-white shadow-sm shadow-brand-600/30 transition-all hover:brightness-110 active:scale-[0.97]";

export const secondaryBtnCls =
  "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-btn border border-border bg-card px-5 text-sm font-semibold text-foreground transition-all hover:bg-surface-2 active:scale-[0.97]";

export const dangerBtnCls =
  "inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-btn border border-red-300 bg-red-50 px-3.5 text-xs font-semibold text-red-700 transition-all hover:bg-red-100 active:scale-[0.97] dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-300";

export const cardCls = "rounded-card border border-border bg-card p-6";
