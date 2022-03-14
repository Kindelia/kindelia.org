import Link from "next/link";
import MenuItem from "./MenuItem";

export default function Menu({ props }) {
  const menu_items = [
    { text: "Projects", link: "/", mobile: true },
    { text: "Posts", link: "/blog", mobile: true },
    { text: "About us", link: "/#about-us", mobile: false },
    { text: "Contact", link: "/#contact", mobile: false },
  ];

  return (
    <div {...props}>
      {menu_items.map((item, i) => {
        return (
          <Link key={i} as={item.link} href={item.link} passHref>
            <MenuItem
              className={item.mobile ? "" : "mobile-hidden"}
              selected={i == 0}
            >
              {item.text}
            </MenuItem>
          </Link>
        );
      })}
    </div>
  );
}
