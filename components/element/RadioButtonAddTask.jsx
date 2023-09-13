const RadioButtonAddTask = ({ value, title, todoDate, setTodoData, name }) => {
    return (
        <div
            className={`flex gap-x-2 items-center py-2 rounded-lg px-2 ${
                name === "status" && value
            } ${value === "low" && "bg-green-600 "} ${
                value === "medium" && "bg-orange-600"
            } ${value === "hard" && "bg-red-600"}`}>
            <label htmlFor={value} className="text-sm text-white">
                {title}
            </label>
            <div className="content">
                <label className="checkBox">
                    <input
                        type="radio"
                        checked={todoDate[name] === value}
                        id={value}
                        value={value}
                        onChange={(e) =>
                            setTodoData({ ...todoDate, [name]: e.target.value })
                        }
                    />
                    <div className="transition"></div>
                </label>
            </div>
        </div>
    );
};

export default RadioButtonAddTask;
