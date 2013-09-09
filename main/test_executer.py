import os
import time
import urllib2
import urllib
import httplib
from test_config import init_testplan_from_file
from test_exceptions import  AssertionException, QAServerException, QAFakeXMLException,QAResponseXMLException
from xml.etree.ElementTree import ParseError
import xml.etree.ElementTree as ET
import test_validator
import test_validation_happy_flow
import test_validation_fast_flow
import test_validation_fail_3cycles
import test_validation_fail_cycle1_pass_cycle2
from time import strftime
from test_properties import variation_dic_happy_flow, variation_dic_fast_flow, variation_dic_fail_3cycles,variation_dic_fail_cycle1_pass_cycle2

class SessionClass(object):
    '''===========================================================================
    This class define behaviors during a user session, including "initialize","login",
    "get next activity","save result","logout"
    ==========================================================================='''
    def __init__(self, config_vo):        
        self.config_vo = config_vo # Set the configure file
        self.set_flow_options()
        self.init_variables()       
        self.append_log_head()
        
    def set_flow_options(self):
        if self.config_vo["flow_option"] == "fast_flow":
            validation_class = test_validation_fast_flow.ValidationClass()
            self.variation_dic = variation_dic_fast_flow
        elif self.config_vo["flow_option"] == "happy_flow":
            validation_class = test_validation_happy_flow.ValidationClass()
            self.variation_dic = variation_dic_happy_flow
        elif self.config_vo["flow_option"] == "fail_3cycles":
            validation_class = test_validation_fail_3cycles.ValidationClass()
            self.variation_dic = variation_dic_fail_3cycles
        elif self.config_vo["flow_option"] == "fail_cycle1_pass_cycle2":
            validation_class = test_validation_fail_cycle1_pass_cycle2.ValidationClass()
            self.variation_dic = variation_dic_fail_cycle1_pass_cycle2
        else:
            return
        self.activity_list = validation_class.get_activity_list(self.config_vo["init_topic"],self.config_vo["end_topic"])   
        
        
    def init_variables(self):
         # Define the variables
        self.success = False
        self.current_series = ""
        self.current_topic = ""
        self.current_cycle = ""
        self.current_activity = ""
        self.current_content = ""
        
    def append_log_head(self):
        self.log_content=[]              
        self.log("=========================Test Starts=========================")
        self.log("User Name is:"+ self.config_vo["username"])
        self.log("Password is:"+self.config_vo["password"])
        self.log("Initial Topic is: "+ self.config_vo["init_topic"])
        self.log("End Topic is: "+ self.config_vo["end_topic"] )
        self.log("Server Address is: "+ self.config_vo["server_address"] )
        self.log("Email is: "+ str(self.config_vo["email"]))
       
        
    def init_request(self):
        command="SetInitialPlacement"
        request_url = self.config_vo["protocol"]+"://"+self.config_vo["server_address"]+"/iRead/core.cd?command="+command+"&user_name="+ self.config_vo["username"] +"&initial_series="+self.config_vo["init_topic"]#+"&community=s44jr&replace_session=1"

        try:                        #Wrap possible exceptions when communicating with server into QAServerException
            self.current_content = urllib2.urlopen(request_url).read()
        except urllib2.URLError as e:
            if hasattr(e, 'reason'):
                error_msg = 'Failed to reach server. Reason: ' + e.reason
            elif hasattr(e, 'code'):
                error_msg = 'The server couldn\'t fulfill the request. Error code: '+ e.code
            raise QAServerException(request_url, error_msg)
        except HttpException as e:
            error_msg = "HttpException happens when communicating with server"
            raise QAServerException(request_url, error_msg)
        except Exception as e:
            print e   
                    
        try:            
            root = ET.fromstring(self.current_content)          #Validate Initialization        
            error_code = root.find(".//error_code").text
            if error_code != "0":
                error_msg = "Response xml shows error.\n "+self.current_content
                raise QAResponseXMLException(error_msg) 
        except QAResponseXMLException:
            raise
        except ParseError as e:
            error_msg = "Error happens parsing response xml. \n"
            raise QAResponseXMLException(error_msg)        
        except AttributeError as e:
            error_msg = "Error happens retrieving attribute from response xml.\n "+str(e)
            raise QAResponseXMLException(error_msg)        
        except Exception as e:
            print e          
        self.log("Initialization. Results:" + str(error_code) + "\n")
            
        #Login
    def login_request(self):
        command="LoginValidate"
        request_url = self.config_vo["protocol"]+"://"+ self.config_vo["server_address"]+"/iRead/core.cd?command="+command+"&username="+self.config_vo["username"]+"&password="+self.config_vo["password"]+"&community=s44jr&replace_session=1"
        print request_url
        try:                        #Wrap possible exceptions when communicating with server into QAServerException
            self.current_content = urllib2.urlopen(request_url).read()
        except URLError as e:
            if hasattr(e, 'reason'):
                error_msg = 'Failed to reach server. Reason: ' + e.reason
            elif hasattr(e, 'code'):
                error_msg = 'The server couldn\'t fulfill the request. Error code: '+ e.code
            raise QAServerException(request_url, error_msg)
        except HttpException as e:
            error_msg = "HttpException happens when communicating with server"
            raise QAServerException(request_url, error_msg)
        except Exception as e:
            print e   
            
        try:            
            root = ET.fromstring(self.current_content) #validate Login, get user_id and sid for later use    
            self.user_id = root.find(".//user_id").text
            self.sid = root.find(".//sid").text
            error_code = root.find(".//error_code").text
            if error_code != "0":
                error_msg = "Response xml shows error.\n "+self.current_content
                raise QAResponseXMLException(error_msg)                 
            if root.find(".//cycle") != None:
                self.current_cycle = str(root.find(".//cycle").text)
                print "Cycle is: "+ self.current_cycle
                self.log_content.append("Cycle is: "+ self.current_cycle)                
            if root.find(".//series") != None:
                self.current_series = str(root.find(".//series").text)
                print "series is: "+ self.current_series
                self.log_content.append("series is: "+ self.current_series)                
            if root.find(".//topic") != None:
                self.current_topic = str(root.find(".//topic").text)
                print "topic is: "+ self.current_topic
                self.log_content.append("topic is: "+ self.current_topic)
            else:
                self.current_topic =""  
        except QAResponseXMLException:
            raise                 
        except ParseError as e:
            error_msg = "Error happens parsing response xml. \n"
            raise QAResponseXMLException(error_msg)        
        except AttributeError as e:
            error_msg = "Error happens retrieving attribute from response xml.\n "+str(e)
            raise QAResponseXMLException(error_msg)   
        except Exception as e:
            print e       
        self.log("Login. Validation:" + str(error_code)+"\n")
                
        #Logout
    def logout_request(self):
        command="Logout"
        request_url = self.config_vo["protocol"]+"://"+ self.config_vo["server_address"]+"/iRead/core.cd?command="+command+"&sid="+self.sid  

        try:                        #Wrap possible exceptions when communicating with server into QAServerException
            self.current_content = urllib2.urlopen(request_url).read()
        except URLError as e:
            if hasattr(e, 'reason'):
                error_msg = 'Failed to reach server. Reason: ' + e.reason
            elif hasattr(e, 'code'):
                error_msg = 'The server couldn\'t fulfill the request. Error code: '+ e.code
            raise QAServerException(request_url, error_msg)
        except HttpException as e:
            error_msg = "HttpException happens when communicating with server"
            raise QAServerException(request_url, error_msg)
        except Exception as e:
            print e   
            
        try:            
            root = ET.fromstring(self.current_content)          #Validate Initialization        
            error_code = root.find(".//error_code").text
            if error_code != "0":
                error_msg = "Response xml shows error.\n "+self.current_content
                raise QAResponseXMLException(error_msg)
        except QAResponseXMLException:
            raise             
        except ParseError as e:
            error_msg = "Error happens parsing response xml. \n"
            raise QAResponseXMLException(error_msg)        
        except AttributeError as e:
            error_msg = "Error happens retrieving attribute from response xml.\n "+str(e)
            raise QAResponseXMLException(error_msg) 
        except Exception as e:
            print e               

        self.log("Logout. Validation:" + str(error_code)+"\n")
    
    
        #Get Next Activity
    def get_next_activity_request(self):
        command="GetActivityData"
        request_url = self.config_vo["protocol"]+"://"+ self.config_vo["server_address"]+"/iRead/core.cd?command="+command+"&user_id="+self.user_id+"&sid="+self.sid        
        try:                        #Wrap possible exceptions when communicating with server into QAServerException
            self.current_content = urllib2.urlopen(request_url).read()
        except URLError as e:
            if hasattr(e, 'reason'):
                error_msg = 'Failed to reach server. Reason: ' + e.reason
            elif hasattr(e, 'code'):
                error_msg = 'The server couldn\'t fulfill the request. Error code: '+ e.code
            raise QAServerException(request_url, error_msg)
        except HttpException as e:
            error_msg = "HttpException happens when communicating with server"
            raise QAServerException(request_url, error_msg)        
        except Exception as e:
            print e   
            
        try:            
            root = ET.fromstring(self.current_content) #validate Login, get user_id and sid for later use 
            self.current_activity = root.find(".//activity").get('id')
            error_code = root.find(".//error_code").text
            if error_code != "0":                
                error_msg = "Response xml shows error."+self.current_content
                raise QAResponseXMLException(error_msg)             
            if root.find(".//cycle") != None:
                self.current_cycle = str(root.find(".//cycle").text)
                self.log_content.append("Cycle is: "+ self.current_cycle)         
            if root.find(".//series") != None:
                self.current_series = str(root.find(".//series").text)
                self.log_content.append("series is: "+ self.current_series)            
            if root.find(".//topic") != None:
                self.current_topic = str(root.find(".//topic").text)
                self.log_content.append("topic is: "+ self.current_topic)
            else:
                self.current_topic =""  
        except QAResponseXMLException:
            raise                 
        except ParseError as e:
            error_msg = "Error happens parsing response xml. \n"
            raise QAResponseXMLException(error_msg)        
        except AttributeError as e:
            error_msg = "Error happens retrieving attribute from response xml.\n "+str(e)
            raise QAResponseXMLException(error_msg)   
        except Exception as e:
            print e     
                       
        self.log("Get Next Activity. Topic is: "+self.get_str_current_series_topic()+" Cycle is: "+ self.current_cycle+" Activity ID: "+ self.current_activity)       
        return self.current_content
        
    #Save Activity Results
    def save_results_request(self,content):        
        variation = self.variation_dic[self.current_activity]
        if type(variation) ==list:            
            if self.current_cycle == "2":
                variation = variation[1]
            elif self.current_cycle == "3":
                variation = variation[2]
            else:
                variation = variation[0]           
 
        params = urllib.urlencode({'content': content,'variation':variation})
        try:
            data= urllib2.urlopen("http://127.0.0.1:8123/", params).read()
        except urllib2.URLError as e:
            error_msg = 'Exception happens when getting result xmls'
            raise QAFakeXMLException(error_msg)
        except Exception as e:
            print e        
        param = urllib.urlencode({'xml':data}) 
        command="SaveActivityResults"
        request_url = self.config_vo["protocol"]+"://"+ self.config_vo["server_address"]+"/iRead/core.cd?command="+command+"&user_id="+self.user_id+"&sid="+self.sid  
          
        try:                        #Wrap possible exceptions when communicating with server into QAServerException
            self.current_content = urllib2.urlopen(request_url, param).read()
        except urllib.URLError as e:
            if hasattr(e, 'reason'):
                error_msg = 'Failed to reach server. Reason: ' + e.reason
            elif hasattr(e, 'code'):
                error_msg = 'The server couldn\'t fulfill the request. Error code: '+ e.code
            raise QAServerException(request_url, error_msg)
        except HttpException as e:
            error_msg = "HttpException happens when communicating with server"
            raise QAServerException(request_url, error_msg)
        except Exception as e:
            print e   
                        
        try:            
            root = ET.fromstring(self.current_content)          #Validate Initialization        
            error_code = root.find(".//error_code").text
            if error_code != "0":
                error_msg = "Response xml shows error.\n "+self.current_content
                raise QAResponseXMLException(error_msg)
        except QAResponseXMLException:
            raise             
        except ParseError as e:
            error_msg = "Error happens parsing response xml. \n"
            raise QAResponseXMLException(error_msg)        
        except AttributeError as e:
            error_msg = "Error happens retrieving attribute from response xml.\n "+str(e)            
            raise QAResponseXMLException(error_msg)   
        except Exception as e:
            print e   
                            
        self.log("Save the result. Variation: "+str(variation))
       
    def assertion(self,activity_count):
        #print "Assertion Starts"
        if(self.current_activity!= self.activity_list[activity_count]):
            raise AssertionException("Supposed activity is: "+self.activity_list[activity_count])
        print "Activity assertion Pass. " 
        self.log_content.append("Activity assertion Pass. \n")
    
    def post_process(self):
        self.append_log_end()
        self.generate_log_file()  
    
    def append_log_end(self):
        self.log("\n========Post Process========")
        if self.success == True:
            self.log("Test Success! ")            
        else:
            self.log("Test Fail! ")        
        self.log("=========================Test Ends=========================")
    
    def generate_log_file(self):
        final_log_content = ''.join(self.log_content)
        dirname=os.path.dirname
        parent_dir = dirname(dirname(os.path.abspath(__file__)))
        log_file= parent_dir+"/log/test_log_"+ strftime("%Y-%m-%d-%H_%M_%S", self.config_vo["time_stamp"])+"("+str(self.config_vo["fail_times"]+1)+").txt"
        output = open(log_file, "w+")
        output.write(final_log_content)
        print "Generate log file in "+log_file
        

    #============Helper method================#  
    def get_float_current_series_topic(self):                  
        return float(self.get_str_current_series_topic())
    
    def get_str_current_series_topic(self):
        if self.current_series != "None" and self.current_topic != "None":
            str_current_topic = self.current_series+"."+self.current_topic
        elif self.current_series != "None":
            str_current_topic = self.current_series
        else:
            str_current_topic = "0"            
        return str_current_topic
    
    def log(self,content):
        print content
        self.log_content.append(content+"\n")        




'''===========================================================================
This method simulate a user's behavior: initialize topic,
login, get next activity, save activity, keep looping until it reaches end topic. 
==========================================================================='''   
def test_execution(config_vo):    
    session = SessionClass(config_vo)    
    error_message="No Error Message"    
    try:                          
        session.init_request()
        session.login_request()        
        activity_count=0
        while True:            
            session.log("Activity activity_count: "+ str(activity_count))          # Log           
            xml_content = session.get_next_activity_request()                      # Get next Activity   
            #print xml_content
            if session.get_float_current_series_topic() >= float(session.config_vo["end_topic"]):  # Break Condition
                print "Reaching End Topic: ", session.config_vo["end_topic"]
                session.success = True
                break        
            if session.config_vo["assertion_flag"] == "true":                      # Assertion
                session.assertion(activity_count)   
            time.sleep(1)                                                         # Pause 1s             
            session.save_results_request(xml_content)                              # Save Activity
            activity_count+=1
        session.logout_request()   
            
    except QAFakeXMLException as e:
        session.log(str(e))
        session.log(session.current_content) 
       
    except QAResponseXMLException as e:
        session.log(str(e))
        session.log(session.current_content)   
                   
    except QAServerException as e:
        session.log(str(e))
        session.log(session.current_content)                      
            
    except AssertionException as e:
        error_message = "Exception happens in series: "+session.get_str_current_series_topic()+", activity: "+session.current_activity+". AssertionException happens! \n"+str(e)
        session.log(error_message)
    
    except Exception as e:
        error_message = "Exception happens in series: "+session.get_str_current_series_topic()+", activity: "+session.current_activity+". Other Exception happens!"+e.value
        session.log(error_message)
        session.log(session.current_content)
        
    finally:
        session.post_process()
        #print  session.success,session.get_str_current_series_topic(),error_message
        return session.success,session.get_str_current_series_topic(),error_message   
      
    
'''
This is the test method for this file
'''       
def module_test(config_file,username):
    config_file_vo = init_testplan_from_file(config_file,[username])
    config_file_vo["time_stamp"] = time.localtime() 
    test_execution(config_file_vo)
    #session = SessionClass(config_file_vo)
        
if __name__ == "__main__":
    dirname = os.path.dirname
    parent_dir = dirname( dirname(os.path.abspath(__file__)))
    config_file = parent_dir+"/config/config_adam.xml"
    module_test(config_file,"series19_002")
    