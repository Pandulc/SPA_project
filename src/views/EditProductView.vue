<template>
  <div>
    <h1>Editar Producto</h1>
    <ProductForm :isEditing="true" />
  </div>
</template>

<script>
import ProductForm from '@/components/ProductForm.vue';
import { useRoute } from 'vue-router';

export default {
  components: {
    ProductForm,
  },
  setup() {
    const route = useRoute();
    const productId = route.params.id;

    // Simular la carga del producto por su ID, puedes ajustar esto más tarde
    const product = {
      id: productId,
      name: 'Producto ' + productId,
      price: 100 + parseInt(productId),
      description: 'Descripción del producto ' + productId,
    };

    return {
      product,
    };
  },
};
</script>
