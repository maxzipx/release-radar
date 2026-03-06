const quarterOrder = {
  Q1: 1,
  Q2: 2,
  Q3: 3,
  Q4: 4,
} as const;

export function parseDateOnly(value: string) {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split('-').map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

export function toDateKey(date: Date) {
  return Number(
    `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
  );
}

export function formatMonthDay(value: string) {
  const date = parseDateOnly(value);

  if (!date) {
    return '';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatMonthLabel(value: string) {
  const date = parseDateOnly(value);

  if (!date) {
    return '';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(date);
}

export function getQuarterRank(quarter: keyof typeof quarterOrder) {
  return quarterOrder[quarter];
}
