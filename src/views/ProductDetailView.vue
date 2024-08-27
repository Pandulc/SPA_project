<template>
  <div class="product-detail" v-if="product">
    <div class="product-header">
      <h1>Detalles del Producto</h1>
    </div>
    <div class="product-content">
      <div class="product-image-container">
        <img
          :src="product.image"
          alt="Imagen del producto"
          class="product-image"
        />
      </div>
      <div class="product-info">
        <p><strong>Nombre:</strong> {{ product.title }}</p>
        <p><strong>Precio:</strong> ${{ product.price }}</p>
        <p><strong>Categoría:</strong> {{ product.category }}</p>
        <p><strong>Descripción:</strong> {{ product.description }}</p>
        <div class="product-actions">
          <button @click="editProduct" class="edit-button">Editar</button>
          <button @click="deleteProduct" class="delete-button">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
  <p v-else>Cargando producto...</p>
</template>

<script setup>
  import { computed, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useProductStore } from "@/store/productStore.js";

  const route = useRoute();
  const router = useRouter();
  const store = useProductStore();
  const productId = parseInt(route.params.id);

  const product = computed(() => store.getProductById(productId));

  onMounted(async () => {
    if (!product.value) {
      await store.fetchProducts(); // Cargar productos si no están en la tienda
    }
  });

  const editProduct = () => {
    router.push({ name: "edit-product", params: { id: productId } });
  };

  const deleteProduct = () => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      store.deleteProduct(productId);
      console.log(`Producto con ID ${productId} eliminado`);
      router.push({ name: "home" });
    }
  };
</script>

<style scoped>
  .product-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .product-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .product-header h1 {
    font-size: 2em;
    color: #333;
  }

  .product-content {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .product-image-container {
    flex: 1 1 300px;
    text-align: center;
  }

  .product-image {
    width: 100%;
    max-width: 300px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .product-info {
    flex: 2 1 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .product-info p {
    font-size: 1.1em;
    margin-bottom: 10px;
    color: #555;
  }

  .product-info strong {
    color: #333;
  }

  .product-actions {
    margin-top: 20px;
    display: flex;
    gap: 10px;
  }

  .edit-button,
  .delete-button {
    flex: 1;
    padding: 10px 20px;
    font-size: 1em;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .edit-button {
    background-color: #007bff;
  }

  .edit-button:hover {
    background-color: #0056b3;
  }

  .delete-button {
    background-color: #dc3545;
  }

  .delete-button:hover {
    background-color: #c82333;
  }

  @media (max-width: 768px) {
    .product-content {
      flex-direction: column;
    }

    .product-info {
      align-items: center;
      text-align: center;
    }

    .product-actions {
      justify-content: center;
    }
  }
</style>
