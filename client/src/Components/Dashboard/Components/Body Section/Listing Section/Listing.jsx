import React, { useEffect, useState } from 'react';
import './listing.css';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsArrowRightShort } from 'react-icons/bs';

const Listing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://servsiam-backend-a61de3db6766.herokuapp.com/api/products?page=1&limit=4")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.products);
        } else {
          console.error("Failed to fetch products:", data.message);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className='lisitingSection'>
      <div className="heading flex">
        <h1>My Listings</h1>
        <button className='btn flex'>
          See All <BsArrowRightShort className="icon" />
        </button>
      </div>

      <div className="secContainer flex">
        {loading ? (
          <p>Loading...</p>
        ) : products.length > 0 ? (
          products.map((item, index) => (
            <div className="singleItem" key={item.id}>
              {index % 2 === 0 ? (
                <AiFillHeart className="icon" />
              ) : (
                <AiOutlineHeart className="icon" />
              )}
              <img
                src={item.image_url || "/placeholder.jpg"}
                alt={item.product_name}
              />
              <h3>{item.product_name}</h3>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Listing;
