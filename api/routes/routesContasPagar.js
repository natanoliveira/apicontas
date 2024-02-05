// routes/contasPagarRoutes.js
const express = require('express');
const contasPagarController = require('../controller/contasPagarController');

const router = express.Router();

// Rota para listar todas as contas a pagar
router.get('/', contasPagarController.listAll);

// Rota para criar uma nova conta a pagar
router.post('/', contasPagarController.create);

router.post('/retro', contasPagarController.createRetro);

router.put('/pagar', contasPagarController.payBill);

module.exports = router;
