import express from 'express'
import dotenv from 'dotenv'
import os from 'os'

// Settings
import RabbitMQ from './settings/rabbitMQ'

// Controllers
import { readFile } from './controllers/file-controller'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000;

const rabbitMQ = new RabbitMQ();

// Espera 8 segundos para o RabbitMQ fazer a conexão com o container, ligar o servidor Express e 'ouvir' o tópico 'topic'
setTimeout(async () => {
    await rabbitMQ.connection()
    await rabbitMQ.consumer('topic')
    app.listen(PORT)
}, 8000)

app.get('/', async (_, res) => {
    let text = '';
    
    try {
        text = await readFile()
    } catch (e) {
        // Faça nada;
    }

    res.status(200).json({
        status: 'success',
        message: 'Project is working : )',
        text,
        host: os.hostname(),
    })
})