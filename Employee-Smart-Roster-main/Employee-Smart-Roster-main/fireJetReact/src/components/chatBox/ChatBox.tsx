import { useEffect, useState } from "react";
import { useAlert } from "../../components/PromptAlert/AlertContext";
import ChatBot from 'react-simple-chatbot';
import SAFAQController from "../../controller/SAFAQController";
import { FaTimes, FaComment } from "react-icons/fa";

// API call handler
const { handleSubmitQuesToChatBox } = SAFAQController;

// Custom component to fetch and display API answer
const ApiResponse = ({ previousStep, triggerNextStep }: any) => {
    const { showAlert } = useAlert();
    const [ answer, setAnswer ] = useState("Loading...");

    const triggerSendQuestion = async() => {
        try {
                const response = await handleSubmitQuesToChatBox(previousStep.value);
                if (response?.answer) {
                    setAnswer(response.answer);
                } else {
                    setAnswer("Sorry, I couldn’t find an answer.");
                }
            } catch (error: any) {
                showAlert("Error", error.message || "Something went wrong.", "", { type: "error" });
                setAnswer("Sorry, something went wrong.");
            } finally {
                // Automatically move to the next step after 2 seconds
                setTimeout(() => {
                    triggerNextStep();
                }, 2000);
            }
    }
    useEffect(() => {triggerSendQuestion()}, [previousStep, answer])

    return <div>{answer}</div>;
};

const EmpRosterChat = () => {
    const [ showChat, setShowChat ] = useState(false);
    const [ chatKey, setChatKey ] = useState(0);

    const steps = [
        {
            id: '1',
            message: 'Welcome to EmpRoster. We are from FYP-25-S1-12 (^_^)',
            trigger: '2',
        },
        {
            id: '2',
            message: 'What can I help you?',
            trigger: 'user_input',
        },
        {
            id: 'user_input',
            user: true,
            trigger: 'processing',
        },
        {
            id: 'processing',
            component: <ApiResponse />,
            asMessage: true,
            waitAction: true,
            trigger: 'other-question',
        },
        {
            id: 'other-question',
            options: [
                { value: 'yes', label: 'Yes', trigger: 'update-yes' },
                { value: 'no', label: 'No', trigger: 'end-message' },
            ],
        },
        {
            id: 'update-yes',
            message: 'How can I help you with?',
            trigger: 'user_input',
        },
        {
            id: 'end-message',
            message: 'Thanks! Have a nice day (^_^)',
            end: true,
        },
    ];

    function toggleShowChatBox() {
        setShowChat(!showChat);
    }

    function resetChat(){
        setChatKey(prev => prev + 1);
    };

    if (!showChat) {
        return (
            <button 
                className={`chatbot-toggle ${showChat ? 'open' : ''}`}
                onClick={toggleShowChatBox}
                aria-label="Chat with EmpRoster Assistant"
            >
                {showChat ? <FaTimes /> : <FaComment />}
            </button>
        );
    }

    return (
        <>
        <ChatBot
            key={chatKey} // key is use to force reload the chatbox
            steps={steps}
            headerTitle="EmpRoster Assistant"
            recognitionEnable={true}
        />
        <button 
            className="chatbot-reset-btn" 
            onClick={resetChat}
        >
            Restart Chat
        </button>
        </>
        
    );
}

export default EmpRosterChat;
