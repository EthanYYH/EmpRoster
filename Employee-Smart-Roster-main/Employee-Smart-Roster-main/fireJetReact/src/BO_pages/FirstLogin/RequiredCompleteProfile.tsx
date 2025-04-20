import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAlert } from "../../components/PromptAlert/AlertContext";
import { useAuth } from "../../AuthContext";
import CompleteProfile from "./CompleteProfile";
import CompanyController from '../../controller/CompanyController';

const { getCompany, getBOUserProfile } = CompanyController;

const RequiredCompleteProfile = () => {
    const { user } = useAuth();
    const { showAlert } = useAlert();

    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [companyContact, setCompanyContact] = useState<string>('');
    const [companyAdd, setCompanyAdd] = useState<any>('');
    const [nric, setNRIC] = useState<string>('');
    const [hpNo, setHpNo] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [loading, setLoading] = useState(true);

    const fetchCompanyProfile = async () => {
        try {
            const company = await getCompany(user?.UID);
            // console.log("Company data:", company);
            setCompanyContact(company?.contactNo || '');
            setCompanyAdd(company?.address || '');
        } catch (error) {
            showAlert(
                "fetchCompanyProfile",
                "Fetch data error",
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            );
        }
    };

    const fetchUserProfile = async () => {
        try {
            let profile = await getBOUserProfile(user?.UID);
            profile = profile.BOProfile[0]
            // console.log("User Profile Data:", profile);
            setFullName(profile.fullName || '')
            setHpNo(profile.hpNo || '')
            setNRIC(profile.nric || '')
        } catch (error) {
            showAlert(
                "fetchUserProfile",
                "Fetch data error",
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            );
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.UID) return;
    
            await fetchCompanyProfile(); // sets companyContact, companyAdd
            await fetchUserProfile();    // sets fullName, hpNo, nric
            setLoading(false);
        };
        fetchData();
    }, [user?.UID]);
    
    useEffect(() => {
        const isAllFilled =
            String(companyContact).trim() !== '' &&
            String(companyAdd).trim() !== '' &&
            String(fullName).trim() !== '' &&
            String(hpNo).trim() !== '' &&
            String(nric).trim() !== '';

        setIsProfileComplete(isAllFilled);
    }, [companyContact, companyAdd, fullName, hpNo, nric]);

    // const fetchData = async () => {
    //     // console.log("User object in RequiredCompleteProfile:", user);
    //     if (user?.UID) {
    //         // console.log("Fetching company profile for UID:", user.UID);
    //         await fetchCompanyProfile();
    //         await fetchUserProfile();

    //         if(companyContact !== '' 
    //             && companyAdd !== '' 
    //             && fullName !== '' 
    //             && hpNo !== '' 
    //             && nric !== ''
    //         )
    //             setIsProfileComplete(true)
    //         setLoading(false);
    //     } else {
    //         console.log("User Not Found!!");
    //         setLoading(false);
    //     }
    // }

    // useEffect(() => {
    //     fetchData();
    // }, [user?.UID]);
    
    // Update filled data locally
    function onCompleteProfileUpdate (
        companyContact: string, 
        companyAdd: string, 
        nric: string, 
        hpNo: string, 
        fullName: string
    ){
        setCompanyContact(companyContact)
        setCompanyAdd(companyAdd)
        setNRIC(nric)
        setHpNo(hpNo)
        setFullName(fullName)
    }

    // useEffect(() => {
    //     if(companyContact !== '' 
    //         && companyAdd !== '' 
    //         && fullName !== '' 
    //         && hpNo !== '' 
    //         && nric !== ''
    //     )
    //         setIsProfileComplete(true);
    // }, [companyContact, companyAdd, fullName, hpNo, nric])

    if (loading) {
        return <div>Loading user data...</div>;
    }

    if (!user) {
        // You might want to redirect to login if user is not available
        return <Navigate to="/login" />;
    }

    if (!isProfileComplete) {
        return <CompleteProfile 
                    userID={user?.UID} 
                    onDataUpdate={onCompleteProfileUpdate}
                />;
    }

    return <Outlet />;
};

export default RequiredCompleteProfile;