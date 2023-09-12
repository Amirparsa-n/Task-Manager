import React, { createContext, useContext, useState } from "react";

export const stateContext = createContext();

const ContextProvide = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [addTaskInfo, setAddTaskInfo] = useState([]);

    return (
        <stateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                setShowAddTaskModal,
                showAddTaskModal,
                setAddTaskInfo,
                addTaskInfo,
            }}>
            {children}
        </stateContext.Provider>
    );
};

export default ContextProvide;
