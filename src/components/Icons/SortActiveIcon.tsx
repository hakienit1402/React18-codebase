import React from "react";

const SortActiveIcon = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.66145 2.16174C7.83248 1.94609 8.16752 1.94609 8.33855 2.16174L11.9105 6.66567C12.1268 6.93836 11.9265 7.33333 11.572 7.33333H4.42803C4.07349 7.33333 3.87321 6.93836 4.08948 6.66567L7.66145 2.16174Z"
        fill="#2F2C3A"
      />
      <path
        d="M7.66145 14.5046C7.83248 14.7203 8.16752 14.7203 8.33855 14.5046L11.9105 10.0007C12.1268 9.72798 11.9265 9.33301 11.572 9.33301H4.42803C4.07349 9.33301 3.87321 9.72798 4.08948 10.0007L7.66145 14.5046Z"
        fill="#2F2C3A"
      />
    </svg>
  );
};

export default SortActiveIcon;
