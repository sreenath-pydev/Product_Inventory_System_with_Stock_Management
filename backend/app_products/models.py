import uuid
from django.db import models
from django.contrib.auth.models import User
from versatileimagefield.fields import VersatileImageField
from django.utils.translation import gettext_lazy as _

class Products(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ProductID = models.BigIntegerField(unique=True)
    ProductCode = models.CharField(max_length=255, unique=True)
    ProductName = models.CharField(max_length=255)
    ProductImage = VersatileImageField(upload_to="uploads/", blank=True, null=True)
    CreatedDate = models.DateTimeField(auto_now_add=True)
    UpdatedDate = models.DateTimeField(blank=True, null=True)
    # CreatedUser = models.ForeignKey(User, related_name="user%(class)s_objects", on_delete=models.CASCADE)
    IsFavourite = models.BooleanField(default=False)
    Active = models.BooleanField(default=True)
    HSNCode = models.CharField(max_length=255, blank=True, null=True)
    TotalStock = models.DecimalField(default=0.00, max_digits=20, decimal_places=8, blank=True, null=True)

    class Meta:
        db_table = "products_product"
        verbose_name = _("product")
        verbose_name_plural = _("products")
        unique_together = (("ProductCode", "ProductID"),)
        ordering = ("-CreatedDate", "ProductID")

class Variants(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(Products, related_name='variants', on_delete=models.CASCADE)
    name = models.CharField(max_length=225)

class SubVariant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    variant = models.ForeignKey(Variants, related_name='subvariants', on_delete=models.CASCADE)
    option = models.CharField(max_length=20)
    stock = models.PositiveIntegerField(default=0)

class Stock(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    variant = models.ForeignKey(Variants, on_delete=models.CASCADE)
    subvariant = models.ForeignKey(SubVariant, related_name='stocks', on_delete=models.CASCADE)
    stock_quantity = models.PositiveIntegerField()
