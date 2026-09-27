import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(null);

  const token = localStorage.getItem("token");


  // ================= FETCH CART =================

  const fetchCart = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        setCart(null);
        return;
      }

      const response = await fetch(
        "http://localhost:3000/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const text = await response.text();
      if (!response.ok) {
        console.error(
          "Failed to fetch cart:",
          text
        );
        return;
      }

      if (!text) {
        setCart({
          items: []
        });
        return;
      }

      const data = JSON.parse(text);

      setCart(data);

    } catch (error) {

      console.error(
        "Error fetching cart:",
        error
      );

    }

  };


  // ================= LOAD CART =================

  useEffect(() => {

    if (token) {
      fetchCart();
    }

  }, [token]);


  // ================= ADD TO CART =================

  const addToCart = async (productId) => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/cart/item",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            productId: Number(productId),
            quantity: 1
          })
        }
      );

      const text = await response.text();

      if (!response.ok) {

        alert(
          "Failed to add product to cart"
        );

        return;
      }

      alert(
        "Product added to cart!"
      );

      // Refresh cart
      await fetchCart();

    } catch (error) {

      console.error(
        "Add to cart error:",
        error
      );

    }

  };


  // ================= INCREASE =================

  const increaseQuantity = async (productId) => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/cart/item",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            productId: Number(productId),
            quantity: 1
          })
        }
      );

      const text =
        await response.text();

      if (!response.ok) {

        console.error(
          "Failed to increase quantity:",
          text
        );

        return;
      }

      await fetchCart();

    } catch (error) {

      console.error(
        "Increase quantity error:",
        error
      );

    }

  };


  // ================= DECREASE =================

  const decreaseQuantity = async (productId) => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/cart/item/decrease",
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            productId: Number(productId)
          })
        }
      );

      const text =
        await response.text();

      if (!response.ok) {

        console.error(
          "Failed to decrease quantity:",
          text
        );

        return;
      }

      await fetchCart();

    } catch (error) {

      console.error(
        "Decrease quantity error:",
        error
      );

    }

  };


  // ================= REMOVE =================

  const removeItem = async (item) => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/cart/${item.productId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        console.error(
          "Failed to remove item:",
          data
        );

        return;
      }

      setCart(data);

    } catch (error) {

      console.error(
        "Remove item error:",
        error
      );

    }

  };


  // ================= CART TOTAL =================

  const getCartTotal = () => {

    if (!cart?.items) {
      return 0;
    }

    return cart.items.reduce(
      (total, item) =>
        total +
        Number(item.product.price) *
        item.quantity,
      0
    );

  };


  return (

    <CartContext.Provider
      value={{
        cart,
        fetchCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        getCartTotal
      }}
    >

      {children}

    </CartContext.Provider>

  );

};


export const useCart = () => {

  return useContext(CartContext);

};