import SASide from '../../components/SideMenu/SASide';
import './SA_FAQ.css';
import '../../../public/styles/common.css';
import React, { useState } from 'react';
import { FAQController, updateFAQ, addFAQ, deleteFAQ } from '../../controller/FAQController';
import Header from "../../components/table/Header";
import Cell from "../../components/table/Cell";
import { IoClose } from '../../../public/Icons.js';
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";

const FAQManagement = () => {
  const { faqs, loading, error, refetch } = FAQController();
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFAQ, setCurrentFAQ] = useState<any>(null);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");

  // For inline Add FAQ section
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const openViewModal = (faq: any) => {
    setCurrentFAQ(faq);
    setEditedQuestion(faq.question_desc);
    setEditedAnswer(faq.answer);
    setIsEditing(false);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setCurrentFAQ(null);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    if (!currentFAQ) return;
    try {
      await updateFAQ(
        currentFAQ.faqID,
        editedQuestion,
        editedAnswer,
        currentFAQ.isShown,
        currentFAQ.createdOn
      );
      refetch();
      closeViewModal();
    } catch (err) {
      console.error("Failed to update FAQ", err);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedQuestion(currentFAQ.question_desc);
    setEditedAnswer(currentFAQ.answer);
  };

  const handleDeleteFAQ = async () => {
    if (!currentFAQ) return;
    try {
      const result = await deleteFAQ(currentFAQ.faqID);
      console.log("FAQ deleted successfully:", result);
      refetch();
      closeViewModal();
    } catch (err) {
      console.error("Failed to delete FAQ", err);
    }
  };

  const handleAddFAQ = async () => {
    try {
      const createdOn = new Date().toISOString();
      const result = await addFAQ(newQuestion, newAnswer, 1, createdOn);
      console.log("FAQ added successfully:", result);
      refetch();
      setNewQuestion("");
      setNewAnswer("");
    } catch (err) {
      console.error("Failed to add FAQ:", err);
    }
  };

  const formatDate = (isoDate: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(isoDate).toLocaleString('en-US', options);
  };

  return (
    <div className="App-content">
      <SASide />
      <div className="content">
        <h1 className="faq-logo">FAQ Management</h1>
        
        {/* Inline Add FAQ Section */}
        <div className="faq-add-section">
          <h2>Add New FAQ</h2>
          <div className="faq-add-form">
            <div className="faq-add-field">
              <label className="title-add-faq">Question:</label>
              <input
                type="text"
                className="faq-add-input"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Enter your question here..."
              />
            </div>
            <div className="faq-add-field">
              <label className="title-add-faq">Answer:</label>
              <div className="faq-add-input-container">
                <input
                  className="faq-add-input"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Enter the answer here..."
                />
              </div>
            </div>
            <div className="btns-grp">
              <PrimaryButton text="Add FAQ" onClick={handleAddFAQ} />
            </div>
          </div>
        </div>
        
        {/* FAQ Listing Section */}
        <div className="main-contents">
          <div className="App-desktop-responsive-table">
            {loading ? (
              <div>Loading FAQs...</div>
            ) : error ? (
              <div>Error loading FAQs: {(error as Error)?.message || 'Unknown error'}</div>
            ) : (
              <>
                <div className="desktop-faq-table-header">
                  <Header className="header-faq-question" text="Question" />
                  <Header className="header-faq-answer" text="Answer" />
                  <Header className="header-faq-action" text="Actions" />
                </div>
                <div className="faq-table-body-container">
                  {faqs.map((faq: any) => (
                    <div key={faq.faqID} className="faq-table-body">
                      <Cell className="body-faq-question" text={faq.question_desc} />
                      <Cell className="body-faq-answer" text={faq.answer} />
                      <Cell
                        className="body-faq-action"
                        text={
                          <div className="action-buttons">
                            <button className="primary-button" onClick={() => openViewModal(faq)}>
                              View Details
                            </button>
                          </div>
                        }
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* View Details Popup Modal */}
      {isViewModalOpen && currentFAQ && (
        <div className="App-popup">
          <div className="App-popup-content">
            <div className="App-header">
              <h1>FAQ Details</h1>
              <button className="icons" onClick={closeViewModal}>
                <IoClose />
              </button>
            </div>
            <div className="App-popup-main-content">
              {!isEditing ? (
                <div className="FAQ-Details">
                  <p className="title-faq-view-details">Question:</p>
                  <p className="main-data">{currentFAQ.question_desc}</p>
                  <p className="title-faq-view-details">Answer:</p>
                  <p className="main-data">{currentFAQ.answer}</p>
                  <p className="title-faq-view-details">Created On:</p>
                  <p className="main-data">
                    {currentFAQ.createdOn ? formatDate(currentFAQ.createdOn) : "N/A"}
                  </p>
                </div>
              ) : (
                <div className="faq-edit-detail-contents">
                  <label>
                    <p className="title-faq-edit-details-question">Question:</p>
                    <input
                      type="text"
                      value={editedQuestion}
                      onChange={(e) => setEditedQuestion(e.target.value)}
                    />
                  </label>
                  <label>
                    <p className="title-faq-edit-details-answer">Answer:</p>
                    <input
                      type="text"
                      value={editedAnswer}
                      onChange={(e) => setEditedAnswer(e.target.value)}
                    />
                  </label>
                </div>
              )}
              <div className="faq-modal-actions">
                {!isEditing ? (
                  <div className="btns-grp">
                    <PrimaryButton text="Edit Details" onClick={handleEditClick} />
                    <SecondaryButton text="Delete FAQ" onClick={handleDeleteFAQ} />
                  </div>
                ) : (
                  <div className="btns-grp">
                    <PrimaryButton text="Save Changes" onClick={handleSaveChanges} />
                    <SecondaryButton text="Cancel" onClick={handleCancelEdit} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQManagement;
