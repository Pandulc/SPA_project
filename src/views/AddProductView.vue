<template>
  <div>
    <h1>Agregar Producto</h1>
    <ProductForm :isEditing="false"/>
  </div>
</template>

<script>
import ProductForm from '@/components/ProductForm.vue';

export default {
  components: {
    ProductForm,
  },
};
</script>
