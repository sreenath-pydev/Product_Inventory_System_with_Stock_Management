from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CreateProductSerializer, ProductSerializer
from .models import Products

class CreateProductAPIView(APIView):
    def post(self, request):
        serializer = CreateProductSerializer(data=request.data)
        if serializer.is_valid():
            product = serializer.save(context={'request': request})
            return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListProductAPIView(APIView):
    def get(self, request):
        products = Products.objects.prefetch_related('variants__subvariants').all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class ProductDeleteAPIView(APIView):
    def delete(self, request, pk):
        try:
            product = Products.objects.get(pk=pk)
            product.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Products.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class UpdateProductView(APIView):
    def put(self, request, pk):
        try:
            product = Products.objects.get(pk=pk)
        except Products.DoesNotExist:
            return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

