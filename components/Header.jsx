import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const Header = () => {

  const { isConnected, address } = useAccount();
  const account = useAccount();

  const navigation = [
    { title: "Dashboard", path: "/" },
    { title: "Create", path: "/" },
    { title: "Asset Management", path: "/assetManagement" },
    { title: "Settings", path: "/" }
  ];


  return (
    <nav
      style={{ background: "rgba(164, 178, 255, 0.2)" }}
      className=" fixed text-white top-0 left-0 right-0 z-10 px-10 py-3 flex-1 justify-center items-center  shadow-[0_5px_15px_rgba(0,0,0,0.7)]"
    >
      <div className={` flex mt-0 items-center gap-x-4`}>
        <p className="name text-3xl ">AssetList</p>

        <div className={`flex-1 flex justify-center items-center mx-4 `}>
          <ul className=" flex justify-between items-center gap-x-1 ">
            {navigation.map((item, id) => (
              <li key={id} className=" mx-10">
                <a href={item.path} className="block text-lg">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="ml-auto py-2 px-4">
          <ConnectButton label="Connect wallet" style={{}} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
