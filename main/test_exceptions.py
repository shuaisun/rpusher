'''
Created on Apr 4, 2013

@author: ShuaiSun
'''

class ValidException(Exception):
    def __init__(self, value):
        self.value = value
    def __str__(self):
        return repr(self.errorInfo())
    def errorInfo(self):        
        return self.value        

class InputDataException(Exception):
    def __init__(self, value):
        self.value = value
    def __str__(self):
        return repr(self.value)
        
class AssertionException(Exception):
    def __init__(self, value):
        self.value = value
    def __str__(self):
        return repr(self.value)

class QAServerException(Exception):
    def __init__(self, url, error_msg):
        self.value = "Server Exception happens when communicating with address " + url + "\n" + \
        "Error message is: " + error_msg
    def __str__(self):
        return repr(self.value)
    
class QAFakeXMLException(Exception):
    def __init__(self, value):
        self.value = "QAFakeXMLException Happens! "+value
    def __str__(self):
        return repr(self.value)
    
class QAResponseXMLException(Exception):
    def __init__(self, value):
        self.value = "QAResponseXMLException Happens! "+value
    def __str__(self):
        return repr(self.value)
