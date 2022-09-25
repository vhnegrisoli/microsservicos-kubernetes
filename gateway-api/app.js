import express from 'express';
import axios from 'axios';

import log from './log.js';

const app = express();

const env = process.env;

const PORT = env.PORT || 8080;
const STORAGE_URL = env.STORAGE_URL || 'http://localhost:8081/api/storage';

app.use(express.json());

app.post('/api/data', async (req, res) => {
    try {
        let data = {};
        let body = req.body;
        log(req, null, null, 'REQUEST');
        await axios
            .post(STORAGE_URL, body, { headers: { tracing: req.headers.tracing } })
            .then(res => {
                data.status = res.status;
                data.data = res.data;
            }).catch(err => {
                console.log(err.response.status)
                data.status = err.response.status;
                data.error = err.response.message;
            });
        log(req, JSON.stringify(data), 200, 'RESPONSE');
        return res
            .status(data.status)
            .json(data);
    } catch (error) {
        let status = error.status ? error.status : 500;
        let message = error.message ? error.message : 'Internal Server Error.';
        log(req, message, status, 'RESPONSE');
        return res.status(status).json({ status, message });
    }
})

app.listen(PORT, () => {
    console.info(`App started at port ${PORT}.`)
});