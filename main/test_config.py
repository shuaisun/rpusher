import xml.etree.ElementTree as ET
import csv
import os
from test_validator import topic_num_to_str


def init_testplan_from_file(fileName,user_list):
	if "adam" in fileName:
		return init_testplan_adam(fileName)
	plan_vo = {}			
	data = ET.parse(fileName)				
	plan_vo["userlist"] = user_list		
	plan_vo["password"] = data.find(".//user_password").text
	plan_vo["test_name"] =  data.find(".//test_name").text

	plan_vo["email"] = data.find(".//email").text              #Need to change for multiple users
	plan_vo["server_address"] = data.find(".//server_address").text			
	plan_vo["protocol"] = data.find(".//server_protocol").text
	plan_vo["server_port"] = data.find(".//server_port").text
	plan_vo["number_of_users"] = data.find(".//number_of_users").text
	plan_vo["result_file_name"] = data.find(".//result_file_name").text
	plan_vo["assertion_flag"] = data.find(".//assertion_flag").text	
	plan_vo["flow_option"] = data.find(".//flow_option").text	
	plan_vo["fail_times"] = 0		
	plan_vo["username"] = plan_vo["userlist"][0]
	plan_vo["topic_sets"] = []
	set_nodes = data.findall(".//topic_set")
	plan_vo["sets_num"] = len(set_nodes)
	for node in set_nodes:
		plan_vo["topic_sets"].append([node.attrib["start"],node.attrib["end"]])

	plan_vo["init_topic"]= plan_vo["topic_sets"][0][0]
	plan_vo["end_topic"] = plan_vo["topic_sets"][0][1]
	return plan_vo
		
def init_testplan_adam(fileName):
	plan_vo = {}			
	data = ET.parse(fileName)				
	plan_vo["userlist"] = []		
	plan_vo["password"] = data.find(".//user_password").text
	plan_vo["test_name"] =  data.find(".//test_name").text

	plan_vo["email"] = data.find(".//email").text              #Need to change for multiple users
	plan_vo["server_address"] = data.find(".//server_address").text			
	plan_vo["protocol"] = data.find(".//server_protocol").text
	plan_vo["server_port"] = data.find(".//server_port").text
	plan_vo["number_of_users"] = data.find(".//number_of_users").text
	plan_vo["result_file_name"] = data.find(".//result_file_name").text
	plan_vo["assertion_flag"] = data.find(".//assertion_flag").text	
	plan_vo["flow_option"] = data.find(".//flow_option").text	
	plan_vo["fail_times"] = 0		

	plan_vo["topic_sets"] = []
	set_nodes = data.findall(".//topic_set")
	plan_vo["sets_num"] = len(set_nodes)
	for node in set_nodes:
		plan_vo["userlist"].append(node.attrib["username"])
		plan_vo["topic_sets"].append([node.attrib["start"],node.attrib["end"]])

	plan_vo["username"] = plan_vo["userlist"][0]
	plan_vo["init_topic"]= plan_vo["topic_sets"][0][0]
	plan_vo["end_topic"] = plan_vo["topic_sets"][0][1]
	return plan_vo


def display(config_vo):
	for key in config_vo:
		print key+": ", config_vo[key]

if __name__ == "__main__":	
	dirname = os.path.dirname
	parent_dir = dirname( dirname(os.path.abspath(__file__)))
	config_file = parent_dir+"/config/config_adam.xml"	
	config_vo = init_testplan_from_file(config_file,["xiaohong","xiaobai"])
	display(config_vo)
	
	
	
	