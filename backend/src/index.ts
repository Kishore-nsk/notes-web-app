import express, {Request, Response} from 'express';
import jwt from "jsonwebtoken";
const cors = require("cors");
import pool from "./db"
import authMiddleware  from "./auth";

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));
const port = process.env.PORT || 3000;

async function createInitialTable() {
    const createNotesTable = `CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        description VARCHAR NOT NULL,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );`;
    const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR NOT NULL,
        password VARCHAR NOT NULL
    );`;
    try {
        await pool.query(createNotesTable);
        await pool.query(createUsersTable);
        console.log("Table created/exists already");
    } catch (err) {
        console.error(err);
    }
}

createInitialTable();

interface User {
    user_id: number,
    username: string,
    password: string,
};

const generateToken = (user: User) => {
    return jwt.sign({id: user.user_id, username: user.username}, process.env.JWT_SECRET!, { expiresIn: '1h'});
}

app.post("/signup", async (req: Request, res: Response) => {
    const {username, password} = req.body;  
    if (username && password) {
        await pool.query('INSERT INTO users(username, password) VALUES ($1, $2);', [username, password]);
        return res.status(201).json("User signed up successfully");
    } else {
        return res.status(400).json("Please enter valid username and password");
    }

})

app.post("/login", async (req: Request, res: Response) => {
    const {username , password} = req.body;
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2;', [username, password]);
    if (result.rows.length === 1 ) {
        const token = generateToken(result.rows[0]);
        return res.json({token});
    } else {
        return res.status(400).json("Incorrect username or password");
    }
})

app.get("/users", async (req: Request, res: Response) => {
    const result = await pool.query("SELECT * FROM users;");
    res.status(200).json(result.rows);
})

app.use(authMiddleware)

app.get('/notes', async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const result = await pool.query('SELECT * FROM notes WHERE user_id = $1', [userId]);
        res.status(201).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

app.post("/notes", async (req: Request, res: Response) => {
    let noteTitle: string = req.body.title;
    let noteDescription: string = req.body.description;
    if (noteTitle && noteDescription) {
        await pool.query('INSERT INTO notes(title, description, user_id) VALUES($1, $2, $3)', [noteTitle, noteDescription, req.user.id]);
        return res.status(201).json("note added");
    } else {
        return res.status(400).json("Please enter a valid note");
    }
})

app.put("/note/:id", async (req: Request, res: Response) =>  {
    let noteId: number = parseInt(req.params.id);
    const updateData = req.body;
    try {
        await pool.query('UPDATE notes SET title = $1, description = $2 WHERE id = $3', [updateData.title, updateData.description, noteId]);
        res.status(201).json("Note updated");
    } catch {
        res.status(500).json("Error updating note");
    }
})

app.delete("/note/:id", async (req: Request, res: Response) => {
    const noteId: number = parseInt(req.params.id);
    try {
        await pool.query('DELETE FROM notes WHERE id = $1', [noteId]);
        res.status(201).json("note deleted successfully");
    } catch (err) {
        res.status(500).json("error deleting note");
    }
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})

