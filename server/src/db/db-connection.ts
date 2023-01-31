import mongoose, { ConnectOptions } from "mongoose";
import config from "../config/config";

import logger from "../utils/logger";

// connect nodejs app to mongodb
export default async function createDBConnection() {
    const MONGO_USER = config.MONGO_USER;
    const MONGO_PASSWORD = config.MONGO_PASSWORD;
    const MONGO_CLUSTER = config.MONGO_CLUSTER;
    const MONGO_DB_NAME = config.MONGO_DB_NAME;

    const mongoDbConnectionURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

    mongoose.set("strictQuery", false);

    try {
        await mongoose.connect(mongoDbConnectionURI, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);
        logger.info("Database connection successful");
    } catch (error) {
        logger.info("Database connection failed");
        process.exit(1);
    }
}