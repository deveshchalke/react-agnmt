// Home.js
import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => {
        if (data && data.products) {
          setProducts(data.products);
        } else {
          console.error('Products not found in API response');
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleMinPriceChange = event => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = event => {
    setMaxPrice(event.target.value);
  };

  const addToCart = product => {
    setCart(prevCart => [...prevCart, product]);
  };

  const cartCount = cart.length;
  const totalCartAmount = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container">
      <h1 className="title">Products</h1>
      <div className="cart-info">
        <button onClick={() => setShowCartModal(true)}>View Cart</button>
        <p>Cart Count: {cartCount}</p>
        <p>Total Amount: ${totalCartAmount.toFixed(2)}</p>
      </div>
      {showCartModal && (
        <div className="cart-modal">
          <h2>Cart</h2>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <p>{item.title}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))}
          <button onClick={() => setShowCartModal(false)}>Close</button>
        </div>
      )}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="filter">
        <label htmlFor="minPrice">Min Price:</label>
        <input
          type="number"
          id="minPrice"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <label htmlFor="maxPrice">Max Price:</label>
        <input
          type="number"
          id="maxPrice"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
      </div>
      <div className="product-list">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="product">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
