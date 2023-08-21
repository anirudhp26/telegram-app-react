const express = require('express');
const bodyParser = require('body-parser');
const { Api, TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const cors = require('cors');
const apiId = 23766603;
const apiHash = "db4d41372e1584d2ac372c1edad31e9a";
const stringSession = new StringSession(""); // fill this later with the value from session.save()


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST"]
}))

app.use(bodyParser.json());

app.post('/subscribe', (req, res) => {
    const { userId, channelName, subscriptionEndDate } = req.body;
    res.status(200).json({ message: 'Subscription successful' });
});

const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
});

client.connect();

app.post("/sendCode", async (req, res) => {
    const { phonenumber } = req.body;
    (async () => {
        const result = await client.invoke(new Api.auth.SendCode({
            phoneNumber: phonenumber,
            apiId: apiId,
            apiHash: apiHash,
            settings: new Api.CodeSettings(),
        }));
        res.status(200).json({ status: 'ok', result })
    })();
})

app.post("/verifyCode", async (req, res) => {
    const { code, phonenumber, phoneCodeHash } = req.body;
    const responce = await client.invoke(new Api.auth.SignIn({
        phoneNumber: phonenumber,
        phoneCodeHash: phoneCodeHash,
        phoneCode: code,
    }));
    console.log(client.session.save());
    console.log(stringSession.save());
    console.log(responce);
    res.status(200).json({ status: 'ok', result: responce });
})

app.post("/createChannel", async (req, res) => {
    const { title, description } = req.body;
    const responce = await client.invoke(new Api.channels.CreateChannel({
        broadcast: true,
        title: title,
        about: description,
    }));
    console.log(responce);
    res.status(200).json({ status: 'ok', result: responce });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
