import amqplib from 'amqplib'
import { writeFile } from '../controllers/file-controller';

export default class RabbitMQ {

    private rabbitMq: amqplib.Connection | undefined;
    private channel: amqplib.Channel | undefined;

    async connection(){
        this.rabbitMq = await amqplib.connect({
            hostname: 'rabbitmq',
            password: String(process.env.PASSWORD_RABBITMQ),
            username: String(process.env.USERNAME_RABBITMQ),
        })

        // this.rabbitMq = await amqplib.connect(String(process.env.URL_RABBITMQ))

        console.log('Conexão feita com sucesso')
        this.channel = await this.rabbitMq.createChannel()
        console.log('Canal criado com sucesso')
    }

    async consumer(queue: string){
        await this.channel?.assertQueue(queue)
        await this.channel?.consume(queue, async (message) => {
            if(message === null) return;

            console.log(message.content.toString())

            // Escreva a mensagem recebida, em um arquivo text.txt
            await writeFile(message.content.toString())

            // Após processar a mensage, apaga ela da fila/tópico
            this.channel?.ack(message)
        })
    }
}