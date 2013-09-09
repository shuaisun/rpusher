import subprocess
import time
import os
from main import test_thread
import sys

#Get User List From Build xml file
str_users = ''.join(sys.argv[1])
print str_users
user_list = str_users.split(",")

#Get config file name
config_file = sys.argv[2]
print config_file

# Get Current file path
current_dir = os.path.dirname(os.path.abspath(__file__))

print current_dir
#Start Content Provider					
subprocess.call('start cmd /c '+current_dir+'/content_provider/start-content-provider.bat', shell=True)
time.sleep(2)

# Run Flow Chart test
config_path = current_dir +	'/config/'+	config_file
thread = test_thread.TestThread(config_path,user_list)
thread.start()