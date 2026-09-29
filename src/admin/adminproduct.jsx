import { useEffect, useState } from "react";
import "./adminproduct.css";

function AdminProducts() {
    const [products, setProducts] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(
                `${API_URL}/products`
            );

            const data = await response.json();

            if (!response.ok) {
                console.error(
                    "Failed to fetch products:",
                    data
                );
                return;
            }

            setProducts(data);
        } catch (error) {
            console.error(
                "Error fetching products:",
                error
            );
        }
    };

    const addProduct = async (e) => {
        e.preventDefault();

        try {
            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/products`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        name: name,
                        description: description,
                        price: Number(price),
                        stock: Number(stock),
                        imageUrl: imageUrl,
                        categoryId: Number(categoryId),
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.error(
                    "Failed to add product:",
                    data
                );

                alert(
                    data.message ||
                    "Failed to add product"
                );

                return;
            }

            alert("Product added successfully!");

            // Clear form
            setName("");
            setDescription("");
            setPrice("");
            setStock("");
            setImageUrl("");
            setCategoryId("");

            // Refresh products
            fetchProducts();

        } catch (error) {
            console.error(
                "Error adding product:",
                error
            );
        }
    };
    const deleteProduct = async (productId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/products/${productId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.error("Delete failed:", data);

                alert(
                    data.message || "Failed to delete product"
                );

                return;
            }

            alert("Product deleted successfully!");

            // Refresh product list
            fetchProducts();

        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const updateProduct = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/products/${editingProduct.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: editingProduct.name,
                        description: editingProduct.description,
                        price: Number(editingProduct.price),
                        stock: Number(editingProduct.stock),
                        imageUrl: editingProduct.imageUrl,
                        categoryId: Number(editingProduct.categoryId),
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.error("Update failed:", data);

                alert(
                    data.message || "Failed to update product"
                );

                return;
            }

            alert("Product updated successfully!");

            setEditingProduct(null);

            fetchProducts();

        } catch (error) {
            console.error("Update error:", error);
        }
    };

  return (
  <div className="admin-products">

    {/* ================= HEADER ================= */}

    <div className="admin-products-header">

      <div>
        <h1>Product Management</h1>
        <p>Manage your store products, inventory and pricing.</p>
      </div>

      <div className="product-count">
        {products.length} Products
      </div>

    </div>


    {/* ================= ADD PRODUCT ================= */}

    <div className="product-panel">

      <div className="panel-header">
        <div>
          <h2>Add New Product</h2>
          <p>Create a new product for your store.</p>
        </div>

        <span className="panel-icon">
          +
        </span>
      </div>


      <form
        className="product-form"
        onSubmit={addProduct}
      >

        <div className="form-group">

          <label>Product Name</label>

          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

        </div>


        <div className="form-group">

          <label>Description</label>

          <input
            type="text"
            placeholder="Enter product description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

        </div>


        <div className="form-row">

          <div className="form-group">

            <label>Price</label>

            <input
              type="number"
              placeholder="₹ 0"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              required
            />

          </div>


          <div className="form-group">

            <label>Stock</label>

            <input
              type="number"
              placeholder="0"
              value={stock}
              onChange={(e) =>
                setStock(e.target.value)
              }
              required
            />

          </div>


          <div className="form-group">

            <label>Category ID</label>

            <input
              type="number"
              placeholder="Category ID"
              value={categoryId}
              onChange={(e) =>
                setCategoryId(e.target.value)
              }
              required
            />

          </div>

        </div>


        <div className="form-group">

          <label>Image URL</label>

          <input
            type="text"
            placeholder="Enter product image URL"
            value={imageUrl}
            onChange={(e) =>
              setImageUrl(e.target.value)
            }
          />

        </div>


        <button
          className="add-product-btn"
          type="submit"
        >
          + Add Product
        </button>

      </form>

    </div>


    {/* ================= EDIT PRODUCT ================= */}

    {editingProduct && (

      <div className="product-panel edit-panel">

        <div className="panel-header">

          <div>
            <h2>Edit Product</h2>
            <p>
              Update the product information below.
            </p>
          </div>

          <span className="panel-icon edit-icon">
            ✎
          </span>

        </div>


        <form
          className="product-form"
          onSubmit={updateProduct}
        >

          <div className="form-group">

            <label>Product Name</label>

            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  name: e.target.value,
                })
              }
            />

          </div>


          <div className="form-group">

            <label>Description</label>

            <input
              type="text"
              value={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              }
            />

          </div>


          <div className="form-row">

            <div className="form-group">

              <label>Price</label>

              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                }
              />

            </div>


            <div className="form-group">

              <label>Stock</label>

              <input
                type="number"
                value={editingProduct.stock}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    stock: e.target.value,
                  })
                }
              />

            </div>


            <div className="form-group">

              <label>Category ID</label>

              <input
                type="number"
                value={editingProduct.categoryId}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    categoryId: e.target.value,
                  })
                }
              />

            </div>

          </div>


          <div className="form-group">

            <label>Image URL</label>

            <input
              type="text"
              value={editingProduct.imageUrl}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  imageUrl: e.target.value,
                })
              }
            />

          </div>


          <div className="edit-actions">

            <button
              className="save-btn"
              type="submit"
            >
              Save Changes
            </button>

            <button
              className="cancel-btn"
              type="button"
              onClick={() =>
                setEditingProduct(null)
              }
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    )}


    {/* ================= PRODUCT LIST ================= */}

    <div className="products-section">

      <div className="products-title">

        <div>
          <h2>All Products</h2>
          <p>View and manage your current inventory.</p>
        </div>

      </div>


      <div className="products-grid">

        {products.map((product) => (

          <div
            className="admin-product-card"
            key={product.id}
          >

            {/* PRODUCT IMAGE */}

            <div className="admin-product-image">

              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                />
              ) : (
                <span>📦</span>
              )}

            </div>


            {/* PRODUCT INFO */}

            <div className="product-info">

              <div className="product-top">

                <span className="product-id">
                  # {product.id}
                </span>

                <span
                  className={
                    product.stock > 0
                      ? "stock-badge"
                      : "out-stock-badge"
                  }
                >
                  {product.stock > 0
                    ? "In Stock"
                    : "Out of Stock"}
                </span>

              </div>


              <h3>
                {product.name}
              </h3>


              <p className="product-description">

                {product.description ||
                  "No description available."}

              </p>


              <div className="product-details">

                <div>

                  <span>Price</span>

                  <strong>
                    ₹
                    {Number(
                      product.price
                    ).toLocaleString()}
                  </strong>

                </div>


                <div>

                  <span>Stock</span>

                  <strong>
                    {product.stock}
                  </strong>

                </div>


                <div>

                  <span>Category</span>

                  <strong>
                    {product.categoryId}
                  </strong>

                </div>

              </div>


              {/* ACTIONS */}

              <div className="product-actions">

                <button
                  className="edit-btn"
                  onClick={() =>
                    setEditingProduct({
                      id: product.id,
                      name: product.name,
                      description:
                        product.description || "",
                      price: product.price,
                      stock: product.stock,
                      imageUrl:
                        product.imageUrl || "",
                      categoryId:
                        product.categoryId,
                    })
                  }
                >
                  ✎ Edit
                </button>


                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteProduct(product.id)
                  }
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  </div>
);
}

export default AdminProducts;