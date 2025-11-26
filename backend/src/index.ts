import express, {Request, Response} from 'express';
const cors = require("cors");
import pool from "./db"

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));
const port = process.env.PORT || 3000;

interface Note {
    id: number;
    title: string;
    description: string;
}

let notes: Note[] = [];

async function createInitialTable() {
    const createTable = `CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        description VARCHAR NOT NULL
    );`;
    try {
        await pool.query(createTable);
        console.log("Table created/exists already");
    } catch (err) {
        console.error(err);
    }
}

createInitialTable();

app.get('/notes', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM notes');
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
        const count = (await pool.query('SELECT * FROM notes')).rows.length + 1;
        await pool.query('INSERT INTO notes(id, title, description) VALUES($1, $2, $3)', [count, noteTitle, noteDescription]);
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

