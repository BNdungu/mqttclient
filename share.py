import paho.mqtt.client as mqtt
import ssl

# MQTT broker details
broker_address = "dropoff.co.ke"
port = 8883  # Use the appropriate port for MQTT over TLS/SSL
username = "adminDropoff"
password = "dropoff2023"

# Paths to your certificate and private key files
certfile = "cert.pem"
keyfile = "privkey.pem"

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print(f"Connected to MQTT broker with client ID: {client._client_id}")
        # Subscribe to a shared topic
        client.subscribe("$share/group/shared_topic", qos=0)  # Using $share to create shared subscription
    else:
        print(f"Connection failed with error code {rc}")

def on_message(client, userdata, msg):
    print(f"Received message on topic '{msg.topic}': {msg.payload.decode()}")

client1 = mqtt.Client(client_id="client001")
client1.on_connect = on_connect
client1.on_message = on_message
client1.username_pw_set(username, password)
client1.tls_set(certfile=certfile, keyfile=keyfile, cert_reqs=ssl.CERT_NONE)


# Connect and start the clients
client1.connect(broker_address, port=port)

# Run the MQTT client loops
client1.loop_forever()