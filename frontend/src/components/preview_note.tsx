interface NoteInt {
    id: number;
    title: string;
    description: string;
}

export default function Note({id, title, description}: NoteInt) {
    function deleteNote(id: number) {
        fetch(`http://localhost:3000/note/${id}`, {
            method: 'DELETE'
        }).then(() => console.log("Delete successful"))
        .catch(err => console.error(err));
    }

    return (
        <>
            <div className="border-b-1 pl-2 pt-2">
                <h4 className="inline-block font-bold text-[18px]">{id}.</h4>
                <h4 className="inline-block font-bold text-[18px]">{title}</h4>
                <div className="flex justify-between">
                    <p className="mt-1">{description}</p>
                    <button onClick={() => {
                        deleteNote(id);
                    }} className="mr-[7px] mb-[3px] border-1 rounded-[7px] w-[70px] cursor-pointer">Remove</button>
                </div>
            </div>
        </>
    )
}