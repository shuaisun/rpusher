import collections
from time import time, gmtime, strftime
import xml.etree.ElementTree as ET

zone_atom_map={
    "None":["Topic Selection","Zone Menu", "Dashboard"],
    "Reading":["Reading Zone Video", "Reading Passage"],               
}


def generateTimingPlaceholderXML():
    time_xml = " <start_time>" + strftime("%m/%d/%Y %H:%M:%S", gmtime()) + "</start_time>\n<end_time>"+\
    strftime("%m/%d/%Y %H:%M:%S", gmtime(time()+1))+"</end_time>\n<tracked_time>1000</tracked_time>"
    return time_xml

'''
// **********************  //
//       None Zone         //
// **********************  //
'''
'''
//       Topic Selection        //
'''
topic_selection_xmls = ()
for i in range(0,3):
    stage =  ("A" if (i == 0) else ( "B" if (i == 1) else "C" ) )
    for j in range(1, 13):
        if j<10:
            topic = stage+"0"+str(j)
        else:
            topic = stage + str(j)
        xml = "<topic_selection_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + " <user_directed_navigation/>\n"+ \
        "</atom_data>\n"+ " <student_data>\n"+ " <topic>" + topic + "</topic>\n"+ " </student_data>\n"+ "</topic_selection_atom>"        
        topic_selection_xmls +=((topic,xml),)

topic_selection_xmls = collections.OrderedDict(topic_selection_xmls)        

'''
//       Zone Menu         //
'''
zone_menu_xmls=(
("Reading Zone Visit", "<zone_menu_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation>reading_zone</user_directed_navigation>\n"+ " </atom_data>\n"+ " <student_data/>\n"+ \
"</zone_menu_atom>"),

("Word Zone Visit", "<zone_menu_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation>word_zone</user_directed_navigation>\n"+ " </atom_data>\n"+ " <student_data/>\n"+ "</zone_menu_atom>"),

("Spelling Zone Visit", "<zone_menu_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() +  \
"<user_directed_navigation>spelling_zone</user_directed_navigation>\n"+ " </atom_data>\n"+ " <student_data/>\n"+ \
"</zone_menu_atom>"),

("Success Zone Visit", "<zone_menu_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation>success_zone</user_directed_navigation>\n"+ " </atom_data>\n"+ " <student_data/>\n"+ \
"</zone_menu_atom>"),

("Writing Zone Visit", "<zone_menu_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation>writing_zone</user_directed_navigation>\n"+ " </atom_data>\n"+ " <student_data/>\n"+ \
"</zone_menu_atom>")
)
zone_menu_xmls = collections.OrderedDict(zone_menu_xmls)
#print zone_menu_xmls.values()[1]

'''
//       Dashboard         //
'''
dashboard_xmls=(
("Default", "<dashboard_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + " <user_directed_navigation/>\n"+ \
"</atom_data>\n"+ " <student_data/>\n"+ "</dashboard_atom>"),
)
dashboard_xmls = collections.OrderedDict(dashboard_xmls)

'''
// ***********************************************  //
//       Reading Zone         //
// ***********************************************  //
'''
'''
//       Reading Zone Video         //
'''
rz_video_xmls=(
("Default", "<rz_video_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + " <user_directed_navigation/>\n"+ \
"</atom_data>\n"+ " <student_data>\n"+ " <watch_count>1</watch_count>\n"+ " <watch_time>90000</watch_time>\n"+ \
"</student_data>\n"+ "</rz_video_atom>"),
)
rz_video_xmls = collections.OrderedDict(rz_video_xmls)
'''
//       Reading Zone Passage     Not Complete    //
'''
rz_reading_passage_xmls=(
("Default", "<rz_reading_passage_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + " <user_directed_navigation/>\n"+ \
"</atom_data>\n"+ " <student_data>\n"+ " <speed_level>2</speed_level>\n"+ " <words_defined>14</words_defined>\n"+ \
"<words_pronounced>1</words_pronounced>\n" + " <full_reads>\n"+ " <word>1</word>\n"+ " <phrase>0</phrase>\n"+ \
"<practice>1</practice>\n"+ " <recording>0</recording>\n"+ " <self_check>0</self_check>\n"+ " </full_reads>\n"+ \
"<self_checks/>\n"+ " </student_data>\n"+ "</rz_reading_passage_atom>"
),
)
rz_reading_passage_xmls = collections.OrderedDict(rz_reading_passage_xmls)

'''
//       Reading Zone Quick Check Questions     Not Complete    //
'''
rz_quick_check_question_xmls=(
("Question 1, 2 attempts", "<rz_quick_check_question_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ " <student_data>\n"+ " <question id='1'>\n"+ \
"<score>correct</score>\n"+ " <attempts>2</attempts>\n"+ " </question>\n"+ " </student_data>\n"+ \
"</rz_quick_check_question_atom>"
),
(
"Question 3", "<rz_quick_check_question_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ " <student_data>\n"+ " <question id='3'>\n"+ \
"<score>correct</score>\n"+ " <attempts>1</attempts>\n"+ " </question>\n"+ " </student_data>\n"+ \
"</rz_quick_check_question_atom>"
),
("Question 4", "<rz_quick_check_question_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ " <student_data>\n"+ " <question id='4'>\n"+ \
"<score>correct</score>\n"+ " <attempts>1</attempts>\n"+ " </question>\n"+ " </student_data>\n"+ \
"</rz_quick_check_question_atom>"
),
("Question 5", "<rz_quick_check_question_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ " <student_data>\n"+ " <question id='5'>\n"+ \
"<score>correct</score>\n"+ " <attempts>1</attempts>\n"+ " </question>\n"+ " </student_data>\n"+ \
"</rz_quick_check_question_atom>"
),
("Question 6", "<rz_quick_check_question_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ " <student_data>\n"+ " <question id='6'>\n"+ \
"<score>correct</score>\n"+ " <attempts>1</attempts>\n"+ " </question>\n"+ " </student_data>\n"+ \
"</rz_quick_check_question_atom>"
),
("Question 7", "<rz_quick_check_question_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ " <student_data>\n"+ " <question id='7'>\n"+ \
"<score>correct</score>\n"+ " <attempts>1</attempts>\n"+ " </question>\n"+ " </student_data>\n"+ \
"</rz_quick_check_question_atom>"
),                              
("Question 8", "<rz_quick_check_question_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ " <student_data>\n"+ " <question id='8'>\n"+ \
"<score>correct</score>\n"+ " <attempts>1</attempts>\n"+ " </question>\n"+ " </student_data>\n"+ \
"</rz_quick_check_question_atom>"
),
("Question 9", "<rz_quick_check_question_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ " <student_data>\n"+ " <question id='9'>\n"+ \
"<score>correct</score>\n"+ " <attempts>1</attempts>\n"+ " </question>\n"+ " </student_data>\n"+ \
"</rz_quick_check_question_atom>"
),
("Question 10", "<rz_quick_check_question_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ " <student_data>\n"+ " <question id='10'>\n"+ \
"<score>correct</score>\n"+ " <attempts>1</attempts>\n"+ " </question>\n"+ " </student_data>\n"+  \
"</rz_quick_check_question_atom>"
),
("Question 11", "<rz_quick_check_question_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ " <student_data>\n"+ " <question id='11'>\n"+ \
"<score>correct</score>\n"+ " <attempts>1</attempts>\n"+ " </question>\n"+ " </student_data>\n"+ \
"</rz_quick_check_question_atom>"
),
("Question 12", "<rz_quick_check_question_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ " <student_data>\n"+ " <question id='12'>\n"+ \
"<score>correct</score>\n"+ " <attempts>1</attempts>\n"+ " </question>\n"+ " </student_data>\n"+ \
"</rz_quick_check_question_atom>"
),
("Question 13", "<rz_quick_check_question_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ " <student_data>\n"+ " <question id='13'>\n"+ \
"<score>correct</score>\n"+ " <attempts>1</attempts>\n"+ " </question>\n"+ " </student_data>\n"+ \
"</rz_quick_check_question_atom>"
),
("Question 14", "<rz_quick_check_question_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ " <student_data>\n"+ " <question id='14'>\n"+ \
"<score>correct</score>\n"+ " <attempts>1</attempts>\n"+ " </question>\n"+ " </student_data>\n"+ \
"</rz_quick_check_question_atom>"
),
("Question 15", "<rz_quick_check_question_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ " <student_data>\n"+ " <question id='15'>\n"+ \
"<score>correct</score>\n"+ " <attempts>1</attempts>\n"+ " </question>\n"+ " </student_data>\n"+ \
"</rz_quick_check_question_atom>"
),
("Question 2, incorrect", "<rz_quick_check_question_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ " <student_data>\n"+ " <question id='2'>\n"+ \
"<score>incorrect</score>\n"+ " <attempts>1</attempts>\n"+ " </question>\n"+ " </student_data>\n"+ \
"</rz_quick_check_question_atom>"
),
("Question 3, user-directed to reading passage", "<rz_quick_check_question_atom>\n"+ " <atom_data>\n"+ \
generateTimingPlaceholderXML() + " <user_directed_navigation>rz_reading_passage</user_directed_navigation>\n"+ \
"</atom_data>\n"+ " <student_data>\n"+ " <question id='2'>\n"+ " <score>correct</score>\n"+ " <attempts>1</attempts>\n"+ \
"</question>\n"+ " </student_data>\n"+ "</rz_quick_check_question_atom>"
),
)
rz_quick_check_question_xmls = collections.OrderedDict(rz_quick_check_question_xmls)

'''
//       Reading Zone Quick Check Progress Report     Not Complete    //
'''
rz_quick_check_progress_report_xmls=(
("Default", "<rz_quick_check_progress_report_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ " <student_data/>\n"+ "</rz_quick_check_progress_report_atom>"),
)
rz_quick_check_progress_report_xmls = collections.OrderedDict(rz_quick_check_progress_report_xmls)

'''
//       Reading Zone Progress Report     Not Complete    //
'''
rz_progress_report_xmls=(
("Default", "<rz_progress_report_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ " <student_data/>\n"+ "</rz_progress_report_atom>"),
)
rz_progress_report_xmls = collections.OrderedDict(rz_progress_report_xmls)


'''
// ***********************************************  //
//                       Word Zone                  //
// ***********************************************  //
'''
def build_word_assessment_post_data(response, option):
    root = ET.fromstring(response)
    ele_arr = root.findall(".//activity_word")
    #for ele in ele_arr:
    #    print ele.get("id") 
    
    if option == 6: #Mid-assessment Exit
        xml_content = "<wz_word_assessment_round_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
        "<user_directed_navigation>zone_menu</user_directed_navigation>\n"+ " </atom_data>\n"+ " <student_data>\n"+ \
        "<activity_words>\n"
    else:
        xml_content = "<wz_word_assessment_round_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
        " <user_directed_navigation/>\n"+" </atom_data>\n"+ " <student_data>\n"+ " <activity_words>\n"

    for i in range(len(ele_arr)):
        chunk = "   <activity_word id='" + ele_arr[i].get("id") + "' order='" + str(i+1) + "'>\n"
        if option == 5 or option == 6:
            rand_score = "fluent"
            resp_time = 3400
            if rand_score == "slow":
                resp_time = 3000
            elif rand_score == "fluent":
                resp_time = 1800
                
            if option == 6 and i< 5:
                chunk += " <word_score/>\n"+ " <attempts>\n" + " <attempt id='1'>\n"+ " <score>" + \
                randScore + "</score>\n"+ " <response_time>" + respTime + "</response_time>\n"+ \
                " </attempt>\n" + " <attempt id='2'/>\n"+ " <attempt id='3'/>\n"+ " </attempts>\n"
            elif option == 6:
                chunk += " <word_score/>\n"+ " <attempts>\n" + " <attempt id='1'/>\n"+ \
                " <attempt id='2'/>\n"+ " <attempt id='3'/>\n"+ "</attempts>\n"
            else:
                chunk += " <word_score>" + randScore + "</word_score>\n"+ " <attempts>\n" + \
                " <attempt id='1'>\n"+ " <score>" + randScore+ "</score>\n"+ " <response_time>" + \
                respTime + "</response_time>\n"+ " </attempt>\n" + " <attempt id='2'>\n"+ " <score>"+ \
                randScore + "</score>\n"+ " <response_time>" + respTime + "</response_time>\n"+ " </attempt>\n"
                if rand_score != "fluent":
                    chunk += " <attempt id='3'>\n"+ " <score>" + randScore + "</score>\n"+ " <response_time>" + \
                    respTime + "</response_time>\n"+ "</attempt>\n" + " </attempts>\n"
                else:
                    chunk += "     <attempt id='3'/>\n"+"    </attempts>\n"
        
        elif (i<1 and option ==0) or (i<2 and option==1) or (i<5 and option==3) or option==4:
            chunk += " <word_score>missed</word_score>\n"+ " <attempts>\n"+ " <attempt id='1'>\n"+ \
            " <score>missed</score>\n"+ "<response_time>3400</response_time>\n"+ " </attempt>\n"+ \
            " <attempt id='2'>\n"+ " <score>missed</score>\n"+ \
            "<response_time>3300</response_time>\n"+ " </attempt>\n"+ " <attempt id='3'>\n"+ \
            " <score>missed</score>\n"+ "<response_time>3400</response_time>\n"+ " </attempt>\n"+ " </attempts>\n"
        else:
            chunk += " <word_score>fluent</word_score>\n"+ " <attempts>\n"+ " <attempt id='1'>\n"+ \
            " <score>fluent</score>\n"+ "<response_time>1800</response_time>\n"+ " </attempt>\n"+ \
            " <attempt id='2'>\n"+ " <score>fluent</score>\n"+ "<response_time>1800</response_time>\n"+ \
            " </attempt>\n"+ " <attempt id='3'/>\n"+ " </attempts>\n"
        chunk += "   </activity_word>\n"
        xml_content += chunk
    # End of For loop
    xml_content += "  </activity_words>\n"+" </student_data>\n"+ "</wz_word_assessment_round_atom>"
    return xml_content
'''
//       Word Zone Clinic     //
'''
wz_word_clinic_xmls=(
("Default", "<wz_word_clinic_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ "</wz_word_clinic_atom>"
),
("User directed to Zone Menu", "<wz_word_clinic_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation>zone_menu</user_directed_navigation>\n"+ " </atom_data>\n"+ "</wz_word_clinic_atom>"
),
)
wz_word_clinic_xmls = collections.OrderedDict(wz_word_clinic_xmls)
'''
//       Word Zone Match     //
'''
wz_word_match_xmls=(
("Default", "<wz_word_match_atom>\n" + " <atom_data>\n" + generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n" + " <student_data>\n" + \
"<correct_matches_first_attempt>2</correct_matches_first_attempt>\n"+ " <total_attempts>3</total_attempts>\n"+ \
"</student_data>\n" + "</wz_word_match_atom>"
),
)
wz_word_match_xmls = collections.OrderedDict(wz_word_match_xmls)
'''
//       Word Zone Self Check     //
'''
def build_self_check_post_data(response, option):
    root = ET.fromstring(response)
    ele_arr = root.findall(".//activity_word")    
    start_round = 1
    end_round = 3
    xml_content = "<wz_self_check_atom>\n"+" <atom_data>\n"+ generateTimingPlaceholderXML()
    
    if option == 3 or option ==4:
        xml_content += "  <user_directed_navigation>zone_menu</user_directed_navigation>\n"
    else:
        xml_content += "  <user_directed_navigation/>\n"    
    xml_content += " </atom_data>\n"+" <student_data>\n"+"  <bad_recordings>5</bad_recordings>\n"+"  <rounds>\n"
    
    if option == 1: start_round = 2
    elif option == 2: start_round = 3
    elif option ==3: end_round = 1
    elif option ==4: end_round = 2
    
    for round_num in range(start_round, end_round+1):
        xml_content += "   <round id='"+ roundNum + "'>\n" + "    <activity_words>\n"
        idx=0
        while idx < len(ele_arr) and idx < 5:
            xml_content += "   <activity_word id='" + wordIdArray[index].id + "'>\n" + \
            "      <attempts_till_correct>" + Math.floor(Math.random()*5+1) + "</attempts_till_correct>\n"+\
            "     </activity_word>\n"
            idx += 1
        xml_content += "    </activity_words>\n" + "   </round>\n"
        
    xml_content += "  </rounds>\n"+" </student_data>\n"+"</wz_self_check_atom>"
    print xml_content
    return xml_content

'''

        for (var roundNum = startRound; roundNum <= endRound; roundNum++)
        {
            sPostData += "   <round id='"+ roundNum + "'>\n" +
            "    <activity_words>\n";

            for (var index=0; (index < wordIdArray.length && index < 5); index++)
            {
                sPostData +=  "   <activity_word id='" + wordIdArray[index].id + "'>\n" +
                "      <attempts_till_correct>" + Math.floor(Math.random()*5+1) + "</attempts_till_correct>\n"+
                "     </activity_word>\n";
            }

            sPostData +=     "    </activity_words>\n" +
            "   </round>\n";

        }

        sPostData += "  </rounds>\n"+
        " </student_data>\n"+
        "</wz_self_check_atom>";

        return sPostData;
'''
'''
//       Word Zone Review      //
'''
wz_word_review_xmls=(
("Default", "<wz_word_review_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ " <student_data>\n"+ " <review_word_score>95</review_word_score>\n"+ \
"<phases>\n"+ " <phase id='1'>\n"+ " <activity_words>\n"+ " <activity_word id='A01_01_01_word_001_00068' trial='1'>\n"+ \
"<score>missed</score>\n"+ " <response_time>2300</response_time>\n"+ " </activity_word>\n"+ \
" <activity_word id='A01_01_01_word_002_00325' trial='2'>\n"+ " <score>missed</score>\n"+ \
" <response_time>2300</response_time>\n"+ "</activity_word>\n"+ " </activity_words>\n"+ \
" </phase>\n"+ " <phase id='2'>\n"+ " <activity_words>\n"+ " <activity_word id='A01_01_01_word_003_00559' trial='1'>\n"+ \
" <score>missed</score>\n"+ " <response_time>2300</response_time>\n"+ "</activity_word>\n"+ \
" <activity_word id='A01_01_01_word_004_00661' trial='2'>\n"+ " <score>missed</score>\n"+ \
"<response_time>2300</response_time>\n"+ " </activity_word>\n"+ " </activity_words>\n"+ " </phase>\n"+ \
" </phases>\n"+ "</student_data>\n"+ "</wz_word_review_atom>"
),
)
wz_word_review_xmls = collections.OrderedDict(wz_word_review_xmls)
'''
//       Word Zone Progress Report     //
'''
wz_progress_report_xmls=(
("Default", "<wz_progress_report_atom>\n"+ " <atom_data>\n"+ generateTimingPlaceholderXML() + \
"<user_directed_navigation/>\n"+ " </atom_data>\n"+ " <student_data/>\n"+ "</wz_progress_report_atom>"
),
)
wz_progress_report_xmls = collections.OrderedDict(wz_progress_report_xmls)
            


'''
// **********************  //
//     Atom Variation Map      //
// **********************  //
'''
atom_variation_map = {
                      # None Zone
    "topic_selection_atom":topic_selection_xmls,
    "zone_menu_atom": zone_menu_xmls,
    "dashboard_atom" : dashboard_xmls,
                     # Reading Zone
    "rz_video_atom" : rz_video_xmls,
    "rz_reading_passage_atom" : rz_reading_passage_xmls,
    "rz_quick_check_question_atom": rz_quick_check_question_xmls,
    "rz_quick_check_progress_report_atom":rz_quick_check_progress_report_xmls,
    "rz_progress_report_atom":rz_progress_report_xmls,
                    # Word Zone
    "wz_word_assessment_round_atom" : build_word_assessment_post_data,
    "wz_word_clinic_atom" : wz_word_clinic_xmls,
    "wz_word_match_atom" : wz_word_match_xmls,
    "wz_self_check_atom" : build_self_check_post_data,
    "wz_word_review_atom" : wz_word_review_xmls,
    "wz_progress_report_atom":wz_progress_report_xmls,                        
}


 