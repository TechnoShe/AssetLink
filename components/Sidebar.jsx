import React, { useState } from "react";

const Sidebar = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: "Asset Transfer Completed",
      description:
        "Your Property ID 123 has been transferred to Avalanche X-Chain.",
    },
    {
      id: 2,
      title: "Ownership Update",
      description: "Your ownership in Property ID 234 has increased by 10%.",
    },
    {
      id: 3,
      title: "Market Value Change",
      description:
        "The market value of your art collection has increased by 5%.",
    },
  ]);
    const navigation = [
      { title: "Dashboard", path: "/" },
      { title: "Asset Management", path: "/" },
      { title: "Settings", path: "/" },
    ];

  return (
    <div
      style={{ background: "rgba(164, 178, 255, 0.2)" }}
      className=" fixed top-20 left-0 w-64 h-[calc(100vh-120px)] p-4 m-6 rounded-md mb-2 shadow-2xl shadow-black"
    >
      <div className="mb-6">
        <div className="text-xl font-semibold mb-2">Quick Links</div>
        <ul>
          {navigation.map((item, id) => (
            <li key={id} className="mb-2  pl-4 p-1 rounded cursor-pointer">
              <a href={item.path} className="block text-md">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <div className="text-xl font-semibold mb-2">Notifications</div>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-gray-300 text-md pl-4">
              No new notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                style={{ background: "rgba(164, 178, 255, 0.2)" }}
                className="p-3  rounded-md hover:bg-gray-600 cursor-pointer"
              >
                <div className="font-semibold">{notification.title}</div>
                <div className="text-sm text-gray-300">
                  {notification.description}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
