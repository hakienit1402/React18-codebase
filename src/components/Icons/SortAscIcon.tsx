import React from "react";

const SortAscIcon = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
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
        d="M11.5768 3.2426C11.7906 2.91913 12.2094 2.91913 12.4232 3.2426L16.8881 9.9985C17.1585 10.4075 16.9081 11 16.465 11H7.53504C7.09186 11 6.84151 10.4075 7.11185 9.9985L11.5768 3.2426Z"
        fill="#B7B3C4"
      />
    </svg>
  );
};

export default SortAscIcon;
