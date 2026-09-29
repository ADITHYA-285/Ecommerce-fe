import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './checkout.css'
import { API_URL } from "../config/api";


function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  // =========================
  // FETCH CART
  // =========================

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/cart`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to fetch cart:", data);
        return;
      }

      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // PLACE ORDER
  // =========================

  const placeOrder = async () => {
    if (!form.fullName.trim()) {
      alert("Please enter your full name");
      return;
    }

    if (!form.phone.trim()) {
      alert("Please enter your phone number");
      return;
    }

    if (!form.address.trim()) {
      alert("Please enter your address");
      return;
    }

    if (!form.city.trim()) {
      alert("Please enter your city");
      return;
    }

    if (!form.state.trim()) {
      alert("Please enter your state");
      return;
    }

    if (!form.pincode.trim()) {
      alert("Please enter your pincode");
      return;
    }

    if (!cart?.items?.length) {
      alert("Your cart is empty");
      return;
    }

    try {
      setPlacingOrder(true);

      const token = localStorage.getItem("token");

      // Your backend already gets userId
      // from the JWT.
      const response = await fetch(
        `${API_URL}/orders`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Order failed:", data);

        alert(
          data.message ||
            "Failed to place order"
        );

        return;
      }

      alert("Order placed successfully! 🎉");

      // Go to Order History
      navigate("/orders");

    } catch (error) {
      console.error(
        "Checkout error:",
        error
      );

      alert(
        "Something went wrong while placing the order"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="checkout-page">
        <h2>Loading checkout...</h2>
      </div>
    );
  }

  // =========================
  // CART ITEMS
  // =========================

  const items = cart?.items || [];

  const subtotal = items.reduce(
    (total, item) => {
      return (
        total +
        Number(item.product.price) *
          item.quantity
      );
    },
    0
  );

  const deliveryCharge =
    subtotal > 0 ? 0 : 0;

  const total =
    subtotal + deliveryCharge;

  // =========================
  // JSX
  // =========================

  return (
    <div className="checkout-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="checkout-header">

        <button
          onClick={() => navigate("/cart")}
          className="back-button"
        >
          ← Back to Cart
        </button>

        <h1>Checkout</h1>

      </div>


      {items.length === 0 ? (

        // =========================
        // EMPTY CART
        // =========================

        <div className="empty-checkout">

          <h2>
            Your cart is empty
          </h2>

          <button
            onClick={() => navigate("/main")}
          >
            Continue Shopping
          </button>

        </div>

      ) : (

        <div className="checkout-container">

          {/* =========================
              LEFT SIDE
          ========================= */}

          <div className="checkout-left">

            {/* DELIVERY ADDRESS */}

            <div className="checkout-card">

              <h2>
                1. Delivery Address
              </h2>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={handleChange}
                  />

                </div>


                <div className="form-group">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={form.phone}
                    onChange={handleChange}
                  />

                </div>


                <div className="form-group full-width">

                  <label>
                    Address
                  </label>

                  <textarea
                    name="address"
                    placeholder="House number, street, area"
                    value={form.address}
                    onChange={handleChange}
                    rows="3"
                  />

                </div>


                <div className="form-group">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                  />

                </div>


                <div className="form-group">

                  <label>
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={form.state}
                    onChange={handleChange}
                  />

                </div>


                <div className="form-group">

                  <label>
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={form.pincode}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>


            {/* PAYMENT */}

            <div className="checkout-card">

              <h2>
                2. Payment Method
              </h2>

              <div className="payment-options">

                <label className="payment-option">

                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={
                      paymentMethod === "COD"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <span>
                    💵 Cash on Delivery
                  </span>

                </label>


                <label className="payment-option">

                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={
                      paymentMethod === "UPI"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <span>
                    📱 UPI
                  </span>

                </label>


                <label className="payment-option">

                  <input
                    type="radio"
                    name="payment"
                    value="CARD"
                    checked={
                      paymentMethod === "CARD"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <span>
                    💳 Credit / Debit Card
                  </span>

                </label>

              </div>

            </div>

          </div>


          {/* =========================
              RIGHT SIDE
          ========================= */}

          <div className="checkout-right">

            <div className="checkout-card">

              <h2>
                3. Order Summary
              </h2>


              {/* PRODUCTS */}

              <div className="summary-items">

                {items.map((item) => (

                  <div
                    className="summary-item"
                    key={item.id}
                  >

                    <div>

                      <h3>
                        {item.product.name}
                      </h3>

                      <p>
                        Quantity:{" "}
                        {item.quantity}
                      </p>

                    </div>


                    <strong>
                      ₹
                      {(
                        Number(
                          item.product.price
                        ) *
                        item.quantity
                      ).toLocaleString()}
                    </strong>

                  </div>

                ))}

              </div>


              {/* PRICE */}

              <div className="price-summary">

                <div>
                  <span>
                    Subtotal
                  </span>

                  <span>
                    ₹
                    {subtotal.toLocaleString()}
                  </span>
                </div>


                <div>
                  <span>
                    Delivery
                  </span>

                  <span>
                    FREE
                  </span>
                </div>


                <hr />


                <div className="grand-total">

                  <strong>
                    Total
                  </strong>

                  <strong>
                    ₹
                    {total.toLocaleString()}
                  </strong>

                </div>

              </div>


              {/* PAYMENT */}

              <p className="selected-payment">

                Payment:{" "}
                <strong>
                  {paymentMethod === "COD"
                    ? "Cash on Delivery"
                    : paymentMethod === "UPI"
                    ? "UPI"
                    : "Credit / Debit Card"}
                </strong>

              </p>


              {/* PLACE ORDER */}

              <button
                className="place-order-button"
                onClick={placeOrder}
                disabled={placingOrder}
              >

                {placingOrder
                  ? "Placing Order..."
                  : `Place Order • ₹${total.toLocaleString()}`}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Checkout;