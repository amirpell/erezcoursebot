const axios = require('axios');

const sendMessage = async () => {
    try {
        const response = await axios.post('http://localhost:10000/send-message/0548040569', {
            // any data you want to send in the body (optional for this case)
        });
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

sendMessage();
