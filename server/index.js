const express = require("express");
const cors = require("cors");
//Import Database
const Database = require("@replit/database");
const authKey = require("./config/auth");

//Create Database
const db = new Database();


const App = express();
const PORT = process.env.PORT || 8000;

App.use(express.json());
App.use(cors());

App.get("/all", async (req, res) => {
    try {
        await db.list().then(async (emails) => {
            const list = [];
            for (let i = 0; i < emails.length; i++) {
                list.push(await (async () => await db.get(emails[i]).then((value) => value))());
            }
            res.status(200).end(JSON.stringify({ "data": list }));
        }).catch(() => {
            res.end("Error! From the list");
        });
    } catch (error) {
        res.end(error);
    }
});

App.get("/clear-all-data/:auth", async (req, res) => {
    try {
        await db.list().then(async (emails) => {
            await new Promise((resolve) => resolve(emails.forEach(async (value) => {
                if (req.params["auth"] == authKey) {
                    await db.delete(value);
                }
            })));
        }).catch(() => {
            res.end("Error! From the list");
        });
        if (req.params["auth"] == authKey) {
            res.end("Successfully Deleted All Data!");
        } else{
            res.end("Invalid authorization key!");
        }
    } catch (error) {
        res.end(error);
    }
})



App.post("/get", async (req, res) => {
    try {
        if (req.body.email != undefined) {
            (async () => {
                const email = req.body.email;
                await db.get(email).then((value) => {
                    res.status(200).end(JSON.stringify(value));
                }).catch(() => {
                    res.end("Error! From trying to get data using the email");
                });
            })()
        }
    } catch (error) {
        res.end(error);
    }
});


App.post("/", async (req, res) => {
    try {
        if ((req.body.email != undefined) && (req.body.password != undefined)) {
            const password = req.body.password;
            const email = req.body.email;
            const data = {
                "email": email,
                "password": password
            }
            await db.set(email, data).then(() => {
                res.status(200).end("Stored");
            }).catch(() => {
                res.end("Error! While Saving");
            });
        }
    } catch (error) {
        res.end(error)
    }
});

App.delete("/", async (req, res) => {
    try {
        if (req.body.email != undefined) {
            const email = req.body.email;
            await db.delete(email).then(() => {
                res.status(200).end("Deleted");
            }).catch(() => {
                res.end("Error! While Deleting");
            });
        }
    } catch (error) {
        res.end(error)
    }
});

App.all("*", (req, res) => {
    res.end("Invalid Url");
})

App.listen(PORT, () => {
    console.log("Listening at PORT ", PORT);
})