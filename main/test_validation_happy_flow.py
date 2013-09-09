#=======================Activity List Generator ===========================
#=========         This module is used to generate a sequence of activities
#=========   a user supposed to experience given certain parameters, such as 
#=========   initial seriery and topic, decision point value, etc.
#====================================================================
import csv
import os
from test_properties import topic_strand_dic


#================List Generators For Strand or Units===========================
#=========    Currently Contains generators for series 1-36, and
#=========    only handle happy test testcases. Will be extended soon 
#====================================================================
class ValidationClass(object):
	def __init__(self):
		# Get flag dic and topic list from csv file
		self.topic_flag_dic, self.topic_list = self.get_topic_flags() 
		self.module_flag_dic = self.reset_module_flag()
		self.topic_set_before_success = self.get_topic_set_before_success()
		self.topic_set_swcu_3cycles = self.get_topic_set_swcu_3cycles()
		self.topic_set_end_grade={"18.5","36.7","51.6"}
				
	# Reset Flag for this module
	def reset_module_flag(self):
		module_flag_dic = {
		"pa_activities_comp":False,
		"pa_activities_visit":0,
		"first_series":True,
		"letter_sound_challenge_ungated":False,
		"has_trouble_sounds":False,
		"word_challenge_ungated":False,
		"word_challenge_sw_ungated":False,
		"word_challenge_wp_ungated":False,
		"has_spelling_study_words":False,
		}
		return module_flag_dic
	
	# Get flags for each topic
	def get_topic_flags(self):
		dirname = os.path.dirname
		parent_dir = dirname(dirname(os.path.abspath(__file__)))
		raw_data = csv.reader(open(parent_dir+"\\Config\\content_topic_table.csv"),dialect='excel')
		data = list(raw_data)
	
		topic_flag_dic = {}
		topic_list = []	
		for row in data:
			topic_flag_dic[row[0]] = {
			"series":row[1],
			"can_sound_spellings_be_practiced_in_isolation_flag":row[5],
			"pa_warm_up_flag":row[6],
			"sound_zone_di_flag":row[7],
			"word_zone_di_flag":row[8],
			"skip_mix_match_sounds_flag":row[9],
			"reactivate_flag":row[10],
			"post_topic_avatar_editor_flag":row[11],
			"post_topic_my_books_flag":row[12],
			"unit":row[16],				
			}
			topic_list.append(row[0])			
		return topic_flag_dic, topic_list
	# Get topic before sight words check up 3 cycles
	def get_topic_set_swcu_3cycles(self):
		topic_set = {"19.5","20.6","21.5","22.5","23.6","24.6"}
		return topic_set
	# Get topic before success strand
	def get_topic_set_before_success(self):
		topic_set = {"1.4","2.4","3.5","4.4","5.4","6.5","7.4","8.4"}
		return topic_set
	

	#========================= Helper Method ============================#
	def get_str_topic(self,init):
		str_series_topic=""
		if "." in init:
			topic = int(init[init.index(".")+1:])
			series = int(init[:init.index(".")])			
			if series < 10:
				series = "0"+str(series)
			else:
				series = str(series)				
			if topic < 10 and topic>0:
				str_series_topic = "series_"+series+"_topic_0"+str(topic)
			elif topic == 0:
				str_series_topic = "series_"+series
			else:
				str_series_topic = "series_"+series +"_topic_"+str(topic)
		else:
			series = int(init)
			if series < 10:
				str_series_topic = "series_0"+str(series)
			else:
				str_series_topic = "series_"+str(series)
		return str_series_topic	
	
	def get_num_topic(self,str_series_topic):
		#print str_series_topic
		if "_topic_" in str_series_topic:
			float_topic = str_series_topic.split("_topic_",3)[1]
			float_series = str_series_topic.split("_topic_",3)[0].split("series_",3)[1]
			float_series_topic = float(float_series)+ float(float_topic)/10
			return str(float_series_topic)		
		else:
			float_series = str_series_topic.split("series_",3)[1]
			float_series = int(float_series)
			return str(float_series)
		
	def print_list(self,start,end):
		list_to_print = self.get_activity_list(start, end)
		count=0
		for element in list_to_print:
			print count,element
			count+=1
	#================================================================#	
	def get_list_alphhabet_unit1_2_happy_flow(self,topic):
		
		list_for_topic = []
		list_for_topic.append("main_hall_outro")
		list_for_topic.append("teacher_greeting")	
		if self.module_flag_dic["pa_activities_comp"] == False and self.module_flag_dic["first_series"] == False:		
			if self.module_flag_dic["pa_activities_visit"] == 0:
				list_for_topic.append("listening_zone_transition")
				list_for_topic.append("pa_rhyme")
				self.module_flag_dic["pa_activities_visit"] = 1
			elif self.module_flag_dic["pa_activities_visit"] == 1:
				list_for_topic.append("listening_zone_transition")
				list_for_topic.append("pa_rhyme")
				self.module_flag_dic["pa_activities_visit"] = 2
			elif self.module_flag_dic["pa_activities_visit"] == 2:
				list_for_topic.append("listening_zone_transition")
				list_for_topic.append("pa_syllable_counting")
				self.module_flag_dic["pa_activities_visit"] = 3
			elif self.module_flag_dic["pa_activities_visit"] == 3:
				list_for_topic.append("listening_zone_transition")
				list_for_topic.append("pa_syllable_blending")
				self.module_flag_dic["pa_activities_visit"] = 4
				self.module_flag_dic["pa_activities_comp"]  = True
		list_for_topic.append("letter_zone_transition")
		for count in range(2):
			list_for_topic.append("direct_instruction")
			list_for_topic.append("letter_hunt")
			list_for_topic.append("letter_name_id")
		list_for_topic.append("letter_name_challenge")
		list_for_topic.append("end_of_topic")
		list_for_topic.append("backpack_gathering")	
		
		if self.get_num_topic(topic) in self.topic_set_before_success:
			return list_for_topic
		
		if self.topic_flag_dic[topic]["post_topic_avatar_editor_flag"] == '1':               ## Post Avartar Editor##
			list_for_topic.append("avatar_editor")  
		elif self.topic_flag_dic[topic]["post_topic_my_books_flag"] == '1':               ## Post Avartar Editor##
			list_for_topic.append("collections_my_books")  
	
		return list_for_topic	
	
	#Return activity list_for_topic for alphabet strand Unit3
	def get_list_alphhabet_unit3_happy_flow(self,topic):		
		list_for_topic = []
		list_for_topic.append("main_hall_outro")
		list_for_topic.append("teacher_greeting")
		if self.module_flag_dic["pa_activities_comp"] == False:
			if self.module_flag_dic["pa_activities_visit"] == 0:
				list_for_topic.append("listening_zone_transition")
				list_for_topic.append("pa_rhyme")
				self.module_flag_dic["pa_activities_visit"] = 1
			elif self.module_flag_dic["pa_activities_visit"] == 1:
				list_for_topic.append("listening_zone_transition")
				list_for_topic.append("pa_rhyme")
				self.module_flag_dic["pa_activities_visit"] = 2
			elif self.module_flag_dic["pa_activities_visit"] == 2:
				list_for_topic.append("listening_zone_transition")
				list_for_topic.append("pa_syllable_counting")
				self.module_flag_dic["pa_activities_visit"] = 3
			elif self.module_flag_dic["pa_activities_visit"] == 3:
				list_for_topic.append("listening_zone_transition")
				list_for_topic.append("pa_syllable_blending")
				self.module_flag_dic["pa_activities_visit"] = 4
				self.module_flag_dic["pa_activities_comp"] = True
		list_for_topic.append("letter_zone_transition")
		list_for_topic.append("pa_warm_up_al")
		list_for_topic.append("direct_instruction")
		list_for_topic.append("letter_sound_matching")
		list_for_topic.append("end_of_topic")
		list_for_topic.append("backpack_gathering")		
		
		if self.get_num_topic(topic) in self.topic_set_before_success:
			return list_for_topic
		if self.topic_flag_dic[topic]["post_topic_avatar_editor_flag"] == '1':               ## Post Avartar Editor##
			list_for_topic.append("avatar_editor")  
		elif self.topic_flag_dic[topic]["post_topic_my_books_flag"] == '1':               ## Post Avartar Editor##
			list_for_topic.append("collections_my_books")   	
		return list_for_topic
	
	def get_list_code_strand_unit4_happy_flow(self,topic):
		list_for_topic = []
		list_for_topic.append("main_hall_outro")
		list_for_topic.append("teacher_greeting")		
		if self.topic_flag_dic[topic]["pa_warm_up_flag"] == '1':                 ## PA Warmup specified for this Topic ##
			list_for_topic.append("listening_zone_transition")
			list_for_topic.append("pa_warm_up")    		
		list_for_topic.append("word_zone_transition")		
		if self.topic_flag_dic[topic]["word_zone_di_flag"] == '1':               ## Word Zone DI This Topic ##
			list_for_topic.append("word_zone_di")  			
		list_for_topic.append("blend_new_words")
		list_for_topic.append("word_changer")
		list_for_topic.append("mix_match_words")
		list_for_topic.append("word_id")
		list_for_topic.append("word_building")	
																	## Can Sound be Practiced in isolation  ##
		if self.topic_flag_dic[topic]["can_sound_spellings_be_practiced_in_isolation_flag"] == '1':               
			list_for_topic.append("sound_zone_transition")
			if self.topic_flag_dic[topic]["sound_zone_di_flag"] == '1':          ##  Sound Zone DI this topic ##
				list_for_topic.append("sound_zone_di")				
			if self.topic_flag_dic[topic]["skip_mix_match_sounds_flag"] == '0':  ##  M&M Sounds This topic ##
				list_for_topic.append("mix_match_sounds")			
			list_for_topic.append("letter_sound_id")
		list_for_topic.append("reading_zone_transition")
		list_for_topic.append("word_meaning_match")
		list_for_topic.append("end_of_topic")
		list_for_topic.append("backpack_gathering")
		if self.topic_flag_dic[topic]["post_topic_avatar_editor_flag"] == '1':               ## Post Avartar Editor##
			list_for_topic.append("avatar_editor")  
		elif self.topic_flag_dic[topic]["post_topic_my_books_flag"] == '1':               ## Post Avartar Editor##
			list_for_topic.append("collections_my_books") 	
		return list_for_topic
	
	def get_list_code_strand_unit5_11_happy_flow(self,topic):
		list_for_topic = []
		list_for_topic.append("main_hall_outro")
		list_for_topic.append("teacher_greeting")

		if self.topic_flag_dic[topic]["can_sound_spellings_be_practiced_in_isolation_flag"] == '1':        
			if self.topic_flag_dic[topic]["pa_warm_up_flag"]== '1':			 			## PA Warmup specified for this Topic ##
				if self.topic_flag_dic[topic]["reactivate_flag"] != '1' :		## Current Topic Tagged "Reactivate and cycle=1; Default is No ##
					list_for_topic.append("listening_zone_transition")
					list_for_topic.append("pa_warm_up")
			list_for_topic.append("sound_zone_transition")
			
			if self.topic_flag_dic[topic]["sound_zone_di_flag"] == '1':						##  Sound Zone DI this topic  ##
				list_for_topic.append("sound_zone_di")
				
			if self.topic_flag_dic[topic]["reactivate_flag"]  != '1' :			## Current Topic Tagged "Reactivate and cycle=1; Default is No ##
				list_for_topic.append("mix_match_sounds")
				
			list_for_topic.append("letter_sound_id")
			self.module_flag_dic["letter_sound_challenge_ungated"] = True
			list_for_topic.append("letter_sound_challenge")
		
		elif self.module_flag_dic["letter_sound_challenge_ungated"] == True:					##  Check Whether ungate Letter Sound Challenge   ##
			list_for_topic.append("sound_zone_transition")
			list_for_topic.append("letter_sound_challenge")
			
		list_for_topic.append("word_zone_transition")
		if self.topic_flag_dic[topic]["word_zone_di_flag"] == '1':					##  Check If Word Zone DI for this Topic  ##
			list_for_topic.append("word_zone_di")
		list_for_topic.append("blend_new_words")	
		list_for_topic.append("word_changer")
		if self.topic_flag_dic[topic]["reactivate_flag"] != '1' :		## Current Topic Tagged "Reactivate and cycle=1;  ##
			list_for_topic.append("mix_match_words")
		list_for_topic.append("word_id")
																		##  Check whether to ungate the Word challenge; Default Value is Ungating    ##
		self.module_flag_dic["word_challenge_ungated"] = True			
		list_for_topic.append("word_challenge")                      
		list_for_topic.append("word_building")																		## Check if needing another cycle; Default is not needing ##
		list_for_topic.append("reading_zone_transition")
		list_for_topic.append("word_meaning_match")
		list_for_topic.append("read_think")
		list_for_topic.append("end_of_topic")
		list_for_topic.append("backpack_gathering")
		if self.topic_flag_dic[topic]["post_topic_avatar_editor_flag"] == '1':               ## Post Avartar Editor##
			list_for_topic.append("avatar_editor")  
		elif self.topic_flag_dic[topic]["post_topic_my_books_flag"] == '1':               ## Post Avartar Editor##
			list_for_topic.append("collections_my_books") 	
		return list_for_topic
	
	def get_list_code_strand_unit12_happy_flow(self,topic):
		list_for_topic = []
		list_for_topic.append("main_hall_outro")
		list_for_topic.append("teacher_greeting")
																			## 	Can Sound be Practiced in isolation  ##
		if self.topic_flag_dic[topic]["can_sound_spellings_be_practiced_in_isolation_flag"] == '1':     
			list_for_topic.append("sound_zone_transition")
			if self.topic_flag_dic[topic]["sound_zone_di_flag"] == '1':					##  Sound Zone DI this topic  ##
				list_for_topic.append("sound_zone_di")
			list_for_topic.append("letter_sound_id")
			self.module_flag_dic["letter_sound_challenge_ungated"] = True
			list_for_topic.append("letter_sound_challenge")				
		
		elif self.module_flag_dic["letter_sound_challenge_ungated"]  == True:					##  Check Whether ungate Letter Sound Challenge   ##
			list_for_topic.append("sound_zone_transition")
			list_for_topic.append("letter_sound_challenge")		
			
		list_for_topic.append("word_zone_transition")
		if self.topic_flag_dic[topic]["word_zone_di_flag"] == '1':					##  Word Zone DI this topic  ##
			list_for_topic.append("word_zone_di")
		list_for_topic.append("blend_new_words")	
		list_for_topic.append("word_changer")
		list_for_topic.append("word_id")
		list_for_topic.append("word_challenge")  
		list_for_topic.append("spelling_zone_transition")
		list_for_topic.append("spelling_check_up")
		list_for_topic.append("reading_zone_transition")
		list_for_topic.append("word_meaning_match")
		list_for_topic.append("read_think")
		list_for_topic.append("end_of_topic")
		list_for_topic.append("backpack_gathering")
		if self.topic_flag_dic[topic]["post_topic_avatar_editor_flag"] == '1':               ## Post Avartar Editor##
			list_for_topic.append("avatar_editor")  
		elif self.topic_flag_dic[topic]["post_topic_my_books_flag"] == '1':               ## Post Avartar Editor##
			list_for_topic.append("collections_my_books") 
		return list_for_topic
	
	
	def get_list_sight_words_happy_flow(self, topic):
		list_for_topic = []
		list_for_topic.append("main_hall_outro")		
		list_for_topic.append("teacher_greeting")		
		list_for_topic.append("word_zone_transition")
		list_for_topic.append("sight_word_check_up")
		
		if self.get_num_topic(topic) in self.topic_set_swcu_3cycles:
			loop_count = 3
		else:
			loop_count = 2			
		for i in range(loop_count):													
			for j in range(2):
				list_for_topic.append("sight_word_intro")
				list_for_topic.append("sight_word_hunt")
			list_for_topic.append("word_id_sw")																			
		if int(self.topic_flag_dic[topic]["unit"]) >=5 :																	
			list_for_topic.append("word_challenge_sw")			
		if int(self.topic_flag_dic[topic]["unit"]) >=12:    													
			list_for_topic.append("spelling_zone_transition")
			list_for_topic.append("spelling_check_up")													
		list_for_topic.append("reading_zone_transition")
		list_for_topic.append("sentence_fill_in")
		list_for_topic.append("end_of_topic")
		list_for_topic.append("backpack_gathering")
		return list_for_topic	
		
	def get_list_word_play_happy_flow(self, topic):
		list_for_topic = []
		list_for_topic.append("main_hall_outro")
		list_for_topic.append("teacher_greeting")
		list_for_topic.append("word_zone_transition")
		list_for_topic.append("direct_instruction_wp")
		list_for_topic.append("word_splitter")
		list_for_topic.append("word_changer")
		if int(self.topic_flag_dic[topic]["unit"]) < 12 :
			list_for_topic.append("mix_match_words")
		list_for_topic.append("word_id")																	
		if int(self.topic_flag_dic[topic]["unit"]) >= 5 :
			list_for_topic.append("word_challenge")	
			if int(self.topic_flag_dic[topic]["unit"]) < 12 :
				list_for_topic.append("word_building")
		else:
			list_for_topic.append("word_building")
		if int(self.topic_flag_dic[topic]["unit"]) >=12:    											# Grade == 2 #		
			list_for_topic.append("spelling_zone_transition")
			list_for_topic.append("spelling_check_up")
					
		list_for_topic.append("reading_zone_transition")
		list_for_topic.append("word_meaning_match")
		if int(self.topic_flag_dic[topic]["unit"]) >= 5:
			list_for_topic.append("read_a_story")
		list_for_topic.append("end_of_topic")
		list_for_topic.append("backpack_gathering")
		if self.topic_flag_dic[topic]["post_topic_avatar_editor_flag"] == '1':               ## Post Avartar Editor##
			list_for_topic.append("avatar_editor")  
		elif self.topic_flag_dic[topic]["post_topic_my_books_flag"] == '1':               ## Post Avartar Editor##
			list_for_topic.append("collections_my_books") 					
		return list_for_topic	
	
	
	
	def get_list_success(self,topic):
		list_for_topic = []
		list_for_topic.append("ebook_1st_read")
		list_for_topic.append("ebook_2nd_read")
		list_for_topic.append("meaning_machine")
		list_for_topic.append("spin_the_wheel")
		list_for_topic.append("end_of_series")
		list_for_topic.append("backpack_gathering")
		if self.get_num_topic(topic) in self.topic_set_end_grade:
			list_for_topic.append("collections_explore_mode")				
		self.module_flag_dic["first_series"]=False
		return list_for_topic	
			
	def get_list_series_assessment(self, topic):
		list_for_topic = []
		list_for_topic.append("series_assessment")
		list_for_topic.append("series_assessment_end_period")
		return list_for_topic	
	
	def get_list_empty(self, topic):
		return []
	
	def get_activity_list_for_topic(self,topic):	
		options = {
		'alphabet_strand_unit1_2':	self.get_list_alphhabet_unit1_2_happy_flow,
		'alphabet_strand_unit3':self.get_list_alphhabet_unit3_happy_flow,
		'code_strand_unit4': self.get_list_code_strand_unit4_happy_flow,
		'code_strand_unit5_11': self.get_list_code_strand_unit5_11_happy_flow,
		'code_strand_unit12': self.get_list_code_strand_unit12_happy_flow,
		'sight_words_strand':self.get_list_sight_words_happy_flow,
		'word_play_strand': self.get_list_word_play_happy_flow,
		'success_strand':	self.get_list_success,
		'series_assessment' : self.get_list_series_assessment,
		'':self.get_list_empty,		
		
		}
		strand = topic_strand_dic[topic]
		activity_list = options[strand](topic)	
		return activity_list
	
	def get_activity_list(self,start, end):
		# Find the index
		start_index = self.topic_list.index( self.get_str_topic(start) )
		end_index = self.topic_list.index( self.get_str_topic(end) ) + 1          # Last Element included	
		#Append the head activities
		activity_list = []
		activity_list.append("screener")
		activity_list.append("avatar_editor_initial")
		activity_list.append("collections_explore_mode")		
		#Append activities for certain topics
		for topic in self.topic_list[start_index:end_index]:
			activity_list.extend( self.get_activity_list_for_topic(topic) )  
		
		return activity_list	

	
if __name__ == "__main__":
	#test_dic, test_list = get_topic_content()
	#reset_module()
	valid_class = ValidationClass()
	valid_class.print_list( "1","1.2")
	
	





	



