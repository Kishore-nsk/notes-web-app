import Selector from "./note_selector";
import AddNote from "./add_note";
import { useEffect, useState } from "react"

interface NoteInt {
    id: number;
    title: string;
    description: string;
}

export default function Board() {
    const [notes, setNotes] = useState<NoteInt[]>([]);
    const [added, setAdded] = useState<Boolean>(false);
    const [removed, setRemoved] = useState<Boolean>(false);

    useEffect(() => {
        fetch("http://localhost:3000/notes", {
            method: "GET",
            credentials: "include",
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setNotes(data);
            })
            .catch(err => {
                console.log(`Error: ${err}`);
            })
        },[added, removed]);


    return (
        <>
            <div className="border-1 border-solid border-[#292f36] h-[90%] w-[90%] rounded-[10px] bg-[#d5e681] flex">
                <Selector notes={notes} onComplete={() => setAdded(false)} onRemove={() => setRemoved(!removed)} />
                <AddNote onAdd={() => setAdded(true)} />
            </div>
        </>
    )
}