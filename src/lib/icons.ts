import {
  Building2,
  LayoutGrid,
  Factory,
  HeartPulse,
  GraduationCap,
  UtensilsCrossed,
  ShoppingBag,
  PartyPopper,
  Home,
  Dumbbell,
  Trees,
  Droplets,
  Wrench,
  HardHat,
  SprayCan,
  ShieldCheck,
  Trash2,
  Waves,
  Truck,
  Server,
  Mountain,
  Landmark,
  Leaf,
  BadgeCheck,
  ThumbsUp,
  Award,
  Sparkles,
  MapPin,
  Briefcase,
  Building,
  type LucideIcon,
} from "lucide-react";

/* Central icon registry for admin-managed services and sectors.

   Services and sectors are data-driven, so their icons are stored as string
   keys (e.g. "Building2") rather than as React components. This registry maps
   those keys back to Lucide components at render time and powers the icon
   picker in the admin panel. Every key here is a Lucide icon already known to
   exist in the installed version. */

export const iconRegistry: Record<string, LucideIcon> = {
  Building2,
  Building,
  LayoutGrid,
  Factory,
  HeartPulse,
  GraduationCap,
  UtensilsCrossed,
  ShoppingBag,
  PartyPopper,
  Home,
  Dumbbell,
  Trees,
  Droplets,
  Wrench,
  HardHat,
  SprayCan,
  ShieldCheck,
  Trash2,
  Waves,
  Truck,
  Server,
  Mountain,
  Landmark,
  Leaf,
  BadgeCheck,
  ThumbsUp,
  Award,
  Sparkles,
  MapPin,
  Briefcase,
};

/** Fallback used when an item has no icon or an unrecognised key. */
export const DEFAULT_ICON_KEY = "SprayCan";

/** Icon keys offered in the admin picker, in a stable display order. */
export const iconOptions = Object.keys(iconRegistry);

/** Resolve a stored icon key to a Lucide component, always returning something. */
export function resolveIcon(key?: string): LucideIcon {
  return iconRegistry[key ?? ""] ?? iconRegistry[DEFAULT_ICON_KEY];
}
