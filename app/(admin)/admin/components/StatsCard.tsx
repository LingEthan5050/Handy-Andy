import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
}

export default function StatsCard({ title, value, description, icon: Icon }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-stone-500">{title}</p>
          <h3 className="text-2xl font-bold text-stone-900 mt-1">{value}</h3>
        </div>
        <div className="p-2 bg-stone-50 rounded-lg border border-stone-100">
          <Icon className="h-5 w-5 text-stone-600" />
        </div>
      </div>
      <p className="text-xs text-stone-400 mt-4">{description}</p>
    </div>
  );
}
