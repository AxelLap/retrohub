export const formatPrice = (rawPrice) => {
  const formatedPrice = (rawPrice / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });
  return formatedPrice;
};
