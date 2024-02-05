<!-- components/ApiButton.vue -->
<template>
  <button @click="pagar">Disparar API</button>
</template>
  
  <script>
import axios from "axios";

export default {
  methods: {
    async pagar() {
      try {
        const response = await axios.post(
          "https://localhost:3000/api/conta-pagar/pagar",
          {}
        );
        console.log("Resposta da API:", response.data);
        // Adicione qualquer lógica adicional aqui
      } catch (error) {
        console.error("Erro ao chamar a API:", error);
      }
    },
  },
};
</script>
  
  <style scoped>
/* Estilos específicos para este componente */
</style>
  