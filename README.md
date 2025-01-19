# Product Inventory System with Stock Management
### Overview
This project implements a Product Inventory System that allows managing products, variants, and subvariants, as well as tracking stock levels. The system includes features for adding stock (purchase), removing stock (sale), and creating and listing products with variants and subvariants.

The backend is built using Django with Django REST Framework for the API, and the frontend is built with React.js and Vite.

### Features
* Product Management: Create, view, and update products with variants and subvariants.
* Stock Management: Add or remove stock for product variants.
* Responsive UI: Built with React.js and Vite for a fast and modern user experience.
* Error Handling: Validation and error handling for all API requests.
### Technologies Used
* Backend: Django, Django REST Framework (DRF)
* Frontend: React.js, Vite
* Database: PostgreSQL
* Storage: Media files stored with Django (e.g., product images)
* API Documentation: DRF API endpoints
## Setup Instructions
### Backend Setup (Django)
#### Clone the Repository:


    git clone https://github.com/sreenath-pydev/Product_Inventory_System_with_Stock_Management.git

    cd Product_Inventory_System_with_Stock_Management/backend
####  Create a Virtual Environment:


    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
#### Install Dependencies:


    pip install -r requirements.txt
#### Apply Migrations:

    python manage.py makemigrations
    python manage.py migrate

#### Run the Django Server:

    python manage.py runserver
The backend should now be running at http://localhost:8000.

## Frontend Setup (React + Vite)
#### Clone the Repository:


    git clone https://github.com/sreenath-pydev/Product_Inventory_System_with_Stock_Management.git
    cd product-inventory-system/frontend
#### Install Dependencies:


    npm install axios react-router-dom
#### Start the Development Server:

    npm run dev
The frontend should now be running at http://localhost:3000.

### API Endpoints
#### 1. Create Product:
* URL: /api/products/
* Method: POST
* Request Body:

        {
        "ProductName": "Shirt",
        "variants": [
            {
            "name": "Size",
            "options": ["S", "M", "L"]
            },
            {
            "name": "Color",
            "options": ["Red", "Blue", "Black"]
            }
        ]
        }

### Configuration
* Backend: Django settings (backend/settings.py)

* Frontend: React settings (frontend/package.json)

* Set up the API endpoint base URL in the API service file (frontend/src/api.js).
### Error Handling
* Backend: All API errors are handled with appropriate HTTP status codes (e.g., 400 for bad requests, 404 for not found, 500 for server errors).
* Frontend: Errors are displayed in the UI with user-friendly messages.


