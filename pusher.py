'''
This is the push tool for read180
'''
#from datetime import datetime
import time
import urllib2
import urllib
import xml_content
import xml.etree.ElementTree as ET
'''

'''
global user_name, sid, uid, response, activity_name, zone_available, question_id
user_name = "s21"
zone_available={"reading_zone":True, "word_zone":True,"spelling_zone":True,"success_zone":True, "writing_zone":True}

def get_sid_from_response(response):
    index=response.find("<sid>")
    if index > -1:
        return response[index+5:index+37]
    else:
        return None
    
def get_uid_from_response(response):
    idx1 = response.find("<user_id>")
    idx2 = response.find("</user_id>")
    if idx1>-1 and idx2>-1:
        return response[idx1+9:idx2]
    else:
        return None
    
def get_atom_name_from_response(response):
    idx2 = response.find("_atom>") + 5;
    idx1=idx2
    while(response[idx1:idx1+1]!="<" and idx1>=0):
        idx1-=1        
    return response[idx1+1:idx2]
        
def get_zone_name_from_response(response):
    idx1 = response.find("<zone><![CDATA[");
    idx2 = response.find("]]></zone>");
    if idx1>-1 and idx2>-1:
        return response[idx1+15, idx2]
    else:
        return None

def get_question_id_from_response(response):
    idx1 = response.find("<question id=\"")
    if idx1>-1:
        idx2 = response[idx1:].find("\">")
        return response[idx1+14:idx1+idx2]
    else:
        return None      
 

def login():
    global sid, uid
    parameters = "command=LoginValidate";
    parameters += "&username="+user_name; 
    parameters += "&password=Welcome_1"; 
    parameters += "&community=R180NG";
    parameters += "&replace_session=1";
    parameters += "&client_datetime=" + str(int(time.time()));
    request_url = "https://integration5.education.scholastic.com/r180ng/core.cd?"+parameters
    content = urllib2.urlopen(request_url).read()
    #print content
    sid = get_sid_from_response(content)
    uid = get_uid_from_response(content)
    print sid, uid
    
def get_atom_data():
    global sid, uid, response, activity_name, question_id,zone_available
    parameters = "command=GetAtomData";
    parameters += "&user_id=" + uid;
    parameters += "&sid=" +  sid;
    request_url = "https://integration5.education.scholastic.com/r180ng/core.cd?"+parameters
    response = urllib2.urlopen(request_url).read()
    #print content
    # Analyze the content, and do something for special cases
    root = ET.fromstring(response)
    
    activity_name = get_atom_name_from_response(response)
    print "Activity Name: " + activity_name
    if activity_name == "zone_menu_atom":
        zone_available["reading_zone"] = True if root.find(".//*[@id='reading_zone']/available").text=="true" else False
        zone_available["word_zone"] = True if root.find(".//*[@id='word_zone']/available").text=="true"  else False
        zone_available["spelling_zone"] = True if root.find(".//*[@id='spelling_zone']/available").text=="true"  else False
        zone_available["success_zone"] = True if root.find(".//*[@id='success_zone']/available").text=="true"  else False
        zone_available["writing_zone"] = True if root.find(".//*[@id='writing_zone']/available").text=="true"  else False
    question_id = get_question_id_from_response(response)
    #print "Question Id: "+ str(question_id)

def save_atom_results():
    global uid, sid 
    parameters = "command=SaveAtomResults"
    parameters += "&user_id=" + uid
    parameters += "&sid=" +  sid
    request_url = "https://integration5.education.scholastic.com/r180ng/core.cd?"+parameters
    xml_to_send = options_control()
    print zone_available
    print xml_to_send  
    xml_to_send = urllib.urlencode({'xml':xml_to_send})
    content = urllib2.urlopen(request_url, xml_to_send).read()
    #print "\n"+content
    
def options_control():
    global question_id, response, zone_available
    if activity_name == "zone_menu_atom":
        if zone_available["reading_zone"]: xml_to_send = xml_content.atom_variation_map[activity_name].values()[0]
        elif zone_available["word_zone"]: xml_to_send = xml_content.atom_variation_map[activity_name].values()[1]
        elif zone_available["spelling_zone"]: xml_to_send = xml_content.atom_variation_map[activity_name].values()[2]
        elif zone_available["success_zone"]: xml_to_send = xml_content.atom_variation_map[activity_name].values()[3]
        else: xml_to_send = xml_content.atom_variation_map[activity_name].values()[4]
        #print zone_available
        #print xml_to_send
        #print xml_content.atom_variation_map[activity_name].values()[1]
    elif activity_name == "rz_quick_check_question_atom" and question_id != None:  #Special Case for Quick Check Questions
        print "Question Id: "+ question_id
        xml_to_send = xml_content.atom_variation_map[activity_name].values()[int(question_id)-1]
    elif activity_name == "wz_word_assessment_round_atom":
        xml_to_send = xml_content.atom_variation_map[activity_name](response, 0)
    elif activity_name == "wz_self_check_atom":
        xml_to_send = xml_content.atom_variation_map[activity_name](response, 0)
    else:
        xml_to_send = xml_content.atom_variation_map[activity_name].values()[0]
    return xml_to_send
    
 
login()
for i in range(20):
    print "\n Count:"+ str(i)
    get_atom_data() #Dashboard
    save_atom_results()

 