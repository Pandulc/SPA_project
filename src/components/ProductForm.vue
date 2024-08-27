<template>
  <div class="product-form">
    <h2>{{ isEditing ? "Editar Producto" : "Cargar Producto" }}</h2>
    <form @submit.prevent="submitForm">
      <input
        v-model="productData.title"
        type="text"
        placeholder="Título"
        required
      />
      <input
        v-model="productData.category"
        type="text"
        placeholder="Categoría"
        required
      />
      <input
        v-model="productData.price"
        type="number"
        placeholder="Precio"
        required
      />
      <textarea
        v-model="productData.description"
        placeholder="Descripción"
        required
      ></textarea>
      <input
        v-model="productData.image"
        type="url"
        placeholder="URL de la Imagen"
        required
      />
      <button type="submit">
        {{ isEditing ? "Guardar Cambios" : "Guardar" }}
      </button>
    </form>
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { useRouter } from "vue-router";
  import { useProductStore } from "@/store/productStore.js";

  const props = defineProps({
    isEditing: {
      type: Boolean,
      required: true,
    },
    initialData: {
      type: Object,
      required: false,
    },
  });

  const productData = ref({
    title: "",
    category: "",
    price: "",
    description: "",
    image: "",
    rating: {
      rate: 0,
      count: 0,
    },
  });

  onMounted(() => {
    if (props.isEditing && props.initialData) {
      productData.value = { ...props.initialData };
    }
  });

  const router = useRouter();
  const productStore = useProductStore();

  const submitForm = () => {
    const product = {
      title: productData.value.title,
      category: productData.value.category,
      price: productData.value.price,
      description: productData.value.description,
      image: productData.value.image,
      rating: productData.value.rating,
    };
    console.log("INITIAL DATA \n", props.initialData);
    console.log("PRODUCT DATA \n", product);
    if (props.isEditing) {
      product.id = props.initialData.id;
      productStore.updateProduct(product);
      router.push({ name: "product-details", params: { id: product.id } });
    } else {
      product.id = productStore.products.length + 1;
      productStore.addProduct(product);
      router.push({ name: "home" });
    }
  };
</script>
