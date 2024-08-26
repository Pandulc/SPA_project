<template>
  <div class="product-form">
    <h2> producto</h2>
    <form @submit.prevent="submitForm">

      <input v-model="name" type="text" placeholder="Nombre" required />
      <input v-model="price" type="number" placeholder="Precio" required />
      <textarea v-model="description" placeholder="Descripción"></textarea>
      <button type="submit">Guardar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const price = ref('');
const description = ref('');

const submitForm = () => {
  // Lógica para enviar el formulario
};
</script>