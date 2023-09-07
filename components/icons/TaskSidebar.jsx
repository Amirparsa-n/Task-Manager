import React from "react";

function TaskSidebar({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21.5" height="21.5">
      <g
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M11.119 7.629h5.25" data-name="Path 157"></path>
        <path d="M5.131 7.629l.75.75 2.25-2.25" data-name="Path 158"></path>
        <path d="M11.119 14.629h5.25" data-name="Path 159"></path>
        <path d="M5.131 14.629l.75.75 2.25-2.25" data-name="Path 160"></path>
        <path
          d="M.75 11.7v2.05c0 5 2 7 7 7h6c5 0 7-2 7-7v-6c0-5-2-7-7-7h-6c-5 0-7 2-7 7"
          data-name="Path 161"
        ></path>
      </g>
    </svg>
  );
}

export default TaskSidebar;