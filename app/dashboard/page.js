"use client";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    mrp: "",
    disPrice: "",
    disPercentage: "",
    image: "",
    category: "",
  });
  const [editProduct, setEditProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [shopId, setShopId] = useState(null); // Store logged-in user's shop ID

  const fetchProducts = async () => {
    try {
      // Fetch the current user's shop ID
      const userResponse = await fetch("/api/currentUser");
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await userResponse.json();
      console.log(userData)
      console.log(userData.id)
      setShopId(userData.id); // Set the shop ID

      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      // Filter products by the logged-in user's shop ID
      const filteredProducts = data.filter(
        (product) => {
          return product.shopId === userData.id
    });
    console.log(filteredProducts)
      setProducts(filteredProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const productWithShopId = { ...newProduct, shopId }; // Include shop ID when creating a product
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productWithShopId),
    });
    if (response.ok) {
      setNewProduct({
        name: "",
        mrp: "",
        disPrice: "",
        disPercentage: "",
        image: "",
        category: "",
      });
      fetchProducts();
    }
  };

  const handleDelete = async (id) => {
    await fetch(`/api/products?id=${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setEditMode(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editProduct) return;

    const response = await fetch(`/api/products?id=${editProduct._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editProduct),
    });

    if (response.ok) {
      setEditProduct(null);
      setEditMode(false);
      fetchProducts();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editMode) {
      setEditProduct((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      filterCategory ? product.category === filterCategory : true
    )
    .sort((a, b) => {
      if (sortCriteria === "mrp") return a.mrp - b.mrp;
      if (sortCriteria === "disPrice") return a.disPrice - b.disPrice;
      if (sortCriteria === "disPercentage")
        return a.disPercentage - b.disPercentage;
      return 0;
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>

      {/* Add or Edit Product Form */}
      <form
        onSubmit={editMode ? handleUpdate : handleCreate}
        className="mb-6 p-4 border rounded-md"
      >
        <h2 className="text-2xl font-bold mb-4">
          {editMode ? "Edit Product" : "Add New Product"}
        </h2>
        <input
          type="text"
          name="name"
          value={editMode ? editProduct?.name || "" : newProduct.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          className="border p-2 rounded-md w-full mb-4"
        />
        <input
          type="number"
          name="mrp"
          value={editMode ? editProduct?.mrp || "" : newProduct.mrp}
          onChange={handleInputChange}
          placeholder="MRP"
          className="border p-2 rounded-md w-full mb-4"
        />
        <input
          type="number"
          name="disPrice"
          value={editMode ? editProduct?.disPrice || "" : newProduct.disPrice}
          onChange={handleInputChange}
          placeholder="Discounted Price"
          className="border p-2 rounded-md w-full mb-4"
        />
        <input
          type="number"
          name="disPercentage"
          value={
            editMode
              ? editProduct?.disPercentage || ""
              : newProduct.disPercentage
          }
          onChange={handleInputChange}
          placeholder="Discount Percentage"
          className="border p-2 rounded-md w-full mb-4"
        />
        <input
          type="text"
          name="image"
          value={editMode ? editProduct?.image || "" : newProduct.image}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="border p-2 rounded-md w-full mb-4"
        />
        <input
          type="text"
          name="category"
          value={editMode ? editProduct?.category || "" : newProduct.category}
          onChange={handleInputChange}
          placeholder="Category"
          className="border p-2 rounded-md w-full mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          {editMode ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Search, Sort, and Filter */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <input
          type="text"
          placeholder="Search by product name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-md mb-4 md:mb-0"
        />
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          className="border p-2 rounded-md mb-4 md:mb-0"
        >
          <option value="">Sort By</option>
          <option value="mrp">MRP</option>
          <option value="disPrice">Discounted Price</option>
          <option value="disPercentage">Discount Percentage</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">Filter by Category</option>
          {[...new Set(products.map((p) => p.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Products List */}
      <h2 className="text-2xl font-bold mb-4">Products List</h2>
      {filteredProducts.length === 0 ? (
        <p className="text-center text-lg text-red-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="p-4 rounded-lg flex shadow-md">
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-48 h-auto p-6"
                />
              </div>
              <div>
                <h3 className="font-bold">{product.name}</h3>
                <p>MRP: {product.mrp}</p>
                <p>Discounted Price: {product.disPrice}</p>
                <p>Discount Percentage: {product.disPercentage}</p>
                <p>Category: {product.category}</p>
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
