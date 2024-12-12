export default function formatDate(date) {
  const [d, m, y] = date.split("-");
  const day = parseInt(d, 10);
  const monthNum = parseInt(m) - 1;
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][monthNum];
  return month + " " + ordinal(day) + ", " + y;
}

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
