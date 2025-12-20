import Note from "./preview_note";

interface NoteInt {
    id: number;
    title: string;
    description: string;
}

interface SelectorProps {
    notes: NoteInt[];
    onComplete: () => void;
    onRemove: () => void;
}

export default function Selector({ notes, onComplete, onRemove } : SelectorProps) {
    const listItems = notes.map(note => {
        return <Note note={note} onRemove={onRemove} />;
    });
    onComplete();

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