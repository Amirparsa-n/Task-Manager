import moment from "moment";
import DotTask from "../icons/DotTask";

const Tasks = ({ data }) => {
    return (
        <div className="h-[calc(100vh-219px)] md:h-[calc(100vh-183px)] overflow-auto taskContainer">
            <div className="mt-6 flex flex-col gap-y-5 ">
                {data?.map((task) => (
                    <div key={task._id} className="bg-bgSecond rounded-xl">
                        <div className="p-5">
                            <div className="flex gap-x-3">
                                {task.tag && (
                                    <div className="bg-[#DADEE3] text-[#9C9CA5] text-sm px-2 py-1 rounded-lg w-fit">
                                        # {task.tag}
                                    </div>
                                )}
                                <div
                                    className={`text-sm px-2 py-1 rounded-lg w-fit text-white ${
                                        task.rating === "low" && "bg-green-600"
                                    } ${
                                        task.rating === "hard" && "bg-red-600"
                                    } ${
                                        task.rating === "medium" &&
                                        "bg-orange-600"
                                    }`}>
                                    {task.rating}
                                </div>
                            </div>

                            <h5 className="mt-4 font-[500]">{task.title}</h5>
                            {task.description && (
                                <p className="text-gray-400 text-sm mt-3 max-h-16 overflow-auto description-task">
                                    {task.description}
                                </p>
                            )}

                            <div className="flex justify-between mt-[18px] items-center">
                                <span className="text-sm text-gray-500/50">
                                    {moment(task.date).format("MMM Do")}
                                </span>
                                <DotTask />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tasks;
