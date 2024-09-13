import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="main-header">
      <Link href={"/"} className="flex">
        <Image
          className="brand-log"
          src="/icons/instagramlogo.png"
          height={40}
          width={112}
          alt="instagram logo"
          priority
        />
      </Link>
    </header>
  );
};

export default Header;
