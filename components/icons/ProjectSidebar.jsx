import React from "react";

function ProjectSidebar({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <g
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M18.92 5.54c1.7.75 1.7 1.99 0 2.74l-5.9 2.615a3.42 3.42 0 01-2.44 0l-5.9-2.62c-1.7-.75-1.7-1.99 0-2.74l5.9-2.62a3.42 3.42 0 012.44 0l1.92.85"></path>
        <path
          d="M3 11a2.562 2.562 0 001.4 2.15l6.79 3.02a1.988 1.988 0 001.62 0l6.79-3.02A2.562 2.562 0 0021 11"
          data-name="Vector"
        ></path>
        <path
          d="M3 16a2.357 2.357 0 001.4 2.15l6.79 3.02a1.988 1.988 0 001.62 0l6.79-3.02A2.357 2.357 0 0021 16"
          data-name="Vector"
        ></path>
      </g>
    </svg>
  );
}

export default ProjectSidebar;