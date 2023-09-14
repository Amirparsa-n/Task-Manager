const RadioButtonAddNote = ({ color, noteDate, setNoteData }) => {
    return (
        <div
            className={`p-5 w-1/5 last:rounded-e-lg first:rounded-s-lg flex justify-center items-center ${
                color === "yellow" && "bg-yellowNote"
            }
            ${color === "green" && "bg-greenNote"} ${
                color === "pink" && "bg-pinkNote"
            } ${color === "purple" && "bg-purpleNote"} ${
                color === "blue" && "bg-blueNote"
            }`}
            id="RadioButtonAddNote">
            <input
                type="radio"
                value={color}
                checked={noteDate.color === color}
                onChange={(e) =>
                    setNoteData({ ...noteDate, color: e.target.value })
                }
                id={color}
                className="radioInput"
                style={{ display: "none" }}
            />
            <label
                htmlFor={color}
                className="check w-1/5 before:absolute before:-left-5 before:-top-5 before:w-16 sm:before:w-32 sm:before:-left-[52px]">
                <svg width="24px" height="24px" viewBox="0 0 18 18">
                    <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                    <polyline points="1 9 7 14 15 4"></polyline>
                </svg>
            </label>
        </div>
    );
};

export default RadioButtonAddNote;
