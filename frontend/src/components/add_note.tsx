import { useState } from "react";
import { useNavigate } from "react-router";

interface NoteInt {
    id: number;
    title: string;
    description: string;
}

interface addProps {
    onAdd: () => void;
}

export default function AddNote({ onAdd }: addProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const isTitleEmpty = title.length === 0;
    const isDescriptionEmpty = description.length === 0;

    async function handleSave() {
        if (isTitleEmpty || isDescriptionEmpty) {
            alert("Please fill in both Title and Description");
        }
        await fetch("http://localhost:3000/notes", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description})
        });
        onAdd();
        setTitle("");
        setDescription("");
    }

    async function signOut() {
        const result = await fetch("http://localhost:3000/signout", {
           method: "POST",
           credentials: "include" 
        });
        result.status === 200 ? navigate("/login") : alert("Error signing out");
    }

    function handleDiscard() {
        setTitle("");
        setDescription("");
    }

    return (
        <>
        <div className="flex-col w-[70%]">
            <div className="border-b-1 border-solid h-[7%] w-[100%]">
                <input type="text" placeholder="Title" required className="h-[100%] w-[100%] pl-[4px]" onChange={e => setTitle(e.target.value)} value={title} />
            </div>
            <div className="border-b-1 border-solid h-[77%] w-[100%]">
                <textarea placeholder="Enter Description" className="h-[100%] w-[100%] font-light pl-[4px] pt-[4px]" required onChange={e => setDescription(e.target.value)} value={description}></textarea>
            </div>
            <div className="border-b-1 border-solid h-[8%] w-[100%] font-light flex justify-between items-center">
                <button disabled={isTitleEmpty && isDescriptionEmpty} className="ml-[10px] border-1 border-solid h-[50%] w-[70px] italic rounded-[10px] cursor-pointer hover:bg-[#eff5d0] transition duration-300 disabled:bg-[#b8bda0] disabled:text-black-200" onClick={handleDiscard}>Discard</button>
                <button disabled={isTitleEmpty && isDescriptionEmpty} className="mr-[10px] border-1 border-solid h-[50%] w-[70px] italic rounded-[10px] cursor-pointer hover:bg-[#eff5d0] transition duration-300 disabled:bg-[#b8bda0] disabled:text-black-200" onClick={handleSave}>Save</button>
            </div>
            <div className="h-[8%] flex items-center justify-end">
                <button onClick={signOut} className="font-light h-[50%] border-1 border-solid mr-[10px] w-[70px] rounded-[10px] cursor-pointer hover:bg-[#eff5d0] transition duration-300">Sign out</button>
            </div>
        </div>
            
        </>
    )
}