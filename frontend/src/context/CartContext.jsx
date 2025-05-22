// src/context/CartContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Inicializar desde localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 2. Sincronizar cada cambio con localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 3. Funciones para modificar el carrito
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + product.quantity }
            : i
        );
      }
      return [...prev, product];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.id === productId ? { ...i, quantity } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((i) => i.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // 4. Cálculo de total
  const total = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
