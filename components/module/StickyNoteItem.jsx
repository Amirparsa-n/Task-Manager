const StickyNoteItem = ({ title, text, color, id }) => {
    console.log(title);
    return (
        <div
            className={`h-72 col-span-12 sm:col-span-6 md:col-span-4 3xl:col-span-3 rounded-lg ${
                color === "yellow" && "bg-yellowNote"
            }
            ${color === "green" && "bg-greenNote"} ${
                color === "pink" && "bg-pinkNote"
            } ${color === "purple" && "bg-purpleNote"} ${
                color === "blue" && "bg-blueNote"
            }`}>
            <div className="px-5 py-6">
                <h3 className="font-semibold w-fit text-lg md:text-xl mb-4 text-slate-700 dark:text-slate-50 titleNote">
                    {title}
                </h3>
                <p className="text-gray-800 h-48 overflow-auto taskContainer">{text}</p>
            </div>
        </div>
    );
};

export default StickyNoteItem;
