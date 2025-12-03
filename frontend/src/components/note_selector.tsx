import { useEffect, useState } from "react"
import Note from "./preview_note";

interface NoteInt {
    id: number;
    title: string;
    description: string;
}

export default function Selector() {
    const [notes, setNotes] = useState<NoteInt[]>([]);

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
    },[]);

    const listItems = notes.map(note => {
        return <Note id={note.id} title={note.title} description={note.description}/>;
    });

    return (
        <>
            <div className="border-r-1 border-solid border-[#292f36] h-full w-[30%]">
                {listItems.length > 0 ? listItems : <Default />}
            </div>
        </>
    )
}

function Default() {
    return (
        <>
            <div className="w-full text-center pt-2">
                <p className="font-light italic text-[18px] underline decoration-dotted underline-offset-4">You have 0 saved notes.</p>
            </div>
        </>
    )
}