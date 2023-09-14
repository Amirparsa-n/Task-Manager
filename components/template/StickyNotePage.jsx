// icons
import { useContext, useEffect, useState } from "react";

// context
import AddIconStickyNote from "../icons/AddIconStickyNote";
import { stateContext } from "@/contexts/ContextProvide";

// components
import StickyNoteItem from "../module/StickyNoteItem";

const StickyNotePage = () => {
    const { setShowAddNoteModal, addNoteInfo } = useContext(stateContext);
    const [noteData, setNoteData] = useState([]);

    useEffect(() => {
        fetchStickyNote();
    }, [addNoteInfo]);

    const fetchStickyNote = async () => {
        const res = await fetch("/api/notes");
        const data = await res.json();
        setNoteData(data.data);
    };

    console.log(noteData);

    return (
        <div className="px-4 mt-6 md:mt-10">
            <div className="grid grid-cols-12 gap-y-8 gap-x-6">
                {noteData.map((note) => (
                    <StickyNoteItem
                        key={note.id}
                        title={note.title}
                        text={note.text}
                        color={note.color}
                        id={note._id}
                    />
                ))}

                <button
                    type="button"
                    onClick={() => setShowAddNoteModal(true)}
                    className="bg-[#EBEBEB] h-72 col-span-12 sm:col-span-6 md:col-span-4 3xl:col-span-3 w-full rounded-lg flex justify-center items-center">
                    <AddIconStickyNote />
                </button>
            </div>
        </div>
    );
};

export default StickyNotePage;
