async function handleSubmitQuesToChatBox (question) {
    // console.log(user_query)
    try{
        const body = {
            user_query: question
        };

        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/chatbot', {
            method: 'POST',
            body: JSON.stringify(body),
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

export default {
    handleSubmitQuesToChatBox,
}