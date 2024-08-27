<template>
  <div>
    <h1>Editar Producto</h1>
    <ProductForm :isEditing="true" :initialData="product" />
  </div>
</template>

<script>
  import ProductForm from "@/components/ProductForm.vue";
  import { computed, onMounted } from "vue";
  import { useProductStore } from "@/store/productStore.js";
  import { useRoute } from "vue-router";

  export default {
    components: {
      ProductForm,
    },
    setup() {
      const route = useRoute();
      const store = useProductStore();
      const productId = parseInt(route.params.id);
      const product = computed(() => store.getProductById(productId));

      onMounted(async () => {
        if (!product.value) {
          await store.fetchProducts(); // Cargar productos si no están en la tienda
        }
      });

      return {
        product,
      };
    },
  };
</script>
