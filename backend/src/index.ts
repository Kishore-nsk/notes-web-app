import express, {Request, Response} from 'express';
const cors = require("cors");

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

app.get('/notes', (req: Request, res: Response) => {
    res.status(201).json(notes);
})

app.post("/notes", (req: Request, res: Response) => {
    let noteTitle: string = req.body.title;
    let noteDescription: string = req.body.description;
    if (noteTitle && noteDescription) {
        notes.push({
            id: notes.length + 1,
            title: noteTitle,
            description: noteDescription,
        });
        return res.status(201).json("note added");
    } else {
        return res.status(400).json("Please enter a valid note");
    }
})

app.put("/note/:id", (req: Request, res: Response) =>  {
    let noteId: number = parseInt(req.params.id);
    const updateData = req.body;
    let index = notes.findIndex(n => n.id === noteId);
    notes[index].title = updateData.title;
    notes[index].description = updateData.description;
    
    res.status(201).json("Note updated");
})

app.delete("/note/:id", (req: Request, res: Response) => {
    const noteId: number = parseInt(req.params.id);
    let index = notes.findIndex(n => n.id === noteId);
    notes.splice(index, 1);

    res.status(201).json("note deleted successfully");
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})

