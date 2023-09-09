const AddTaskInput = ({ label, name, type, todoDate, setTodoData }) => {
    return (
        <div className={`flex flex-col gap-y-1 md:w-[48%] ${name === 'description' && 'md:w-full'} ${name === 'title' && 'md:w-full'}`}>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                id={name}
                className="form-input rounded-lg border-gray-500 bg-transparent"
                value={todoDate.name}
                onChange={(e) => setTodoData({...todoDate, [e.target.name]: e.target.value }) }
            />
        </div>
    );
};

export default AddTaskInput;
