import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../data/product.js";
import { useNavigate } from "react-router-dom";
import { useCard } from "../Context/CardContext";
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = getProductById(id);

    if (!foundProduct) {
      navigate("/");
    }
    setProduct(foundProduct);
  }, [id]);
  if (!product) {
    return <div>Loading...</div>;
  }
  const { addToCard, cardItems } = useCard();
  const productInList = cardItems.find(
    (item) => Number(item.id) === Number(product.id),
  );

  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} srcset="" />
          </div>
          <div className="product-detail-content">
            <h1 className="">{product.name}</h1>
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
            <p className="product-detail-description">{product.description}</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                addToCard(product.id);
              }}
            >
              Add to Cart {productInList ? `(${productInList.quantity})` : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
