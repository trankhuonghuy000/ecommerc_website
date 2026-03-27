import { createContext, useContext, useState } from "react";
export const CardContext = createContext(null);

const CardProvider = ({ children }) => {
  const [cardItems, setCardItems] = useState([{ id: null, quantity: 0 }]);
  const addToCard = (productId) => {
    const existingItem = cardItems.find(
      (item) => item.id === Number(productId),
    );
    if (existingItem) {
      const existingQuantity = existingItem.quantity;
      const updateListItems = cardItems.map((item) => {
        item.id === Number(productId)
          ? { id: Number(productId), quantity: existingQuantity + 1 }
          : item;
      });
      setCardItems(updateListItems);
    } else {
      setCardItems([...cardItems, { id: Number(productId), quantity: 1 }]);
    }
  };
  return (
    <CardContext.Provider value={{ cardItems, addToCard }}>
      {children}
    </CardContext.Provider>
  );
};

export default CardProvider;

export const useCard = () => {
  const context = useContext(CardContext);
  return context;
};
