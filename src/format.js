// French number and duration formatting, without relying on Intl (Hermes support varies).

const NNBSP = " "; // narrow no-break space: French thousands separator
const NBSP = " ";

export const groupDigits = (digits) => digits.replace(/\B(?=(\d{3})+(?!\d))/g, NNBSP);

export const formatNumber = (n) => groupDigits(String(Math.round(n)));

export const formatMoney = (n, symbol) => `${formatNumber(n)}${NBSP}${symbol}`;

// Short form for very large sums so the card never truncates: "1,2 Md €", "45,6 M €".
const short = (n) => n.toFixed(1).replace(".", ",").replace(/,0$/, "");
export const formatMoneyCompact = (n, symbol) => {
  if (n >= 1e9) return `${short(n / 1e9)}${NBSP}Md${NBSP}${symbol}`;
  if (n >= 1e7) return `${short(n / 1e6)}${NBSP}M${NBSP}${symbol}`;
  return formatMoney(n, symbol);
};

// Keeps what the user typed as digits plus an optional comma and two decimals.
export const sanitizeAmount = (text) => {
  const cleaned = text.replace(/\./g, ",").replace(/[^\d,]/g, "");
  const [int = "", ...rest] = cleaned.split(",");
  const intPart = int.replace(/^0+(?=\d)/, "").slice(0, 9);
  if (rest.length === 0) return intPart;
  return `${intPart || "0"},${rest.join("").slice(0, 2)}`;
};

export const displayAmount = (raw) => {
  if (!raw) return "";
  const [int, dec] = raw.split(",");
  return dec === undefined ? groupDigits(int) : `${groupDigits(int)},${dec}`;
};

export const parseAmount = (raw) => {
  if (!raw) return 0;
  const n = parseFloat(raw.replace(",", "."));
  return Number.isFinite(n) ? n : 0;
};

const plural = (n, one, many) => (n > 1 ? many : one);

// Time needed to earn `target` at `annual` per year.
export const formatDuration = (target, annual) => {
  if (annual <= 0) return "Jamais";
  if (annual >= target) return "Déjà atteint";
  const years = target / annual;
  if (years >= 1e6) {
    const millions = (years / 1e6).toFixed(1).replace(".", ",").replace(",0", "");
    return `${millions}${NBSP}million${years >= 2e6 ? "s" : ""} d'années`;
  }
  const totalMonths = Math.ceil(years * 12);
  if (totalMonths < 12) return `${totalMonths}${NBSP}mois`;
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  if (y >= 100 || m === 0) return `${formatNumber(y)}${NBSP}${plural(y, "an", "ans")}`;
  return `${y}${NBSP}${plural(y, "an", "ans")} ${m}${NBSP}mois`;
};
