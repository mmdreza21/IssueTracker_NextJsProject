import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLinks() {
  const currentPath = usePathname();
  const links = [
    {
      label: "dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];
  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              "text-zinc-500!": currentPath === link.href,
              "nav-link": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NavLinks;
