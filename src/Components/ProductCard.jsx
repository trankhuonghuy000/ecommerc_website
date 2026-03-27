import { Link } from "react-router-dom";
import { useCard } from "../Context/CardContext";

const ProductCard = ({ product }) => {
  const { addToCard, cardItems } = useCard();
  const productInList = cardItems.find(
    (item) => Number(item.id) === Number(product.id),
  );
  return (
    <div className="product-card">
      <img src={product.image} className="product-card-image" />
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">$ {product.price.toFixed(2)}</p>
        <div className="product-card-actions">
          <Link className="btn btn-secondary" to={`/product/${product.id}`}>
            View detail
          </Link>
          <button
            className="btn btn-primary"
            onClick={() => {
              addToCard(product.id);
            }}
          >
            Add to cart {productInList ? `(${productInList.quantity})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
