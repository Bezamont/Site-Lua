require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/criar-pagamento', async (req, res) => {
  try {

    const apiKey = process.env.PAGARME_API_KEY;
    const auth = Buffer.from(`${apiKey}:`).toString('base64');

    const response = await axios.post(
      'https://api.pagar.me/core/v5/orders',
      {
        items: [
          {
            amount: req.body.valor,
            description: req.body.produto,
            quantity: 1
          }
        ],
        customer: {
          name: req.body.cliente.nome,
          email: req.body.cliente.email,
          type: 'individual',
          document: req.body.cliente.cpf.replace(/\D/g, '')
        },
        payments: [
          {
            payment_method: 'credit_card',
            credit_card: {
              card: {
                number: req.body.cartao.numero,
                holder_name: req.body.cliente.nome,
                exp_month: req.body.cartao.validade.slice(0, 2),
                exp_year: `20${req.body.cartao.validade.slice(2)}`,
                cvv: req.body.cartao.cvv
              }
            }
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
        }
      }
    );

    res.json({
      status: response.data.status,
      order_id: response.data.id
        });

    } catch (error) {
    console.error(' ERRO COMPLETO DO PAGAR.ME ');

    if (error.response) {
        console.error('STATUS:', error.response.status);
        console.error('DATA:', JSON.stringify(error.response.data, null, 2));
        console.error('HEADERS:', error.response.headers);
    } else {
        console.error('ERRO:', error.message);
    }

    res.status(500).json({
        erro: 'Erro ao processar pagamento'
        });
    }
});

app.listen(3000, () => {
    console.log(' Backend rodando em http://localhost:3000');
});
