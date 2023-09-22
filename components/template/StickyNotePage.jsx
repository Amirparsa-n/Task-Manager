// icons
import { useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";

// context
import AddIconStickyNote from "../icons/AddIconStickyNote";
import { stateContext } from "@/contexts/ContextProvide";

// components
import StickyNoteItem from "../module/StickyNoteItem";
import toast, { Toaster } from "react-hot-toast";
import SpinnerPage from "../element/SpinnerPage";

const StickyNotePage = () => {
    const { setShowAddNoteModal, addNoteInfo } = useContext(stateContext);
    const { theme } = useTheme();
    const [noteData, setNoteData] = useState([]);
    const [noteEditStatus, setNoteEditStatus] = useState("");
    useEffect(() => {
        fetchStickyNote();
    }, [addNoteInfo]);

    const fetchStickyNote = async () => {
        const res = await fetch("/api/notes");
        const data = await res.json();
        setNoteData(data);
    };

    async function updateStickyNote(id, { title, text }) {
        setNoteEditStatus("");
        const res = await fetch("/api/notes", {
            method: "PATCH",
            body: JSON.stringify({ id, title, text }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setNoteEditStatus(data.status);
        if (data.status === "success") {
            fetchStickyNote();

            if (theme === "light") {
                toast.success(data.message);
            } else {
                toast.success(data.message, {
                    style: {
                        background: "#2e2e2e",
                        color: "#fff",
                    },
                });
            }
        } else if (data.status === "failed") {
            if (theme === "light") {
                toast.error(data.message);
            } else {
                toast.error(data.message, {
                    style: {
                        background: "#2e2e2e",
                        color: "#fff",
                    },
                });
            }
        }
    }

    async function deleteStickyNote(id) {
        const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.status === "success") {
            fetchStickyNote();
            if (theme === "light") {
                toast.success(data.message);
            } else {
                toast.success(data.message, {
                    style: {
                        background: "#2e2e2e",
                        color: "#fff",
                    },
                });
            }
        } else if (data.status === "failed") {
            if (theme === "light") {
                toast.error(data.message);
            } else {
                toast.error(data.message, {
                    style: {
                        background: "#2e2e2e",
                        color: "#fff",
                    },
                });
            }
        }
    }
    
    if (!noteData.status) return <SpinnerPage />;
    return (
        <>
            <div className="px-4 mt-6 md:mt-10 ">
                <div className="grid grid-cols-12 gap-y-8 gap-x-6">
                    {noteData.data.map((note) => (
                        <StickyNoteItem
                            key={note._id}
                            title={note.title}
                            text={note.text}
                            color={note.color}
                            id={note._id}
                            updateStickyNote={updateStickyNote}
                            noteEditStatus={noteEditStatus}
                            deleteStickyNote={deleteStickyNote}
                        />
                    ))}

                    <button
                        type="button"
                        onClick={() => setShowAddNoteModal(true)}
                        className="bg-[#EBEBEB] dark:bg-gray-600 h-72 col-span-12 sm:col-span-6 lg:col-span-4 3xl:col-span-3 w-full rounded-lg flex justify-center items-center">
                        <AddIconStickyNote />
                    </button>
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default StickyNotePage;
