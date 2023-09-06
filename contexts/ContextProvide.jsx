import React, { createContext, useContext, useState } from "react";

export const stateContext = createContext();

const ContextProvide = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true);

    return (
        <stateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
            }}>
            {children}
        </stateContext.Provider>
    );
};

export default ContextProvide;
