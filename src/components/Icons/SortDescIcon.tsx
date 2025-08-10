import React from "react";

const SortDescIcon = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.5768 20.7877C11.7906 21.0708 12.2094 21.0708 12.4232 20.7877L16.8881 14.8763C17.1585 14.5184 16.9081 14 16.465 14H7.53504C7.09186 14 6.84151 14.5184 7.11185 14.8763L11.5768 20.7877Z"
        fill="#B7B3C4"
      />
    </svg>
  );
};

export default SortDescIcon;
