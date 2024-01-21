import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-center py-2 d-flex gap-2 justify-content-center ">
      <p>
        Made with <span className="text-danger">&hearts;</span> by Sourabh Soni
      </p>
      <a
        href="https://github.com/SSOURABH58"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <a
        href="https://www.linkedin.com/in/sourabh58/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Linked In
      </a>
    </footer>
  );
};

export default Footer;
