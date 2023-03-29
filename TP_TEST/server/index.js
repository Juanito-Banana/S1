import express from "express";
import { nanoid } from "nanoid";
import data from "./data/users.json"  assert { type: "json" };
import UserModel from "./UserModel";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
const port = 8000;
const message404 = "what???";

function hydrate(newUser) {
    const user = {};

    user.gender = newUser.gender ?? null;
    user.firstname = newUser.firstname ?? null;
    user.lastname = newUser.lastname ?? null;
    user.email = newUser.email ?? null;
    user.password = newUser.password ? bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10)) : null;
    user.phone = newUser.phone ?? null;
    user.city = newUser.city ?? null;
    user.photo = newUser.photo ?? null;
    user.category = newUser.category ?? null;
    user.isAdmin = newUser.isAdmin ?? null;

    return user;
}

app.get("/api/users", (req, res) => {
    res.json(data)
});

app.get("/api/user/:id", (req, res) => {
    const { id } = req.params;
    const user = data.filter(user => user.id === id)[0];

    if (!user) {
        res.status(404).send(message404);

        return;
    }

    res.json(user);
});

app.post("/api/user", (req, res, next) => {
    const newUser = hydrate(req.body)

    if (!newUser) {
        res.status(400).json({
            error: "not created"
        })

        return;
    }

    newUser.id = nanoid();
    data = data.concat(newUser);

    res.status(201).json({ message: "created" });
});

app.put("/api/user/:id", (req, res, next) => {
    const newUser = hydrate(req.body)

    if (!newUser) {
        res.status(400).json({
            error: "not created"
        })

        return;
    }

    newUser.id = nanoid();
    data = data.concat(newUser);

    res.status(201).json({ message: "created" });
});

app.delete('/api/user/:id', (req, res, next) => {
    const user = data.filter(u => u.id === req.params.id);

    if (!user) {
        res.status(404).send(message404);

        return;
    }

    data = data.filter(u => u.id !== req.params.id);
});

app.get('*', (req, res) => {
    res.status(404).send(message404);
});

app.listen(port, () => {
    console.log(`Express server listening on http://localhost:${port}`);
});
