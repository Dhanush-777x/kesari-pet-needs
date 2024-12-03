// components/ProductCard.js
import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg w-64 shadow-lg p-4 hover:shadow-xl transition-shadow">
      <div className="relative h-48 w-full mb-4 flex justify-center items-center">
        <Image
          src={product.image}
          alt={product.name}
          objectFit="cover"
          className="rounded-md"
          height={144}
          width={144}
        />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
      <div className="flex">
      <p className="text-gray-500 mb-4 line-through pr-2">₹{product.mrp}</p>
      <p className="pr-2">₹{product.disPrice}</p>  
      <p className="text-green-600 font-bold">{product.disPercentage}</p>
      </div>
      
      <button className="bg-primary text-white py-2 px-4 rounded-lg w-full">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard
