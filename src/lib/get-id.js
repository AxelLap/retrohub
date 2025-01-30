export const getId = (itemName) => {
  const date = Date.now();
  const itemId = `${date}_${itemName}`;
  return itemId;
};
