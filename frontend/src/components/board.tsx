import Selector from "./note_selector";

export default function Board() {
    return (
        <>
            <div className="border-1 border-solid border-[#292f36] h-[90%] w-[90%] rounded-[10px] bg-[#d5e681]">
                <Selector />
            </div>
        </>
    )
}