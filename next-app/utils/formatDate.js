export default function formatDate(date) {
  const [d, m, y] = date.split("-")
  const monthNum = parseInt(m) - 1
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"][monthNum]
  return month + " " + ordinal(d) + ", " + y
}

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
