import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/products/';

const UpdateProductForm = () => {
    const { productId } = useParams(); // Get product ID from URL
    const { state } = useLocation(); // Get product data from navigation state
    const [name, setName] = useState('');
    const [variants, setVariants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (state?.product) {
            // Use the product data passed via navigation state
            setName(state.product.ProductName);
            setVariants(state.product.variants || []);
        } else {
            // Fetch product details if not passed via state
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}${productId}/`);
                    setName(response.data.ProductName);
                    setVariants(response.data.variants || []);
                } catch (error) {
                    console.error('Error fetching product details:', error);
                    alert('Error fetching product details.');
                }
            };
            fetchProduct();
        }
    }, [productId, state]);

    const handleVariantChange = (index, field, value) => {
        const updatedVariants = [...variants];
        if (field === 'name') {
            updatedVariants[index].name = value;
        } else if (field === 'subvariants') {
            updatedVariants[index].subvariants = value;
        }
        setVariants(updatedVariants);
    };

    const handleAddVariant = () => {
        setVariants([...variants, { name: '', subvariants: [{ option: '' }] }]);
    };

    const handleRemoveVariant = (index) => {
        const updatedVariants = variants.filter((_, i) => i !== index);
        setVariants(updatedVariants);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { name, variants };
    
        try {
            await axios.put(`${API_BASE_URL}${productId}/update/`, payload); 
            alert('Product updated successfully!');
            navigate('/'); 
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product.');
        }
    };
    
    return (
        <div className="container mt-4">
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Product Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                {variants.map((variant, index) => (
                    <div key={index} className="mb-3 border p-3 rounded">
                        <label className="form-label">Variant Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={variant.name}
                            onChange={(e) =>
                                handleVariantChange(index, 'name', e.target.value)
                            }
                            required
                        />
                        <label className="form-label">Subvariants (comma-separated):</label>
                        <input
                            type="text"
                            className="form-control"
                            value={variant.subvariants
                                .map((subvariant) => subvariant.option)
                                .join(',')}
                            onChange={(e) =>
                                handleVariantChange(
                                    index,
                                    'subvariants',
                                    e.target.value
                                        .split(',')
                                        .map((sub) => ({ option: sub.trim() }))
                                )
                            }
                        />
                        <button
                            type="button"
                            className="btn btn-danger mt-2"
                            onClick={() => handleRemoveVariant(index)}
                        >
                            Remove Variant
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddVariant}
                >
                    Add Variant
                </button>
                <button
                    type="submit"
                    className="btn btn-success mt-3 w-100"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProductForm;
