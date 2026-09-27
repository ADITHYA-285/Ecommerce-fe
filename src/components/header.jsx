import React from "react";
import { Link } from "react-router-dom";

const Header = ({ cart, token, logout }) => {
  return (
    <header className="header">

      <div className="logo">
        🛍️ MyStore
      </div>

      <nav>

        <Link to="/main">
          Products
        </Link>

        <Link to="/cart">
          Cart 🛒
          {cart?.items?.length > 0 && (
            <span className="cart-count">
              {cart.items.length}
            </span>
          )}
        </Link>

        <Link to="/orders">
          My Orders
        </Link>

        {token ? (
          <button
            className="logout-button"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}

      </nav>

    </header>
  );
};

export default Header;