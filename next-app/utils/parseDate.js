export default function parseDate(eventDate) {
  const [d, m, y] = eventDate.split("-")
  const monthNum = parseInt(m) - 1
  return new Date(y, monthNum, d)
}
