export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const currencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const numberFormat = new Intl.NumberFormat("en-US");
const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export const formatCurrency = (value: number) => currencyFormat.format(value);
export const formatNumber = (value: number) => numberFormat.format(value);
export const formatDate = (value: string) => dateFormat.format(new Date(value));

export const pluralize = (count: number, singular: string, plural = `${singular}s`) =>
  `${count} ${count === 1 ? singular : plural}`;

export const daysBetween = (start: string, end: string) =>
  Math.round((Date.parse(end) - Date.parse(start)) / 86_400_000);

export const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export function seededRandom(seed: string) {
  let state = [...seed].reduce((hash, char) => (Math.imul(31, hash) + char.charCodeAt(0)) | 0, 7);

  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}
