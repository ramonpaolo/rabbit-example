FROM rabbitmq

ENV RABBITMQ_DEFAULT_USER user
ENV RABBITMQ_DEFAULT_PASS password

EXPOSE 5672