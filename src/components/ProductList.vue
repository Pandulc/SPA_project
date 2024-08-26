<template>
  <div class="product-list">
    <ProductItem v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script setup>
import { useProductStore } from '@/store/productStore.js';
import { computed } from 'vue';
import ProductItem from '@/components/ProductItem.vue';

const productStore = useProductStore();
const products = computed(() => productStore.products);
</script>
