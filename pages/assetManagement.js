import React, { useState } from "react";
import {
  Header,
  Sidebar,
  MintRWA,
  ModifyAsset,
  FractionalOwnership,
  TransferAsset,
} from "../components/index";

const AssetManagement = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <Header />
      <div className="flex text-white">
        <div
          style={{ background: "rgba(164, 178, 255, 0.2)" }}
          className="fixed top-24 p-4 z-5 left-4 bottom-0 w-64 rounded-lg mb-4 shadow-2xl shadow-black"
        >
          <Sidebar />
        </div>

        <div className="ml-72 mt-[6rem] flex-grow h-[calc(100vh-6rem)] overflow-y-auto">
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Asset Management</h1>
            <p style={{ marginBottom: "20px" }}>
              Manage your assets efficiently. Use the options below to tokenize, set fractional ownership, or transfer your assets across
              chains.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <button
                onClick={() => openModal("tokenize")}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s, transform 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#0056b3")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
              >
                Tokenize Your Asset
              </button>
              {/* <button
                onClick={() => openModal("modify")}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#28A745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s, transform 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#1e7e34")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#28A745")}
              >
                Modify Your Asset Token
              </button> */}
              <button
                onClick={() => openModal("fractionalOwnership")}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#FFC107",
                  color: "#000",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s, transform 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#d39e00")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#FFC107")}
              >
                Set Fractional Ownership
              </button>
              <button
                onClick={() => openModal("transfer")}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#17A2B8",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s, transform 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#117a8b")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#17A2B8")}
              >
                Transfer Asset Across Chain
              </button>
            </div>

            {/* Modals */}
            {activeModal === "tokenize" && <MintRWA onClose={closeModal} />}
            {activeModal === "modify" && <ModifyAsset onClose={closeModal} />}
            {activeModal === "fractionalOwnership" && (
              <FractionalOwnership onClose={closeModal} />
            )}
            {activeModal === "transfer" && (
              <TransferAsset onClose={closeModal} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetManagement;
