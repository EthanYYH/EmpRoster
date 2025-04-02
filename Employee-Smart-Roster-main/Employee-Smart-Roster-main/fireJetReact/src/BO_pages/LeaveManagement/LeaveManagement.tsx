import React, { useState, useRef, ChangeEvent } from "react";
import Header from "../../components/table/Header";
import Cell from "../../components/table/Cell";
import BOSide from "../../components/SideMenu/BOSide";
import "./LeaveManagement.css";

interface MCRequest {
  id: number;
  employeeName: string;
  dateTaken: string;
  duration: string;
  proof: string; // URL of the proof image
  status: "Pending" | "Approved" | "Rejected";
}

interface ProofCellProps {
  proof: string;
  onUpload: (file: File) => void;
}

const ProofCell: React.FC<ProofCellProps> = ({ proof, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="proof-cell">
      {proof ? (
        <a className="secondary-button" href={proof} target="_blank" rel="noopener noreferrer">
          View Image
        </a>
      ) : (
        <button className="secondary-button" onClick={handleUploadClick}>Upload Image</button>
      )}
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
};

const LeaveManagement: React.FC = () => {
  const [mcRequests, setMcRequests] = useState<MCRequest[]>([
    {
      id: 1,
      employeeName: "Alice Johnson",
      dateTaken: "01/04/2025",
      duration: "2 days",
      proof: "",
      status: "Pending",
    },
    {
      id: 2,
      employeeName: "Bob Smith",
      dateTaken: "28/03/2025",
      duration: "1 day",
      proof: "https://example.com/proof2.jpg",
      status: "Approved",
    },
    {
      id: 3,
      employeeName: "Charlie Brown",
      dateTaken: "30/03/2025",
      duration: "3 days",
      proof: "",
      status: "Rejected",
    },
  ]);

  const handleApprove = (id: number) => {
    setMcRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Approved" } : req
      )
    );
  };

  const handleReject = (id: number) => {
    setMcRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Rejected" } : req
      )
    );
  };

  const handleViewDetails = (id: number) => {
    console.log("Viewing details for MC id:", id);
    // Navigate to details page or open a modal.
  };

  // Handle uploading proof. In a real app, you would call your API here.
  const handleUploadProof = (id: number, file: File) => {
    // For demo, create a local URL to simulate an uploaded image.
    const url = URL.createObjectURL(file);
    setMcRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, proof: url } : req
      )
    );
  };

  return (
    <div className="App-content">
      <BOSide />
      <div className="content leave-management">
        <h1>Leave Management</h1>
        <div className="table">
          {/* Table Header Row */}
          <div className="table-row table-header-row">
            <Header text="Employee Name" />
            <Header text="Date Taken" />
            <Header text="Duration" />
            <Header text="Proof" />
            <Header text="Status" />
            <Header text="Action" />
          </div>
          {/* Table Data Rows */}
          {mcRequests.map((req) => (
            <div className="table-row" key={req.id}>
              <Cell text={req.employeeName} />
              <Cell text={req.dateTaken} />
              <Cell text={req.duration} />
              <Cell
                text={
                  <ProofCell
                    proof={req.proof}
                    onUpload={(file: File) => handleUploadProof(req.id, file)}
                  />
                }
              />
              <Cell text={req.status} />
              <Cell
                text={
                  req.status === "Pending" ? (
                    <div className="action-buttons">
                      <button className="primary-button" onClick={() => handleApprove(req.id)}>
                        Approve
                      </button>
                      <button className="primary-button" onClick={() => handleReject(req.id)}>
                        Reject
                      </button>
                    </div>
                  ) : (
                    <button className="primary-button" onClick={() => handleViewDetails(req.id)}>
                      View Details
                    </button>
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
