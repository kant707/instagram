import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="main-header">
      <Link href={"/"} className="flex">
        <img
          className="brand-logo"
          src="/icons/instagram_logo.svg"
          height={40}
          width={112}
          alt="instagram logo"
        />
      </Link>
    </header>
  );
};

export default Header;
