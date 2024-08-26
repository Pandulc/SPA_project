<template>
  <div class="product-item">
    <div class="product-card">
      <img :src="product.image" alt="" class="product-image">
      <div class="product-info">
        <h3 class="product-title">{{ product.title }}</h3>
        <p class="product-category">{{ product.category }}</p>
        <p class="product-price">{{ product.price }}</p>
        <p class="product-description">{{ product.description }}</p>
        <div class="product-actions">
          <button @click="editProduct" class="edit-button">Editar</button>
          <button @click="deleteProduct" class="delete-button">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useProductStore } from '@/store/productStore.js';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const productStore = useProductStore();

const editProduct = () => {
  // Redirige a la página de edición del producto
  router.push({ name: 'EditProduct', params: { id: props.product.id } });
};

const deleteProduct = () => {
  // Aquí puedes agregar la lógica para eliminar el producto
  // Por ejemplo, podrías llamar a una API para eliminar el producto del servidor
  if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
    // Lógica para eliminar el producto
    productStore.deleteProduct(props.product.id);
    console.log(`Producto con ID ${props.product.id} eliminado`);
    // Después de eliminar, podrías redirigir a otra página o actualizar la lista de productos
  }
};
</script>
