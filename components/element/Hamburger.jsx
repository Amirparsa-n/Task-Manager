"use client";

const Hamburger = ({ activeMenu }) => {
    console.log(activeMenu);

    return (
        <>
            <div className="Hamburger-container w-8 h-6 cursor-pointer flex items-center justify-between flex-col z-[20]">
                <div className={"hamburger-item bg-primary " + (activeMenu ? "rotate-45 " : "rotate-0")}></div>
                <div className={"hamburger-item bg-primary " + (activeMenu ? "translate-x-full opacity-0" : "translate-x-0 opacity-60")}></div>
                <div className={"hamburger-item bg-primary " + (activeMenu ? "-rotate-45" : "rotate-0")}></div>
            </div>

            <style jsx>
                {`
                    .hamburger-item {
                        width: 32px;
                        height: 3px;
                        border-radius: 10px;
                        transition: all 0.3s linear;
                        transform-origin: 1px;
                    }
                `}
            </style>
        </>
    );
};


export default Hamburger;
