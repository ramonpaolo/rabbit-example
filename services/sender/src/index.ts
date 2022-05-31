import express from 'express'
import dotenv from 'dotenv'

// Settings
import RabbitMQ from './settings/rabbitMQ'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000;

const rabbitMq = new RabbitMQ();

// Espera 8 segundos para o RabbitMQ fazer a conexão com o container, e ligar o servidor Express
setTimeout(async () => {
    await rabbitMq.connection()
    app.listen(PORT)
}, 8000)

// Rota para recebimento de mensagens para gravação no tópico
app.get('/sender/:message', async (req, res) => {
    await rabbitMq.sender('topic', String(req.params.message));
    res.status(200).json({
        status: 'success',
        message: 'Message send with success'
    })
})