import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAlert } from "../../components/PromptAlert/AlertContext";
import { useAuth } from "../../AuthContext";
import CompleteProfile from "./CompleteProfile";
import CompanyController from '../../controller/CompanyController';
import UserController from "../../controller/User/UserController";

const { getCompany, getCompanyRoles, getCompanySkillsets } = CompanyController;
const { boGetUserProfile } = UserController;

const RequiredCompleteProfile = () => {
    const { user } = useAuth();
    const { showAlert } = useAlert();

    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [companyContact, setCompanyContact] = useState<string>('');
    const [companyAdd, setCompanyAdd] = useState<any>('');
    const [nric, setNRIC] = useState<string>('');
    const [hpNo, setHpNo] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [allRoles, setAllRoles] = useState<any>([]);
    const [allSkills, setAllSkills] = useState<any>([]);
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
            let profile = await boGetUserProfile(user?.UID);
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

    const fetchRoleNSkill = async () => {
        try {
            // Fetch all roles attached to this company
            let allRoles = await getCompanyRoles(user?.UID);
            allRoles = allRoles.roleName;
            // console.log(role)
            setAllRoles(Array.isArray(allRoles) ? allRoles : [])

            // Fetch all skillsets attached to this company
            let allSkills = await getCompanySkillsets(user?.UID);
            allSkills = allSkills.skillSets;
            // console.log(skill)
            setAllSkills(Array.isArray(allSkills) ? allSkills : [])
        } catch (error) {
            showAlert(
                "fetchRoleNSkill",
                "Fetch data error",
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            )
        }
    };  

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.UID) return;
    
            await fetchCompanyProfile(); // sets companyContact, companyAdd
            await fetchUserProfile();    // sets fullName, hpNo, nric
            await fetchRoleNSkill();     // sets roles and skillsets
            setLoading(false);
        };
        fetchData();
    }, [user?.UID]);
    
    useEffect(() => {
        const isAllFilled =
            String(companyContact).trim() !== '' 
            && String(companyAdd).trim() !== '' 
            && String(fullName).trim() !== '' 
            && String(hpNo).trim() !== '' 
            && String(nric).trim() !== ''
            && allRoles.length > 0 
            && allSkills.length > 0;

        setIsProfileComplete(isAllFilled);
    }, [companyContact, companyAdd, fullName, hpNo, nric, allRoles, allSkills]);
    
    // Update filled data locally
    function onCompleteProfileUpdate (
        companyContact: string, 
        companyAdd: string, 
        nric: string, 
        hpNo: string, 
        fullName: string,
        roles: any,
        skillsets: any
    ){
        setCompanyContact(companyContact)
        setCompanyAdd(companyAdd)
        setNRIC(nric)
        setHpNo(hpNo)
        setFullName(fullName)
        setAllRoles(roles)
        setAllSkills(skillsets)
    }

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