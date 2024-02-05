// controllers/contasPagarController.js
const ContasPagar = require('../model/contasPagar');

// Lista todas as contas a pagar
exports.listAll = async (req, res) => {
    try {
        const contasPagar = await ContasPagar.findAll();
        res.json(contasPagar);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar contas a pagar.' });
    }
};

exports.create = async (req, res) => {

    const { descricao, mes, ano } = req.body;

    try {
        // Verifica se há registro para o mesmo mes e ano. 
        const existente = await ContasPagar.findOne({ where: { descricao: descricao, mes: mes, ano: ano } });

        if (existente) {
            return res.status(404).json({ success: false, message: 'Conta já cadastrada para este mês e ano.' });
        }

        const novaConta = await ContasPagar.create({
            descricao,
            mes,
            ano
        });
        res.json(novaConta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar conta a pagar.' });
    }
};

exports.payBill = async (req, res) => {
    const { id } = req.body;

    try {
        if (!id) {
            return res.status(400).json({ success: false, message: 'ID da conta é necessário.' });
        }

        const conta = await ContasPagar.findByPk(id);

        if (!conta) {
            return res.status(404).json({ success: false, message: 'Conta não encontrada.' });
        }

        conta.pago = 'SIM';
        conta.dataPagamento = new Date();
        await conta.save();

        return res.json({ success: true, message: 'Conta marcada como paga com sucesso.' });
    } catch (error) {
        console.error('Erro ao marcar como pago:', error);
        return res.status(500).json({ success: false, message: 'Erro ao marcar como pago.' });
    }
};

exports.createRetro = async (req, res) => {
    try {
        // Assumindo que o array de dados está no req.body como req.body.dados
        const dados = req.body.dados;
        const mes = req.body.mes;
        const ano = req.body.ano;

        const arrayDados = dados.split(';');

        // Abre a transação fora do loop
        const t = await ContasPagar.sequelize.transaction();

        try {
            // Itera sobre o array de dados e cria uma conta para cada item que contém 'OK'
            for (const dado of arrayDados) {

                // Quebrando o item para saber se foi pago
                let [descricao, flag] = dado.split('-');

                // Verificando se a segunda parte está preenchida pois quando não vier nada ela não foi pago
                pago = flag.trim() ? 'SIM' : 'NAO';
                descricao = descricao.trim().toUpperCase();

                // Verifica se há registro para o mesmo mes e ano. 
                const existente = await ContasPagar.findOne({ where: { descricao: descricao, mes: mes, ano: ano } });

                // Só insere se não existir a mesma massa de dados por mes e ano.
                // Evitando assim a duplicidade de registros.
                if (!existente) {
                    await ContasPagar.create({
                        descricao,
                        mes: mes, // Adicione o mês desejado
                        ano: ano, // Adicione o ano desejado
                        pago: pago, // Ajuste conforme necessário
                    }, { transaction: t });
                    console.log(`Conta criada dentro do loop: ${descricao}`);
                }

            }

            // Confirma a transação se tudo estiver bem-sucedido
            await t.commit();

            console.log('Transação confirmada.');
            res.json({ message: 'Contas criadas com sucesso.' });
        } catch (error) {
            // Desfaz a transação em caso de erro no loop
            await t.rollback();

            console.error('Erro durante o loop:', error);
            res.status(500).json({ error: 'Erro ao criar contas a pagar.' });
        }
    } catch (error) {
        console.error('Erro ao abrir a transação:', error);
        res.status(500).json({ error: 'Erro ao criar contas a pagar.' });
    }
};