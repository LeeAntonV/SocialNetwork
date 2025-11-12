import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept", "Authorization"],
        credentials: false,
}));

app.use(express.json());

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    res.send({status: 200});
})

app.get("/register", (req, res) => {
})

app.listen(8000)