<template>
  <div>
    <h1>Lista de Productos</h1>
    <ProductList v-if="loading == false && error == null" />
    <p v-if="loading">Cargando productos...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
  import { useProductStore } from "@/store/productStore.js";
  import ProductList from "@/components/ProductList.vue";
  import { onMounted } from "vue";

  export default {
    components: {
      ProductList,
    },
    setup() {
      const productStore = useProductStore();

      onMounted(() => {
        if (productStore.products.length === 0) {
          productStore.fetchProducts();
        }
      });

      return {
        loading: productStore.loading,
        error: productStore.error,
      };
    },
  };
</script>
