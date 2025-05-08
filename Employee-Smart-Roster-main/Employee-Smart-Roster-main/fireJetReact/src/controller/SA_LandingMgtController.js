import { encodeFileContent, readFileAsArrayBuffer, arrayBufferToBase64 } from "./Variables";

async function uploadLandingVideo(video, videoName) {
    const fileName = video.name
    // console.log(fileName)
    const videoTitle = videoName
    const fileType = video.type || 'video/mp4';

    const body = {
        fileName,
        fileType,
        videoTitle
    }

    try {
        const response = await fetch(
            'https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/s3/video/upload',
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // console.log("API Response Status:", response);
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Failed to get pre-signed URL: ${data}`);
        }
        const data = await response.json();
        // console.log(data);
        const uploadUrl = data.uploadUrl //Initialize Pre-signed url
        
        // Step 2: upload file to s3 using pre-signed URL
        // const fileData = fs.readFileSync(filePath);
        const uploadResponse = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': fileType,
            },
            body: video,
        });

        if (!uploadResponse.ok) {
            console.error('Error uploading file:', uploadResponse.statusText);
            return;
        }

        // console.log('File uploaded successfully!');
        return await data // Spread any additional fields from the API response
    } catch (error) {
        throw new Error(`Failed to upload video: ${error.message}`);
    }
}

// fileName === video_link
async function getDemoVideo(fileName) {
    try{
        const body = {
            fileName
        };

        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/s3/video/download', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error getting pre-signed URL: ${data}`);
        }
        const downloadResponse = await fetch(presignedUrl);

        if (!downloadResponse.ok) {
            console.error('Error downloading file:', downloadResponse.statusText);
            return;
        }

        //  Save the downloaded file locally if you want , but you should be directly displaying it on frontend side.
        const videoBlob = await downloadResponse.blob();
        const videoUrl = URL.createObjectURL(videoBlob);
        return {
            videoUrl,  // URL for video element src
            fileName,
            blob: videoBlob  // Optional: if you need the Blob object
        };

    } catch(error) {
        // console.error(`Failed to register: \n`, error);
        throw new Error(`Failed to get videos: ${error.message}`);
    }
}

async function getAllUploadedVideos() {
    try{
        const body = {
            
        };

        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/systemadmin/video/view', {
            method: 'GET',
            // body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error status: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data);

        return await data;

    } catch(error) {
        // console.error(`Failed to register: \n`, error);
        throw new Error(`Failed to get videos: ${error.message}`);
    }
}

// 1 is shown, 0 isn't shown
async function filterIsShownVideo (allVideos, isShown) {
    const filteredData = allVideos.filter((video) => {
        return video.isShown === isShown
    })
    return filteredData
}

export default { 
    uploadLandingVideo,
    getDemoVideo,
    getAllUploadedVideos,
    filterIsShownVideo
}