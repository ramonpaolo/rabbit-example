# Example RabbitMQ - Medium

- [O que é esse projeto?](#o-que-é-esse-projeto)
- [Como rodar o projeto?](#como-rodar-o-projeto)
- [Como o projeto funciona?](#como-o-projeto-funciona)
- [Problemas*](#problemas)

# O que é esse projeto?
Esse projeto, é fruto de um artigo feito no Medium, para explicar sobre o RabbitMQ.

Nesse projeto, você verá que está sendo utilizado uma arquitetura microservices, onde o RabbitMQ(Message Broker) tem o seu destaque, para fazer a comunicação entre os serviços. 

Tópicos abordados no Artigo/Projeto:
- O que é o RabbitMQ e o AMQP?
- Para que utilizar o RabbitMQ?
- Quais empresas utilizam o RabbitMQ?
- Como utilizar o RabbitMQ no NodeJs
- Boas práticas de segurança/robustez
- Como utilizar RabbitMQ na Nuvem

# Como rodar o projeto?
Para rodar o projeto em sua máquina, basta clonar o repositório em sua máquina, e certificar que o Docker Daemon esteja rodando.
```bash
# Clonando o repositório
$ git clone https://github.com/ramonpaolo/rabbit-example.git

# Entrando no projeto
$ cd rabbit-example

# Subir os conteiners
$ docker-compose up --build -d
```

Após isso, poderá visitar a URL: [http://localhost/sender/Testando](http://localhost/sender/Testando), onde será enviado a mensagem "Testando", para um tópico do RabbitMQ, onde outro serviço irá ouvir a mensagem.

E poderá visitar a URL: [http://localhost/](http://localhost/), para visualizar os dados recebidos pelo RabbitMQ.

---

# Como o projeto funciona?

Ao fazer requisição GET para o endpoint *"/sender/Message"*, o Express irá receber a requisição, e irá enviar uma mensagem para o tópico "topic", usando o RabbitMQ. Após o envio da mensagem, o serviço "consumer", irá ouvir(consumir) a mensagem, e salvar a mensagem, em um arquivo .txt, para quando for requisitado pelo endpoint "/", o nodejs possa ler o arquivo e entregar o conteúdo para o usuário do outro serviço.

NGINX está sendo utilizado para fazer load balacing dos serviços, podendo assim, fazer quantas replicas de serviço, você desejar.

---

# Problemas*
Não é bem um problema, pois na verdade, é uma solução de um problema, mas não é bem aceito.

Quando se utiliza o RabbitMQ no Docker, ele demora alguns segundos para ficar pronto, e liberar a conexão do servidor RabbitMQ para os outros conteiners. E infelizmente, quando a aplicação NodeJs começa a rodar, o serviço RabbitMQ ainda não ficou totalmente funcional, logo, temos que dar um pequeno "delay" para a aplicação NodeJs se conectar com o RabbitMQ local.

Esse problema poderia ser contornado, podendo utilizar o wait-for-it.sh.
Porem, nesse caso, acabei utilizando o <kbd>setTimeout()</kbd>, pois precisei utilizar apenas 2 linhas de código, para solucionar esse problema. Solução simples, que não depende de terceiros(shell script de outros).

Caso o usuário for utilizar o RabbitMQ com a CloudAMQP, não precisa utilizar esse delay na aplicação NodeJs, podendo retirar o setTimeout, sem problemas.

Por padrão, defini o delay do <kbd>setTimeout()</kbd>, em 8000ms(8s), para dar tempo para o serviço do RabbitMQ ficar totalmente online e operante.

---

![GitHub top language](https://img.shields.io/github/languages/top/ramonpaolo/rabbit-example)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ramonpaolo/rabbit-example)
![GitHub](https://img.shields.io/github/license/ramonpaolo/rabbit-example)
