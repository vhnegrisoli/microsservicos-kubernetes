import express from 'express';

import { connectMongoDb } from './mongodb.js';
import Storage from './Storage.js';

import log from './log.js';

const app = express();

const PORT = process.env.PORT || 8081;

app.use(express.json());

connectMongoDb();

app.post('/api/storage', async (req, res) => {
    try {
        let { status, data, originService } = req.body;
        log(req, null, null, 'REQUEST');
        let storageData = {
            status,
            data,
            originService,
            currentService: 'storage-api',
            createdAt: new Date()
        };
        storageData = await Storage.create(storageData);
        log(req, JSON.stringify(storageData), 200, 'RESPONSE');
        return res
            .status(200)
            .json({ status: 200, response: storageData });
    } catch (error) {
        let status = error.status ? error.status : 500;
        let message = error.message ? error.message : 'Internal Server Error.';
        log(req, message, status, 'RESPONSE');
        return res.status(status).json({ status, message });
    }
});

app.listen(PORT, () => {
    console.info(`App started at port ${PORT}.`)
});