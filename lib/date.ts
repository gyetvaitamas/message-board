const hungarianDateTimeFormatter = new Intl.DateTimeFormat("hu-HU", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Budapest",
});

export function formatHungarianDateTime(value: string) {
  return hungarianDateTimeFormatter.format(new Date(value));
}
