import React, { createContext, useContext, useState } from "react";

export const stateContext = createContext();

const ContextProvide = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [addTaskInfo, setAddTaskInfo] = useState([]);
    const [addNoteInfo, setAddNoteInfo] = useState([]);
    const [showAddNoteModal, setShowAddNoteModal] = useState(false);
    const [showAddProjectModal, setShowAddProjectModal] = useState(false);
    const [addProjectInfo, setAddProjectInfo] = useState([]);
    const [showAddTaskProjectModal, setShowAddTaskProjectModal] = useState("");
    const [addTaskProjectInfo, setAddTaskProjectInfo] = useState([]);

    return (
        <stateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                setShowAddTaskModal,
                showAddTaskModal,
                setAddTaskInfo,
                addTaskInfo,
                setShowAddNoteModal,
                showAddNoteModal,
                setAddNoteInfo,
                addNoteInfo,
                setShowAddProjectModal,
                showAddProjectModal,
                setAddProjectInfo,
                addProjectInfo,
                setShowAddTaskProjectModal,
                showAddTaskProjectModal,
                setAddTaskProjectInfo,
                addTaskProjectInfo,
            }}>
            {children}
        </stateContext.Provider>
    );
};

export default ContextProvide;
