const path = require('path');

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const { Client } = require('pg');
const { dbConnect } = require("./server");

const client = new Client({
    host: 'localhost',
    database: 'battleship-db',
    user: 'postgres',
    password: 'postgres',
    port: 5432,
});

client.connect().then(() => {
    try {
        dbConnect().then();
        app.use(express.static(`${__dirname}/build/`));

        app.get('/*', (req, res) => {
            res.sendFile(path.join(`${__dirname}/build/index.html`));
        });

        app.listen(PORT, () => {
            // eslint-disable-next-line no-console
            console.log(`App start on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.log('connect', err);
    }
});
