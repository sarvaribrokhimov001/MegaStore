import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductsId } from "../hooks/useGetProductsId";

const ViewPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductsId(id);

  if (isLoading) {
    return <h1 className="text-center text-4xl text-red-600"> Loading... </h1>;
  }

  return (
    <div className="p-10 flex justify-center items-center flex-col gap-7">
      <img src={data.image} alt={data.title} className="w-[600px] rounded-full" />
      <div>
        <p className="text-5xl font-bold"> <span className="text-red-600"> Id: </span> {data.id} </p>
        <h1 className="text-5xl font-bold"> <span className="text-red-600"> Name: </span> {data.title} </h1>
        <p className="text-5xl font-bold"> <span className="text-red-600"> Price: </span> {data.price.toLocaleString()} so'm </p>
        <p className="text-5xl font-bold"> <span className="text-red-600"> OldPrice: </span> <del> {data.oldPrice?.toLocaleString()} so'm </del> </p>
        <p className="text-5xl font-bold"> <span className="text-red-600"> CategoryId: </span> {data.categoryId} </p>
        <p className="text-5xl font-bold"> <span className="text-red-600"> ReviewCount: </span> {data.reviewCount} </p>
        <p className="text-5xl font-bold"> <span className="text-red-600"> Rating: </span> ⭐ {data.rating} </p>
      </div>
    </div>
  );
};
export default ViewPage;