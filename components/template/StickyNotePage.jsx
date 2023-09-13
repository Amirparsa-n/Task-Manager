
// icons
import { useContext } from "react";

// context
import AddIconStickyNote from "../icons/AddIconStickyNote";
import { stateContext } from "@/contexts/ContextProvide";

const StickyNotePage = () => {

    const {setShowAddNoteModal} = useContext(stateContext)

    return (
        <div className="px-4 mt-6 md:mt-10">
            
            <button type="button" onClick={() => setShowAddNoteModal(true)} className="bg-[#EBEBEB] h-72 w-full rounded-lg flex justify-center items-center">
                <AddIconStickyNote />
            </button>
        </div>
    );
};

export default StickyNotePage;