import { useState, useEffect } from 'react'
import { useAuth } from '../../AuthContext'
import { useAlert } from '../../components/PromptAlert/AlertContext'
import UserProfileCard from '../../components/UserProfile/UserProfile'
import UpdateUserProfileCard from '../../components/UserProfile/UpdateUserPr'
import EMP_MoreUserPrDetail from '../../components/UserProfile/MoreEmpPr'
import EMP_UserPrEmployeerDetail from '../../components/UserProfile/MoreEmpPr_Employeer'
import { USER_ROLE } from '../../controller/Variables.js'
import UserController from '../../controller/User/UserController.js'

import { CgProfile, FaRegEdit } from '../../../public/Icons.js'
import './UserProfile.css'
import '../../../public/styles/common.css'

const { boGetUserProfile, empGetUserProfile } = UserController
const UserProfile = () => {
    const { user } = useAuth()
    const { showAlert } = useAlert()
    const [ userData, setUserData ] = useState<any>()
    const [ showUpdateUserProfile, setShowUpdateUserProfile ] = useState(false)

    const fetchUserProfile = async() => {
        try {
            if(user?.role === USER_ROLE[1]) {
                let boUserData = await boGetUserProfile(user?.UID)
                boUserData = boUserData.BOProfile
                // console.log(boUserData[0])
                setUserData(boUserData[0])
            }

            if(user?.role === USER_ROLE[2]) {
                const empUserData = await empGetUserProfile(user?.UID)
                // console.log(empUserData)
                const combinedData = {
                    ...empUserData.employeeProfile[0], 
                    ...empUserData.emailnric[0]
                }
                // console.log(combinedData)
                setUserData(combinedData)
            }

        } catch (error) {
            showAlert(
                "fetchUserProfile",
                "Fetch data error",
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            )
        }
    }
    useEffect(() => {fetchUserProfile()}, [user])

    function toggleUpdateUserProfile() {
        setShowUpdateUserProfile(!showUpdateUserProfile)
    }

    function updateUserProfile(updatedData: any) {
        setUserData(updatedData)
    }

    if (showUpdateUserProfile) return (
        <div className="content">
            <h1 className='view-my-profile-header'>Update My Profile</h1>
            {userData && (
                <div className='user-profile-detail-container'>
                    <CgProfile className='user-profile-page-user-icon'/>
                    <UpdateUserProfileCard 
                        userData={userData}
                        onDataUpdate={updateUserProfile}
                        onClose={toggleUpdateUserProfile}
                    />
                </div>
            )}
        </div>
    )

    return (
        <div className="content">
            <h1 className='view-my-profile-header'>My Profile 
                <FaRegEdit 
                    className='edit-user-profile'
                    onClick={() => toggleUpdateUserProfile()}
                />
            </h1>
            {userData && (
                <div className='user-profile-content'>
                    <div className='user-profile-content-user-infos'>
                        <div className='user-profile-detail-container'>
                            <CgProfile className='user-profile-page-user-icon'/>
                            <UserProfileCard userData={userData} />
                            
                        </div>
                        {user?.role === USER_ROLE[2] && (
                        <div className="user-profile-detail-container emp-user-profile-container">
                            <EMP_MoreUserPrDetail userData={userData}/>
                        </div>
                        )}
                    </div>
                    {user?.role === USER_ROLE[2] && (
                    <div className="user-profile-detail-container emp-employeer-user-profile-container">
                        <EMP_UserPrEmployeerDetail userData={userData}/>
                    </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default UserProfile