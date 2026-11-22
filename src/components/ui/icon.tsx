import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function DynamicIcon({
  name,
  color = "currentColor",
  className = "",
}: {
  name: string;
  color?: string;
  className?: string;
}) {
  const Icon = Icons[name as keyof typeof Icons] as LucideIcon;

  if (!Icon) {
    const DefaultIcon = Icons["HelpCircle"];
    return <DefaultIcon color={color} />;
  }

  return <Icon color={color} className={className} />;
}