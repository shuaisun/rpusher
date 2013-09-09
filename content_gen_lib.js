var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;
var DOMImplementation = require('xmldom').DOMImplementation;
var Document =require('xmldom').Document;
var XMLDom = require('xmldom');
var fs = require('fs');


/*********************************************************************
								Test Area
*********************************************************************/
//test_this_file();
//var file_data="hehe";
function test_this_file()
{

	fs.readFile("C:/Users/ShuaiSun/Desktop/test.xml","utf8", function(err,data){
	if(err){return console.log(err);}
	file_data = data;
	after_function();
	});
	
}
function after_function()
{
var fake_xml = generateFakeActivityXML(file_data,"spelling_check_up")
console.log(fake_xml);
}

/*****************************************************************************************************/
	////////////////////////////////////////////////////////////
	// Changes are made in createRootDOM() and generateFakeActivityXML(responseText,variation)
	////////////////////////////////////////////////////////////	
/*****************************************************************************************************/	
	////////////////////////////////////////////////////////////
	// Example Code
	////////////////////////////////////////////////////////////
//var responseText = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><output><activity id=\"avatar_editor\"/><data>hahaha</data></output>";
//var data = fs.readFileSync('_word_changer.xml').toString();

//var result_xml = generateFakeActivityXML(data,"");
//console.log(result_xml);

/*****************************************************************************************************/
	////////////////////////////////////////////////////////////
	// Activity fake data support
	////////////////////////////////////////////////////////////	
/*****************************************************************************************************/	
function generateFakeActivityXML(responseText,variation)
{
	// generate fake activity post xml from the getActivityData response xml
	var responseXmlDoc = parseXMLStringToDOM(responseText);
	var activity = getActivityFromXML(responseXmlDoc);			
	var xmlDoc;	
	switch (activity)
	{
		case "avatar_editor":
			xmlDoc = generateAvatarEditorFakeData(responseXmlDoc, activity, variation);
			break;								
		case "avatar_editor_initial":
			xmlDoc = generateAvatarEditorFakeData(responseXmlDoc, activity, variation);
			break;		
		case "backpack_gathering":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;
		case "blend_new_words":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;	
		case "collections_explore_mode":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;				
		case "collections_my_books":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;				
		case "direct_instruction":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;	
		case "direct_instruction_wp":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;		
		case "ebook_1st_read":
			xmlDoc = generateEBook1stReadFakeData(responseXmlDoc, activity, variation);
			break;	
		case "ebook_2nd_read":
			xmlDoc = generateEBook2ndReadFakeData(responseXmlDoc, activity, variation);
			break;	
		case "end_of_series":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;				
		case "end_of_topic":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;				
		case "letter_hunt":
			xmlDoc = generateLetterHuntActivityFakeData(responseXmlDoc, activity, variation);
			break;					
		case "letter_name_challenge":
			xmlDoc = generateLetterNameChallengeFakeData(responseXmlDoc, activity, variation);
			break;				
		case "letter_name_id":
			xmlDoc = generateLetterNameIDFakeData(responseXmlDoc, activity, variation);
			break;					
		case "letter_sound_challenge":
			xmlDoc = generateLetterSoundChallengeFakeData(responseXmlDoc, activity, variation);
			break;		
		case "letter_sound_id":
			xmlDoc = generateLetterSoundIDFakeData(responseXmlDoc, activity, variation);
			break;			
		case "letter_sound_matching":
			xmlDoc = generateLetterSoundMatchingActivityFakeData(responseXmlDoc, activity, variation);
			break;
		case "letter_zone_transition":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;	
		case "listening_zone_transition":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;								
		case "main_hall_outro":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;									
		case "meaning_machine":
			xmlDoc = generateMeaningMachineFakeData(responseXmlDoc, activity, variation);
			break;							
		case "mix_match_sounds":
			xmlDoc = generateMixMatchSoundsFakeData(responseXmlDoc, activity, variation);
			break;
		case "mix_match_words":
			xmlDoc = generateMixMatchWordsFakeData(responseXmlDoc, activity, variation);
			break;			
		case "pa_rhyme":
			xmlDoc = generatePARhymeFakeData(responseXmlDoc, activity, variation);
			break;					
		case "pa_syllable_counting":
			xmlDoc = generatePASyllableCountingFakeData(responseXmlDoc, activity, variation);
			break;		
		case "pa_syllable_blending":
			xmlDoc = generatePASyllableBlendingFakeData(responseXmlDoc, activity, variation);
			break;							
		case "pa_warm_up":
			xmlDoc = generatePAWarmUpFakeData(responseXmlDoc, activity, variation);
			break;
		case "pa_warm_up_al":
			xmlDoc = generatePAWarmUpFakeData(responseXmlDoc, activity, variation);
			break;
		case "read_a_story":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;				
		case "read_think":
			xmlDoc = generateReadThinkFakeData(responseXmlDoc, activity, variation);
			break;					
		case "reading_zone_transition":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;	
		case "screener":
			xmlDoc = generateScreenerFakeData(responseXmlDoc, activity, variation);
			break;						
		case "sentence_fill_in":
			xmlDoc = generateSentenceFillInActivityFakeData(responseXmlDoc, activity, variation);
			break;	
		case "series_assessment":
			xmlDoc = generateSeriesAssessmentFakeData(responseXmlDoc, activity, variation);
			break;
		case "series_assessment_end_period":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;									
		case "sight_word_check_up":
			xmlDoc = generateSightWordCheckUpActivityFakeData(responseXmlDoc, activity, variation);
			break;
		case "sight_word_hunt":
			xmlDoc = generateSightWordHuntActivityFakeData(responseXmlDoc, activity, variation);
			break;				
		case "sight_word_intro":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;											
		case "sound_zone_di":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;				
		case "sound_zone_transition":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;					
		case "spelling_challenge":
			xmlDoc = generateSpellingChallengeFakeData(responseXmlDoc, activity, variation);
			break;				
		case "spelling_check_up":
			xmlDoc = generateSpellingCheckUpFakeData(responseXmlDoc, activity, variation);
			break;					
		case "spelling_clinic":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;					
		case "spelling_zone_transition":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;		
		case "spin_the_wheel":
			xmlDoc = generateSpinTheWheelFakeData(responseXmlDoc, activity, variation);
			break;					
		case "teacher_greeting":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;				
		case "word_building":
			xmlDoc = generateWordBuildingFakeData(responseXmlDoc, activity, variation);
			break;					
		case "word_challenge":
			xmlDoc = generateWordChallengeFakeData(responseXmlDoc, activity, variation);
			break;	
		case "word_challenge_sw":
			xmlDoc = generateWordChallengeFakeData(responseXmlDoc, activity, variation);
			break;					
		case "word_changer":
			xmlDoc = generateWordChangerFakeData(responseXmlDoc, activity, variation);
			break;							
		case "word_id":
			xmlDoc = generateWordIDFakeData(responseXmlDoc, activity, variation);
			break;
		case "word_id_sw":
			xmlDoc = generateWordID_SW_FakeData(responseXmlDoc, activity, variation);
			break;					
		case "word_meaning_match":
			xmlDoc = generateWordMeaningMatchFakeData(responseXmlDoc, activity, variation);
			break;					
		case "word_splitter":
			xmlDoc = generateWordSplitterFakeData(responseXmlDoc, activity, variation);
			break;
		case "word_zone_di":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;										
		case "word_zone_transition":
			xmlDoc = generateNoDataActivityFakeData(responseXmlDoc, activity, variation);
			break;				
		default:
			alert(activity + " activity not supported yet");
			return;
	}
		
	// convert xml to string and make it purdy	
	var sPostXML = (new XMLSerializer()).serializeToString(xmlDoc);
	// TODO: add IE branch
	// IE

	var sPostPrettyXML = vkbeautify(sPostXML, "xml");
	
	// set up UI for next SaveActivityData
	//document.getElementById("S44JR_SAVEACTIVITY_POSTDATA").value = sPostPrettyXML; 
	return sPostPrettyXML;
}

/*****************************************************************************************************/
	////////////////////////////////////////////////////////////
	// Activity fake data generators
	////////////////////////////////////////////////////////////	
/*****************************************************************************************************/	
function generateNoDataActivityFakeData(responseXmlDoc, activity, variation)
	{	
		var bQuit = contains(variation, "quit");	// contains any quit
		var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
		
		// activity root
		var xmlDoc = createRootDOM(activity);
		var elemActivity = xmlDoc.documentElement;
				
		// standard timing block
		appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);

		if (!bPrematureQuit)	// no student data for "no partial data" activity
		{
	 		 // fake student trial data
	 		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		}
		
		return xmlDoc;
	}
	
function generateLetterHuntActivityFakeData(responseXmlDoc, activity, variation)
{
	var bQuit = contains(variation,"quit"); // any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
	
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
	
	// add data only if it is not a premature quit
	if(!bPrematureQuit)
	{
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		
		// get the current activity letter name from the response xml
		var activityLetterNameId = responseXmlDoc.getElementsByTagName("activity_letter_name")[0].getAttribute("id");
		
		// return it
		var elemActivityLetterNames = addDOMBranch(xmlDoc, elemStudentData, "activity_letter_names");
		var elemActivityLetterName = addDOMBranchWithId(xmlDoc, elemActivityLetterNames, "activity_letter_name", activityLetterNameId);
		
		var elemLevels = addDOMBranch(xmlDoc, elemActivityLetterName, "levels");
		
		// iterate thru the levels from the response xml
		var responseLevels = (responseXmlDoc.getElementsByTagName("levels"))[0].getElementsByTagName("level"); // bypass level in context
		for (var i=0; i<responseLevels.length; i++)
		{
			var levelId = responseLevels[i].getAttribute("id");

			// simulate the level results
			var elemLevel = addDOMBranchWithId(xmlDoc, elemLevels, "level", levelId);
			
			var num_distractor_clicks = 0;
			var all_correct_first_attempt = true;
			
			// override if random
			if (contains(variation, "random"))
			{
				num_distractor_clicks = randomWithinRange(0,4);
				if (num_distractor_clicks > 0)
					all_correct_first_attempt = false;
			}
		
			addDOMLeaf(xmlDoc, elemLevel, "num_distractor_clicks", num_distractor_clicks);
			addDOMLeaf(xmlDoc, elemLevel, "all_correct_first_attempt", all_correct_first_attempt);
		}
	}
	
	return xmlDoc;
}

function generateSentenceFillInActivityFakeData(responseXmlDoc, activity, variation)
{
	var bQuit = contains(variation,"quit"); // any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
	
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
	
	// add data only if it is not a premature quit
	if(!bPrematureQuit)
	{
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		
		// return it
		var elemTrials = addDOMBranch(xmlDoc, elemStudentData, "trials");
		
		// iterate thru the trials from the response xml
		var responseTrials = responseXmlDoc.getElementsByTagName("trial");
		for (var i=0; i<responseTrials.length; i++)
		{
			var trialId = responseTrials[i].getAttribute("id");

			// simulate the trial results
			var elemTrial = addDOMBranchWithId(xmlDoc, elemTrials, "trial", trialId);
			
			// the trial is scored correct only if the student gets it right in the first attempt
			var num_attempts = 1;
			var score = "correct";
			
			// override if random
			if (contains(variation, "random"))
			{		
					// the student can make 3 attempts 
					num_attempts = randomWithinRange(1,3);
					
					// the score cannot be "incorrect" and num_attempts<3, because if they get it wrong, they have to keep trying till
					// they take all the 3 attempts
					score = (randomWithinRange(0,1)==1) || (num_attempts<3) ? "correct" : "incorrect";
			}
		
			addDOMLeaf(xmlDoc, elemTrial, "num_attempts", num_attempts);
			addDOMLeaf(xmlDoc, elemTrial, "score", score);
		}
	}
	
	return xmlDoc;
}


function generateLetterSoundMatchingActivityFakeData(responseXmlDoc, activity, variation)
{
	var bQuit = contains(variation,"quit"); // any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
	
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
	
	// add data only if it is not a premature quit
	if(!bPrematureQuit)
	{
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		
		// get the response rounds
		var responseRounds	= responseXmlDoc.getElementsByTagName("round");
		 
		// and return them
		var elemRounds = addDOMBranch(xmlDoc,elemStudentData,"rounds");
		
		for (var i=0; i<responseRounds.length; i++)
		{
			var roundId = parseInt(responseRounds[i].getAttribute("id"));								
			var elemRound = addDOMBranchWithId(xmlDoc, elemRounds, "round", roundId);
		
			// get response trials
			var responseTrials = responseRounds[i].getElementsByTagName("trial");
			
			// and return them
			var elemTrials = addDOMBranch(xmlDoc, elemRound, "trials");
			var lastCorrect = false;
			for (var j=0; j < responseTrials.length; j++)
			{
				var trialId = responseTrials[j].getAttribute("id");
				var elemTrial = addDOMBranchWithId(xmlDoc, elemTrials, "trial", trialId);
				
				var correctOnFirstAttempt;
				if (contains(variation, "fail_round_2") && roundId==2)
				{
					// fail round 2 by making alternate trials as incorrect so that the last 3 out 4 is always wrong
					correctOnFirstAttempt = !lastCorrect;
					lastCorrect = !lastCorrect;
				} 
				else 
				{
					// giving more probability for correct than incorrect
					// (but not implementing all the complex Client-side scoring logic, test app doesn't need that)
					correctOnFirstAttempt = randomWithinRange(0,5)<5 ? "true" : "false";
				}
				
				addDOMLeaf(xmlDoc, elemTrial, "correct_on_first_attempt", correctOnFirstAttempt);			
			}	
			
			// bail early if so desired
			if (contains(variation, "fail_round_2") && roundId==2)
				break;
		}	
	}
	
	return xmlDoc;
}

function generateSightWordHuntActivityFakeData(responseXmlDoc, activity, variation)
{
	var bQuit = contains(variation,"quit"); // any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
	
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
	
	// add data only if it is not a premature quit
	if(!bPrematureQuit)
	{
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		
		// get the current activity word from the response xml
		var activityWordId = responseXmlDoc.getElementsByTagName("activity_word")[0].getAttribute("id");
		
		// return it
		var elemActivityWords = addDOMBranch(xmlDoc, elemStudentData, "activity_words");
		var elemActivityWord = addDOMBranchWithId(xmlDoc, elemActivityWords, "activity_word", activityWordId);
		
		var elemLevels = addDOMBranch(xmlDoc, elemActivityWord, "levels");
		
		var numFailedAttempts = 0;
		
		// iterate thru the levels from the response xml
		var responseLevels = (responseXmlDoc.getElementsByTagName("levels"))[0].getElementsByTagName("level"); // bypass level in context			
		for (var i=0; i<responseLevels.length; i++) // start at '1' to avoid the 'level' element in <activity_data>
		{
			if (numFailedAttempts == 2 )
				break; // don't attempt the next level if you failed twice
				
			numFailedAttempts = 0;
			
			var levelId = responseLevels[i].getAttribute("id");

			// simulate the level results
			var elemLevel = addDOMBranchWithId(xmlDoc, elemLevels, "level", levelId);
		
			var elemAttempts = addDOMBranch(xmlDoc, elemLevel, "attempts");
			
			for (var attemptNum=1; attemptNum<=2; attemptNum++)
			{
				// simulate the level results
				var elemAttempt = addDOMBranchWithId(xmlDoc, elemAttempts, "attempt", attemptNum);
				
				var num_distractor_clicks = 0;
				var all_correct_flag = true;
				
				// override if random
				if (contains(variation, "random"))
				{
					num_distractor_clicks = randomWithinRange(0,5); // slightly increase chance of failure
					num_distractor_clicks = num_distractor_clicks > 3 ? 3 : num_distractor_clicks; // but keep max of 3 clicks
					
					if (num_distractor_clicks > 0)
						all_correct_flag = false;
				}
			
				addDOMLeaf(xmlDoc, elemAttempt, "num_distractor_clicks", num_distractor_clicks);
				
				if (num_distractor_clicks < 3)
					break;
				
				numFailedAttempts++;
			}
		}
	}
	
	return xmlDoc;
}

function generateWordBuildingFakeData(responseXmlDoc, activity, variation)
{
	var bQuit = contains(variation, "quit");	// any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
	
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
	
	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		
		// get response rounds
		var responseRounds = responseXmlDoc.getElementsByTagName("round");
		
		// return them
		var elemRounds = addDOMBranch(xmlDoc,elemStudentData,"rounds");
		for (var i=0; i<responseRounds.length; i++)
		{
			var roundId = responseRounds[i].getAttribute("id");
			var elemRound = addDOMBranchWithId(xmlDoc, elemRounds, "round", roundId);
			
			// get response trials
			var responseTrials = responseRounds[i].getElementsByTagName("trial");
			
			// return them
			var elemTrials = addDOMBranch(xmlDoc, elemRound, "trials");
			for (var j=0; j < responseTrials.length; j++)
			{
				var trialId = responseTrials[j].getAttribute("id");
				var elemTrial = addDOMBranchWithId(xmlDoc, elemTrials, "trial", trialId);
			
				var score = "";
				if (contains(variation, "incorrect"))
					score = "incorrect";
				else if (contains(variation, "correct"))
					score = "correct";
				else
					score = (randomWithinRange(1,2)==1 ? "correct" : "incorrect");
				
				addDOMLeaf(xmlDoc, elemTrial, "score", score);
				addDOMLeaf(xmlDoc, elemTrial, "num_attempts", randomWithinRange(1,3));
				addDOMLeaf(xmlDoc, elemTrial, "response_time", randomWithinRange(1000,5000));
			}
		}
	}

	return xmlDoc;
}

function generateSeriesAssessmentFakeData(responseXmlDoc, activity, variation)
{
	var bQuit = contains(variation, "quit");	// any quit
	
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;

	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
			
	var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
	
	var sectionsElem =  addDOMBranch(xmlDoc,elemStudentData,"sections");
	
	// bail with 0 trials partial data (empty sections tag)
	if (variation == "quit_premature_0_trials")
		return xmlDoc;
		
	var allSectionsComplete = contains(variation,"all_sections");
	var numSections = 1;

	// get sections presented
	var elemSections = responseXmlDoc.getElementsByTagName("section");
	var numSections = elemSections.length;	// default to generating data for all of them
	var oldText		= "";
	var trialText	= "";
	var thisSubsectionPassOrFail	=  true;
	// cause a premature quit before final section
	if (contains(variation,"quit_premature") && numSections > 1)
		numSections =  numSections - randomWithinRange(1, numSections-1);
	
	// iterate sections & trials	
	for (var i=0; i < numSections; i++)
	{
		var sectionId = elemSections[i].getAttribute("id");
		var sectionElem = addDOMBranchWithId(xmlDoc, sectionsElem, "section", sectionId);
		var trialsElem = addDOMBranch(xmlDoc,sectionElem,"trials");
		var elemTrials = elemSections[i].getElementsByTagName("trial");
				
		for (var j=0; j<elemTrials.length; j++)
		{
			var trialId = elemTrials[j].getAttribute("id");
			var trialText =  elemTrials[j].getElementsByTagName("answer")[0].childNodes[0].nodeValue;
			var fluencyThreshold = parseInt(elemTrials[j].getAttribute("fluency_threshold"));
			var trialElem = addDOMBranchWithId(xmlDoc, trialsElem, "trial", trialId);
			var responseTime = "";
			var score = "";
			
			if (contains(variation, "all_incorrect")) {
				responseTime = randomWithinRange(1000, fluencyThreshold);
				score = "incorrect";
			}
			else if (contains(variation, "all_correct"))
			{
				responseTime = randomWithinRange(1000, fluencyThreshold);
				score = "correct";
			} else if(contains(variation,"alpha")){
				if(oldText!=trialText){
					thisSubsectionPassOrFail = !thisSubsectionPassOrFail; 
				}
				responseTime = randomWithinRange(1000, (fluencyThreshold + 1000));
				
				if (thisSubsectionPassOrFail)
					score = "correct";
				else 
					score = "incorrect";
			}
			else //if (contains(variation, "all_random"))
			{
				//var trialTimeLimit = 10000;	// hard to test this way
				responseTime = randomWithinRange(1000, (fluencyThreshold + 1000));
				//if (responseTime > trialTimeLimit)
				//	score = "out_of_time";
				if (responseTime <= fluencyThreshold)
					score = (randomWithinRange(0,1)==1) ? "correct" : (randomWithinRange(1,7) == 1) ? "out_of_time" : "incorrect";	// weight out_of_time lightly
				else if (responseTime > fluencyThreshold) // && responseTime < trialTimeLimit)
					score = "slow";
			}

			addDOMLeaf(xmlDoc, trialElem, "score", score);
			addDOMLeaf(xmlDoc, trialElem, "response_time", responseTime);	
			oldText = trialText;	
		}
	}
	
	return xmlDoc;
}

function generateScreenerFakeData(responseXmlDoc, activity, variation)
{
	var bQuit = contains(variation, "quit");	// any quit
	var bPartialComplete = contains(variation, "partial_complete");
	var bMouseSkillsFailed = contains(variation, "mouse_skills_failed");
					
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;

	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
			
	var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
	
	//addDOMLeaf(xmlDoc, elemStudentData, "screener_complete_flag", (!bPartialComplete && !bMouseSkillsFailed));
	addDOMLeaf(xmlDoc, elemStudentData, "screener_complete_flag", contains(variation, "all_sections_complete"));
	
	var elemSections =  addDOMBranch(xmlDoc, elemStudentData, "sections");

	 // bail with 0 trials partial data (empty sections tag)
	if (variation == "quit_premature_0_trials")
		return xmlDoc;
	
	// get sections presented
	var elemResponseSections = responseXmlDoc.getElementsByTagName("section");
	
	var numSections = elemResponseSections.length;	// default to generating data for all of them
	if (bPartialComplete)
	{
		// safety valve
		if (elemResponseSections.length == 1)
		{
			alert("The number of sections to be completed by the student is 1, you cannot choose Partial complete");
			return;
		}
		else
		{
			// complete random number of sections without completing 
			numSections = randomWithinRange(1, elemResponseSections.length-1);
		}
	 }
	 
	 // override
	if (bMouseSkillsFailed)
		numSections = 1;
		
	// by default, the student just cruises thru sections unless there is advancement criteria
	var nextSection = "";

	// iterate sections & trials	
	for (var i=0; i < numSections; i++)
	{
		var sectionId = elemResponseSections[i].getAttribute("id");
		
		// Simulate the flow by randomizing the student pass/fail at decision points
		// 1. keep adding the sections till you reach the section that has advancement criteria
		// 	2. when you reach a section with advancement criteria, randomize the result
		// 	3. Depending on whether the result is true or false, keep skipping sections till you reach the met_criteria_section or not_met_criteria_section or the end
		//	4. rinse and repeat 
		
		// first time in, or if next section in flow based on section advancement criteria
		if (nextSection == "" || nextSection == sectionId)
		{
			// get section flow info
			var elemFlow = elemResponseSections[i].getElementsByTagName("flow")[0];
			var elemCriteriaMetSection = elemFlow.getElementsByTagName("advancement_criteria_met_section")[0];
			var elemCriteriaNotMetSection = elemFlow.getElementsByTagName("advancement_criteria_not_met_section")[0];
			// (tags may be empty)
			var criteriaMetSection = (elemCriteriaMetSection.hasChildNodes()) ? elemCriteriaMetSection.childNodes[0].nodeValue : "";
			var criteriaNotMetSection = (elemCriteriaNotMetSection.hasChildNodes()) ? elemCriteriaNotMetSection.childNodes[0].nodeValue :"";
			
			// get section advancement criteria (may not have any)
			var elemAdvancementCriteriaScoringThreshold = elemFlow.getElementsByTagName("advancement_criteria_scoring_threshold");
			var bHasAdvancementCriteria = elemAdvancementCriteriaScoringThreshold.length > 0;
			
			// always pass the section if there is no advancement criteria			
			var bSectionPassed = true;
			var scoringThreshold = 0;
			
			// but if advancement criteria, randomize passing
			if (bHasAdvancementCriteria)
			{
				if (sectionId != "mouse_skills") // but always pass mouse skills so we can move on
					bSectionPassed = (randomWithinRange(1,3)<=2) ? true : false;	// weight more towards passing
				
				// overrride
				if (bMouseSkillsFailed)
					bSectionPassed = false;
											
				// if it is partial complete, then we have to override
				// if either flow branches end the screener, then we have to flip the result to make sure the activity is not complete
				if (bPartialComplete && criteriaMetSection=="screener_end" && bSectionPassed) {
					bSectionPassed = false;
				}
				else if (bPartialComplete && criteriaNotMetSection=="screener_end" && !bSectionPassed) {
					bSectionPassed = true;
				}
				
				// make sure they reach the scoring threshold to pass or don't reach it to fail
				scoringThreshold = elemAdvancementCriteriaScoringThreshold[0].childNodes[0].nodeValue;
			}
			
			// determine which section they are branching to next in the flow (causing others to be skipped)
			if (bSectionPassed) {
				nextSection = criteriaMetSection;
			}
			else {
				nextSection = criteriaNotMetSection;
			}
					
			// build section results
			var sectionElem = addDOMBranchWithId(xmlDoc, elemSections, "section", sectionId);
			
			// mark section passed or not
			addDOMLeaf(xmlDoc, sectionElem, "advancement_criteria_met_flag", bSectionPassed);
			
			// iterate response trials and build trial results
			var elemResponseTrials = elemResponseSections[i].getElementsByTagName("trial");
			var elemTrials = addDOMBranch(xmlDoc, sectionElem, "trials");
			var numCorrect = 0;
			
			for (var j=0; j<elemResponseTrials.length; j++)
			{
				// build a trial result (roundtrip the id)
				var trialId = elemResponseTrials[j].getAttribute("id");
				var bPracticeTrial = contains(trialId, "_p_");
						
				var elemTrial = addDOMBranchWithId(xmlDoc, elemTrials, "trial", trialId);
			
				// scoring is random (unless practice trial, in which case always correct)
				var score = (randomWithinRange(1,2)==1 || bPracticeTrial) ? "correct" : "incorrect";
				
				// but can be overridden
				// has advancment criteria and section passed, so make sure they met the threshold up front
				if (bHasAdvancementCriteria && bSectionPassed && (numCorrect < scoringThreshold)) {
					score = "correct";	
				}
				// or has advancement criteria and section failed, so make sure they did not meet the threshold
				else if (bHasAdvancementCriteria && !bSectionPassed &&  (numCorrect == scoringThreshold-1)) {
					score = "incorrect";
				}
				
				if (!bPracticeTrial && (score == "correct"))
					numCorrect++; // keep track of correct count of real trials
			
				addDOMLeaf(xmlDoc, elemTrial, "score", score);
				addDOMLeaf(xmlDoc, elemTrial, "response_time", randomWithinRange(1000,5000));	
			}	
		}
	}
	
	return xmlDoc;
}

function generateAvatarEditorFakeData(responseXmlDoc, activity, variation)
{
	var bQuit = contains(variation, "quit");	// any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
	
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;

	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);

	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{ 			 	
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		var elemDNACategories = addDOMBranch(xmlDoc, elemStudentData, "dna_categories");

		// 8 categories hard-coded on the Client - need to keep in synch
		addDOMLeafWithId(xmlDoc, elemDNACategories, "dna_category",  "body01", "bodies");
		addDOMLeafWithId(xmlDoc, elemDNACategories, "dna_category", "eye01", "eyes");
		addDOMLeafWithId(xmlDoc, elemDNACategories, "dna_category", "mouthnose01", "mouths_noses");
		addDOMLeafWithId(xmlDoc, elemDNACategories, "dna_category", "top01", "head_tops");
		addDOMLeafWithId(xmlDoc, elemDNACategories, "dna_category", "side01", "head_sides");
		addDOMLeafWithId(xmlDoc, elemDNACategories, "dna_category", "shirt01", "torso_shirts");
		addDOMLeafWithId(xmlDoc, elemDNACategories, "dna_category", "outfit01", "torso_outfits");
		addDOMLeafWithId(xmlDoc, elemDNACategories, "dna_category", "palette01", "color_palettes");
	}
	
	return xmlDoc;
}

function generateEBook1stReadFakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// any quit
							
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
		
	var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
	
	addDOMLeaf(xmlDoc, elemStudentData, "full_read_complete", contains(variation, "no_full_read") ? "false" : "true");	
	addDOMLeaf(xmlDoc, elemStudentData, "num_words_read", randomWithinRange(25,100));
	
	return xmlDoc;
}

function generateEBook2ndReadFakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
	var bIncludeBookRating = !contains(variation, "no_book_rating");
	
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
		
	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{		 	
		// fake student attempt data
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		
		// optional tag
		if (bIncludeBookRating)
			addDOMLeaf(xmlDoc, elemStudentData, "book_rating", randomWithinRange(1,3));
			
		addDOMLeaf(xmlDoc, elemStudentData, "num_words_read", randomWithinRange(25,100));
	}
		
	return xmlDoc;
}

function generatePAWarmUpFakeData(responseXmlDoc, activity, variation)
{
	var bQuit = contains(variation, "quit");	// any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
	
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
		
	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{		 	
		// fake student attempt data
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		if (variation == "all_correct") {
			addDOMLeaf(xmlDoc, elemStudentData, "all_correct_first_attempt", "true");	
			addDOMLeaf(xmlDoc, elemStudentData, "num_incorrect_attempts", "0");	
		}
		else if (variation == "some_incorrect") {
			addDOMLeaf(xmlDoc, elemStudentData, "all_correct_first_attempt", "false");
			addDOMLeaf(xmlDoc, elemStudentData, "num_incorrect_attempts", randomWithinRange(1,2));	
		}	
	}
	
	return xmlDoc;
}

function generateMixMatchSoundsFakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
					
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
		
	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{		 	
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");

		var numAttempts;
		if (variation == "all_correct") 
			numAttempts = 1;
		else if (variation == "some_correct")
			numAttempts = randomWithinRange(1,3);
					
		addDOMLeaf(xmlDoc, elemStudentData, "num_attempts", numAttempts);
	}
	
	return xmlDoc;
} 

function generateMeaningMachineFakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// contains any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
	
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
			
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);

	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{
		 // fake student trial data
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");

		// list of activity word trials
		var elemActivityWords = addDOMBranch(xmlDoc, elemStudentData, "activity_words");
						
		// iterate over response activity words and fake a trial for each
		var elemResponseActivityWords = responseXmlDoc.getElementsByTagName("activity_word");
		for (var i = 0; i < elemResponseActivityWords.length; i++)
		{
			var elemResponseActivityWord = elemResponseActivityWords[i];
			var elemActivityWord = addDOMBranchWithId(xmlDoc, elemActivityWords, "activity_word", elemResponseActivityWord.getAttribute("id")) // roundtrip id
			elemActivityWord.setAttribute("order", i+1);
			
			// fake score based on variation
			var numAttempts;
			if (contains(variation, "all_correct"))
				numAttempts = 1;
			else if (contains(variation, "some_correct"))
				numAttempts = randomWithinRange(1,3);

			addDOMLeaf(xmlDoc, elemActivityWord, "num_attempts", numAttempts);
		}
	}
	
	return xmlDoc;
} 

function generateMixMatchWordsFakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
					
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
		
	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{		 	
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		
		// Get the number of words that were administered
		var elemResponseActivityWords = responseXmlDoc.getElementsByTagName("activity_word");
		numWordsAdministered = elemResponseActivityWords.length;

		var numCorrectFirstAttempt;
		if (variation == "all_correct") 
			numCorrectFirstAttempt = numWordsAdministered;
		else if (variation == "some_correct")
			numCorrectFirstAttempt = randomWithinRange(1,3);
					
		addDOMLeaf(xmlDoc, elemStudentData, "num_correct_first_attempt", numCorrectFirstAttempt);
		addDOMLeaf(xmlDoc, elemStudentData, "num_words_administered", numWordsAdministered);
		addDOMLeaf(xmlDoc, elemStudentData, "icon_drops_first_attempt", randomWithinRange(5,15));
		addDOMLeaf(xmlDoc, elemStudentData, "elapsed_time_first_attempt", randomWithinRange(5000,50000));
	}
	
	return xmlDoc;
} 

function generateSpinTheWheelFakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
					
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
		
	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{		 	
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");

		var numCorrectFirstAttempt;
		if (variation == "all_correct") 
			numCorrectFirstAttempt = 1;
		else if (variation == "some_correct")
			numCorrectFirstAttempt = randomWithinRange(2,3);
					
		addDOMLeaf(xmlDoc, elemStudentData, "num_attempts", numCorrectFirstAttempt);
	}
	
	return xmlDoc;
} 

function generateWordChangerFakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// contains any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
	
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
			
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);

	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{
		 // fake student trial data
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");

		// list of activity word trials
		var elemActivityWords = addDOMBranch(xmlDoc, elemStudentData, "activity_words");
						
		// iterate over response activity words and fake a trial for each
		var elemResponseActivityWords = responseXmlDoc.getElementsByTagName("activity_word");
		for (var i = 0; i < elemResponseActivityWords.length; i++)
		{
			var elemResponseActivityWord = elemResponseActivityWords[i];
			var elemActivityWord = addDOMBranchWithId(xmlDoc, elemActivityWords, "activity_word", elemResponseActivityWord.getAttribute("id")) // roundtrip id
			elemActivityWord.setAttribute("order", i+1);	// trial order attribute
			
			// fake score based on variation
			var correctOnFirstAttempt;
			if (contains(variation, "all_correct"))
				correctOnFirstAttempt = true;
			else if (contains(variation, "all_incorrect"))
				correctOnFirstAttempt = false;
			else if (contains(variation, "random"))
				correctOnFirstAttempt = (randomWithinRange(0,1)==1) ? true : false

			addDOMLeaf(xmlDoc, elemActivityWord, "correct_on_first_attempt", correctOnFirstAttempt);
		}
	}
	
	return xmlDoc;
}

function generateSightWordCheckUpActivityFakeData(responseXmlDoc, activity, variation)
{
	var bQuit = contains(variation,"quit");
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
			
	//activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);

	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{
		// get the activity words sent
		var activityWords = new Array();
				
		// start xml
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		var elemActivityWordsData = addDOMBranch(xmlDoc, elemStudentData, "activity_words");
		
		var trialTimeLimit = parseInt(responseXmlDoc.getElementsByTagName("trial_time_limit")[0].childNodes[0].nodeValue);
	
		var elemResponseActivityWords = responseXmlDoc.getElementsByTagName("activity_word");
		for (var i = 0; i < elemResponseActivityWords.length; i++)
		{
			// round-trip the id
			var activityWordID = elemResponseActivityWords[i].getAttribute("id");
			var elemActivityWord = addDOMBranchWithId(xmlDoc, elemActivityWordsData, "activity_word", activityWordID);
			
			// start trials for each word
			var elemTrials = addDOMBranch(xmlDoc, elemActivityWord, "trials");
								
			if (contains(variation,"all_correct"))
			{
				var numTrialsCorrect = 0;
				for (var j=1; j<=3; j++) // 3 possible trials, but maybe only 2
				{
					if (numTrialsCorrect == 2)	// bail if 3rd trial not needed
						break;
							
					// one of 3 scores
					var randomTrialScore = ((randomWithinRange(1,2)==1) ? "correct" : ( (randomWithinRange(1,2)==1) ? "out_of_time": "incorrect"));
				
					// track number correct so if we get to 2 we stop		
					if (randomTrialScore == "correct")
						numTrialsCorrect++;
					
					// first trial and maybe 2nd trial can be random
					if (j==1 || (j==2 && numTrialsCorrect == 1))
					{
						var elemTrialData = addDOMBranchWithId(xmlDoc, elemTrials, "trial", j);
					
						var responseTime = (randomTrialScore != "out_of_time") ? 
															randomWithinRange(100, trialTimeLimit) : // within limit
															trialTimeLimit + randomWithinRange(100, 2000); // over limit
							
						addDOMLeaf(xmlDoc, elemTrialData, "score", randomTrialScore);
						addDOMLeaf(xmlDoc, elemTrialData, "response_time", responseTime);
					}
					// has to have a correct trial here
					else
					{			
						var elemTrialData = addDOMBranchWithId(xmlDoc, elemTrials, "trial", j);
						addDOMLeaf(xmlDoc, elemTrialData, "score", "correct");
						addDOMLeaf(xmlDoc, elemTrialData, "response_time", randomWithinRange(100, trialTimeLimit));
					}
				}
				
				addDOMLeaf(xmlDoc, elemActivityWord, "word_score", "correct");
				overallScore = "pass";	
			}
			else if (contains(variation,"random_missed"))
			{
				var numTrialsIncorrectOrOutOfTime = 0;
				for (var j=1; j<=3; j++) // 3 possible trials, but maybe only 2
				{
					if (numTrialsIncorrectOrOutOfTime == 2)	// bail if 3rd trial not needed
						break;
							
					// one of 3 scores
					var randomTrialScore = ((randomWithinRange(1,2)==1) ? "correct" : ( (randomWithinRange(1,4)==1) ? "out_of_time": "incorrect"));

					// track number incorrect so if we get to 2 we stop		
					if (randomTrialScore != "correct")
						numTrialsIncorrectOrOutOfTime++;
					
					// first trial and maybe 2nd trial can be random
					if (j==1 || (j==2 && numTrialsIncorrectOrOutOfTime == 1))
					{
						var elemTrialData = addDOMBranchWithId(xmlDoc, elemTrials, "trial", j);
					
						var responseTime = (randomTrialScore != "out_of_time") ? 
															randomWithinRange(100, trialTimeLimit) : // within limit
															trialTimeLimit + randomWithinRange(100, 2000); // over limit
						
						addDOMLeaf(xmlDoc, elemTrialData, "score", randomTrialScore);
						addDOMLeaf(xmlDoc, elemTrialData, "response_time", responseTime);
					}
					// has to have an incorrect/out_of_time trial here
					else
					{			
						var elemTrialData = addDOMBranchWithId(xmlDoc, elemTrials, "trial", j);
						
						randomTrialScore = ((randomWithinRange(1,4)==1) ? "out_of_time": "incorrect");
						var responseTime = (randomTrialScore != "out_of_time") ? 
															randomWithinRange(100, trialTimeLimit) : // within limit
															trialTimeLimit + randomWithinRange(100, 2000); // over limit
															
						addDOMLeaf(xmlDoc, elemTrialData, "score", randomTrialScore);
						addDOMLeaf(xmlDoc, elemTrialData, "response_time", responseTime);
					}
				}
				addDOMLeaf(xmlDoc, elemActivityWord, "word_score", "missed");
				overallScore = "fail";
			}
		}
		addDOMLeaf(xmlDoc, elemStudentData, "overall_score", overallScore);
	}
	
	return xmlDoc;
}

function generateSpellingChallengeFakeData(responseXmlDoc, activity, variation)
{
	var bQuit = contains(variation, "quit");	// any quit
	
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
		
	var maxRecallLevelAttempts = parseInt(responseXmlDoc.getElementsByTagName("max_recall_level_attempts")[0].textContent);
	var maxRounds = parseInt(responseXmlDoc.getElementsByTagName("max_rounds")[0].textContent);
						
	// start by getting info about the activity words sent
	var studyItems = new Array();
	var reviewItems = new Array();
	
	var elemResponseActivityWords = responseXmlDoc.getElementsByTagName("activity_word");
	for (var i = 0; i < elemResponseActivityWords.length; i++)
	{
		var elemResponseActivityWord = elemResponseActivityWords[i];
		var trial_type = elemResponseActivityWord.getAttribute("type");
		if (trial_type == "study")
			studyItems.push(elemResponseActivityWord);
		else
			reviewItems.push(elemResponseActivityWord);
	}
	
	// special case: 0 study items
	var bReviewOnly = false;
	if (studyItems.length == 0)
		bReviewOnly = true;
	
	// get starting recall level
	var elemCurrentRecallLevel = responseXmlDoc.getElementsByTagName("current_recall_level")[0];
	var currentRecallLevel = elemCurrentRecallLevel.childNodes[0].nodeValue;
	
	// setup presentation order based on # of study items
	var presentation;
	switch (studyItems.length)
	{
		case 0:
			presentation = ["RRR", "RRRR", "RRRRR"];
			break;
		case 1:
			presentation = ["SRR","RSRR","RSRRR"];
			break;
		case 2:
			presentation = ["SSR", "RSSR", "RSRSR"];
			break;
		case 3:
			presentation = ["SSS", "RSSRS", "RSRSRS"];
			break;
		default:
			alert("unsupported number of study items");
			break;
	}
	
	// start xml
	var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
	var elemRecallLevels = addDOMBranch(xmlDoc, elemStudentData, "recall_levels");
		
	// keep track of what review items we have used
	var reviewItemIndex = resetReviewItemIndex = 0;
			
	// bail with 0 trials partial data (empty recall_levels tag)
	if (variation == "quit_premature_0_trials")
		return xmlDoc;
			
	// walk remaining recall levels	
	var totalRounds = 0;
	for (var recallLevel = currentRecallLevel; recallLevel <= 3; recallLevel++)
	{  				
		resetReviewItemIndex = reviewItemIndex;	// for later use
									
		// walk 2 possible attempts per recall level
		for (var attempt = 1; attempt <= 2; attempt++)
		{
			totalRounds++;
			
			// reset if repeating a recall level, because we reuse same review words
			if (attempt > 1)
				reviewItemIndex = resetReviewItemIndex;
				
			var elemRecallLevel = addDOMBranchWithId(xmlDoc, elemRecallLevels, "recall_level", recallLevel);
			elemRecallLevel.setAttribute("attempt", attempt);
			var elemActivityWords = addDOMBranch(xmlDoc, elemRecallLevel, "activity_words");
		
			// walk presentation sequence
			var orderIndex = 1;
			var studyItemIndex = 0;

			// track scoring results
			var numIncorrect = 0;	

			for (var i = 0; i < presentation[recallLevel-1].length; i++)
			{
				var bStudyItem = (presentation[recallLevel-1].charAt(i) == 'S');
				
				 if (bStudyItem) {
					var origItem = studyItems[studyItemIndex];
					studyItemIndex++;
				}		
				else {
					//TODO: out of review words, what to do??
					if (reviewItemIndex > reviewItems.length - 1)
						continue;
						
					var origItem = reviewItems[reviewItemIndex];
					reviewItemIndex++;
				}
				
				var elemActivityWord = addDOMBranchWithId(xmlDoc, elemActivityWords, "activity_word", origItem.getAttribute("id")); // roundtrip id
				elemActivityWord.setAttribute("type", origItem.getAttribute("type"));	// roundtrip type
				elemActivityWord.setAttribute("order", orderIndex);
				orderIndex++
							
				var score = "correct"; // default

				if (!bReviewOnly)	// review only scoring doesn't matter, so always make them correct
				{
					// override if all incorrect (they will never get past recall level 1)
					if (contains(variation, "all_incorrect")) {
						score = "incorrect";
					}
					// override and go random
					else if (contains(variation, "random")) {
						if (randomWithinRange(1,100) > 80)
							score = "incorrect";
					}	
				}
					
				// track count of incorrect items only
				if ((!bReviewOnly && bStudyItem && score != "correct") ||  // study
					 (bReviewOnly && score != "correct"))  // review
					numIncorrect++;		
	
				addDOMLeaf(xmlDoc, elemActivityWord, "score", score);
				addDOMLeaf(xmlDoc, elemActivityWord, "error_type", (score == "correct") ? "" : randomWithinRange(1,30));	// spelling error code range
				addDOMLeaf(xmlDoc, elemActivityWord, "response_time", randomWithinRange(1000, 5000)); 
			}
			 
			// success criteria short-hand
			var bRecallLevelComplete = ((numIncorrect == 0) || 
														(bReviewOnly))  // recall level always complete in review only mode	(no success criteria)				
			elemRecallLevel.setAttribute("score", bRecallLevelComplete ? "pass" : "fail");
			
			// if they failed their 2nd attempt at a recall level, or completed 4 rounds total (4 recall level attempts total), that's all she wrote my friend
			if ((bRecallLevelComplete == false && attempt == maxRecallLevelAttempts) || (totalRounds == maxRounds))
			{
				return xmlDoc;
			}
			// if they completed the recall level, try for another recall level
			else if (bRecallLevelComplete == true) {
				break;
			}
			// otherwise repeat the recall level
		}
	}
	return xmlDoc;
}
	
function generateLetterNameIDFakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
					
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
		
	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{		
		// start by getting info about the sound spellings sent
		var studyItems = new Array();
		var reviewItems = new Array();

		var elemResponseActivitySoundSpellings = responseXmlDoc.getElementsByTagName("activity_letter_name");
		for (var i = 0; i < elemResponseActivitySoundSpellings.length; i++)
		{
			var elemResponseActivitySoundSpelling = elemResponseActivitySoundSpellings[i];
			var trial_type = elemResponseActivitySoundSpelling.getAttribute("type");
			if (trial_type == "study")
				studyItems.push(elemResponseActivitySoundSpelling);
			else
				reviewItems.push(elemResponseActivitySoundSpelling);
		}
		
		// special case: 0 study items
		var bReviewOnly = false;
		if (studyItems.length == 0)
			bReviewOnly = true;
		
		// special case: if 1 study item, treat it like 2
		if (studyItems.length == 1)
			studyItems.push(studyItems[0]);
		
		// setup presentation order based on # of study items
		var presentation = ["SS", "RSSR", "RSRSR", "RRSRRSRR"];
					
		// start xml
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		var elemRecallLevels = addDOMBranch(xmlDoc, elemStudentData, "recall_levels");
		
		// keep track of what review items we have used
		var reviewItemIndex = resetReviewItemIndex = 0;

		// walk 4 possible recall levels
		for (var recallLevel = 1; recallLevel <= 4; recallLevel++)
		{  				
			resetReviewItemIndex = reviewItemIndex;	// for later use
										
			// walk 3 possible attempts per recall level
			for (var attempt = 1; attempt <= 3; attempt++)
			{
				// reset if repeating a recall level, because we reuse same review words
				if (attempt > 1)
					reviewItemIndex = resetReviewItemIndex;
					
				var elemRecallLevel = addDOMBranchWithId(xmlDoc, elemRecallLevels, "recall_level", recallLevel);
				
				elemRecallLevel.setAttribute("attempt", attempt);
				
				var elemActivitySoundSpellings = addDOMBranch(xmlDoc, elemRecallLevel, "activity_letter_names");
				
				// walk presentation sequence
				var orderIndex = 1;
				var studyItemIndex = 0;

				// track scoring results
				var numIncorrect = 0;	

				for (var i = 0; i < presentation[recallLevel-1].length; i++)
				{
					var bStudyItem = (presentation[recallLevel-1].charAt(i) == 'S');
					
					if (bStudyItem) {
						var origItem = studyItems[studyItemIndex];
						studyItemIndex++;
					}		
					else {
						//TODO: out of review words, what to do??
						if (reviewItemIndex > reviewItems.length - 1)
							continue;
							
						var origItem = reviewItems[reviewItemIndex];
						reviewItemIndex++;
					}
					
					var elemActivitySoundSpelling = addDOMBranchWithId(xmlDoc, elemActivitySoundSpellings, 
							"activity_letter_name", origItem.getAttribute("id")) // roundtrip id
					elemActivitySoundSpelling.setAttribute("type", origItem.getAttribute("type"));	// roundtrip type
					elemActivitySoundSpelling.setAttribute("order", orderIndex);
					orderIndex++
					
					var score = "correct"; // default

					// override if all inaccurate (they will never get past recall level 1)
					if (variation == "all_inaccurate") {
						score = "incorrect";	// weight out_of_time lightly
					}
					// override if first inaccurate only (but let them get past recall level 1 with just 2 study items)
					else if (variation == "first_inaccurate_only" && studyItemIndex == 1 && !(studyItems.length == 2 && recallLevel == 1)) {	
						score = "incorrect"; // weight out_of_time lightly
					}
					// override and go random
					else if (contains(variation, "random")) {
						var tokens = variation.split("_"); // pull apart variation for percentage
						var value = randomWithinRange(1,100);
						score = ((value < tokens[1]) ? "correct" : "incorrect");
					}	
					
					// track count of incorrect items only
					if ((!bReviewOnly && bStudyItem && score != "correct") ||  // study
						 (bReviewOnly && score != "correct")) // review
						numIncorrect++;		
					
					addDOMLeaf(xmlDoc, elemActivitySoundSpelling, "score", score);
					addDOMLeaf(xmlDoc, elemActivitySoundSpelling, "response_time", randomWithinRange(1000, 5000));
				}
				
				// success criteria short-hand
				var bRecallLevelComplete = ((numIncorrect == 0) || 
														  (!bReviewOnly && numIncorrect == 1 && (studyItems.length > 2 || recallLevel > 2)) || 
														  (bReviewOnly && numIncorrect == 1));   						
				elemRecallLevel.setAttribute("score", bRecallLevelComplete ? "pass" : "fail");
				
				// if they failed their 3rd attempt, that's all she wrote my friend
				if (bRecallLevelComplete == false && attempt == 3) {
					return xmlDoc;
				}
				// if they completed the recall level, try for another recall level
				else if (bRecallLevelComplete == true) {
					break;
				}
				// otherwise repeat the recall level
			}
		}
	}
	return xmlDoc;
} 

function generateLetterNameChallengeFakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
					
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
		
	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{		
		// start xml
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		var elemActivityLetters = addDOMBranch(xmlDoc, elemStudentData, "activity_letter_names");
		
		var elemResponseActivityLetters = responseXmlDoc.getElementsByTagName("activity_letter_name");
		for (var i = 0; i < elemResponseActivityLetters.length; i++)
		{
			var elemResponseActivityLetter = elemResponseActivityLetters[i];

			var letterType = elemResponseActivityLetter.getAttribute("type")
			var elemActivityLetter = addDOMBranchWithId(xmlDoc, elemActivityLetters, "activity_letter_name", elemResponseActivityLetter.getAttribute("id")) // roundtrip id
			elemActivityLetter.setAttribute("type", letterType);	// roundtrip type
			elemActivityLetter.setAttribute("order", i+1);
			
			var score = "correct"; // default
			if (contains(variation, "all_correct"))
				score = "correct";
			else if (contains(variation, "all_incorrect"))
				score = "incorrect";
			// override and go random
			else if (contains(variation, "random"))
			{
				var tokens = variation.split("_"); // pull apart variation for percentage
				var value = randomWithinRange(1,100);
				score = ((value < tokens[1]) ? "correct" : ((randomWithinRange(1,7)==1) ? "out_of_time": "incorrect"));
			}
			addDOMLeaf(xmlDoc, elemActivityLetter, "score", score);
			addDOMLeaf(xmlDoc, elemActivityLetter, "response_time", randomWithinRange(1000, 5000));
		}
	}
	return xmlDoc;
}
	
function generateLetterSoundIDFakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
					
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
		
	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{		
		// start by getting info about the sound spellings sent
		var studyItems = new Array();
		var reviewItems = new Array();

		var elemResponseActivitySoundSpellings = responseXmlDoc.getElementsByTagName("activity_sound_spelling");
		for (var i = 0; i < elemResponseActivitySoundSpellings.length; i++)
		{
			var elemResponseActivitySoundSpelling = elemResponseActivitySoundSpellings[i];
			var trial_type = elemResponseActivitySoundSpelling.getAttribute("type");
			if (trial_type == "study")
				studyItems.push(elemResponseActivitySoundSpelling);
			else
				reviewItems.push(elemResponseActivitySoundSpelling);
		}
		
		// special case: 0 study items
		var bReviewOnly = false;
		if (studyItems.length == 0)
			bReviewOnly = true;
		
		// special case: if 1 study item, treat it like 2
		if (studyItems.length == 1)
			studyItems.push(studyItems[0]);
		
		// setup presentation order based on # of study items
		var presentation;
		switch (studyItems.length)
		{
			case 0:
				presentation = ["RR", "RRRR", "RRRRR", "RRRRRRRR"];
				break;
			case 1:
				alert("should be treated like 2 study items");
				break;
			case 2:
				presentation = ["SS", "RSSR", "RSRSR", "RRSRRSRR"];
				break;
			case 3:
				presentation = ["SSS", "RSSRS", "RSRSRS", "RRSRRSRRS"];
				break;
			case 4:
				presentation = ["SSSS", "RSSRSS", "RSRSRSRS", "RRSRRSRRSRRS"];
				break;
			default:
				alert("unsupported number of study items");
				break;
		}
		
		// start xml
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		var elemRecallLevels = addDOMBranch(xmlDoc, elemStudentData, "recall_levels");
		
		// keep track of what review items we have used
		var reviewItemIndex = resetReviewItemIndex = 0;

		// walk 4 possible recall levels
		for (var recallLevel = 1; recallLevel <= 4; recallLevel++)
		{  				
			resetReviewItemIndex = reviewItemIndex;	// for later use
										
			// walk 3 possible attempts per recall level
			for (var attempt = 1; attempt <= 3; attempt++)
			{
				// reset if repeating a recall level, because we reuse same review words
				if (attempt > 1)
					reviewItemIndex = resetReviewItemIndex;
					
				var elemRecallLevel = addDOMBranchWithId(xmlDoc, elemRecallLevels, "recall_level", recallLevel);
				
				elemRecallLevel.setAttribute("attempt", attempt);
				
				var elemActivitySoundSpellings = addDOMBranch(xmlDoc, elemRecallLevel, "activity_sound_spellings");
				
				// walk presentation sequence
				var orderIndex = 1;
				var studyItemIndex = 0;

				// track scoring results
				var numIncorrect = 0;	

				for (var i = 0; i < presentation[recallLevel-1].length; i++)
				{
					var bStudyItem = (presentation[recallLevel-1].charAt(i) == 'S');
					
					if (bStudyItem) {
						var origItem = studyItems[studyItemIndex];
						studyItemIndex++;
					}		
					else {
						//TODO: out of review words, what to do??
						if (reviewItemIndex > reviewItems.length - 1)
							continue;
							
						var origItem = reviewItems[reviewItemIndex];
						reviewItemIndex++;
					}
					
					var elemActivitySoundSpelling = addDOMBranchWithId(xmlDoc, elemActivitySoundSpellings, 
							"activity_sound_spelling", origItem.getAttribute("id")) // roundtrip id
					elemActivitySoundSpelling.setAttribute("type", origItem.getAttribute("type"));	// roundtrip type
					elemActivitySoundSpelling.setAttribute("order", orderIndex);
					orderIndex++
					
					var score = "correct"; // default

					// override if all inaccurate (they will never get past recall level 1)
					if (variation == "all_inaccurate") {
						score = (randomWithinRange(1,7) == 1) ? "out_of_time" : "incorrect";	// weight out_of_time lightly
					}
					// override if first inaccurate only (but let them get past recall level 1 with just 2 study items)
					else if (variation == "first_inaccurate_only" && studyItemIndex == 1 && !(studyItems.length == 2 && recallLevel == 1)) {	
						score = (randomWithinRange(1,7) == 1)  ? "out_of_time" : "incorrect"; // weight out_of_time lightly
					}
					// override and go random
					else if (contains(variation, "random")) {
						var tokens = variation.split("_"); // pull apart variation for percentage
						var value = randomWithinRange(1,100);
						score = ((value < tokens[1]) ? "correct" : ((randomWithinRange(1,7)==1) ? "out_of_time": "incorrect"));
					}	
					
					// track count of incorrect items only
					if ((!bReviewOnly && bStudyItem && score != "correct") ||  // study
						 (bReviewOnly && score != "correct")) // review
						numIncorrect++;		
					
					addDOMLeaf(xmlDoc, elemActivitySoundSpelling, "score", score);
					addDOMLeaf(xmlDoc, elemActivitySoundSpelling, "response_time", randomWithinRange(1000, 5000));
				}
				
				// success criteria short-hand
				var bRecallLevelComplete = ((numIncorrect == 0) || 
														  (!bReviewOnly && numIncorrect == 1 && (studyItems.length > 2 || recallLevel > 2)) || 
														  (bReviewOnly && numIncorrect == 1));   						
				elemRecallLevel.setAttribute("score", bRecallLevelComplete ? "pass" : "fail");
				
				// if they failed their 3rd attempt, that's all she wrote my friend
				if (bRecallLevelComplete == false && attempt == 3) {
					return xmlDoc;
				}
				// if they completed the recall level, try for another recall level
				else if (bRecallLevelComplete == true) {
					break;
				}
				// otherwise repeat the recall level
			}
		}
	}
	return xmlDoc;
} 

function generateLetterSoundChallengeFakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
					
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
		
	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{		
		// start xml
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		var elemActivitySoundSpellings = addDOMBranch(xmlDoc, elemStudentData, "activity_sound_spellings");

		var elemResponseActivitySoundSpellings = responseXmlDoc.getElementsByTagName("activity_sound_spelling");
		for (var i = 0; i < elemResponseActivitySoundSpellings.length; i++)
		{
			var elemResponseActivitySoundSpelling = elemResponseActivitySoundSpellings[i];

			var elemActivitySoundSpelling = addDOMBranchWithId(xmlDoc, elemActivitySoundSpellings, "activity_sound_spelling", elemResponseActivitySoundSpelling.getAttribute("id")) // roundtrip id
			elemActivitySoundSpelling.setAttribute("type", elemResponseActivitySoundSpelling.getAttribute("type"));	// roundtrip type
			elemActivitySoundSpelling.setAttribute("order", i+1);
		
			var responseItem = elemResponseActivitySoundSpelling.getElementsByTagName("text")[0];
			var responseItemValue = responseItem.childNodes[0].nodeValue;
			
			var score = "correct"; // default
			if (contains(variation, "all_correct"))
				score = "correct";
			else if (contains(variation, "all_incorrect"))
				score = "incorrect";
			// override and go random
			else if (contains(variation, "random"))
			{
				var tokens = variation.split("_"); // pull apart variation for percentage
				var value = randomWithinRange(1,100);
				score = ((value < tokens[1]) ? "correct" : ((randomWithinRange(1,7)==1) ? "out_of_time": "incorrect"));
				
				if( score != "correct" )
				{
					// response item must have been a distractor
					var distractorItems = elemResponseActivitySoundSpelling.getElementsByTagName("distractor");
					var highestIdxAllowed = distractorItems.length - 1;
					var chosenDistractorIdx = randomWithinRange(0,highestIdxAllowed);
					var chosenDistractorValue = distractorItems[chosenDistractorIdx].childNodes[0].nodeValue;
					responseItemValue = chosenDistractorValue;
				}
			}	
					
			addDOMLeaf(xmlDoc, elemActivitySoundSpelling, "score", score);
			addDOMLeaf(xmlDoc, elemActivitySoundSpelling, "response_item", responseItemValue);
			addDOMLeaf(xmlDoc, elemActivitySoundSpelling, "response_time", randomWithinRange(1000, 5000));
		}
	}
	return xmlDoc;
}

function generatePARhymeFakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// contains any quit
	
	// pull useful data from response xml
	var elemResponseLevels = (responseXmlDoc.getElementsByTagName("levels"))[0].getElementsByTagName("level");		 	
	var startingLevel = elemResponseLevels[0].getAttribute("id");	// first level
	var endingLevel = elemResponseLevels[elemResponseLevels.length-1].getAttribute("id");	// last level
	var maxTrialsAllowed = parseInt(responseXmlDoc.getElementsByTagName("max_trials_allowed")[0].textContent);
	// success criteria
	var scoringSetMinCorrect = parseInt(responseXmlDoc.getElementsByTagName("scoring_set_min_correct")[0].textContent);
	var scoringSetSize = parseInt(responseXmlDoc.getElementsByTagName("scoring_set_size")[0].textContent);
		
	// determine quit trial
	var quitTrial = 0;
	if (variation == "quit_premature_below")
		quitTrial = randomWithinRange(1, scoringSetSize-1); // -1 to keep below size
	else if (variation == "quit_premature_above")
		quitTrial = randomWithinRange(scoringSetSize, maxTrialsAllowed);
		
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);

	var numTrialsTotal = 0;
	var bReachedMaxTrials = false;
	var bPrematureQuit = false;
	
	// start xml
	var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
	var elemLevels =  addDOMBranch(xmlDoc, elemStudentData, "levels");
		
	for (var level = startingLevel; level <= endingLevel && !bReachedMaxTrials && !bPrematureQuit; level++)
	{
		var elemActivityLevel = addDOMBranchWithId(xmlDoc, elemLevels, "level", level)
		var elemActivityWords = addDOMBranch(xmlDoc, elemActivityLevel, "activity_words");

		// bail with 0 trials partial data
		if (variation == "quit_premature_0_trials") {
			elemActivityLevel.setAttribute("score", "fail");
			elemActivityLevel.setAttribute("complete_flag", "false");				
			break;
		}
		
		var numCorrectThisLevel = 0;
		var numTrialsThisLevel = 0;
		var bLevelPassed = false;
		var scores = new Array(maxTrialsAllowed);
		
		// get activity words within the level
		var elemResponseActivityWords = elemResponseLevels[level - startingLevel].getElementsByTagName("activity_word");
		for (var i = 0; i < elemResponseActivityWords.length && !bReachedMaxTrials && !bLevelPassed && !bPrematureQuit; i++)
		{
			var elemResponseActivityWord = elemResponseActivityWords[i];

			var elemActivityWord = addDOMBranchWithId(xmlDoc, elemActivityWords, "activity_word", elemResponseActivityWord.getAttribute("id")) // roundtrip id
			elemActivityWord.setAttribute("order", i+1);
			
			var score = "incorrect"; // default
			if (contains(variation, "all_correct"))
				score = "correct";
			else if (contains(variation, "all_incorrect"))
				score = "incorrect";
			else if (contains(variation, "random"))
				score = (randomWithinRange(0,1)==1) ? "correct" : "incorrect";
			else if (contains(variation, "quit_premature"))
				bPrematureQuit = ((i+1) == quitTrial); // when quit trial hit, bail out
			
			addDOMLeaf(xmlDoc, elemActivityWord, "score", score);
			 
			// number correct within level				
			if (score == "correct")
				numCorrectThisLevel++;
			
			// number administered within level
			numTrialsThisLevel++;
			
			// number administered ever
			numTrialsTotal++;
							
			// keep running list of scores so we can look back over scoring set size
			scores[i] = (score == "correct") ? 1 : 0;
			
			// if reached scoring set size, then evaluate success criteria
			var numCorrectInSet = 0;
			if (numTrialsThisLevel >= scoringSetSize)
			{
				for (var j=0; j < scoringSetSize; j++) // tally correct scores across the set size
					numCorrectInSet += scores[i - j];
				
				// bail from level if they met success criteria
				bLevelPassed = (numCorrectInSet >= scoringSetMinCorrect);
			}

			// bail from activity if they maxed out trials (after reaching scoring set size)
			bReachedMaxTrials = (numTrialsThisLevel >= scoringSetSize) && // reached scoring set size and
											(numTrialsTotal >= maxTrialsAllowed); // reached max trials
		}

		elemActivityLevel.setAttribute("score", (bLevelPassed ? "pass" : "fail"));
		elemActivityLevel.setAttribute("complete_flag", (bLevelPassed || bReachedMaxTrials) ? "true" : "false");
	}

	return xmlDoc;
} 	


function generatePASyllableCountingFakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// contains any quit
	
	// pull useful data from response xml
	var elemResponseLevels = (responseXmlDoc.getElementsByTagName("levels"))[0].getElementsByTagName("level");		 	
	var startingLevel = elemResponseLevels[0].getAttribute("id");	// first level
	var endingLevel = elemResponseLevels[elemResponseLevels.length-1].getAttribute("id");	// last level
	var maxTrialsAllowed = parseInt(responseXmlDoc.getElementsByTagName("max_trials_allowed")[0].textContent);
	// success criteria
	var scoringSetMinCorrect = parseInt(responseXmlDoc.getElementsByTagName("scoring_set_min_correct")[0].textContent);
	var scoringSetSize = parseInt(responseXmlDoc.getElementsByTagName("scoring_set_size")[0].textContent);
		
	// determine quit trial
	var quitTrial = 0;
	if (variation == "quit_premature_below")
		quitTrial = randomWithinRange(1, scoringSetSize-1); // -1 to keep below size
	else if (variation == "quit_premature_above")
		quitTrial = randomWithinRange(scoringSetSize, maxTrialsAllowed);
		
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);

	var numTrialsTotal = 0;
	var bReachedMaxTrials = false;
	var bPrematureQuit = false;
	
	// start xml
	var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
	var elemLevels =  addDOMBranch(xmlDoc, elemStudentData, "levels");
		
	for (var level = startingLevel; level <= endingLevel && !bReachedMaxTrials && !bPrematureQuit; level++)
	{
		var elemActivityLevel = addDOMBranchWithId(xmlDoc, elemLevels, "level", level)
		var elemActivityWords = addDOMBranch(xmlDoc, elemActivityLevel, "activity_words");

		// bail with 0 trials partial data
		if (variation == "quit_premature_0_trials") {
			elemActivityLevel.setAttribute("score", "fail");
			elemActivityLevel.setAttribute("complete_flag", "false");
			break;
		}
		
		var numCorrectThisLevel = 0;
		var numTrialsThisLevel = 0;
		var bLevelPassed = false;
		var scores = new Array(maxTrialsAllowed);
		
		// get activity words within the level
		var elemResponseActivityWords = elemResponseLevels[level - startingLevel].getElementsByTagName("activity_word");
		for (var i = 0; i < elemResponseActivityWords.length && !bReachedMaxTrials && !bLevelPassed && !bPrematureQuit; i++)
		{
			var elemResponseActivityWord = elemResponseActivityWords[i];

			var elemActivityWord = addDOMBranchWithId(xmlDoc, elemActivityWords, "activity_word", elemResponseActivityWord.getAttribute("id")) // roundtrip id
			elemActivityWord.setAttribute("order", i+1);
			
			var score = "incorrect"; // default
			if (contains(variation, "all_correct"))
				score = "correct";
			else if (contains(variation, "all_incorrect"))
				score = "incorrect";
			else if (contains(variation, "random"))
				score = (randomWithinRange(0,1)==1) ? "correct" : "incorrect";
			else if (contains(variation, "quit_premature"))
				bPrematureQuit = ((i+1) == quitTrial); // when quit trial hit, bail out
			
			addDOMLeaf(xmlDoc, elemActivityWord, "score", score);
			 
			// number correct within level				
			if (score == "correct")
				numCorrectThisLevel++;
			
			// number administered within level
			numTrialsThisLevel++;
			
			// number administered ever
			numTrialsTotal++;
							
			// keep running list of scores so we can look back over scoring set size
			scores[i] = (score == "correct") ? 1 : 0;
			
			// if reached scoring set size, then evaluate success criteria
			var numCorrectInSet = 0;
			if (numTrialsThisLevel >= scoringSetSize)
			{
				for (var j=0; j < scoringSetSize; j++) // tally correct scores across the set size
					numCorrectInSet += scores[i - j];
				
				// bail from level if they met success criteria
				bLevelPassed = (numCorrectInSet >= scoringSetMinCorrect);
			}

			// bail from activity if they maxed out trials (after reaching scoring set size)
			bReachedMaxTrials = (numTrialsThisLevel >= scoringSetSize) && // reached scoring set size and
											(numTrialsTotal >= maxTrialsAllowed); // reached max trials
		}

		elemActivityLevel.setAttribute("score", (bLevelPassed ? "pass" : "fail"));
		elemActivityLevel.setAttribute("complete_flag", (bLevelPassed || bReachedMaxTrials) ? "true" : "false");
	}

	return xmlDoc;
} 	

function generatePASyllableBlendingFakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// contains any quit
	
	// pull useful data from response xml
	var elemResponseLevels = (responseXmlDoc.getElementsByTagName("levels"))[0].getElementsByTagName("level");		 	
	var startingLevel = elemResponseLevels[0].getAttribute("id");	// first level
	var endingLevel = elemResponseLevels[elemResponseLevels.length-1].getAttribute("id");	// last level
	var maxTrialsAllowed = parseInt(responseXmlDoc.getElementsByTagName("max_trials_allowed")[0].textContent);
	// success criteria
	var scoringSetMinCorrect = parseInt(responseXmlDoc.getElementsByTagName("scoring_set_min_correct")[0].textContent);
	var scoringSetSize = parseInt(responseXmlDoc.getElementsByTagName("scoring_set_size")[0].textContent);
		
	// determine quit trial
	var quitTrial = 0;
	if (variation == "quit_premature_below")
		quitTrial = randomWithinRange(1, scoringSetSize-1); // -1 to keep below size
	else if (variation == "quit_premature_above")
		quitTrial = randomWithinRange(scoringSetSize, maxTrialsAllowed);
		
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);

	var numTrialsTotal = 0;
	var bReachedMaxTrials = false;
	var bPrematureQuit = false;
	
	// start xml
	var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
	var elemLevels =  addDOMBranch(xmlDoc, elemStudentData, "levels");
		
	for (var level = startingLevel; level <= endingLevel && !bReachedMaxTrials && !bPrematureQuit; level++)
	{
		var elemActivityLevel = addDOMBranchWithId(xmlDoc, elemLevels, "level", level)
		var elemActivityWords = addDOMBranch(xmlDoc, elemActivityLevel, "activity_words");

		// bail with 0 trials partial data
		if (variation == "quit_premature_0_trials") {
			elemActivityLevel.setAttribute("score", "fail");
			elemActivityLevel.setAttribute("complete_flag", "false");				
			break;
		}
		
		var numCorrectThisLevel = 0;
		var numTrialsThisLevel = 0;
		var bLevelPassed = false;
		var scores = new Array(maxTrialsAllowed);
		
		// get activity words within the level
		var elemResponseActivityWords = elemResponseLevels[level - startingLevel].getElementsByTagName("activity_word");
		for (var i = 0; i < elemResponseActivityWords.length && !bReachedMaxTrials && !bLevelPassed && !bPrematureQuit; i++)
		{
			var elemResponseActivityWord = elemResponseActivityWords[i];

			var elemActivityWord = addDOMBranchWithId(xmlDoc, elemActivityWords, "activity_word", elemResponseActivityWord.getAttribute("id")) // roundtrip id
			elemActivityWord.setAttribute("order", i+1);
			
			var score = "incorrect"; // default
			if (contains(variation, "all_correct"))
				score = "correct";
			else if (contains(variation, "all_incorrect"))
				score = "incorrect";
			else if (contains(variation, "random"))
				score = (randomWithinRange(0,1)==1) ? "correct" : "incorrect";
			else if (contains(variation, "quit_premature"))
				bPrematureQuit = ((i+1) == quitTrial); // when quit trial hit, bail out
			
			addDOMLeaf(xmlDoc, elemActivityWord, "score", score);
			 
			// number correct within level				
			if (score == "correct")
				numCorrectThisLevel++;
			
			// number administered within level
			numTrialsThisLevel++;
			
			// number administered ever
			numTrialsTotal++;
							
			// keep running list of scores so we can look back over scoring set size
			scores[i] = (score == "correct") ? 1 : 0;
			
			// if reached scoring set size, then evaluate success criteria
			var numCorrectInSet = 0;
			if (numTrialsThisLevel >= scoringSetSize)
			{
				for (var j=0; j < scoringSetSize; j++) // tally correct scores across the set size
					numCorrectInSet += scores[i - j];
				
				// bail from level if they met success criteria
				bLevelPassed = (numCorrectInSet >= scoringSetMinCorrect);
			}

			// bail from activity if they maxed out trials (after reaching scoring set size)
			bReachedMaxTrials = (numTrialsThisLevel >= scoringSetSize) && // reached scoring set size and
											(numTrialsTotal >= maxTrialsAllowed); // reached max trials
		}

		elemActivityLevel.setAttribute("score", (bLevelPassed ? "pass" : "fail"));
		elemActivityLevel.setAttribute("complete_flag", (bLevelPassed || bReachedMaxTrials) ? "true" : "false");
	}

	return xmlDoc;
} 	
	
function generateReadThinkFakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
					
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
		
	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{	
		// start output xml
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		var elemTrials = addDOMBranch(xmlDoc, elemStudentData, "trials");
		
		// parse response xml
		var elemResponseTrials = responseXmlDoc.getElementsByTagName("trials");

		var elemResponseTrialList = elemResponseTrials[0].getElementsByTagName("trial");
		for (var s = 0; s < elemResponseTrialList.length; s++)
		{
			var elemResponseTrial = elemResponseTrialList[s];
			
			var elemTrial = addDOMBranchWithId(xmlDoc, elemTrials, "trial", elemResponseTrial.getAttribute("id")) // roundtrip id

			var bIsCorrect = true;
			if (contains(variation, "all_correct"))
				bIsCorrect = true;
			else if (contains(variation, "all_incorrect"))
				bIsCorrect = false;
			// override and go random
			else if (contains(variation, "random"))
			{
				var tokens = variation.split("_"); // pull apart variation for percentage
				var value = randomWithinRange(1,100);
				// need to skip one more token if 'quit_' is the prefix
				var tokenIdx = bQuit ? 2 : 1;
				bIsCorrect = value < tokens[tokenIdx];
			}
			
			var nAttempts = 1;
			// if incorrect randomly pick number of attempts
			if (bIsCorrect == false)
				nAttempts = randomWithinRange(2,3);
			
			addDOMLeaf(xmlDoc, elemTrial, "attempts_till_correct", nAttempts);
			addDOMLeaf(xmlDoc, elemTrial, "response_time", randomWithinRange(1000, 5000));	
		} 		
	}

	return xmlDoc;
}

function generateWordMeaningMatchFakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
					
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
		
	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{	
		// start output xml
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		var elemTrials = addDOMBranch(xmlDoc, elemStudentData, "trials");
		
		// parse response xml
		var elemResponseTrials = responseXmlDoc.getElementsByTagName("trials");

		var elemResponseTrialList = elemResponseTrials[0].getElementsByTagName("trial");
		for (var s = 0; s < elemResponseTrialList.length; s++)
		{
			var elemResponseTrial = elemResponseTrialList[s];
			
			var elemTrial = addDOMBranchWithId(xmlDoc, elemTrials, "trial", elemResponseTrial.getAttribute("id")) // roundtrip id

			var bIsCorrect = true;
			if (contains(variation, "all_correct"))
				bIsCorrect = true;
			else if (contains(variation, "all_incorrect"))
				bIsCorrect = false;
			// override and go random
			else if (contains(variation, "random"))
			{
				var tokens = variation.split("_"); // pull apart variation for percentage
				var value = randomWithinRange(1,100);
				// need to skip one more token if 'quit_' is the prefix
				var tokenIdx = bQuit ? 2 : 1;
				bIsCorrect = value < tokens[tokenIdx];
			}
			
			addDOMLeaf(xmlDoc, elemTrial, "correct_on_first_attempt", bIsCorrect);
			addDOMLeaf(xmlDoc, elemTrial, "response_time", randomWithinRange(1000, 5000));	
		} 		
	}

	return xmlDoc;
}

function generateSpellingCheckUpFakeData(responseXmlDoc, activity, variation)
{	
var bQuit = contains(variation, "quit"); // contains any quit
		var bPrematureQuit = contains(variation, "quit_premature");	// premature "partial data" quit		
		
		// activity root
		var xmlDoc = createRootDOM(activity);
		var elemActivity = xmlDoc.documentElement;
				
		// standard timing block
		appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);

		if (!bPrematureQuit)	// no student data for "no partial data" activity
		{	
			// start output xml
	 		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
			var elemActivityWords = addDOMBranch(xmlDoc, elemStudentData, "activity_words");
			
			// iterate all activity words and fake a response to each
			var elemResponseActivityWords = responseXmlDoc.getElementsByTagName("activity_word");
			for (var j = 0; j < elemResponseActivityWords.length; j++)
			{
				var elemResponseActivityWord = elemResponseActivityWords[j];
				
				var elemActivityWord = addDOMBranchWithId(xmlDoc, elemActivityWords, "activity_word", elemResponseActivityWord.getAttribute("id")) // roundtrip id
				elemActivityWord.setAttribute("order", elemResponseActivityWord.getAttribute("order"));	// roundtrip order
			
				// fake score based on variation
					var score = "incorrect"; // default
				if (contains(variation, "all_correct"))
					score = "correct";
				else if (contains(variation, "all_incorrect"))
					score = "incorrect";
				else if (contains(variation, "random"))
					score = (randomWithinRange(0,1)==1) ? "correct" : "incorrect";
	
	 			addDOMLeaf(xmlDoc, elemActivityWord, "score", score);
				addDOMLeaf(xmlDoc, elemActivityWord, "response_time", randomWithinRange(1000, 5000));
			}
		}
		
		return xmlDoc;
}

function generateWordIDFakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
					
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
		
	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{		
		// start by getting info about the sound spellings sent
		var studyItems = new Array();
		var reviewItems = new Array();

		var elemResponseActivityWords = responseXmlDoc.getElementsByTagName("activity_word");
		for (var i = 0; i < elemResponseActivityWords.length; i++)
		{
			var elemResponseActivityWord = elemResponseActivityWords[i];
			var trial_type = elemResponseActivityWord.getAttribute("type");
			if (trial_type == "study")
				studyItems.push(elemResponseActivityWord);
			else
				reviewItems.push(elemResponseActivityWord);
		}
		
		// special case: 0 study items
		var bStudyOnly = false;
		if (reviewItems.length == 0)
			bStudyOnly = true;
		
		// setup presentation order based on # of study items
		var presentation;
		switch (studyItems.length)
		{
			case 12: // 3 study words times 4 recall levels
				presentation = ["SSS", "RSSRS", "RSRSRS", "RRSRRSRRS"];
				break;
			case 16: // otherwise 16 recall levels
				presentation = ["SSSS", "RSSRSS", "RSRSRSRS", "RRSRRSRRSRRS"];
				break;
			default:
				alert("unsupported number of study items");
				break;
		}

		// start xml
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		var elemRecallLevels = addDOMBranch(xmlDoc, elemStudentData, "recall_levels");
		
		// keep track of what items we have used
		var studyItemIndex = resetStudyItemIndex = 0;
		var reviewItemIndex = resetReviewItemIndex = 0;
		
		// walk 4 possible recall levels
		for (var recallLevel = 1; recallLevel <= 4; recallLevel++)
		{  				
			resetStudyItemIndex = studyItemIndex;		// for later use
			resetReviewItemIndex = reviewItemIndex;	// for later use
										
			// walk 3 possible attempts per recall level
			for (var attempt = 1; attempt <= 3; attempt++)
			{
				var isFirstStudyItem = true;
				
				// reset if repeating a recall level, because we reuse same review words
				if (attempt > 1)
				{
					studyItemIndex = resetStudyItemIndex;
					reviewItemIndex = resetReviewItemIndex;
				}
					
				var elemRecallLevel = addDOMBranchWithId(xmlDoc, elemRecallLevels, "recall_level", recallLevel);
				elemRecallLevel.setAttribute("attempt", attempt);
				var elemActivityWords = addDOMBranch(xmlDoc, elemRecallLevel, "activity_words");
				
				// walk presentation sequence
				var orderIndex = 1;

				// track scoring results
				var numIncorrect = 0;	

				for (var i = 0; i < presentation[recallLevel-1].length; i++)
				{
					var bStudyItem = (presentation[recallLevel-1].charAt(i) == 'S');
					
					if (bStudyItem) {
						var origItem = studyItems[studyItemIndex];
						studyItemIndex++;
					}		
					else {
						//TODO: out of review words, what to do??
						if (reviewItemIndex > reviewItems.length - 1)
							continue;
							
						var origItem = reviewItems[reviewItemIndex];
						reviewItemIndex++;
					}
					
					var elemActivityWord = addDOMBranchWithId(xmlDoc, elemActivityWords, 
							"activity_word", origItem.getAttribute("id")) // roundtrip id
					elemActivityWord.setAttribute("type", origItem.getAttribute("type"));	// roundtrip type
					elemActivityWord.setAttribute("order", orderIndex);
					orderIndex++
					
					var score = "correct"; // default

					// override if all inaccurate (they will never get past recall level 1)
					if (contains(variation,"all_inaccurate")) {
						score = "incorrect";
					}
					// override if first inaccurate only (but let them get past recall level 1 with just 2 study items)
					else if (contains(variation,"first_inaccurate_only") && isFirstStudyItem == true) {	
						score = "incorrect";
					}
					// override and go random
					else if (contains(variation, "random")) {
						var tokens = variation.split("_"); // pull apart variation for percentage
						var value = randomWithinRange(1,100);
						score = ((value < tokens[1]) ? "correct" : "incorrect");
					}	
					
					// track count of incorrect items only
					if ((bStudyOnly && bStudyItem && score != "correct") ||  // study
						 (!bStudyOnly && score != "correct")) // review
						numIncorrect++;		
					
					addDOMLeaf(xmlDoc, elemActivityWord, "score", score);
					addDOMLeaf(xmlDoc, elemActivityWord, "response_time", randomWithinRange(1000, 5000));
					
					isFirstStudyItem = false;
				}
				
				// success criteria short-hand
				var bRecallLevelComplete = ((numIncorrect == 0) || 
														  (bStudyOnly && numIncorrect == 1 && (studyItems.length > 2 || recallLevel > 2)) || 
														  (!bStudyOnly && numIncorrect == 1));   						
				elemRecallLevel.setAttribute("score", bRecallLevelComplete ? "pass" : "fail");
				
				// if they failed their 3rd attempt, that's all she wrote my friend
				if (bRecallLevelComplete == false && attempt == 3) {
					return xmlDoc;
				}
				// if they completed the recall level, try for another recall level
				else if (bRecallLevelComplete == true) {
					break;
				}
				// otherwise repeat the recall level
			}
		}
	}
	return xmlDoc;
} 

function generateWordID_SW_FakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
					
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
		
	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{		
		// start by getting info about the sound spellings sent
		var studyItems = new Array();
		var reviewItems = new Array();

		var elemResponseActivityWords = responseXmlDoc.getElementsByTagName("activity_word");
		for (var i = 0; i < elemResponseActivityWords.length; i++)
		{
			var elemResponseActivityWord = elemResponseActivityWords[i];
			var trial_type = elemResponseActivityWord.getAttribute("type");
			if (trial_type == "study")
				studyItems.push(elemResponseActivityWord);
			else
				reviewItems.push(elemResponseActivityWord);
		}
		
		// special case: 0 study items
		var bStudyOnly = false;
		if (reviewItems.length == 0)
			bStudyOnly = true;
		
		// setup presentation order based on # of study items
		var presentation;
		switch (studyItems.length)
		{
			case 8: // 2 study words times 4 recall levels
				presentation = ["SS", "RSSR", "RSRSR", "RRSRRSRR"];
				break;
			case 16: // otherwise 16 recall levels
				presentation = ["SSSS", "RSSRSS", "RSRSRSRS", "RRSRRSRRSRRS"];
				break;
			default:
				alert("unsupported number of study items");
				break;
		}

		// start xml
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		var elemRecallLevels = addDOMBranch(xmlDoc, elemStudentData, "recall_levels");
		
		// keep track of what items we have used
		var studyItemIndex = resetStudyItemIndex = 0;
		var reviewItemIndex = resetReviewItemIndex = 0;

		// walk 4 possible recall levels
		for (var recallLevel = 1; recallLevel <= 4; recallLevel++)
		{  				
			resetStudyItemIndex = studyItemIndex;		// for later use
			resetReviewItemIndex = reviewItemIndex;	// for later use
										
			// walk 3 possible attempts per recall level
			for (var attempt = 1; attempt <= 3; attempt++)
			{
				var isFirstStudyItem = true;
				
				// reset if repeating a recall level, because we reuse same review words
				if (attempt > 1)
				{
					studyItemIndex = resetStudyItemIndex;
					reviewItemIndex = resetReviewItemIndex;
				}
					
				var elemRecallLevel = addDOMBranchWithId(xmlDoc, elemRecallLevels, "recall_level", recallLevel);
				elemRecallLevel.setAttribute("attempt", attempt);
				var elemActivityWords = addDOMBranch(xmlDoc, elemRecallLevel, "activity_words");
				
				// walk presentation sequence
				var orderIndex = 1;

				// track scoring results
				var numIncorrect = 0;	

				for (var i = 0; i < presentation[recallLevel-1].length; i++)
				{
					var bStudyItem = (presentation[recallLevel-1].charAt(i) == 'S');
					
					if (bStudyItem) {
						var origItem = studyItems[studyItemIndex];
						studyItemIndex++;
					}		
					else {
						//TODO: out of review words, what to do??
						if (reviewItemIndex > reviewItems.length - 1)
							continue;
							
						var origItem = reviewItems[reviewItemIndex];
						reviewItemIndex++;
					}
					
					var elemActivityWord = addDOMBranchWithId(xmlDoc, elemActivityWords, 
							"activity_word", origItem.getAttribute("id")) // roundtrip id
					elemActivityWord.setAttribute("type", origItem.getAttribute("type"));	// roundtrip type
					elemActivityWord.setAttribute("order", orderIndex);
					orderIndex++
					
					var score = "correct"; // default

					// override if all inaccurate (they will never get past recall level 1)
					if (contains(variation,"all_inaccurate")) {
						score = "incorrect";
					}
					// override if first inaccurate only (but let them get past recall level 1 with just 2 study items)
					else if (contains(variation,"first_inaccurate_only") && isFirstStudyItem == true) {	
						score = "incorrect";
					}
					// override and go random
					else if (contains(variation, "random")) {
						var tokens = variation.split("_"); // pull apart variation for percentage
						var value = randomWithinRange(1,100);
						score = ((value < tokens[1]) ? "correct" : "incorrect");
					}	
					
					// track count of incorrect items only
					if ((bStudyOnly && bStudyItem && score != "correct") ||  // study
						 (!bStudyOnly && score != "correct")) // review
						numIncorrect++;		
					
					addDOMLeaf(xmlDoc, elemActivityWord, "score", score);
					addDOMLeaf(xmlDoc, elemActivityWord, "response_time", randomWithinRange(1000, 5000));
					
					isFirstStudyItem = false;
				}
				
				// success criteria short-hand
				var bRecallLevelComplete = ((numIncorrect == 0) || 
														  (bStudyOnly && numIncorrect == 1 && (studyItems.length > 2 || recallLevel > 2)) || 
														  (!bStudyOnly && numIncorrect == 1));   						
				elemRecallLevel.setAttribute("score", bRecallLevelComplete ? "pass" : "fail");
				
				// if they failed their 3rd attempt, that's all she wrote my friend
				if (bRecallLevelComplete == false && attempt == 3) {
					return xmlDoc;
				}
				// if they completed the recall level, try for another recall level
				else if (bRecallLevelComplete == true) {
					break;
				}
				// otherwise repeat the recall level
			}
		}
	}
	return xmlDoc;
} 

function generateWordChallengeFakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
					
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
		
	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{		
		// start xml
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		var elemActivityWords = addDOMBranch(xmlDoc, elemStudentData, "activity_words");

		var studyItemThreshold = parseInt(responseXmlDoc.getElementsByTagName("study_item_threshold")[0].textContent);
		var overallItemThreshold = parseInt(responseXmlDoc.getElementsByTagName("overall_item_threshold")[0].textContent);

		var studyAttempts = 0;
		var studyCorrect = 0;
		var overallAttempts = 0;
		var overallCorrect = 0;
		
		var elemResponseActivityWords = responseXmlDoc.getElementsByTagName("activity_word");
		for (var i = 0; i < elemResponseActivityWords.length; i++)
		{
			var elemResponseActivityWord = elemResponseActivityWords[i];

			var wordType = elemResponseActivityWord.getAttribute("type")
			var elemActivityWord = addDOMBranchWithId(xmlDoc, elemActivityWords, "activity_word", elemResponseActivityWord.getAttribute("id")) // roundtrip id
			elemActivityWord.setAttribute("type", wordType);	// roundtrip type
			elemActivityWord.setAttribute("order", i+1);
		
			var responseItem = elemResponseActivityWord.getElementsByTagName("text")[0];
			var responseItemValue = responseItem.childNodes[0].nodeValue;
			
			var score = "correct"; // default
			if (contains(variation, "all_correct"))
				score = "correct";
			else if (contains(variation, "all_incorrect"))
				score = "incorrect";
			// override and go random
			else if (contains(variation, "random"))
			{
				var tokens = variation.split("_"); // pull apart variation for percentage
				var value = randomWithinRange(1,100);
				score = ((value < tokens[1]) ? "correct" : ((randomWithinRange(1,7)==1) ? "out_of_time": "incorrect"));
				
				if( score != "correct" )
				{
					// response item must have been a distractor
					var distractorItems = elemResponseActivityWord.getElementsByTagName("distractor");
					var highestIdxAllowed = distractorItems.length - 1;
					var chosenDistractorIdx = randomWithinRange(0,highestIdxAllowed);
					var chosenDistractorValue = distractorItems[chosenDistractorIdx].childNodes[0].nodeValue;
					responseItemValue = chosenDistractorValue;
				}
			}	
			overallAttempts++;
			overallCorrect = score == "correct" ? overallCorrect+1 : overallCorrect;
			
			if ( wordType == "study")
			{
				studyAttempts++;
				studyCorrect = score == "correct" ? studyCorrect+1 : studyCorrect;
			}
					
			addDOMLeaf(xmlDoc, elemActivityWord, "score", score);
			addDOMLeaf(xmlDoc, elemActivityWord, "response_time", randomWithinRange(1000, 5000));
		}
		var studyPercentage = studyAttempts != 0 ? (studyCorrect*100)/studyAttempts : 0;
		var overallPercentage = overallAttempts != 0 ? (overallCorrect*100)/overallAttempts : 0;
		
		studyPercentage = Math.round(studyPercentage);
		overallPercentage = Math.round(overallPercentage);
		
		var passed = studyPercentage >= studyItemThreshold;
		
		addDOMLeaf(xmlDoc, elemStudentData, "study_item_score", studyPercentage );
		addDOMLeaf(xmlDoc, elemStudentData, "overall_item_score", overallPercentage );
		addDOMLeaf(xmlDoc, elemStudentData, "final_score", passed ? "pass" : "fail" );
	}
	return xmlDoc;
}

function generateWordSplitterFakeData(responseXmlDoc, activity, variation)
{	
	var bQuit = contains(variation, "quit");	// any quit
	var bPrematureQuit = contains(variation, "quit_premature");	// premature "no partial data" quit
					
	// activity root
	var xmlDoc = createRootDOM(activity);
	var elemActivity = xmlDoc.documentElement;
	
	// standard timing block
	appendStandardTimingBlock(xmlDoc, elemActivity, bQuit);
		
	if (!bPrematureQuit)	// no student data for "no partial data" activity
	{	
		// start xml
		var elemStudentData = addDOMBranch(xmlDoc, elemActivity, "student_data");
		var elemAvailPeriods = responseXmlDoc.getElementsByTagName("available_periods");
		var elemActivityWords = addDOMBranch(xmlDoc, elemStudentData, "activity_words");

		var periods = new Array();
		periods[periods.length] = new WS_Period("look", false, true);
		periods[periods.length] = new WS_Period("spot", false, true);
		periods[periods.length] = new WS_Period("split", false, true);
		periods[periods.length] = new WS_Period("read", false, false);

		var elemResponsePeriods = elemAvailPeriods[0].getElementsByTagName("period");
		for (var s = 0; s < elemResponsePeriods.length; s++)
		{
			var elemResponsePeriod = elemResponsePeriods[s];
			var periodId = elemResponsePeriod.getAttribute("id");
			var periodIsAvail = contains(elemResponsePeriod.childNodes[0].nodeValue, "true");
			
			for (var p=0; p<periods.length;p++)
			{
				if(periods[p].name == periodId)
				{
					periods[p].avail = periodIsAvail;
					break;
				}
			}
		}
		
		var elemResponseActivityWords = responseXmlDoc.getElementsByTagName("activity_word");
		for (var i = 0; i < elemResponseActivityWords.length; i++)
		{
			var elemResponseActivityWord = elemResponseActivityWords[i];

			var elemActivityWord = addDOMBranchWithId(xmlDoc, elemActivityWords, "activity_word", elemResponseActivityWord.getAttribute("id")) // roundtrip id
			var elemPeriodErrorsOccurred = addDOMBranch(xmlDoc, elemActivityWord, "period_errors_occurred");
			
			for (var p=0; p<periods.length;p++)
			{
				if (periods[p].avail && periods[p].isScored)
				{
					var bIsCorrect = true;
					if (contains(variation, "all_correct"))
						bIsCorrect = true;
					else if (contains(variation, "all_incorrect"))
						bIsCorrect = false;
					// override and go random
					else if (contains(variation, "random"))
					{
						var tokens = variation.split("_"); // pull apart variation for percentage
						var value = randomWithinRange(1,100);
						// need to skip one more token if 'quit_' is the prefix
						var tokenIdx = bQuit ? 2 : 1;
						bIsCorrect = value < tokens[tokenIdx];
					}
					addDOMLeafWithId(xmlDoc, elemPeriodErrorsOccurred, "period", bIsCorrect ? "false" : "true", periods[p].name);
				}
			}
		}			
	}

	return xmlDoc;
}

function WS_Period(name, avail, isScored)
{
	this.name=name;
	this.avail=avail;
	this.isScored=isScored;
}

	
	
	// object to hold generated timing info
function TimingInfo(startTime, endTime, trackedTime)
{
	this.startTime = startTime;
	this.endTime = endTime;
	this.trackedTime = trackedTime;
}

function generatePseudoTimingInfo()
{
	var d = new Date();

	// format: 12/12/2009 04:32:00
	var startTime =
	(d.getMonth() < 11 ? '0' : '') + (d.getMonth() + 1) + "/" +
	(d.getDate() < 10 ? '0' : '') + d.getDate() + "/" +
	(d.getFullYear()) + " " +
	(d.getHours() < 10 ? '0' : '') + d.getHours() + ":" +
	(d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ":" +
	(d.getSeconds() < 10 ? '0' : '') + d.getSeconds();

	var endTime =
	(d.getMonth() < 11 ? '0' : '') + (d.getMonth() + 1) + "/" +
	(d.getDate() < 10 ? '0' : '') + d.getDate() + "/" +
	(d.getFullYear()) + " " +
	(d.getHours() < 10 ? '0' : '') + d.getHours() + ":" +
	(d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ":" +
	(d.getSeconds() < 10 ? '0' : '') + (d.getSeconds() + 1);

	return new TimingInfo(startTime, endTime, 1000); 
}

function appendStandardTimingBlock(xmlDoc, parent, bPrematureQuit)
{
	var elemActivityData = addDOMBranch(xmlDoc, parent, "activity_data")

	var timingInfo = generatePseudoTimingInfo();
	addDOMLeaf(xmlDoc, elemActivityData, "start_time", timingInfo.startTime);
	addDOMLeaf(xmlDoc, elemActivityData, "end_time", timingInfo.endTime);
	addDOMLeaf(xmlDoc, elemActivityData, "tracked_time", timingInfo.trackedTime);
	addDOMLeaf(xmlDoc, elemActivityData, "user_directed_navigation", (bPrematureQuit == true) ? "quit" : "");
}
/*****************************************************************************************************/
	////////////////////////////////////////////////////////////
	// Response XML helpers
	////////////////////////////////////////////////////////////	
/*****************************************************************************************************/	
// determine if results of login validate (by checking for login_results tag)
function isLoginValidateResponse(xmlDoc)
{
	var elemLoginResults = xmlDoc.getElementsByTagName("login_results")[0];
	return (typeof elemLoginResults != "undefined");
}

// determine if results of getAtomData (by checking for activity_data tag)
function isGetActivityDataResponse(xmlDoc)
{
	var elemActivityData = xmlDoc.getElementsByTagName("activity_data")[0];
	return (typeof elemActivityData != "undefined");
}

// determine if results of getAtomData (by checking for save_activity_results tag)
function isSaveActivityResultsResponse(xmlDoc)
{
	var elemActivityData = xmlDoc.getElementsByTagName("save_activity_results")[0];
	return (typeof elemActivityData != "undefined");
}

// determine if results of getAtomData (by checking for save_activity_results tag)
function isLogoutResponse(xmlDoc)
{
	var elemActivityData = xmlDoc.getElementsByTagName("logout_results")[0];
	return (typeof elemActivityData != "undefined");
}

// determine if results of getAtomData (by checking for spelling_corrective_feedback tag)
function isGetSpellingCorrectiveFeedbackResponse(xmlDoc)
{
	var elemActivityData = xmlDoc.getElementsByTagName("spelling_corrective_feedback")[0];
	return (typeof elemActivityData != "undefined");
}

// yank sid from response xml
function getSidFromXML(xmlDoc)
{
	var elemSid = xmlDoc.getElementsByTagName("sid")[0];
	if (typeof elemSid == "undefined") {
		alert("missing sid tag");
		return null;
	}
		
	return elemSid.textContent;
}

// yank userid from response xml
function getUserIDFromXML(xmlDoc)
{
	var elemUserId = xmlDoc.getElementsByTagName("user_id")[0];
	if (typeof elemUserId == "undefined") {
		alert("missing user_id tag");
		return null;
	}
		
	return elemUserId.textContent;
}

// yank strand/unit combo from xml
function getStrandFromXML(xmlDoc)
{
	var elemStrand = xmlDoc.getElementsByTagName("strand")[0];
	if (typeof elemStrand == "undefined") {
		alert("missing strand tag");
		return null;
	}
		
	var elemUnit = xmlDoc.getElementsByTagName("unit")[0];
	if (typeof elemUnit == "undefined") {
		alert("missing unit tag");
		return null;
	}
		
	// well strand/unit combo only applies to alphabet & code, for the others unit doesn't matter	
	if (elemStrand.textContent == "alphabet" || elemStrand.textContent == "code")	
		return elemStrand.textContent + "_unit_" + elemUnit.textContent;
	else
		return elemStrand.textContent;
}

// yank the activity name form the response xml
function getActivityFromXML(xmlDoc)
{
	var elemActivity = xmlDoc.getElementsByTagName("activity")[0];
	return elemActivity.getAttribute("id");
	
}
/*****************************************************************************************************/
	////////////////////////////////////////////////////////////
	// XML helpers
	////////////////////////////////////////////////////////////	
/*****************************************************************************************************/	
function parseXMLStringToDOM(xmlText)
{
	var xmlDoc;
	var parser = new DOMParser();
	xmlDoc = parser.parseFromString(xmlText,"text/xml");	
	return xmlDoc;
}
// create a DOM tree with the specified activity root node (xplatform)
function createRootDOM(activity)
{
    var xmlDoc;
 	var parser = new DOMParser();
	xmlDoc = parser.parseFromString("<activity></activity>","text/xml");
	xmlDoc.documentElement.setAttribute("id", activity); //activity attribute
	return xmlDoc;
}
// add a branch to a DOM tree, returns new element
function addDOMBranch(xmlDoc, parent, branch)
{
	var elemBranch = xmlDoc.createElement(branch);
	parent.appendChild(elemBranch);
	
	return elemBranch;
}
// add a branch to a DOM tree with standard id attribute, returns new element
function addDOMBranchWithId(xmlDoc, parent, branch, id)
{
	var elemBranch = xmlDoc.createElement(branch);
	elemBranch.setAttribute("id", id)
	parent.appendChild(elemBranch);
	
	return elemBranch;
}
// add a leaf node to a DOM tree, returns nothing
function addDOMLeaf(xmlDoc, parent, leaf, value)
{
	var elemLeaf = xmlDoc.createElement(leaf);
	elemLeaf.appendChild(xmlDoc.createTextNode(value));	
	parent.appendChild(elemLeaf);
}
// add a leaf node with standard id attribute to a DOM tree, returns nothing
function addDOMLeafWithId(xmlDoc, parent, leaf, value, id)
{
	var elemLeaf = xmlDoc.createElement(leaf);
	elemLeaf.appendChild(xmlDoc.createTextNode(value));	
	elemLeaf.setAttribute("id", id)
	parent.appendChild(elemLeaf);
}
// soruce http://www.eslinstructor.net/vkbeautify/
function vkbeautify(text, format, preserveWS) {

	var shift = ['\n'], // array of shifts
		deep = 0,
		str = '',
		jsonStr = '',
		
		// customize
		//step = '  ', // 2 spaces
		step = '   ', // 3 spaces
		
		inComment = false,
		maxdeep = 100, // nesting level
		ix = 0,
		ar,
		len = 0;
	
	/* initialize array with shifts */
	for(ix=0;ix<maxdeep;ix++){
		shift.push(shift[ix]+step); 
	}
	
	if(format == 'xml') {
	
		ar = preserveWS ? text.replace(/</g,"~#~<").split('~#~') 
						: text.replace(/>\s{0,}</g,"><").replace(/</g,"~#~<").split('~#~');
		len = ar.length;

		for(ix=0;ix<len;ix++) {
			/* start comment or <![CDATA[...]]> or <!DOCTYPE*/
			if(ar[ix].search(/<!/) > -1) { 
				str += shift[deep]+ar[ix];
				inComment = true; 
				/* end comment  or <![CDATA[...]]> */
				if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1 ) { 
					inComment = false; 
				}
			} else 
			/* end comment  or <![CDATA[...]]> */
			if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) { 
				str += ar[ix];
				inComment = false; 
			} else 
			/* <elm></elm> */
			if( /^<\w/.exec(ar[ix-1]) && /^<\/\w/.exec(ar[ix]) &&
				/^<\w+/.exec(ar[ix-1]) == /^<\/\w+/.exec(ar[ix])[0].replace('/','')) { 
				str += ar[ix];
				if(!inComment) deep--;
			} else
			 /* <elm> */
			if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) == -1 && ar[ix].search(/\/>/) == -1 ) {
				str = !inComment ? str += shift[deep++]+ar[ix] : str += ar[ix];
			} else 
			 /* <elm>...</elm> */
			if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
				str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
			} else 
			/* </elm> */
			if(ar[ix].search(/<\//) > -1) { 
				str = !inComment ? str += shift[--deep]+ar[ix] : str += ar[ix];
			} else 
			/* <elm/> */
			if(ar[ix].search(/\/>/) > -1 ) { 
				str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
			} else 
			/* <? xml ... ?> */
			if(ar[ix].search(/<\?/) > -1) { 
				str += shift[deep]+ar[ix];
			} else {
				str += ar[ix];
			}
		}
		
		return  (str[0] == '\n') ? str.slice(1) : str;
		
	}  else 
	
	if(format == 'json') {
	
		jsonStr = preserveWS ? text : jsonStr = text.replace(/\s{1,}/g,' ') 
		
		ar = jsonStr.replace(/\{/g,"~#~{~#~")
					.replace(/\[$/g,"[~#~")
					.replace(/\}/g,"~#~}")
					.replace(/\]/g,"~#~]")
					.replace(/\,/g,",~#~")
					.split('~#~');
					
		len = ar.length;
		
		for(ix=0;ix<len;ix++) {

			if( /\{/.exec(ar[ix]))  { 
				str += shift[deep++]+ar[ix];
			} else 
			if( /\[/.exec(ar[ix]))  { 
				str += shift[deep++]+ar[ix];
			}  else 
			if( /\]/.exec(ar[ix]))  { 
				str += shift[--deep]+ar[ix];
			}  else 
			if( /\}/.exec(ar[ix]))  { 
				str += shift[--deep]+ar[ix];
			} else {
				str += shift[deep]+ar[ix];
			}
		}
		return str.replace(/^\n{1,}/,'');
	}
	
	if(format == 'css') {
	
		jsonStr = preserveWS ? text : jsonStr = text.replace(/\s{1,}/g,' ') 
		
		ar = jsonStr.replace(/\{/g,"{~#~")
					.replace(/\}/g,"~#~}~#~")
					.replace(/\;/g,";~#~")
					.split('~#~');
					
		len = ar.length;
		
		for(ix=0;ix<len;ix++) {

			if( /\{/.exec(ar[ix]))  { 
				str += shift[deep++]+ar[ix];
			} else 

			if( /\}/.exec(ar[ix]))  { 
				str += shift[--deep]+ar[ix];
			} else {
				str += shift[deep]+ar[ix];
			}
		}
		return str.replace(/^\n{1,}/,'');
	}
}

/*****************************************************************************************************/
	////////////////////////////////////////////////////////////
	// Activity fake data helpers
	////////////////////////////////////////////////////////////	
/*****************************************************************************************************/	
// helper to get random value within limits (inclusive)
function randomWithinRange(min, max)
{
	return Math.floor(Math.random() * (max-min+1)) + min;
}

// helper to determine if the source string contains the value string
function contains(source, value)
{
	return (source.indexOf(value) != -1);
}

exports.generateFakeActivityXML = generateFakeActivityXML;
