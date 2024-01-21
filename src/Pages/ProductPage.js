import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const ProductPage = () => {
  // State to store the list of all products
  const [products, setProducts] = useState([]);
  // State to store the search term entered by the user
  const [searchTerm, setSearchTerm] = useState('');
  // State to store the products filtered based on the search term
  const [filteredProducts, setFilteredProducts] = useState([]);

  // useEffect to fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Retrieve the access token from localStorage
        const accessToken = localStorage.getItem('accessToken');

        // Make the API call to fetch products with the access token in the headers
        const response = await axios.get(
          'https://api.kalpav.com/api/v1/product/category/retail',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setProducts(response.data.response);
      } catch (error) {
        console.error('Failed to fetch products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  // useEffect to update filtered products based on the search term
  useEffect(() => {
    // Filter products based on the search term
    const filteredResults = products.filter((product) =>
      product.productCategory.productCategoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filteredResults);
  }, [searchTerm, products]);

  // Function to handle search button click
  const handleSearch = () => {
    // Additional logic for handling search button click can be added here if needed
  };

  // Function to handle key press, specifically "Enter" key
  const handleKeyPress = (e) => {
    // Check if the pressed key is "Enter"
    if (e.key === 'Enter') {
      // Update the filtered products based on the search term
      const filteredResults = products.filter((product) =>
        product.productCategory.productCategoryName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredProducts(filteredResults);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto h-screen">
        <div>
          <h1 className='text-sm font-semibold text-black text-center p-2'>Filter by category</h1>
          <div className='w-full flex justify-center items-center'>
            {/* Input field for search term */}
            <input
              className='p-2 rounded-tl-3xl rounded-bl-3xl border-b border-l border-r focus:outline-none focus:border-blue-500'
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {/* Search button */}
            <button
              className="px-4 py-2 rounded-tr-3xl rounded-br-3xl bg-blue-500 text-white ml-2 focus:outline-none"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <h1 className="w-full text-center text-2xl font-bold mt-8">Product List</h1>
        <div className="grid grid-cols-5 px-10 py-4 gap-10">
          {/* Display products or "No match" message */}
          {filteredProducts.length === 0 ? (
            <div className="text-center w-full col-span-5">No match</div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.productCategory.productCategoryId} className="flex w-60 h-60 bg-white p-4 items-center justify-center shadow-md rounded-md">
                <div className=' items-center justify-center'>
                  {/* Display product image */}
                  <img
                    src={product.productCategory.productCategoryImage}
                    alt={product.productCategory.productCategoryName}
                    className=" h-32 w-32 object-cover mb-4 mx-auto my-auto"
                  />
                  {/* Display product name */}
                  <h2 className="text-lg font-bold">{product.productCategory.productCategoryName}</h2>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
