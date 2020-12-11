from SengledElement import client
import sys, time
import paho.mqtt.client as mqtt

home = None
light_topic = "home/bedroom/lights/set"

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe(light_topic)

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))
    msg_val = msg.payload.decode("utf-8")
    if(msg.topic == light_topic):
        if(msg_val == "0"):
            print("Lights off")
            home.devices.set_device_state(0, device_name="Anthonys Room Bulb 1")
            home.devices.set_device_state(0, device_name="Anthonys Room Bulb 2")
        if(msg_val == "1"):
            print("Lights on")
            home.devices.set_device_state(1, device_name="Anthonys Room Bulb 1")
            home.devices.set_device_state(1, device_name="Anthonys Room Bulb 2")



def list_devices():
    for name in home.devices.get_names():
        print(name)


def set_state(name=None, state=None):
    if name is None:
        name = input("Which bulb?")
    if state is None:
        state = input("What state?")
    home.devices.set_device_state(state, device_name=name)


def main_input():
    max_option = 3
    while True:
        print("1)\tList Bublbs")
        print("2)\tSet State")
        print("3)\tExit)")
        select = input("Select option: ")
        select = int(select)
        if 0 < select <= max_option:
            if select == 1:
                list_devices()
            elif select == 2:
                set_state()
            elif select == 3:
                return


if __name__ == '__main__':
    home = client.client("email", "psswd")
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    client.connect("mqtt_ip", 1883, 60)
    client.loop_forever()
