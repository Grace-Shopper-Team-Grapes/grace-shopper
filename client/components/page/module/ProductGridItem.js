import React from 'react';
import {Link} from 'react-router-dom';
import {useToasts} from 'react-toast-notifications';

const ProductGridItem = props => {
  const {addToast} = useToasts();
  // set our variables for easy printing
  const id = props.product.id;
  const name = props.product.name;
  const slug = props.product.slug;
  const price = props.product.price / 100;
  const image = props.product.imageUrl;
  const handleAddToCart = props.handleAddToCart;

  return (
    <div className="products-grid-item">
      <Link to={`/products/${slug}`} className="products-grid-item__link">
        <img className="products-grid-item__thumb" src={image} alt={name} />
        <p className="products-grid-item__name">{name}</p>
        <div className="products-grid-item__buy-box">
          <span className="products-grid-item__price">${price}</span>
          <button
            type="submit"
            onClick={e => {
              handleAddToCart(e, id);
              addToast(`Added ${name} to your Cart!`, {
                appearance: 'success'
              });
            }}
            className="products-grid-item__addToCart"
          >
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductGridItem;
