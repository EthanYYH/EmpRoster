import { useState, useEffect } from 'react'
import { useAuth } from '../../AuthContext'
import { useAlert } from '../../components/PromptAlert/AlertContext'
import UserProfileCard from '../../components/UserProfile/UserProfile'
import UpdateUserProfileCard from '../../components/UserProfile/UpdateUserPr'
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
                let empUserData = await empGetUserProfile(user?.UID)
                empUserData = empUserData.employeeProfile
                console.log(empUserData[0])
                setUserData(empUserData[0])
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
                <div className='user-profile-detail-container'>
                    <CgProfile className='user-profile-page-user-icon'/>
                    <UserProfileCard userData={userData}/>
                </div>
            )}
        </div>
    )
}

export default UserProfile