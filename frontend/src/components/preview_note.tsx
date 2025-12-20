interface NoteInt {
    id: number;
    title: string;
    description: string;
}

interface NoteProps {
    note: NoteInt;
    onRemove: () => void
}

export default function Note({note, onRemove}: NoteProps) {
    function deleteNote(title: string) {
        fetch(`http://localhost:3000/note/${title}`, {
            method: 'DELETE',
            credentials: "include"
        }).then(() => console.log("Delete successful"))
        .catch(err => console.error(err));
        onRemove();
    }

    return (
        <>
            <div className="border-b-1 pl-2 pt-2">
                {/* <h4 className="inline-block font-bold text-[18px]">{id}.</h4> */}
                <h4 className="inline-block font-bold text-[18px]">{note.title}</h4>
                <div className="flex justify-between">
                    <p className="mt-1">{note.description.length > 30 ? note.description.substring(0,35) + "..." : note.description}</p>
                    <button onClick={() => {
                        deleteNote(note.title);
                    }} className="mr-[7px] mb-[3px] border-1 rounded-[7px] w-[70px] cursor-pointer hover:bg-[#eff5d0] transition duration-300">Remove</button>
                </div>
            </div>
        </>
    )
}