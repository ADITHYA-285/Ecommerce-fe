import React, { useEffect, useState } from "react";
import { useCart } from "./context/cartcontext";
import "./App.css";
import { API_URL } from "./config/api";

const App = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    cart,
    addToCart
  } = useCart();


  // ================= GET PRODUCTS =================

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await fetch(
          `${API_URL}/products`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);

      } catch (error) {

        console.error(
          "Error fetching products:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);


  // ================= ADD TO CART =================

  const handleAddToCart = (product) => {

    addToCart(product);

  };


  return (

    <div className="app">

      {/* ================= PRODUCTS ================= */}

      <section className="section products-section">

        <h1>
          Products
        </h1>


        {/* ================= LOADING ================= */}

        {loading ? (

          <div className="empty">

            Loading products...

          </div>

        ) : products.length === 0 ? (

          <div className="empty">

            No products available.

          </div>

        ) : (

          <div className="product-grid">

            {products.map((product) => (

              <div
                className="product-card"
                key={product.id}
              >

                {/* ================= IMAGE ================= */}

                <div className="product-image">

                  {product.imageUrl ? (

                    <img
                      src={product.imageUrl}
                      alt=""
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling.style.display = "block";
                      }}
                    />

                  ) : null}

                  <span
                    style={{
                      display: product.imageUrl ? "none" : "block"
                    }}
                  >
                    📦
                  </span>

                </div>


                {/* ================= NAME ================= */}

                <h2>
                  {product.name}
                </h2>


                {/* ================= DESCRIPTION ================= */}

                <p className="description">

                  {product.description ||
                    "No description available"}

                </p>


                {/* ================= PRICE ================= */}

                <p className="price">

                  ₹
                  {Number(
                    product.price
                  ).toLocaleString()}

                </p>


                {/* ================= STOCK ================= */}

                <p className="stock">

                  {product.stock > 0
                    ? `In Stock (${product.stock})`
                    : "Out of Stock"}

                </p>


                {/* ================= ADD TO CART ================= */}

                <button
                  className="add-button"
                  disabled={product.stock <= 0}
                  onClick={() =>
                    handleAddToCart(product)
                  }
                >

                  {product.stock > 0
                    ? "Add to Cart"
                    : "Out of Stock"}

                </button>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>

  );

};

export default App;