import React from 'react';

type Status = 'New' | 'Contacted' | 'Closed';

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    New: 'bg-blue-100 text-blue-700 border-blue-200',
    Contacted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Closed: 'bg-green-100 text-green-700 border-green-200',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
}
