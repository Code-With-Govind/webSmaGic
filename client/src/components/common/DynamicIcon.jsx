import React from 'react';
import {
  Globe,
  ShoppingBag,
  LayoutGrid,
  Layers,
  Palette,
  Cpu,
  Sparkles,
  ShieldCheck,
  Target,
  Smartphone,
  Code,
  MessageSquare,
  HelpCircle,
  FileCheck,
  Zap,
} from 'lucide-react';

const iconMap = {
  Globe,
  ShoppingBag,
  LayoutGrid,
  Layers,
  Palette,
  Cpu,
  Sparkles,
  ShieldCheck,
  Target,
  Smartphone,
  Code,
  MessageSquare,
  HelpCircle,
  FileCheck,
  Zap,
};

export default function DynamicIcon({ name, className = 'w-5 h-5', ...props }) {
  const IconComponent = iconMap[name] || Code;
  return <IconComponent className={className} {...props} />;
}
