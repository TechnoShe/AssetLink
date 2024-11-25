import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isConnected, address } = useAccount();
  const account = useAccount();

  const isLocalhost = account?.chainId === 31337;

  const navigation = [
    { title: "Dashboard", path: "/" },
    { title: "Asset Management", path: "/" },
    { title: "Settings", path: "/" }
  ];

  const toggleMenu = (e) => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav
      style={{ background: "rgba(164, 178, 255, 0.2)" }}
      className="px-10 py-3 flex-1 justify-center items-center "
    >
      <div className={` flex mt-0 items-center gap-x-4`}>
          <p className="name text-3xl ">AssetList</p>

        <div className={`flex-1 flex justify-center items-center mx-4 `}>
          <ul className=" flex justify-between items-center gap-x-1 ">
            {navigation.map((item, id) => (
              <li key={id} className=" mx-10">
                <a href={item.path} className="block menu-btn text-lg">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="ml-auto py-2 px-4">
          {isConnected && isLocalhost ? (
            <button className="p-2 bg-white rounded-lg text-black ">
              {address.slice(0, 6)}......{address.slice(-4)}{" "}
            </button>
          ) : (
            <ConnectButton label="Connect wallet" style={{}} />
          )}{" "}
        </div>
      </div>
    </nav>
  );
};

export default Header;
