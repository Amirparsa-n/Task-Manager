import { useContext, useState } from "react";
import { stateContext } from "@/contexts/ContextProvide";

// Icons
import CloseIconCircle from "../icons/CloseIconCircle";
import RadioButtonAddNote from "../element/RadioButtonAddNote";
import { headers } from "@/next.config";

const AddNote = ({}) => {
    const { setShowAddNoteModal } = useContext(stateContext);

    const [message, setMessage] = useState("");
    const [fadeOutAni, setFadeOutAni] = useState("");
    const [noteDate, setNoteData] = useState({
        title: "",
        text: "",
        color: "",
    });


    const color = [
        { id: 0, color: "yellow" },
        { id: 2, color: "green" },
        { id: 3, color: "pink" },
        { id: 4, color: "purple" },
        { id: 5, color: "blue" },
    ];

    const addNoteHandler = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/notes', {
            method: 'POST',
            body: JSON.stringify(noteDate),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json();
        setMessage(data);
        if (data.status === "success") {
            setTimeout(() => {
                setFadeOutAni("fadeOut");
            }, 1000);
            setTimeout(() => {
                setShowAddNoteModal(false);
            }, 1800);
        }
    }

    return (
        <>
            <div
                className={`Modal md:z-[99999] md:h-full mt-[53px] md:pt-[57px] md:mt-0 md:bg-black/40 md:backdrop-blur-sm ${fadeOutAni}`}
                id="main-image">
                <div
                    className={`md:m-auto md:max-w-2xl h-[calc(100vh-124px)] md:rounded-xl border-t-2 border-primary md:border-none transitionSidebar bg-white dark:bg-DarkSecond md:h-fit md:pt-6 px-4 md:px-8 py-6 slideInUp fadeIn `}>
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-[500] text-primary">
                            Add Sticky Note
                        </h3>
                        <button
                            type="button"
                            onClick={() => setShowAddNoteModal(false)}>
                            <CloseIconCircle />
                        </button>
                    </div>

                    <form
                        action="#"
                        method="POST"
                        className="flex flex-col gap-y-4 mt-5">
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor={"title"}>Title *</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="form-input rounded-lg border-gray-500 bg-transparent"
                                value={noteDate.title}
                                onChange={(e) =>
                                    setNoteData({
                                        ...noteDate,
                                        title: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-y-2 mt-5">
                            <label htmlFor={"context"}>Context</label>
                            <textarea
                                name="context"
                                id="context"
                                value={noteDate.text}
                                onChange={(e) =>
                                    setNoteData({
                                        ...noteDate,
                                        text: e.target.value,
                                    })
                                }
                                className="form-input rounded-lg border-gray-500 bg-transparent max-h-[300px] h-32"
                            />
                        </div>

                        <div className="flex flex-row flex-wrap mt-6 w-full justify-center">
                            {color.map((statusItem) => (
                                <RadioButtonAddNote
                                    key={statusItem.id}
                                    color={statusItem.color}
                                    setNoteData={setNoteData}
                                    noteDate={noteDate}
                                />
                            ))}
                        </div>

                        <div className="text-center mt-4 h-6">
                            {message && (
                                <p
                                    className={
                                        message.status === "failed"
                                            ? "text-red-600"
                                            : "text-green-600"
                                    }>
                                    {message.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            onClick={addNoteHandler}
                            className="bg-primary py-3 mb-4 md:mb-0  text-white rounded-xl hover:shadow-button hover:transition-shadow duration-500 hover:duration-300">
                            Add
                        </button>
                    </form>
                </div>
            </div>
            <style jsx>{`
                .Modal {
                    display: block;
                    position: fixed;
                    left: 0;
                    top: 0;
                    width: 100%;
                    -webkit-transition: 0.5s;
                    overflow: auto;
                    transition: all 0.3s linear;
                }
            `}</style>
        </>
    );
};

export default AddNote;
