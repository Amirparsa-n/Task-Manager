import React from "react";

function ProfileSidebar({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21.5" height="21.499">
      <g
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path
          d="M16.889 20.369a11.152 11.152 0 01-3.139.381h-6a11.152 11.152 0 01-3.14-.38c.22-2.6 2.89-4.65 6.14-4.65s5.919 2.049 6.139 4.649z"
          data-name="Path 166"
        ></path>
        <path
          d="M.75 11.69v2.06c0 3.78 1.14 5.85 3.86 6.62.22-2.6 2.89-4.65 6.14-4.65s5.92 2.05 6.14 4.65c2.72-.77 3.86-2.84 3.86-6.62v-6c0-5-2-7-7-7h-6c-5 0-7 2-7 7zm10 1.23a3.585 3.585 0 113.58-3.59 3.585 3.585 0 01-3.58 3.59z"
          data-name="Path 167"
        ></path>
        <path
          d="M14.332 9.33a3.58 3.58 0 11-3.582-3.58 3.585 3.585 0 013.582 3.58z"
          data-name="Path 168"
        ></path>
      </g>
    </svg>
  );
}

export default ProfileSidebar;