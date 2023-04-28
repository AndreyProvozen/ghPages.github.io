import { SVGProps } from "react";

const Menu = (props?: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 21 21"
    fill="white"
    {...props}
  >
    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
  </svg>
);

export default Menu;
