const express = require('express');
const bodyParser = require('body-parser');
const { Api, TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST"]
}))
app.use(bodyParser.json());



const apiId = 23766603;
const apiHash = "db4d41372e1584d2ac372c1edad31e9a";
const stringSession = new StringSession(""); // fill this later with the value from session.save()
const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
});

app.post("/sendCode", async (req, res) => {
    await client.connect();
    const { phonenumber } = req.body;
    try {
        const result = await client.invoke(new Api.auth.SendCode({
            phoneNumber: phonenumber,
            apiId: apiId,
            apiHash: apiHash,
            settings: new Api.CodeSettings(),
        }));
        res.status(200).json({ status: 'ok', result });
    } catch (error) {
        console.error('Send code error:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
})

app.post("/verifyCode", async (req, res) => {
    const { code, phonenumber, phoneCodeHash } = req.body;
    const responce = await client.invoke(new Api.auth.SignIn({
        phoneNumber: phonenumber,
        phoneCodeHash: phoneCodeHash,
        phoneCode: code,
    }));
    await client.session.save();
    res.status(200).json({ status: 'ok', result: responce });
})

app.post("/createChannel", async (req, res) => {
    const { title, description } = req.body;
    try {
        // Create the channel
        const createChannelResponse = await client.invoke(new Api.channels.CreateChannel({
            broadcast: true,
            title: title,
            about: description,
        }));

        // Resolve the bot's username to get its user ID and access hash
        const botUsername = 'anirudh_testbot'; // Replace with the actual bot's username
        const botResponse = await client.invoke(new Api.contacts.ResolveUsername({
            username: botUsername,
        }));

        // Make the bot an admin of the newly created channel
        const adminAccessResponse = await client.invoke(new Api.channels.EditAdmin({
            channel: createChannelResponse.chats[0],
            userId: botResponse.users[0].id,
            adminRights: new Api.ChatAdminRights({
                changeInfo: true,
                postMessages: true,
                editMessages: true,
                deleteMessages: true,
                inviteToChannel: true,
                inviteToChat: true,
                pinMessages: true,
                addAdmins: true,
                manageCall: true,
            }),
            rank: "Admin",
        }));
        // Send the response to the frontend
        res.status(200).json({
            status: 'ok',
            channelResponse: createChannelResponse,
            adminAccessResponse: adminAccessResponse,
        });
    } catch (error) {
        console.error('Create channel error:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
