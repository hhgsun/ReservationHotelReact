import dayjs from "dayjs";

export function dateExpirationAt(date) {
  const d1 = dayjs(date)
  const d2 = dayjs(Date.now())
  const diff = d1.diff(d2, "day", false);
  return diff;
}

export function dateDiff(date1, date2) {
  const d1 = dayjs(date1)
  const d2 = dayjs(date2)
  const diff = d1.diff(d2, "day", false);
  return diff;
}

export function dateFormat(date) {
  const d = dayjs(date).format('DD.MM.YYYY');
  return d;
}

export function dateAddDay(date) {
  const d = dayjs(date).add(1, 'day').format('YYYY-MM-DD');
  return d;
}