/* Server-side field validation for admin actions. Each validator returns an
   error string or null; validateAll collects the first failure so actions can
   redirect back with a readable message. */

export function required(value: string, label: string): string | null {
  return value.trim() ? null : `${label} is required`;
}

export function maxLen(value: string, max: number, label: string): string | null {
  return value.length <= max ? null : `${label} must be ${max} characters or fewer`;
}

export function isEmail(value: string, label: string): string | null {
  if (!value.trim()) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? null : `${label} must be a valid email address`;
}

export function isUrl(value: string, label: string): string | null {
  if (!value.trim() || value === "#") return null;
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:"
      ? null
      : `${label} must start with http:// or https://`;
  } catch {
    return `${label} must be a valid URL (including https://)`;
  }
}

export function isAuPhone(value: string, label: string): string | null {
  if (!value.trim()) return null;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 12
    ? null
    : `${label} must be a valid phone number`;
}

export function isIsoDate(value: string, label: string): string | null {
  if (!value.trim()) return null;
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value))
    ? null
    : `${label} must be a valid date`;
}

export function isRating(value: string, label: string): string | null {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= 5 ? null : `${label} must be between 1 and 5`;
}

/** Returns the first error among the checks, or null if everything passes. */
export function validateAll(...checks: (string | null)[]): string | null {
  return checks.find((c) => c !== null) ?? null;
}
