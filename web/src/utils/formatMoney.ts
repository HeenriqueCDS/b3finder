const isBillion = (value: number): boolean => {
  return value >= 1e9;
};

const formatBillion = (value: number): string => {
  return (
    "R$ " +
    (value / 1e9).toLocaleString(undefined, { maximumFractionDigits: 1 }) +
    " bi"
  );
};

const isMillion = (value: number) => {
  return value >= 1e6;
};

const formatMillion = (value: number): string => {
  return (
    "R$ " +
    (value / 1e6).toLocaleString(undefined, { maximumFractionDigits: 1 }) +
    " mi"
  );
};

export const formatMoney = (value: number): string => {
  if (isBillion(value)) return formatBillion(value);
  if (isMillion(value)) return formatMillion(value);
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    maximumFractionDigits: 2,
    compactDisplay: "short",
    currency: "BRL",
  }).format(value);
};
