import { useLocation } from 'react-router-dom';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

import { BiSolidShow } from '../../../../public/Icons.js'
import '../VideoMgt.css'
import '../../../../public/styles/common.css'

interface AllVideoProps {
    videos: any;
    updatePreviewVideo: (videoLink: string) => void
    updateLandingVideo: (videoLink: string) => void
}

const AllVideos = ({videos, updatePreviewVideo, updateLandingVideo}: AllVideoProps) => {
    // console.log(videos)
    const location = useLocation()
    const isVideoMgt = location.pathname.includes('video-management');

    return(
        <div className={`${isVideoMgt ? 'set-visible' : 'App-mobile-responsive-table'}`}>
            {videos.map((video:any) => (
            <div key={video.videoID}>
                <div className="App-mobile-responsive-table-card">
                    <div className="App-mobile-responsive-table-card-data-detail uploaded-demo-video-list-item">
                        <h4>{video.title}</h4>
                        {video.isShown === 0 && (
                            <div className="btns-grp">
                                {/* <BiSolidShow 
                                    className='view-video-icons'
                                    onClick={() => updatePreviewVideo(video.video_link)}
                                /> */}
                                <PrimaryButton 
                                    text='Display on Landing'
                                    onClick={() => updateLandingVideo(video.video_link)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            ))}
        </div>
    )
}

export default AllVideos