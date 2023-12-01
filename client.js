const mqtt = require('mqtt');
const { v4: uuidv4 } = require('uuid');


const path = require('path')

const currentDir = __dirname
require('dotenv').config({ path: path.join(currentDir, '.env') });

const caCertPath = path.join(currentDir, '../cert.pem');
const clientKeyPath = path.join(currentDir, '../privkey.pem');
const clientCertPath = path.join(currentDir, '../.pem');


const mqttOptions = {
    clientId: uuidv4(),
    protocol: process.env.protocol,
    host: process.env.host,
    port: process.env.port, 
    rejectUnauthorized: false, 
    caCertPath,
    clientKeyPath,
    clientCertPath,
    username: 'sp-API',
    password: 'pa1'
  
  }

const client = mqtt.connect(mqttOptions);
console.log(mqttOptions.clientId)

client.on('connect', () => {
    console.log('Connected to MQTT broker');
     client.subscribe('parcelId');
     client.subscribe('class');
     client.subscribe('$share/cluster/pin');
  });

client.on('message', async (topic, message) => {
    console.log(message.toString())

})


client.on('error', (error) => {
    console.error('MQTT error:', error);
  });
  
  client.on('close', () => {
    console.log('Connection to MQTT broker closed');
  });
  
  client.on('offline', () => {
    console.log('MQTT client is offline');
  });
  
  client.on('end', () => {
    console.log('MQTT client disconnected');
  });