
const path = require('path');

console.log(path.resolve(__dirname, 'keys/certificate.pem.crt'));

const awsIot = require('aws-iot-device-sdk');
// Define the correct file paths for your certificates

const device = awsIot.device({
   keyPath: path.resolve(__dirname, 'keys/private.pem.key'),  // Adjusted for the "keys" folder
   certPath: path.resolve(__dirname, 'keys/certificate.pem.crt'),  // Adjusted for the "keys" folder
   caPath: path.resolve(__dirname, 'keys/AmazonRootCA1.pem'),  // Adjusted for the "keys" folder
   clientId: 'myUniqueClientId',
   host: 'a1osk4bsf29pii-ats.iot.us-east-2.amazonaws.com'  // Your IoT Core endpoint
});

// Connect and send mock data...
device.on('connect', () => {
    console.log('Connected to AWS IoT');
    
    function sendMockData() {
        const mockData = {
            heartRate: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
            time: new Date().toISOString()
        };
        console.log('Sending mock data:', mockData);
        device.publish('my/test/topic', JSON.stringify(mockData));
    }

    setInterval(sendMockData, 5000);  // Send mock data every 5 seconds
});

device.on('error', (error) => {

    console.log('Error:', error);
});
