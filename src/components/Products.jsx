import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productApi";
import { GiShoppingCart } from "react-icons/gi";
import { useStore } from "../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import toast from "react-hot-toast";

const Products = ({ selectedCategory }) => {
  const [quantities, setQuantities] = useState({});
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { wishlist, toggleWishlist, addToCart, searchTerm } = useStore();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <h1 className="text-center text-3xl text-red-600 font-bold"> Loading.... </h1>
    );
  }

  if (error) {
    return (
      <h1 className="text-center text-3xl text-red-600 font-bold"> Xatolik yuz berdi ! </h1>
    );
  }

  const handleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    toggleWishlist(product);

  if (exists) {
    toast.error("Wishlistdan olib tashlandi" , {
      style: {
        backgroundColor: "black",
        color: "red",
        border: "5px solid red",
        fontWeight: "bold",
        fontSize: "20px",
        minWidth: "350px",
        borderRadius: "20px",
        boxShadow: `0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 40px #ef4444, 0 0 80px #ef4444`,
      }
    });
  } else {
    toast.success("Wishlistga qo'shildi" , {
      style: {
        backgroundColor: "black",
        color: "green",
        border: "5px solid green",
        fontWeight: "bold",
        fontSize: "20px",
        minWidth: "350px",
        borderRadius: "20px",
        boxShadow: `0 0 10px #22c55e, 0 0 20px #22c55e, 0 0 40px #22c55e, 0 0 80px #22c55e`,
      }
    });
  }
};

    const handleCart = (product) => {
      const quantity = quantities[product.id] || 0;
        addToCart({
          ...product,
          quantity,
        });

  toast.success(`${quantity} ta mahsulot savatchaga qo'shildi`, {
    style: {
      backgroundColor: "black",
      color: "green",
      border: "5px solid green",
      fontWeight: "bold",
      fontSize: "20px",
      minWidth: "400px",
      borderRadius: "20px",
      boxShadow: `0 0 10px #22c55e, 0 0 20px #22c55e, 0 0 40px #22c55e, 0 0 80px #22c55e`,
    }
  });
};

  const increaseQuantity = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const decreaseQuantity = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) - 1),
    }));
  };

    const filteredProducts = products.filter((product) => {
    const matchSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = !selectedCategory || Number(product.categoryId) === Number(selectedCategory);

    return matchSearch && matchCategory;
  });

  return (
    <section className="w-full mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold mb-10 text-center"> Products </h2>

      <div className="flex flex-wrap gap-8 justify-center">
        {filteredProducts.length === 0 ? (
          <h1 className="text-center text-3xl text-red-600 font-bold"> Mahsulot topilmadi </h1>
          ) : (
          filteredProducts.map((product) => (
          <div key={product.id} className="bg-black rounded-3xl w-[500px]">
            <img src={product.image} alt={product.title} className="w-[80%] h-68 object-cover m-auto mt-7" />

            <div className="p-4">
              <h3 className="text-white font-bold text-lg mb-2 pl-5"> {product.title} </h3>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-600 font-bold text-xl w-[200px] pl-5"> {product.price.toLocaleString()} so'm  </span>
                {product.oldPrice && (
                  <span className="text-gray-500 line-through"> {product.oldPrice.toLocaleString()} so'm </span>
                )}

            <div className="flex gap-3">
              <button onClick={() => handleWishlist(product)}>
                {wishlist.find((item) => item.id === product.id) ? (<FaHeart className="text-red-600 text-3xl" />) : (<FaRegHeart className="text-white text-3xl" />)}
              </button>

              <button onClick={() => handleCart(product)} className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-900 transition">
                <GiShoppingCart className="text-3xl" />
              </button>

              <button className="text-white text-3xl hover:text-red-600 transition" onClick={() => {
                navigate(`/products/${product.id}`)}}> <IoEyeSharp /> 
              </button>
            </div>
          </div>
        </div>

      <div className="flex items-center justify-between px-5 mt-3">
        <p className="text-yellow-500 font-bold"> Rating: ⭐ {product.rating} </p>

      <div className="flex items-center gap-3">
        <button className="w-8 h-8 bg-red-600 text-white rounded-full font-bold hover:bg-red-800"
          onClick={() => decreaseQuantity(product.id)}>
            -
        </button>

        <span className="text-white text-xl font-bold"> {quantities[product.id] || 0} </span>
        <button className="w-8 h-8 bg-green-600 text-white rounded-full font-bold hover:bg-green-800"
          onClick={() => increaseQuantity(product.id)}>
            +
        </button>
      </div>
    </div>
    </div>
   </div>
    )))}
 </div>
</section>
  );
};
export default Products;