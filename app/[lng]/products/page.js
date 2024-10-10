import React from "react";

const ProductPage = ({ searchParams }) => {
  const searchQuery = searchParams.query || "";
  return <div>{ searchQuery }</div>;
};

export default ProductPage;
