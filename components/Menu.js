import Link from "next/link";
import MenuItem from "./MenuItem";

export default function Menu({ props }) {
  const menu_items = [
    // { text: "Projects", link: "/", mobile: true },
    { text: "Blog", link: "/blog", mobile: true },
    { text: "FAQ", link: "/faq", mobile: true },
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
