declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            
            PASSWORD_RABBITMQ: string;
            USERNAME_RABBITMQ: string;
            
            URL_RABBITMQ: string;
            HOST_CLOUD_RABBITMQ: string;
            USERNAME_CLOUD_RABBITMQ: string;
            PASSWORD_CLOUD_RABBITMQ: string;
            PORT_CLOUD_RABBITMQ: number;
        }
    }
}
export { }
