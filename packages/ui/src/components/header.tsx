"use client";
import React from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const router = usePathname();
  const links = [
    { path: "/", label: "Home" },
    { path: "/agent", label: "Agent" },
    { path: "/ticket", label: "Ticket" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          <h4 className="text-black-60 fw-semibold ">
            Support Ticket Entry System
          </h4>
        </a>
        <div className="">
          <ul className="navbar-nav ml-auto">
            {links.map((link) => (
              <li className="nav-item" key={link.path}>
                <a
                  className={`nav-link ${router === link.path ? "active fw-semibold " : ""}`}
                  href={link.path}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
