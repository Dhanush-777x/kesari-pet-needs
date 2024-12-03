"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/productCard";
import AuthGuard from "@/components/Authguard";
import Navbar from "@/components/navbar";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [filterCategory, setFilterCategory] = useState("All");

  // Fetch products from the database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products"); // Adjust this URL to your API endpoint
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Sorting handler
  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortOption(sortValue);

    let sortedProducts = [...products];
    if (sortValue === "priceLowHigh") {
      sortedProducts.sort((a, b) => a.disPrice - b.disPrice); // Change a.price to a.disPrice
    } else if (sortValue === "priceHighLow") {
      sortedProducts.sort((a, b) => b.disPrice - a.disPrice); // Change a.price to a.disPrice
    }
    setProducts(sortedProducts);
  };

  // Filtering handler
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFilterCategory(selectedCategory);

    if (selectedCategory === "All") {
      // Refetch products to reset filter
      const fetchProducts = async () => {
        try {
          const response = await fetch("/api/products"); // Adjust this URL to your API endpoint
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    } else {
      const filteredProducts = products.filter(
        (product) => product.category === selectedCategory
      );
      setProducts(filteredProducts);
    }
  };

  return (
    <AuthGuard>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mt-20 mb-6">
          Explore Pet Essentials
        </h1>

        {/* Sorting and Filtering */}
        <div className="flex justify-between mb-6">
          {/* Category Filter */}
          <div>
            <label className="mr-2">Filter by Category:</label>
            <select
              value={filterCategory}
              onChange={handleCategoryChange}
              className="border p-2 rounded-md"
            >
              <option value="All">All</option>
              <option value="Food">Food</option>
              <option value="Litter">Litter</option>
              <option value="Toys">Toys</option>
            </select>
          </div>

          {/* Sorting */}
          <div>
            <label className="mr-2">Sort by:</label>
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="border p-2 rounded-md"
            >
              <option value="default">Default</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </AuthGuard>
  );
};

export default ProductsPage;
