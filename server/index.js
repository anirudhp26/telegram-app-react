const express = require("express");
const bodyParser = require("body-parser");
const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const cors = require("cors");
const mysql = require("mysql");
const Telebot = require('node-telegram-bot-api');
const app = express();
const PORT = process.env.PORT || 5000;
const bottoken = '6390332681:AAH7N0V7fVdZ3xjiyKVDmGzYt1JuKFr5EvU';
const bot = new Telebot(bottoken, { polling: true });
app.use(
	cors({
		origin: [
			"http://localhost:3000",
			"https://phoneauth-e0079.web.app",
			"https://telegram-app-react-j4sx.vercel.app",
		],
		credentials: true,
		methods: ["GET", "POST"],
	})
);
app.use(bodyParser.json());

const mysqlcon = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "anirudh2628*",
	database: "telegram-users",
});

const apiId = 23766603;
const apiHash = "db4d41372e1584d2ac372c1edad31e9a";
const stringSession = new StringSession(""); // fill this later with the value from session.save()
const client = new TelegramClient(stringSession, apiId, apiHash, {
	connectionRetries: 5,
});


function userinfo(id) {
	const q = `SELECT * FROM users WHERE id = ${id}`;
	mysqlcon.query(q, (err, responce) => {
		if (err) {
			return null;
		}
		return responce;
	});
}

app.post("/sendCode", async (req, res) => {
	await client.connect();
	const { phonenumber } = req.body;
	try {
		const result = await client.invoke(
			new Api.auth.SendCode({
				phoneNumber: phonenumber,
				apiId: apiId,
				apiHash: apiHash,
				settings: new Api.CodeSettings(),
			})
		);
		res.status(200).json({ status: "ok", result });
	} catch (error) {
		console.error("Send code error:", error);
		res.status(500).json({ status: "error", error: error.message });
	}
});

app.post("/verifyCode", async (req, res) => {
	const { code, phonenumber, phoneCodeHash } = req.body;
	const responce = await client.invoke(
		new Api.auth.SignIn({
			phoneNumber: phonenumber,
			phoneCodeHash: phoneCodeHash,
			phoneCode: code,
		})
	);
	if (responce) {
		const sessionString = await client.session.save();
		const qforcheck = `SELECT * FROM users WHERE id = '${responce.user.id}'`;
		mysqlcon.query(qforcheck, (err, user) => {
			if (err) {
				console.log(err);
				client.session.delete();
			} else if (user.length > 0) {
				const qforupdate = `UPDATE users SET sessionString = '${sessionString}' WHERE id = '${responce.user.id}'`;
				mysqlcon.query(qforupdate, (uerror, updatedUser) => {
					if (uerror) {
						console.log(uerror);
						client.session.delete();
						res.status(201).json({ status: "error", uerror });
					} else {
						const quserinfo = `SELECT * FROM users WHERE id = ${responce.user.id}`;
						mysqlcon.query(quserinfo, (gerr, gres) => {
							if (gerr) {
								res.status(201).json({ status: "error", gerr });
							} else {
								res.status(200).json({
									status: "ok",
									user: gres,
									sessionString,
								});
							}
						});
					}
				});
			} else {
				const qforinsert = `INSERT INTO users ( id, phone_number, sessionString, managed_channels_by_bot) VALUES ('${responce.user.id}', '${phonenumber}', '${sessionString}', '{"channels": []}')`;
				mysqlcon.query(qforinsert, (ierror, iuser) => {
					if (ierror) {
						client.session.delete();
						res.status(201).json({ status: "error", ierror });
					} else {
						const quserinfo = `SELECT * FROM users WHERE id = ${responce.user.id}`;
						mysqlcon.query(quserinfo, (gerr, gres) => {
							if (gerr) {
								res.status(201).json({ status: "error", gerr });
							} else {
								res.status(200).json({
									status: "ok",
									user: gres,
									sessionString,
								});
							}
						});
					}
				});
			}
		});
	} else {
		res.status(201).json({ status: "error" });
	}
});

app.post('/getjoinchannellink', async (req,res) => {
	const channelId = req.body.channelId;
	bot.sendMessage("-100" + channelId, "Hello");
	bot.createChatInviteLink("-100" + channelId, form={ name: 'name', member_limit: 1 })
    .then(inviteLink => {
        console.log('Invite link:', inviteLink);
    })
    .catch(error => {
        console.error('Error:', error);
    });
})

app.post("/telegramlogout", async (req, res) => {
	const { sessionString } = req.body;
	const stringSession = new StringSession(sessionString); // fill this later with the value from session.save()
	const client = new TelegramClient(stringSession, apiId, apiHash, {
		connectionRetries: 5,
	});
	await client.connect();
	const result = await client.invoke(new Api.auth.LogOut({}));
	res.status(200).json({ status: "ok" });
});

app.post("/createChannel", async (req, res) => {
	const { title, description, sessionString, userid } = req.body;
	try {
		const stringSession = new StringSession(sessionString); // fill this later with the value from session.save()
		const client = new TelegramClient(stringSession, apiId, apiHash, {
			connectionRetries: 5,
		});
		await client.connect();
		const createChannelResponse = await client.invoke(
			new Api.channels.CreateChannel({
				broadcast: true,
				title: title,
				about: description,
			})
		);

		const botUsername = "anirudh_testbot";
		const botResponse = await client.invoke(
			new Api.contacts.ResolveUsername({
				username: botUsername,
			})
		);

		const adminAccessResponse = await client.invoke(
			new Api.channels.EditAdmin({
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
					inviteUsers: true,
				}),
				rank: "Admin",
			})
		);

		const quserinfo = `SELECT * FROM users WHERE id = ${userid}`;
		mysqlcon.query(quserinfo, (gerr, gres) => {
			if (gerr) {
				res.status(201).json({ status: "error", gerr });
			} else {
				const channels = JSON.parse(gres[0].managed_channels_by_bot);
				channels.channels.push({
					id: createChannelResponse.chats[0].id,
					accessHash: createChannelResponse.chats[0].accessHash,
					name: createChannelResponse.chats[0].title
				});
				const qupdate = `UPDATE users SET managed_channels_by_bot = '${JSON.stringify(
					channels
				)}' WHERE (id = ${userid});`;
				gres[0].managed_channels_by_bot = channels;
				mysqlcon.query(qupdate, (uerr, uresponce) => {
					if (uerr) {
						res.status(201).json(uerr);
					} else {
						res.status(200).json({ status: 'ok', user: gres });
					}
				});
			}
		});
	} catch (error) {
		console.error("Create channel error:", error);
		res.status(500).json({ status: "error", error: error.message });
	}
});
app.post("/addExistingChannel", async (req, res) => {
	const { channelId, accessHash, sessionString } = req.body;
	try {
		const stringSession = new StringSession(sessionString); // fill this later with the value from session.save()
		const client = new TelegramClient(stringSession, apiId, apiHash, {
			connectionRetries: 5,
		});
		await client.connect();

		const botUsername = "anirudh_testbot";
		const botResponse = await client.invoke(
			new Api.contacts.ResolveUsername({
				username: botUsername,
			})
		);

		const adminAccessResponse = await client.invoke(
			new Api.channels.EditAdmin({
				channel: new Api.InputChannel({
					channelId: channelId,
					accessHash: accessHash,
				}),
				userId: botResponse.users[0].id,
				adminRights: new Api.ChatAdminRights({
					changeInfo: true,
					postMessages: true,
					editMessages: true,
					deleteMessages: true,
					inviteToChannel: true,
					inviteUsers: true,
					inviteToChat: true,
					pinMessages: true,
					addAdmins: true,
					manageCall: true,
				}),
				rank: "Admin",
			})
		);

		res.status(200).json({
			status: "ok",
			adminAccessResponse: adminAccessResponse,
		});
	} catch (error) {
		console.error("Create channel error:", error);
		res.status(500).json({ status: "error", error: error.message });
	}
});

app.post("/getchannels", async (req, res) => {
	const { sessionString } = req.body;
	try {
		const stringSession = new StringSession(sessionString);
		const client = new TelegramClient(stringSession, apiId, apiHash, {
			connectionRetries: 5,
		});
		await client.connect();
		const createdChannels = await client.invoke(
			new Api.messages.GetDialogs({
				excludePinned: true,
				offsetDate: 0,
				offsetId: 0,
				offsetPeer: new Api.InputPeerEmpty(),
				limit: 100,
			})
		);
		res.status(200).json({
			status: "ok",
			createdChannels: createdChannels.chats,
		});
	} catch (error) {
		console.log(error);
	}
});

app.post("/editUserchannels", (req, res) => {
	const { channels, id } = req.body;
	const q = `UPDATE users SET managed_channels_by_bot = '${JSON.stringify(
		channels
	)}' WHERE (id = ${id});`;
	mysqlcon.query(q, (err, responce) => {
		if (err) {
			return res.status(201).json(err);
		}
		res.json(responce);
	});
});

app.post("/getchannelssql", (req, res) => {
	const q = `SELECT managed_channels_by_bot FROM users WHERE id = '1'; `;
});

app.get("/", (req, res) => {
	res.json("Hello the backend is working properly");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
