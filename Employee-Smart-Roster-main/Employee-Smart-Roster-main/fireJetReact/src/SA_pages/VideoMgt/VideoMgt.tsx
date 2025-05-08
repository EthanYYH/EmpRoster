import React, { useState, useEffect } from 'react'
import { useAlert } from '../../components/PromptAlert/AlertContext'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import SA_LandingMgtController from '../../controller/SA_LandingMgtController'
import FileUploadResult from '../../components/FileUploadStatus/FileUploadStatus'
import AllVideos from './components/VideosList'

import { FaUpload } from '../../../public/Icons.js'
import './VideoMgt.css'
import '../../../public/styles/common.css'

const { uploadLandingVideo, getDemoVideo, getAllUploadedVideos,
        filterIsShownVideo } = SA_LandingMgtController

const videoSrc = '../../../public/assets/TestDemo.mp4'
const VideoMgt: React.FC = () => {
    const { showAlert } = useAlert();
    const [ newVideoTitle, setNewVideoTitle ] = useState<string>('')
    const [ uploadedDemoVideo, setUploadedDemoVideo ] = useState<File | null>(null);
    const [ videoPreview, setVideoPreview ] = useState<any>('')
    const [ fileStatus, setFileStatus ] = useState<
        'initial' | 'uploading' | 'success' | 'fail'
    >('initial');
    const [ allVideos, setAllVideos ] = useState<any>([]);

    const fetchVideos = async() => {
        try {
            let response = await getAllUploadedVideos()
            // console.log(response)
            if (response.message === 'Succesfully retrieved video list'){
                response = response.VideoList
                // console.log(response)
                setAllVideos(response)

                // Get video shown in landing page as default preview video
                const defaultPreview = filterIsShownVideo(response, 1)
                console.log(defaultPreview)
                setVideoPreview(defaultPreview)
            }
        } catch(error) {
            showAlert(
                'fetchVideos',
                'Failed to Fetch All Uploaded Video',
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            )
        }
    }
    useEffect(() => {fetchVideos()}, [allVideos.length])

    // Handle Registration Submission with File Upload:
    // https://uploadcare.com/blog/how-to-upload-file-in-react/#show-upload-result-indicator
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFileStatus('initial');
            setUploadedDemoVideo(e.target.files[0]);
        }
    };

    // UPLOAD NEW VIDEO
    const triggerUploadVideo = async() => {
        if (uploadedDemoVideo) {
            try {
                const response = await uploadLandingVideo(uploadedDemoVideo, newVideoTitle)
                console.log(response)
            } catch(error) {
                setFileStatus('fail');
                showAlert(
                    'triggerUploadVideo',
                    'Failed to Submit Demo Video',
                    error instanceof Error ? error.message : String(error),
                    { type: 'error' }
                )
            }
        }
    }

    // Trigger selected video
    const triggerSelectVideo = async(videoLink: string) => {
        try {
            let response = await getDemoVideo(videoLink)
            // console.log(response)
            // if (response.message === 'Succesfully retrieved video list'){
            //     response = response.VideoList
            //     // console.log(response)
            //     setSelectedVideoName(response)
            // }
        } catch(error) {
            showAlert(
                'fetchVideos',
                'Failed to Fetch All Uploaded Video',
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            )
        }
    }

    // Update video for preview
    const triggerChangePreview = async(videoLink: string) => {
        setVideoPreview(videoLink)
    }


    return(
        <div className="App-content">
            <div className="content">
                <h1>
                    Demo Video Management
                </h1>
                {/* BizFile */}
                <div className='upload-new-demo-video-component'>
                    <strong className='upload-demo-video-title'>
                        Upload New Demo Video
                        <button 
                            className={`upload-video-button ${
                                (!uploadedDemoVideo || !newVideoTitle) ? 'disabled' : ''
                            }`}
                            disabled={!uploadedDemoVideo || !newVideoTitle}
                            onClick={triggerUploadVideo}
                        >
                            <FaUpload />
                        </button>
                        
                    </strong>
                    <div className="upload-video-content">
                        <input type='text' 
                            className='video-title-input'
                            name='videoTitle'
                            placeholder='Video Name'
                            onChange={(e) => setNewVideoTitle(e.target.value)}
                            required
                        />
                        <input type='file' 
                            name='uploadVideo'
                            accept=".mp4"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <FileUploadResult 
                        status={fileStatus}
                        fileType='Video'
                    />
                </div>

                {allVideos.length > 0 ?(
                    <div className="uploaded-video-container">
                        
                        <video className='default-preview-video' autoPlay muted playsInline>
                            <source src={videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <AllVideos 
                            videos={allVideos}
                            updatePreviewVideo={triggerChangePreview}
                            updateLandingVideo={triggerSelectVideo}
                        /> 
                    </div>
                    
                ):(
                    <p>No Uploaded Video(s)</p>
                )}
            </div>
        </div>
    )
}

export default VideoMgt

