<template>
    <div>
        <h1>Detalles del Producto</h1>
        <p><strong>Nombre:</strong> {{ product.name }}</p>
        <p><strong>Precio:</strong> {{ product.price }}</p>
        <p><strong>Descripción:</strong> {{ product.description }}</p>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        const productId = route.params.id;

        // Aquí deberías buscar el producto basado en el ID, simularemos uno por ahora
        const product = ref({
            id: productId,
            name: 'Producto ' + productId,
            price: 100 + parseInt(productId),
            description: 'Descripción del producto ' + productId,
        });

        return {
            product,
        };
    },
};
</script>