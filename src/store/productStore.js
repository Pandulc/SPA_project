import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        this.products = response.data;

      } catch (error) {
        this.error = 'Error al cargar los productos';
      } finally {
        this.loading = false;
        console.log(this.loading, this.error)
      }
    },

    async addProduct(product) {
      const response = await axios.post('https://fakestoreapi.com/products', product, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.products.push(product);
    },

    async deleteProduct(id) {
      const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);
      this.products = this.products.filter((product) => product.id !== id);
    },

    async updateProduct(product) {
      const response = await axios.put(`https://fakestoreapi.com/products/${product.id}`, product, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const index = this.products.findIndex((p) => p.id === product.id);

      if (index !== -1) {
        this.products[index] = response.data;
      }
    },

  },

  getters: {
    // Getter opcional para filtrar productos o hacer otras operaciones
    getProductById: (state) => (id) => state.products.find((product) => product.id === id),
  },
});
