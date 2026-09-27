import "./ProductCard.css";

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <p className="product-price">
        ₹{product.price}
      </p>

      <p className="product-stock">
        Stock: {product.stock}
      </p>

      <p>
        Category ID: {product.categoryId}
      </p>

     <button
  className="add-cart-button"
  onClick={() => addToCart(product)}
>
  Add to Cart
</button>
    </div>
  );
}

export default ProductCard;