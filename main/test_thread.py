'''
test_thread is to make use of all other modules and classes
to define test process.

Take this file for example: 
it first initializes config_vo, which contains all properties from config file,
by calling init_testplan.
then, it simulate a request's behavior by calling handler methods in 
test_handler

'''

import os
import time
import urllib
import smtplib
import xml.etree.ElementTree as ET
import test_executer
from threading import Thread
from email.mime.text import MIMEText
from test_config import init_testplan_from_file


#=================Request Thread Definithion===========================
class TestThread(Thread):
	
	
	def __init__(self,fileName,user_list):
		Thread.__init__(self)
		# Get config info
		self.config_vo = init_testplan_from_file(fileName,user_list)
		# Define variables
		self.success_flag = False
		self.current_topic = ""
	


	def run(self):
		# Get time stamp
		self.config_vo["time_stamp"] = time.localtime()		
		# Append log header
		self.append_log_head()		
		
		#=============================Loop Through activity list======================================#
		#while True:	
		for self.sets_num in range(self.config_vo["sets_num"]):
			
			self.config_vo["username"] = self.config_vo["userlist"][self.sets_num] # Move to next user
			self.config_vo["init_topic"] = self.config_vo["topic_sets"][self.sets_num][0]
			self.config_vo["end_topic"] = self.config_vo["topic_sets"][self.sets_num][1]

			step_start = time.localtime()
			self.success_flag,self.current_series_topic,error_message = test_executer.test_execution(self.config_vo)
			step_finish = time.localtime()
			step_execution = time.mktime(step_finish) - time.mktime(step_start)			
			self.append_log_step(self.success_flag, self.current_series_topic, error_message,step_execution)
			
			self.sets_num += 1

			
			'''
			if self.success_flag == False:      # Failure Handling	
				self.config_vo["fail_times"] += 1
				print "Failure Time now is: ",self.config_vo["fail_times"]
																		# If fail time exceed limit or succeed, break
			if self.config_vo["fail_times"] >= int(self.config_vo["number_of_users"]) or self.success_flag == True:
				print "Failure times: ", self.config_vo["fail_times"], "Success", self.success_flag
				break
							
			self.config_vo["username"] = self.config_vo["userlist"][self.config_vo["fail_times"]] # Move to next user
			if float(self.current_series_topic)<52:											# Move to next topic
				self.config_vo["init_topic"] = str(int(float(self.current_series_topic)+1))
				print "current series float, continue", float(self.current_series_topic)
			else:
				self.config_vo["init_topic"] = str(int(float(self.current_series_topic)))
				print "current series float, break", float(self.current_series_topic)	
				break	
			'''	
		#===============Thread Finish======================#			
		self.thread_finish()
		

		
	
		
	def thread_finish(self):
		thread_finish = time.localtime()
		# Get string xml content
		content = self.generate_log_xml(thread_finish)
		
		#Get the file path
		dirname = os.path.dirname
		normpath = os.path.normpath
		join = os.path.join
		results_file_path = normpath(join(dirname(__file__), "../../../automated-tests/logs/iread/"+self.config_vo["result_file_name"]))		

		# Write into results file in log folder
		results_file = open(results_file_path, "w")
		results_file.write(content)
		results_file.close()				
		
		# Send Email
		self.send_email(content)
		
		#Terminate content provider
		params = urllib.urlencode({'terminate':'true',})
		urllib.urlopen("http://127.0.0.1:8123/?%s" % params)		
		return
	
	def send_email(self,content):
		#Send Email:
		FROM = "IRead Flow Test"
		TO = [self.config_vo["email"]]#
		msg = MIMEText(content)		
		msg['To'] = ', '.join(TO)
		msg['Subject'] = "Flowchart test results"
		msg['From'] = "IRead Flow Test"
		server = smtplib.SMTP("inframail01.setg.local")
		server.sendmail(FROM, TO, msg.as_string())
		server.quit()
		print "Email sent"
		
	def append_log_head(self):
		self.qc_log =  {}
		self.qc_log["servername"]=self.config_vo["server_address"]
		self.qc_log["name"]= self.config_vo["test_name"]
		self.qc_log["comment"] = "This is a comment"
		self.qc_log["execution_date"] = time.strftime("%m/%d/%Y",self.config_vo["time_stamp"])
		self.qc_log["status"] = "Pass"
		self.qc_log["step-sequence"] = []

	def append_log_step(self,success_flag,current_topic,error_message,step_execution):
		step = {}                                                        #Generate QC log Step file
		step["id"] = str(self.sets_num +1)
		step["execution_date"] = self.qc_log["execution_date"]
		step["execution_time"] = str(step_execution)
		step["step_description"] = "Test from "	+self.config_vo["init_topic"]+" to "+current_topic
		step["Content"] = error_message	
					
		if success_flag == True:
			step["status"] = "Pass"
		else:
			step["status"] = "Failed"
			self.qc_log["status"] = "Failed"
				
		self.qc_log["step-sequence"].append(step)
		
	def generate_log_xml(self,thread_finish):
		log_xml=  ET.Element('run-sequence')
		root = ET.SubElement(log_xml, 'run')
		
		servername = ET.SubElement(root, 'servername')
		servername.text = self.qc_log["servername"]
		
		name = ET.SubElement(root, 'name')
		name.text = self.qc_log["name"]
		
		status = ET.SubElement(root, 'status')
		status.text = self.qc_log["status"]
		
		comment = ET.SubElement(root, 'comment')
		comment.text = self.qc_log["comment"]
		
		
		execution_date = ET.SubElement(root, 'execution_date')
		execution_date.text = self.qc_log["execution_date"]
		
		test_finish = time.localtime()
		test_execution_time = str( time.mktime(test_finish) - time.mktime(self.config_vo["time_stamp"]) )
		execution_time = ET.SubElement(root, 'execution_time')
		execution_time.text = test_execution_time
		
		step_sequence = ET.SubElement(root, 'step_sequence')
		
		for step_content in self.qc_log["step-sequence"]:
			step = ET.SubElement(step_sequence, 'step')
			step.attrib["id"] = step_content["id"]
			
			step_status = ET.SubElement(step, 'status')
			step_status.text = step_content["status"]
			
			step_execution_date = ET.SubElement(step, 'execution_date')
			step_execution_date.text = step_content["execution_date"]
			
			step_execution_time = ET.SubElement(step, 'execution_time')
			step_execution_time.text = step_content["execution_time"]
			
			step_description = ET.SubElement(step, 'step_description')
			step_description.text = step_content["step_description"]
			
			Content = ET.SubElement(step, 'Content')
			Content.text = step_content["Content"]
			
		tree = ET.ElementTree(log_xml)		
		# Beautify the content
		content_ele = tree.getroot()
		self.indent(content_ele)
		content = ET.tostring(content_ele)	
			
		return content		
	# Helper Function	
	def indent(self,elem, level=0):
		i = "\n" + level*"  "
		if len(elem):
			if not elem.text or not elem.text.strip():
				elem.text = i + "  "
			if not elem.tail or not elem.tail.strip():
				elem.tail = i
			for elem in elem:
				self.indent(elem, level+1)
			if not elem.tail or not elem.tail.strip():
				elem.tail = i
		else:
			if level and (not elem.tail or not elem.tail.strip()):
				elem.tail = i

def module_test():
	dirname = os.path.dirname
	parent_dir = dirname( dirname(os.path.abspath(__file__)))
	config_file = parent_dir+"/config/test_config.xml"
	thread = TestThread(config_file,["clindberg-1398686239","rwise-1828724359"])
	thread.run()
			
if __name__ == "__main__":
	module_test()		


	
			

