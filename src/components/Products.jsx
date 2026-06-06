import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productApi";

const Products = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

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

  return (
    <section className="max-w-[1450px] mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold mb-20 text-center"> Products </h2>

      <div className="flex flex-wrap gap-8 justify-center">
        {products.map((product) => (
          <div key={product.id} className="bg-black rounded-3xl w-[22%]">
            <img src={product.image} alt={product.title} className="w-[80%] h-68 object-cover m-auto mt-7" />

            <div className="p-4">
              <h3 className="text-white font-bold text-lg mb-2"> {product.title} </h3>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-600 font-bold text-xl"> {product.price.toLocaleString()} so'm  </span>
                {product.oldPrice && (
                  <span className="text-gray-500 line-through"> {product.oldPrice.toLocaleString()} so'm </span>
                )}
              </div>

              <p className="text-yellow-500 font-bold"> Rating: ⭐ {product.rating} </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Products;