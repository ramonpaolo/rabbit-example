import amqplib from 'amqplib'

export default class RabbitMQ {

    private rabbitMq: amqplib.Connection | undefined;
    private channel: amqplib.Channel | undefined;

    async connection() {
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

    async sender(queue: string, message: string) {
        await this.channel?.assertQueue(queue, {
            // messageTtl: 60,
            // expires: 60,
            // deadLetterExchange: 'dead-topic'
        })

        this.channel?.sendToQueue(queue, Buffer.from(message))
    }

}