import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAlert } from "../../components/PromptAlert/AlertContext";
import { useAuth } from "../../AuthContext";
import CompleteProfile from "./CompleteProfile";
import CompanyController from '../../controller/CompanyController';

const { getCompany } = CompanyController;

const RequiredCompleteProfile = () => {
    const { user } = useAuth();
    const { showAlert } = useAlert();

    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [companyContact, setCompanyContact] = useState<string>('');
    const [nric, setNRIC] = useState<string>('');
    const [hpNo, setHpNo] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [loading, setLoading] = useState(true);

    const fetchCompanyProfile = async () => {
        try {
            const company = await getCompany(user?.UID);
            console.log("Company data:", company);
            setCompanyContact(company?.contactNo || '');
        } catch (error) {
            showAlert(
                "fetchCompanyProfile",
                "Fetch data error",
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("User object in RequiredCompleteProfile:", user);
        if (user?.UID) {
            console.log("Fetching company profile for UID:", user.UID);
            fetchCompanyProfile();
        } else {
            console.log("No UID found in user object");
            setLoading(false);
        }
    }, [user?.UID]);

    if (loading) {
        return <div>Loading user data...</div>;
    }

    if (!user) {
        // You might want to redirect to login if user is not available
        return <Navigate to="/login" />;
    }

    if (!isProfileComplete) {
        return <CompleteProfile user={user} />;
    }

    return <Outlet />;
};

export default RequiredCompleteProfile;