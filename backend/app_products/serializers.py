from rest_framework import serializers
from .models import Products, Variants, SubVariant

class SubVariantSerializer(serializers.ModelSerializer):
    option = serializers.ListField(child=serializers.CharField())
    
    class Meta:
        model = SubVariant
        fields = ['id', 'option', 'stock']

class VariantSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    subvariants = SubVariantSerializer(many=True)
    
    class Meta:
        model = Variants
        fields = ['id', 'name', 'subvariants']

class ProductSerializer(serializers.ModelSerializer):
    variants = VariantSerializer(many=True)

    class Meta:
        model = Products
        fields = [
            'id', 'ProductID', 'ProductCode', 'ProductName', 
            'ProductImage', 'TotalStock', 'variants', 
            'CreatedDate', 'UpdatedDate', 'IsFavourite', 'Active'
        ]

class CreateProductSerializer(serializers.Serializer):
    name = serializers.CharField()
    variants = serializers.ListField()
     
     # Logic to create a product with variants and subvariants.
    def create(self, validated_data):
        product_name = validated_data['name']
        product = Products.objects.create(
            ProductName=product_name,
            ProductID=Products.objects.count() + 1, 
            ProductCode=f"PROD-{Products.objects.count() + 1}",  
            # CreatedUser=self.context['request'].user  # Assuming user is passed in the context
        )

        for variant_data in validated_data['variants']:
            variant_name = variant_data['name']
            variant = Variants.objects.create(product=product, name=variant_name)

            for option in variant_data['subvariants']:
                SubVariant.objects.create(variant=variant, option=option)

        return product
