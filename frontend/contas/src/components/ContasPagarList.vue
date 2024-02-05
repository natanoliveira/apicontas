<!-- ContasPagarList.vue -->
<template>
  <div>
    <h2>Lista de Contas a Pagar</h2>

    <ul>
      <li
        v-for="conta in contas"
        :key="conta.id"
        @conta-marcada-como-paga="atualizarListaContas"
      >
        {{ conta.descricao }} - {{ conta.pago == "SIM" ? "Pago" : "Não Pago" }}
        <button
          @click="marcarComoPago(conta.id)"
          :disabled="conta.pago == 'SIM'"
        >
          Marcar como Pago
        </button>
      </li>
    </ul>
  </div>
</template>
  
  <script>
import axios from "axios";

export default {
  data() {
    return {
      contas: [],
    };
  },
  created() {
    this.fetchContas();
  },
  methods: {
    async fetchContas() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/contas-pagar"
        );
        console.log(response.data);
        this.contas = response.data;
      } catch (error) {
        console.error("Erro ao buscar contas:", error);
      }
    },
    async marcarComoPago(idConta) {
      try {
        const response = await axios.put(
          "http://localhost:3000/api/contas-pagar/pagar",
          {
            id: idConta,
          }
        );

        console.log("Resposta da API:", response.data);
        if (response.data.success) {
          this.$emit("conta-marcada-como-paga"); // Emitir evento personalizado
        }
        // Atualize o estado local ou faça algo mais conforme necessário
      } catch (error) {
        console.error("Erro ao chamar a API:", error);
      }
    },
    atualizarListaContas() {
      this.fetchContas();
      // Recarregar a lista de contas após marcar como pago
      console.log("Lista de contas atualizada após marcar como pago.");
      // Aqui você pode chamar uma função para carregar novamente a lista de contas da sua API
      // this.carregarListaContas();
    },
  },
};
</script>
  
  <style scoped>
/* Estilos específicos para este componente */
</style>
  