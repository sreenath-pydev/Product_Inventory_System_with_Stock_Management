from django.urls import path
from .views import CreateProductAPIView, ListProductAPIView, ProductDeleteAPIView, UpdateProductView

urlpatterns = [
    path('products/', ListProductAPIView.as_view(), name='list_products'),
    path('products/create/', CreateProductAPIView.as_view(), name='create_product'),
    path('products/<uuid:pk>/', ProductDeleteAPIView.as_view(), name='product_detail'),
    path('api/products/<uuid:pk>/update/', UpdateProductView.as_view(), name='update-product'),
]
