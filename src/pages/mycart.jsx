import React from "react";
import { useCart } from "../context/cartcontext";
import "./mycart.css";

const MyCart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    getCartTotal
  } = useCart();

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="mycart-page">
        <div className="mycart-container">

          <h1>Your Cart</h1>

          <div className="empty">
            🛒
            <p>Your cart is empty.</p>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="mycart-page">

      <div className="mycart-container">

        <h1>Your Cart</h1>

        <div className="cart-container">

          {cart.items.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              {/* PRODUCT */}
              <div className="cart-product">

                <div className="small-image">
                  {item.product.imageUrl ? (
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                    />
                  ) : (
                    "📱"
                  )}
                </div>

                <div>
                  <h2>
                    {item.product.name}
                  </h2>

                  <p>
                    ₹
                    {Number(
                      item.product.price
                    ).toLocaleString()}
                  </p>
                </div>

              </div>


              {/* QUANTITY */}
              <div className="quantity">

                <button
                  onClick={() =>
                    decreaseQuantity(item)
                  }
                >
                  −
                </button>

                <span>
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQuantity(item)
                  }
                >
                  +
                </button>

              </div>


              {/* TOTAL */}
              <p className="item-total">

                ₹
                {(
                  Number(item.product.price) *
                  item.quantity
                ).toLocaleString()}

              </p>


              {/* REMOVE */}
              <button
                className="remove-button"
                onClick={() =>
                  removeItem(item)
                }
              >
                Remove
              </button>

            </div>

          ))}


          {/* SUMMARY */}
          <div className="cart-summary">

            <h2>
              Cart Total
            </h2>

            <h1>
              ₹
              {getCartTotal().toLocaleString()}
            </h1>

            <button
              className="checkout-button"
              onClick={() => {
                window.location.href =
                  "/checkout";
              }}
            >
              Checkout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MyCart;