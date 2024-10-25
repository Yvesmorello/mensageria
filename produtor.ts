import amqp from 'amqplib';

async function sendMessage() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const queue = 'task_queue';
        const message = 'Processar pedido #12345';

        await channel.assertQueue(queue, {
            durable: true, 
        });

        channel.sendToQueue(queue, Buffer.from(message), {
            persistent: true, 
        });

        console.log(`Mensagem enviada: ${message}`);

        setTimeout(() => {
            channel.close();
            connection.close();
        }, 500);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
}

sendMessage();
