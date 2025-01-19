import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/products/';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(API_BASE_URL);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleUpdate = (product) => {
        navigate(`/update-product/${product.id}`, { state: { product } });
    };

    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`${API_BASE_URL}${productId}/`);
                setProducts(products.filter((product) => product.id !== productId));
                alert('Product deleted successfully!');
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Error deleting product: ' + (error.response?.data?.detail || 'An unknown error occurred.'));
            }
        }
    };

    return (
        <div className="container w-100 mt-4">
            <h2>Product List</h2>
            <div className="row">
                {products.map((product) => (
                    <div className="col-lg-3 col-md-4 mb-4" key={product.id}>
                        <div className="card" style={{ width: '100%' }}>
                            <div className="card-body">
                                <h5 className="card-title">Product Name: {product.ProductName}</h5>
                                {product.variants && product.variants.length > 0 ? (
                                    product.variants.map((variant, index) => (
                                        <div key={index}>
                                            <p className="card-text"><strong>Variant: </strong>{variant.name}</p>
                                            {variant.subvariants.map((subvariant, subIndex) => (
                                                <p className="card-text" key={subIndex}><strong>Sub-Variant: </strong>{subvariant.option}</p>
                                            ))}
                                        </div>
                                    ))
                                ) : (
                                    <p>No variants available.</p>
                                )}
                                <button onClick={() => handleUpdate(product)} className="btn btn-primary m-3">Update</button>
                                <button onClick={() => handleDelete(product.id)} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
