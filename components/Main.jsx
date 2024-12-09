import React, { useState } from "react";

// Placeholder Data (this would eventually come from your smart contract or API)
const assets = [
  {
    id: 1,
    name: "Property ID 123",
    type: "Real Estate",
    ownership: "25%",
    value: "$500,000",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Artwork ID 456",
    type: "Art",
    ownership: "50%",
    value: "$100,000",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Machine ID 789",
    type: "Equipment",
    ownership: "100%",
    value: "$50,000",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Property ID 123",
    type: "Real Estate",
    ownership: "25%",
    value: "$500,000",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Artwork ID 456",
    type: "Art",
    ownership: "50%",
    value: "$100,000",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    name: "Machine ID 789",
    type: "Equipment",
    ownership: "100%",
    value: "$50,000",
    image: "https://via.placeholder.com/150",
  },
];

const transactions = [
  {
    id: 1,
    asset: "Property ID 123",
    date: "2024-11-26",
    action: "Transferred",
    status: "Completed",
  },
  {
    id: 2,
    asset: "Artwork ID 456",
    date: "2024-11-25",
    action: "Tokenized",
    status: "Completed",
  },
  {
    id: 3,
    asset: "Machine ID 789",
    date: "2024-11-24",
    action: "Transferred",
    status: "Pending",
  },
  
];

const Main = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [transferStatus, setTransferStatus] = useState("");

  const handleTransfer = (asset) => {
    // Placeholder for actual transfer logic
    setTransferStatus("Pending...");
    setTimeout(() => {
      setTransferStatus("Transfer Completed");
    }, 3000); // Simulating a transfer process
  };

  return (
    <div className="min-h-screen text-white">
      {/* Main Main Area */}
      <main className="px-6 py-8">
        {/* Asset Overview */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Tokenized Assets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {assets.map((asset) => (
              <div
                key={asset.id}
                style={{ background: "rgba(164, 178, 255, 0.2)" }}
                className="p-4 rounded-2xl shadow-lg shadow-black"
              >
                <img
                  src={asset.image}
                  alt={asset.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold text-lg">{asset.name}</h3>
                <p className="text-sm text-gray-300">{asset.type}</p>
                <p className="text-sm text-gray-300">
                  Ownership: {asset.ownership}
                </p>
                <p className="font-semibold text-xl text-blue-500">
                  {asset.value}
                </p>
                <button
                  onClick={() => setSelectedAsset(asset)}
                  className="mt-4 bg-blue-600 px-4 py-2 rounded-3xl w-full hover:bg-blue-500"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Transactions Table */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
            <table className="min-w-full text-black">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    Asset
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    Action
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-t">
                      <td className="px-4 py-2 text-sm">{transaction.asset}</td>
                      <td className="px-4 py-2 text-sm">{transaction.date}</td>
                      <td className="px-4 py-2 text-sm">
                        {transaction.action}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {transaction.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-2 text-sm text-center text-gray-500"
                    >
                      No transactions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Transfer Asset */}
        {selectedAsset && (
          <section
            style={{ background: "rgba(164, 178, 255, 0.2)" }}
            className="p-6 rounded-lg shadow-lg mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Transfer Asset</h2>
            <p className="text-lg mb-4">
              Are you sure you want to transfer {selectedAsset.ownership} of{" "}
              {selectedAsset.name}?
            </p>
            <div className="space-x-4">
              <button
                onClick={() => handleTransfer(selectedAsset)}
                className="bg-green-500 px-6 py-2 rounded-md hover:bg-green-400"
              >
                Initiate Transfer
              </button>
              <button
                onClick={() => setSelectedAsset(null)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </section>
        )}

        {transferStatus && (
          <section className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-lg font-semibold">{transferStatus}</p>
          </section>
        )}
      </main>
    </div>
  );
};

export default Main;
