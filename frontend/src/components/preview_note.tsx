interface NoteInt {
    id: number;
    title: string;
    description: string;
}

export default function Note({id, title, description}: NoteInt) {
    function deleteNote(title: string) {
        fetch(`http://localhost:3000/note/${title}`, {
            method: 'DELETE',
            credentials: "include"
        }).then(() => console.log("Delete successful"))
        .catch(err => console.error(err));
    }

    return (
        <>
            <div className="border-b-1 pl-2 pt-2">
                {/* <h4 className="inline-block font-bold text-[18px]">{id}.</h4> */}
                <h4 className="inline-block font-bold text-[18px]">{title}</h4>
                <div className="flex justify-between">
                    <p className="mt-1">{description.length > 30 ? description.substring(0,35) + "..." : description}</p>
                    <button onClick={() => {
                        deleteNote(title);
                    }} className="mr-[7px] mb-[3px] border-1 rounded-[7px] w-[70px] cursor-pointer hover:bg-[#eff5d0] transition duration-300">Remove</button>
                </div>
            </div>
        </>
    )
}