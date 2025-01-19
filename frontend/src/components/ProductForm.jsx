import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/products/create/';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [variants, setVariants] = useState([{ name: '', subvariants: [''] }]);

    const handleVariantChange = (index, field, value) => {
        const updatedVariants = [...variants];
        if (field === 'name') {
            updatedVariants[index].name = value;
        } else if (field === 'subvariants') {
            updatedVariants[index].subvariants = value.split(',').map((sub) => sub.trim()); // Split subvariants by commas
        }
        setVariants(updatedVariants);
    };

    const handleAddVariant = () => {
        setVariants([...variants, { name: '', subvariants: [''] }]);
    };

    const handleRemoveVariant = (index) => {
        const updatedVariants = variants.filter((_, i) => i !== index);
        setVariants(updatedVariants);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name,
            variants: variants.map((variant) => ({
                name: variant.name,
                subvariants: variant.subvariants, // Ensure this is an array
            })),
        };
        try {
            const response = await axios.post(API_BASE_URL, payload);
            alert('Product created successfully!');
            // Reset form
            setName('');
            setVariants([{ name: '', subvariants: [''] }]);
        } catch (error) {
            console.error('Error creating product:', error.response?.data || error.message);
            alert(
                'Error creating product: ' + 
                (error.response?.data?.detail || 'An unknown error occurred.')
            );
        }
    };

    return (
        <div className="container-fluid row d-flex align-items-center justify-content-center" style={{ marginLeft: '20px', marginRight: '20px' }}>
            <div className="col-lg-6 ">
                <h2 className="text-center mb-4">Create Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label"><strong>Product Name:</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div>
                        <h4>Variants</h4>
                        {variants.map((variant, index) => (
                            <div key={index} className="mb-3 border p-3 rounded">
                                <label className="form-label"><strong>Variant Name:</strong></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={variant.name}
                                    onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
                                    required
                                />
                                <label className="form-label"><strong>Subvariants</strong></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={variant.subvariants.join(',')}
                                    onChange={(e) => handleVariantChange(index, 'subvariants', e.target.value)}
                                    required
                                />
                                <button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveVariant(index)}>
                                    Remove Variant
                                </button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-primary" onClick={handleAddVariant}>
                            Add Variant
                        </button>
                    </div>
                    <button type="submit" className="btn btn-success mt-3 w-100">Create Product</button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
