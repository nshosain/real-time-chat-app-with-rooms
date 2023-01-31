import 'dotenv/config'

interface IConfig {
    PORT: string;
    MONGO_USER: string;
    MONGO_PASSWORD: string;
    MONGO_CLUSTER: string;
    MONGO_DB_NAME: string;
    CORS_OPTIONS: any;
}

const config: IConfig = {
    PORT: process.env.PORT || '4000',
    MONGO_USER: process.env.MONGO_USER || '',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || '',
    MONGO_CLUSTER: process.env.MONGO_CLUSTER || '',
    MONGO_DB_NAME: process.env.MONGO_DB_NAME || '',
    CORS_OPTIONS: {
        origin: process.env.ORIGIN || '',
        methods: ["GET", "POST"],
    },
};

export default config;