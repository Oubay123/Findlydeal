import {
  Armchair,
  Baby,
  Gamepad2,
  Hammer,
  Bike,
  Dumbbell,
  Package,
  Recycle,
  RefreshCcw,
  Scissors,
  Shirt,
  Smartphone,
  WashingMachine,
  Watch,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Resolves the `icon` name declared in `@/config/categories`.
 *
 * Icons are mapped explicitly rather than looked up dynamically so bundlers
 * only ship the ones actually used. Add an entry when adding a category.
 */
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Gamepad2,
  Baby,
  Hammer,
  Smartphone,
  WashingMachine,
  Armchair,
  Watch,
  RefreshCcw,
  Shirt,
  Recycle,
  Bike,
  Dumbbell,
  Scissors,
  Zap,
};

interface CategoryIconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
}

export function CategoryIcon({ name, className, strokeWidth }: CategoryIconProps) {
  const Icon = CATEGORY_ICONS[name] ?? Package;
  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden />;
}
