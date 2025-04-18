export const getOrderId = (userName, itemCount) => {
  // Prendre les 4 premiers caractères du userName (sans conversion)
  console.log(userName);
  const firstFourDigits = userName.slice(0, 4);

  // Récupérer la date actuelle au format : YYYYMMDDHHmmss
  const now = new Date();
  const dateString = now
    .toISOString()
    .replace(/[-:T.]/g, "")
    .slice(0, 14); // Format : YYYYMMDDHHmmss

  // Combiner tous les éléments pour créer le numéro de commande
  const orderId = `${firstFourDigits}${itemCount}${dateString}`;

  return orderId;
};
