import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import UpdateProductForm from "./components/UpdateProductForm";

const App = () => {
    return (
        <Router>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Product Inventory</Link>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNavAltMarkup" 
                        aria-controls="navbarNavAltMarkup" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link active" aria-current="page" to="/">Product List</Link>
                            <Link className="nav-link" to="/create">Create Product</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div style={{ marginTop: '56px' }}>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/create" element={<ProductForm />} />
                    <Route path="/update-product/:productId" element={<UpdateProductForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
