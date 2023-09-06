import AddBottomNav from "../icons/AddBottomNav";
import NoteBottomNav from "../icons/NoteBottomNav";
import ProfileBottomNav from "../icons/ProfileBottomNav";
import ProjectBottomNav from "../icons/ProjectBottomNav";
import SelectShapeBottomNav from "../icons/SelectShapeBottomNav";
import TaskBottomNav from "../icons/TaskBottomNav";

const BottomNavigation = () => {
    return (
        <div className="md:hidden fixed bottom-0 w-full h-[80px] rounded-t-xl shadow-[0_4px_15px_2px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between px-4 sm:px-8 mt-3">
                <div className="flex flex-col items-center">
                    <ProfileBottomNav />
                    <span className="text-[12px] mt-2">Profile</span>
                    <div className="absolute bottom-0 with-shadow">
                        <SelectShapeBottomNav />
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <TaskBottomNav />
                    <span className="text-[12px] mt-2">Task</span>
                    <div className="absolute bottom-0 with-shadow">
                        <SelectShapeBottomNav />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center ">
                    <AddBottomNav />
                </div>

                <div className="flex flex-col items-center">
                    <NoteBottomNav />
                    <span className="text-[12px] mt-2">Note</span>
                    <div className="absolute bottom-0 with-shadow">
                        <SelectShapeBottomNav />
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <ProjectBottomNav />
                    <span className="text-[12px] mt-2">Project</span>
                    <div className="absolute bottom-0 with-shadow">
                        <SelectShapeBottomNav />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BottomNavigation;
