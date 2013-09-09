// Multidimensional array to hold variants of atom XML per atom, per zone.
var AtomXMLArray = null;
var AtomXMLMapArray = null;

var TheZoneIdx = 0;
var ZonesArray = new Array();
var ZonesMap = new Object();

var TheAtomIdx = 0;
var TheZoneAtomIdx = 0;
var ZoneAtomsArray = null;
var ZoneAtomsMapArray = null;

var ReportArray = new Array();
var ReportsMap = new Object();

var SpecificAtomArray = new Array();
var SpecificAtomMap = new Object();

var http_request = false;
var isGetAtom = false;
var setupdone = false;
var assessmentWeight = 80;

var topicID = "A01";

		// This is an WordIDType object.
	function WordIDType ( id, type )
	{
		this.id = id;
		this.type = type;
	}

	function spWordIdType ( id, wordText, type )
	{
		this.id = id;
		this.wordText = wordText;
		this.type = type;
	}

	// get random value from provided array
	function getRandomFromArray(array)
	{
		return array[Math.floor(Math.random() * array.length)]
	}

	// get random value within limits (inclusive)
	function getRandomFromTo(from, to)
	{
		return Math.floor(Math.random() * (to - from + 1) + from);
	}

	//------------------------

		// This is an AtomXML object.
	function AtomXML ( name, xml )
	{
		this.id = name;
		this.name = name;
		this.xml = xml;
	}

		// Add an AtomXML object to a particular atom activity. Each activity can have multiple XML variants.
	function addAtomXML ( atomXML, atomIndex, zoneIndex )
	{
		var xmlIndex = AtomXMLArray[ zoneIndex ][ atomIndex ].length;

		AtomXMLArray[ zoneIndex ][ atomIndex ][ xmlIndex ] = atomXML;
		AtomXMLMapArray[ zoneIndex ][ atomIndex ][ atomXML.id ] = atomXML;
	}

	//------------------------

		// This is an ZoneAtom object.
	function ZoneAtom ( id, name, zoneidx, atomidx )
	{
		this.id = id;
		this.name = name;
		this.zoneidx = zoneidx;
		this.idx = atomidx;
	}

		// Add a new Atom object to the atoms array and atoms map. (need both?)
	function addZoneAtom ( aZoneAtom, zoneIndex )
	{
		ZoneAtomsArray[ zoneIndex ][ ZoneAtomsArray[ zoneIndex ].length ] = aZoneAtom;
		ZoneAtomsMapArray[ zoneIndex ][ aZoneAtom.id ] = aZoneAtom;
	}

	//------------------------

	function Zone (id, name, idx)
	{
		this.id = id;
		this.name = name;
		this.idx = idx;
	}

	function addZone (aZone)
	{
		ZonesArray[ZonesArray.length] = aZone;
		ZonesMap[aZone.id] = aZone;
	}

	function addAllZones()
	{
		var zone;
		var zoneIdx = 0;

		zone = new Zone ("none", "None", zoneIdx++);
		addZone(zone);

		zone = new Zone ("reading_zone", "Reading", zoneIdx++);
		addZone(zone);

		zone = new Zone("word_zone", "Word", zoneIdx++);
		addZone(zone);

		zone = new Zone("spelling_zone", "Spelling", zoneIdx++);
		addZone(zone);

		zone = new Zone("success_zone", "Success", zoneIdx++);
		addZone(zone);

		zone = new Zone("writing_zone", "Writing", zoneIdx++);
		addZone(zone);
	}

	//------------------------

	function SpecificAtom (id, name, idx)
	{
		this.id = id;
		this.name = name;
		this.idx = idx;
	}

	function addSpecificAtom (aSpecificAtom)
	{
		SpecificAtomArray[ SpecificAtomArray.length ] = aSpecificAtom;
		SpecificAtomMap[ aSpecificAtom.id ] = aSpecificAtom;
	}

	function addAllSpecificAtoms()
	{
		var atom;
		var atomIdx = 0;

		atom = new SpecificAtom ("topic_selection_atom", "Topic Selection", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("zone_menu_atom", "Zone Menu", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("rz_video_atom", "Reading Zone Video", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("rz_reading_passage_atom", "Reading Passage", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("rz_quick_check_question_atom", "Quick Check", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("rz_quick_check_progress_report_atom", "Quick Check Progress Report", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("rz_progress_report_atom", "Reading Progress Report", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("wz_word_assessment_round_atom", "Word Assessment Round", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("wz_word_clinic_atom", "Word Clinic", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("wz_word_match_atom", "Word Match", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("wz_self_check_atom", "Self Check", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("wz_speed_challenge_round_atom", "Speed Challenge", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("wz_word_review_atom", "Word Review", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("wz_progress_report_atom", "Word Zone Progress Report", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("spz_spelling_assessment_round_atom", "Spelling Assessment Round", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("spz_spelling_clinic_atom", "Spelling Clinic", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("spz_spelling_challenge_atom", "Spelling Challenge", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("spz_cls_report_atom", "CLS Report", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("spz_proofreading_atom", "Proofreading", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("spz_progress_report_atom", "Spelling Zone Progress Report", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("suz_discrepancy_passages_atom", "Discrepancy Passages", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("suz_context_passage_atom", "Context Passages", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("suz_final_recording_atom", "Final Recording", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("suz_video_atom", "Success Zone Video", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("suz_topic_progress_report_atom", "Success Zone Topic Progress Report", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("wrz_respond_and_write_atom", "Writing Zone Respond and Write", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("wrz_topic_progress_report_atom", "Writing Zone Topic Progress Report", atomIdx++);
		addSpecificAtom (atom);

		atom = new SpecificAtom ("dashboard_atom", "Dashboard", atomIdx++);
		addSpecificAtom (atom);
	}

	//------------------------

	function Report (id, name, idx)
	{
		this.id = id;
		this.name = name;
		this.idx = idx;
	}

	function addReport (aReport)
	{
		ReportArray[ ReportArray.length ] = aReport;
		ReportsMap[ aReport.id ] = aReport;
	}

	function addAllReports()
	{
		var report;
		var reptIdx = 0;

		report = new Report ("progress_report", "READ 180 Progress Report", reptIdx++);
		addReport (report);

		report = new Report ("daily_report", "READ 180 Daily Report", reptIdx++);
		addReport (report);
	}

	//------------------------

	function prepareForZoneAtoms()
	{
		ZoneAtomsArray = new Array(ZonesArray.length);
		ZoneAtomsMapArray = new Array(ZonesArray.length);

		for (i = 0; i < ZonesArray.length; i++)
		{
			ZoneAtomsArray[i] = new Array();
			ZoneAtomsMapArray[i] = new Object();
		}
	}

	function prepareForXML()
	{
		AtomXMLArray = new Array(ZonesArray.length);
		AtomXMLMapArray = new Array(ZonesArray.length);

		for (i = 0; i < ZonesArray.length; i++)
		{
			AtomXMLArray[i] = new Array();
			AtomXMLMapArray[i] = new Object();

			for (j = 0; j < 10; j++)
			{
				AtomXMLArray[i][j] = new Array();
				AtomXMLMapArray[i][j] = new Object();
			}
		}
	}

	//*************************************

	function onPageLoad()
	{
		var objZones, objAtomZones, aZone;
		var objAtomXML, aXML;
		var objReports;
		var aZone, aZoneAtom, aXML, objAtomXML, aReport, aSpecificAtom;

		if (setupdone == false)
			setup();

		// Fill the pop-ups.
		objZones = document.getElementById('R180_SELECTED_ZONE');

		if (objZones.options.length <= 1)
		{
			for (i = 0; i < ZonesArray.length; i++)
			{
				aZone = ZonesArray[i];

				objZones.options[ objZones.options.length ] = new Option (aZone.name, aZone.id);
			}
		}
		objZones.value = "0";

		objAtomZones = document.getElementById('R180_SELECTED_ACTIVITY');

		if (objAtomZones.options.length <= 1)
		{
			for (i = 0; i < ZoneAtomsArray[0].length; i++)
			{
				aZoneAtom = ZoneAtomsArray[0][i];

				objAtomZones.options[ objAtomZones.options.length ] = new Option (aZoneAtom.name, aZoneAtom.id);
			}
		}
		objAtomZones.value = "0";
		objAtomZones.disabled = true;

		objAtomXML = document.getElementById('R180_SELECTED_ATOM');

		if (objAtomXML.options.length <= 1)
		{
			for (i = 0; i < AtomXMLArray[0][0].length; i++)
			{
				aXML = AtomXMLArray[0][0][i];

				objAtomXML.options[ objAtomXML.options.length ] = new Option(aXML.name, aXML.id);
			}
		}
		objAtomXML.value = "0";
		objAtomXML.disabled = true;

		objReports = document.getElementById('R180_SELECTED_REPORTS');

		if (objReports.options.length <= 1)
		{
			for (i = 0; i < ReportArray.length; i++)
			{
				aReport = ReportArray[i];

				objReports.options[ objReports.options.length ] = new Option (aReport.name, aReport.id);
			}
		}
		objReports.value = "0";
		objReports.disabled = false;

		var objSpecificAtoms = document.getElementById('R180_SPECIFIC_ATOM');

		if (objSpecificAtoms.options.length <= 1)
		{
			for (i = 0; i < SpecificAtomArray.length; i++)
			{
				aSpecificAtom = SpecificAtomArray[i];

				objSpecificAtoms.options[ objSpecificAtoms.options.length ] = new Option (aSpecificAtom.name, aSpecificAtom.id);
			}
		}
		objReports.value = "0";
		objReports.disabled = false;

		// disable by default
		document.getElementById("zone_menu").disabled = true;
	}

	function generateTimingPlaceholderXML()
	{
		return "timing_info_will_be_generated\n";
	}

	function generateRealTimingXML()
	{
		var d = new Date();

		// 12/12/2009 04:32:00
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
		
		var timingXML =
		"  <start_time>" + startTime + "</start_time>\n"+
		"  <end_time>" + endTime + "</end_time>\n"+
		"  <tracked_time>" + "1000" + "</tracked_time>\n";

		return timingXML
	}

	function sendPostRequest (parameters, postdata)
	{
		var url = "/r180ng/core.cd?";

		url += parameters;

		if (window.XMLHttpRequest)
		{ // Mozilla, Safari,...
			http_request = new XMLHttpRequest();
			if (http_request.overrideMimeType)
			{
				// set type accordingly to anticipated content type
				http_request.overrideMimeType('application/xml');
			}
		}
		else if (window.ActiveXObject)
		{ // IE
			try
			{
				http_request = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch (e)
			{
				try
				{
					http_request = new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch (e)
				{
				}
			}
		}
		if (!http_request)
		{
			alert('Cannot create XMLHTTP instance');
			return false;
		}

		http_request.onreadystatechange = displayReturnData;
		http_request.open('POST', url, true);
		http_request.setRequestHeader("Content-type", "application/xml");
		http_request.send(postdata);

		var objUrl = parent.cmdTxtFrame.document.getElementById("LYC_CF_SYNTAX");
		objUrl.innerHTML = url + parameters;
	}

	function sendGetRequest (parameters)
	{
		var url = "/r180ng/core.cd?";

		if (window.XMLHttpRequest)
		{		// Mozilla, Safari,...
			http_request = new XMLHttpRequest();

			if (http_request.overrideMimeType)
			{
				// set type accordingly to anticipated content type
				http_request.overrideMimeType('text/html');
			}
		}
		else if (window.ActiveXObject)
		{		// IE
			try
			{
				http_request = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch (e)
			{
				try
				{
					http_request = new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch (e)
				{
				}
			}
		}

		if (!http_request)
		{
			alert('Cannot create XMLHTTP instance');
			return false;
		}

		http_request.onreadystatechange = displayReturnData;
		http_request.open('POST', url, true);
		http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http_request.send(parameters);

		var objUrl = parent.cmdTxtFrame.document.getElementById("LYC_CF_SYNTAX");
		objUrl.innerHTML = url + parameters;
	}

	function onLogin()
	{
		var parameters;
		var obj, s, obj1;

		obj = document.getElementById('R180_USERNAME');
		s = obj.value;

		if (s == "")
		{
			TEST();
			alert("You must specify a user name.");
			obj.focus();
			return;
		}

		obj = document.getElementById('R180_PASSWORD');
		s = obj.value;

		if (s == "")
		{
			alert("You must specify a password.");
			obj.focus();
			return;
		}

		parameters = "command=LoginValidate";
		parameters += "&username=" + document.getElementById('R180_USERNAME').value;
		parameters += "&password=" + document.getElementById('R180_PASSWORD').value;
		parameters += "&community=R180NG";
		parameters += "&replace_session=1";

		parameters += "&client_datetime=" + Date.parse(Date());
		isGetAtom = false;
		sendGetRequest (parameters);
	}

	function onUserExist()
	{
		var url, parameters;
		var obj,s,obj1;

		obj = document.getElementById('R180_USERNAME');
		s = obj.value;

		if (s == "")
		{
			TEST();
			alert("You must specify a user name.");
			obj.focus();
			return;
		}

		url = "/r180ng/core.cd?";

		parameters = "command=UserExist";
		parameters += "&username=" + document.getElementById('R180_USERNAME').value;
		parameters += "&community=R180NG";

		isGetAtom = false;
		sendGetRequest (parameters);
	}

	function onLogout()
	{
		var parameters;
		var obj1,obj,s;

		obj =  document.getElementById('R180_SID');
		s = obj.value;
		if (s == "")
		{
			alert("You must specify a session id. Copy it from the XML results of the Login command.");
			obj.focus();
			return;
		}

		parameters = "command=Logout";
		parameters += "&sid=" +  document.getElementById('R180_SID').value;

		isGetAtom = false;
		sendGetRequest (parameters);

		var obj1 =  document.getElementById('R180_SID');
		obj1.value = "";

		var obj2 = document.getElementById('R180_USERID');
		obj2.value = "";
	}

	function onZoneMenuExit()
	{
		// ignore unchecking, can't undo
		if (document.getElementById("zone_menu").checked == true)
		{
			var selectedActivity = document.getElementById("R180_SELECTED_ACTIVITY").value;
			var postdata = document.getElementById("R180_SAVEATOM_POSTDATA").value;

			// zone menu exit
			postdata = postdata.replace("<user_directed_navigation/>", "<user_directed_navigation>zone_menu</user_directed_navigation>");

			// if it's a "no partial data" activity, then nuke the student_data section since quitting before activity is complete
			if ((selectedActivity == "wz_word_clinic_atom" || selectedActivity == "wz_word_match_atom" || selectedActivity == "wz_word_review_atom") ||
				(selectedActivity == "spz_proofreading_atom"))
			{
				var start = postdata.search("<student_data>");
				if (start != -1) {
					var end = postdata.search("</student_data>") + 15;
					var temp = postdata.substring(0, start - 1) + postdata.substring(end, postdata.length)
					postdata = temp;
				}
			}

			// update the display
			document.getElementById("R180_SAVEATOM_POSTDATA").value = postdata;
		}
	}

	function onGetAtomData()
	{
		var parameters;
		var obj1,obj,s;

		obj = document.getElementById('R180_USERID');
		s = obj.value;

		if (s == "")
		{
			alert("You must specify a user id. Copy it from the XML results of the Login command.");
			obj.focus();
			return;
		}

		obj =  document.getElementById('R180_SID');
		s = obj.value;

		if (s == "")
		{
			alert("You must specify a session id. Copy it from the XML results of the Login command.");
			obj.focus();
			return;
		}

		parameters = "command=GetAtomData";
		parameters += "&user_id=" + document.getElementById('R180_USERID').value;
		parameters += "&sid=" +  document.getElementById('R180_SID').value;

		isGetAtom = true;
		sendGetRequest (parameters);
	}

	function onGetSpecificAtomData()
	{
		var parameters;
		var obj1,obj,s;

		obj = document.getElementById('R180_USERID');
		s = obj.value;

		if (s == "")
		{
			alert("You must specify a user id. Copy it from the XML results of the Login command.");
			obj.focus();
			return;
		}

		obj =  document.getElementById('R180_SID');
		s = obj.value;

		if (s == "")
		{
			alert("You must specify a session id. Copy it from the XML results of the Login command.");
			obj.focus();
			return;
		}

		var objSpecificAtoms = document.getElementById('R180_SPECIFIC_ATOM');
		var aSpecificAtom = SpecificAtomArray[ objSpecificAtoms.options.selectedIndex - 1 ];

		parameters = "command=GetSpecificAtomData";
		parameters += "&atom_id=" + aSpecificAtom.id;
		parameters += "&user_id=" + document.getElementById('R180_USERID').value;
		parameters += "&sid=" +  document.getElementById('R180_SID').value;

		isGetAtom = true;
		sendGetRequest (parameters);
	}

	function onSaveAtomResults()
	{
		var parameters, postdata;

		parameters = "command=SaveAtomResults";
		parameters += "&user_id=" + document.getElementById('R180_USERID').value;
		parameters += "&sid=" +  document.getElementById('R180_SID').value;

		postdata = document.getElementById("R180_SAVEATOM_POSTDATA").value;

			// Replace dummy text with real timing information.
		postdata = postdata.replace("timing_info_will_be_generated", generateRealTimingXML());

		// deselect zone menu check box
		document.getElementById('zone_menu').checked = false;

		isGetAtom = false;
		sendPostRequest (parameters, postdata);
	}

	function onSaveSpecificAtomResults()
	{
		var parameters, postdata;

		parameters = "command=SaveSpecificAtomResults";
		parameters += "&user_id=" + document.getElementById('R180_USERID').value;
		parameters += "&sid=" +  document.getElementById('R180_SID').value;

		postdata = document.getElementById("R180_SAVEATOM_POSTDATA").value;

			// Replace dummy text with real timing information.
		postdata = postdata.replace("timing_info_will_be_generated", generateRealTimingXML());

		isGetAtom = false;
		sendPostRequest (parameters, postdata);
	}

	function onEvaluate(command, root)
	{
		var parameters = "command=" + command;
		parameters += "&user_id=" + document.getElementById('R180_USERID').value;
		parameters += "&sid=" +  document.getElementById('R180_SID').value;
		/*
		var sample = document.getElementById("R180_SAVEATOM_POSTDATA").value;
		if (sample.length == 0)
			sample = "sentence2 as editable As text 1";

		var postdata =
		"<" + root + ">\n"+
		"	<sentences>\n"+
		"	  <sentence id='sentence2'>\n"+
		"	   <starter><![CDATA[Aborigines in Australia were not treated <omission type=\"word\"/> by the Australians who <omission type=\"fill\"/>]]></starter>\n"+
		"	   <editable_texts>\n"+
		"	    <editable_text id='1'><![CDATA[" + sample + "]]></editable_text>\n"+
		"	    <editable_text id='2'/>\n"+
		"	   </editable_texts>\n"+
		"	  </sentence>\n"+
		"	  <sentence id='sentence3'>\n"+
		"	   <starter><![CDATA[Sarah and I are very different because <omission type=\"fill\"/>]]></starter>\n"+
		"	   <editable_texts>\n"+
		"	    <editable_text id='1'><![CDATA[sentence3 editable text 1]]></editable_text>\n"+
		"	    <editable_text id='2'><![CDATA[sentence3 editable text 2]]></editable_text>\n"+
		"	   </editable_texts>\n"+
		"	  </sentence>\n"+
		"	  <sentence id='conclusion'>\n"+
		"	   <starter><![CDATA[Even though Sarah is not my role model, I look up to <omission type=\"word\"/> as a role model because <omission type=\"fill\"/>]]></starter>\n"+
		"	   <editable_texts>\n"+
		"	    <editable_text id='1'><![CDATA[conclusion editable text 1]]></editable_text>\n"+
		"	    <editable_text id='2'><![CDATA[conclusion editable text 2]]></editable_text>\n"+
		"	   </editable_texts>\n"+
		"	  </sentence>\n"+
		"	</sentences>\n"+
		"</" + root + ">\n";
		*/

		var starter = document.getElementById("R180_SENTENCE_STARTER").value;
		var editableText1 = document.getElementById("R180_EDITABLE_TEXT_1").value;
		var editableText2 = document.getElementById("R180_EDITABLE_TEXT_2").value;

		var postdata =
		"<" + root + ">\n"+
		"	<sentences>\n"+
		"	  <sentence id='sentence2'>\n"+
		"	   <starter><![CDATA[" + starter + "]]></starter>\n"+
		"	   <editable_texts>\n"+
		"	    <editable_text id='1'><![CDATA[" + editableText1 + "]]></editable_text>\n"+
		"	    <editable_text id='2'><![CDATA[" + editableText2 + "]]></editable_text>\n"+
		"	   </editable_texts>\n"+
		"	  </sentence>\n"+
		"	  <sentence id='sentence3'>\n"+
		"	   <starter><![CDATA[Sarah and I are very different because <omission type=\"fill\"/>]]></starter>\n"+
		"	   <editable_texts>\n"+
		"	    <editable_text id='1'><![CDATA[sentence3 editable text 1]]></editable_text>\n"+
		"	    <editable_text id='2'><![CDATA[sentence3 editable text 2]]></editable_text>\n"+
		"	   </editable_texts>\n"+
		"	  </sentence>\n"+
		"	  <sentence id='conclusion'>\n"+
		"	   <starter><![CDATA[Even though Sarah is not my role model, I look up to <omission type=\"word\"/> as a role model because <omission type=\"fill\"/>]]></starter>\n"+
		"	   <editable_texts>\n"+
		"	    <editable_text id='1'><![CDATA[conclusion editable text 1]]></editable_text>\n"+
		"	    <editable_text id='2'><![CDATA[conclusion editable text 2]]></editable_text>\n"+
		"	   </editable_texts>\n"+
		"	  </sentence>\n"+
		"	</sentences>\n"+
		"</" + root + ">\n";

		sendPostRequest (parameters, postdata);
	}

	function onGetReport ()
	{
		var objReport = document.getElementById("R180_SELECTED_REPORTS");

		if (objReport.options.selectedIndex == 0)
		{
			alert("You must select a report from the menu.");
			objReport.focus();
			return;
		}

		var report = ReportArray[ objReport.options.selectedIndex - 1 ];
		var parameters;

		parameters = "command=GetZoneMenuReportData";
		parameters += "&user_id=" + document.getElementById('R180_USERID').value;
		parameters += "&report_id=" + report.id;
		parameters += "&sid=" +  document.getElementById('R180_SID').value;

		isGetAtom = false;
		sendGetRequest (parameters);
	}

	function onGetSpellingFeedback ()
	{
		var wordIDObj = document.getElementById("R180_WORD_ID");
		var misspellingObj = document.getElementById("R180_MISSPELLING");

		if (wordIDObj.value == "")
		{
			alert("You must specify a word id.");
			wordIDObj.focus();
			return;
		}

		var wordID = wordIDObj.value;

		if (misspellingObj.value == "")
		{
			alert("You must specify a misspelling.");
			misspellingObj.focus();
			return;
		}

		var misspelling = misspellingObj.value;
		var parameters;

		parameters = "command=GetSpellingCorrectiveFeedback";
		parameters += "&word_id=" + wordID;
		parameters += "&student_spelling=" + misspelling;
		parameters += "&sid=" +  document.getElementById('R180_SID').value;

		isGetAtom = false;
		sendGetRequest (parameters);
	}

	function onGetStages ()
	{
		var parameters;

		parameters = "command=GetStages";
		parameters += "&sid=" +  document.getElementById('R180_SID').value;

		isGetAtom = false;
		sendGetRequest (parameters);
	}

	function onGetTopics ()
	{
		var stageObj = document.getElementById("R180_STAGE");

		if (stageObj.value == "")
		{
			alert("You must specify a stage (A, B, or C.");
			stageObj.focus();
			return;
		}

		var parameters;

		parameters = "command=GetTopics";
		parameters += "&stage_id=" + stageObj.value;
		parameters += "&sid=" +  document.getElementById('R180_SID').value;

		isGetAtom = false;
		sendGetRequest (parameters);
	}

	function onGetWordDecodeInfo ()
	{
		var wordTextObj = document.getElementById("R180_WORD_TEXT");

		if (wordTextObj.value == "")
		{
			alert("You must specify a word for decoding.");
			wordTextObj.focus();
			return;
		}

		var wordText = wordTextObj.value;
		var parameters;

		parameters = "command=GetWordDecodingInfo";
		parameters += "&word_text=" + wordText;
		parameters += "&sid=" +  document.getElementById('R180_SID').value;

		isGetAtom = false;
		sendGetRequest (parameters);
	}

	function onGetWordList ()
	{
		var textFilterObj = document.getElementById("R180_TEXT_FILTER");
		var topicFilterObj = document.getElementById("R180_TOPIC_FILTER");

		if ((textFilterObj.value == "") && (topicFilterObj.value == ""))
		{
			alert("You must specify either a text or topic filter.");

			if (textFilterObj.value != "")
				textFilterObj.focus();
			else
				topicFilterObj.focus();

			return;
		}

		var parameters;

		parameters = "command=GetDictionaryWordList";

		if (textFilterObj.value != "")
			parameters += "&text_filter=" + textFilterObj.value;

		if (topicFilterObj.value != "")
			parameters += "&topic_filter=" + topicFilterObj.value;

		var subStringObj = document.getElementById("R180_SUBSTRING");

		if (subStringObj.value != "")
			parameters += "&substring=" + subStringObj.value;

		parameters += "&sid=" +  document.getElementById('R180_SID').value;

		isGetAtom = false;
		sendGetRequest (parameters);
	}

	function onGetWordData ()
	{
		var wordIDObj = document.getElementById("R180_WORD_DATA_ID");

		if (wordIDObj.value == "")
		{
			alert("You must specify a word id.");
			wordIDObj.focus();
			return;
		}

		var parameters;

		parameters = "command=GetDictionaryWordData";

		parameters += "&word_id=" + wordIDObj.value;
		parameters += "&sid=" +  document.getElementById('R180_SID').value;

		isGetAtom = false;
		sendGetRequest (parameters);
	}

	function onGetReadingPassages ()
	{
		var topicIDObj = document.getElementById("R180_TOPIC_ID");

		if (topicIDObj.value == "")
		{
			alert("You must specify a topic id (A01, C09, etc).");
			topicIDObj.focus();
			return;
		}

		var segmentIDObj = document.getElementById("R180_SEGMENT_ID");

		if (segmentIDObj.value == "")
		{
			alert("You must specify a segment id (1..4).");
			segmentIDObj.focus();
			return;
		}

		var levelObj = document.getElementById("R180_LEVEL");

		if (levelObj.value == "")
		{
			alert("You must specify a level (1..4).");
			levelObj.focus();
			return;
		}

		var parameters;

		parameters = "command=GetReadingPassages";

		parameters += "&topic_id=" + topicIDObj.value;
		parameters += "&segment_id=" + segmentIDObj.value;
		parameters += "&level=" + levelObj.value;
		parameters += "&sid=" +  document.getElementById('R180_SID').value;

		isGetAtom = false;
		sendGetRequest (parameters);
	}

	function onGetQCQuestions ()
	{
		var topicIDObj = document.getElementById("R180_TOPIC_ID");

		if (topicIDObj.value == "")
		{
			alert("You must specify a topic id (A01, C09, etc).");
			topicIDObj.focus();
			return;
		}

		var segmentIDObj = document.getElementById("R180_SEGMENT_ID");

		if (segmentIDObj.value == "")
		{
			alert("You must specify a segment id (1..4).");
			segmentIDObj.focus();
			return;
		}

		var levelObj = document.getElementById("R180_LEVEL");

		if (levelObj.value == "")
		{
			alert("You must specify a level (1..4).");
			levelObj.focus();
			return;
		}

		var parameters;

		parameters = "command=GetComprehensionQuestions";

		parameters += "&topic_id=" + topicIDObj.value;
		parameters += "&segment_id=" + segmentIDObj.value;
		parameters += "&level=" + levelObj.value;
		parameters += "&sid=" +  document.getElementById('R180_SID').value;

		isGetAtom = false;
		sendGetRequest (parameters);
	}

	function onGetALWords ()
	{
		var topicIDObj = document.getElementById("R180_TOPIC_ID");

		if (topicIDObj.value == "")
		{
			alert("You must specify a topic id (A01, C09, etc).");
			topicIDObj.focus();
			return;
		}

		var segmentIDObj = document.getElementById("R180_SEGMENT_ID");

		if (segmentIDObj.value == "")
		{
			alert("You must specify a segment id (1..4).");
			segmentIDObj.focus();
			return;
		}

		var levelObj = document.getElementById("R180_LEVEL");

		if (levelObj.value == "")
		{
			alert("You must specify a level (1..4).");
			levelObj.focus();
			return;
		}

		var parameters;

		parameters = "command=GetAssessmentListWords";

		parameters += "&topic_id=" + topicIDObj.value;
		parameters += "&segment_id=" + segmentIDObj.value;
		parameters += "&level=" + levelObj.value;
		parameters += "&sid=" +  document.getElementById('R180_SID').value;

		isGetAtom = false;
		sendGetRequest (parameters);
	}

	function displayReturnData()
	{
		try
		{
			if (http_request.readyState == 4)
			{
				if (http_request.status == 200)
				{
					var tf = parent.outputFrame.document.getElementById("IF_CF_OUTPUT2");
					tf.value = http_request.responseText;

					var sid = getSidFromResponse (http_request.responseText);

					if ( null != sid )
					{
						var obj =  document.getElementById('R180_SID');
						obj.value = sid;
					}

					var theuserid = getUserIDFromResponse (http_request.responseText);

					if ( null != theuserid )
					{
						var obj = document.getElementById('R180_USERID');
						obj.value = theuserid;
					}

						// Being called from getAtomData.
					if (isGetAtom)
					{
						var theActivityName = getAtomNameFromResponse (http_request.responseText);

							// Try to set the popup using this name.
						if (theActivityName != null)
						{
							var objAtomZones = document.getElementById('R180_SELECTED_ACTIVITY');
							var menuLength = 0;
							var objZones = document.getElementById('R180_SELECTED_ZONE');
							var thisZone;
							var inAZone = false;

							if (theActivityName == "topic_selection_atom" || theActivityName == "zone_menu_atom" || theActivityName == "dashboard_atom")
							{
								thisZone = ZonesMap["none"];
								inAZone = true;
							}
							else
							{
								inAZone = true;

									// If first activity in the zone, need to switch zone menu to that zone. First,
									// try to detect the zone from atom_data context.
								if (objZones.options.selectedIndex < 3)
								{
									var zoneName = getZoneNameFromResponse (http_request.responseText);
									thisZone = ZonesMap[zoneName];
								}
							}

							if (thisZone != null)
							{
								TheZoneIdx = thisZone.idx;
								objZones.options.selectedIndex = thisZone.idx + 1;
							}

							onChooseZone (objZones);

							if (inAZone)
							{		// Any other activity would have the zone menu set.
								var aZoneIndex = TheZoneIdx;
								var aZoneAtom = ZoneAtomsMapArray[ aZoneIndex ][ theActivityName ];

								objAtomZones.options.selectedIndex = aZoneAtom.idx;
								setAtomXMLPopup ( theActivityName );

									// Special for Quick Check.
								if (theActivityName == "rz_quick_check_question_atom")
								{
									var qcID = getQCIDFromResponse (http_request.responseText);

									if (qcID != null)
									{
										var arr = AtomXMLArray[ TheZoneIdx ][ TheZoneAtomIdx ];
										var atomXML = arr[ qcID - 1 ];
										var objAtomXML = document.getElementById('R180_SELECTED_ATOM');
										objAtomXML.options.selectedIndex = qcID - 1;

										document.getElementById("R180_SAVEATOM_POSTDATA").value = atomXML.xml;
									}

								}

									// Special for Quick Check.
								if (theActivityName == "wz_word_assessment_round_atom")
								{
									var objAssessmentWeight = document.getElementById('R180_ASSESSMENT_WEIGHT');
								}
							}
						}
					}

					// enable/disable zone menu exit checkbox
					var selectedActivity = document.getElementById("R180_SELECTED_ACTIVITY").value;
					if (selectedActivity == "topic_selection_atom" || selectedActivity == "zone_menu_atom" || selectedActivity == "dashboard_atom" || selectedActivity.search("_report") != -1)
					{
						document.getElementById("zone_menu").disabled = true;
					}
					else
					{
						document.getElementById("zone_menu").disabled = false;
					}

				}
				else
				{
					alert('There was a problem with the request.');
				}
			}
		}
		catch( e )
		{
			alert('Caught Exception: ' + e.description);
		}
	}

	function extractActivityWordListFromGetAtomResults (strContent)
	{
		var wordIdArray = new Array();
		var offset = 0;
		var idx = -1;
		var idx2 = -1;
		var activityWordID = "";
		var activityWordType = "";
		var word = null;

		do
		{
			var wordIDSize = 24;
			
			idx = strContent.indexOf("<activity_word id=", offset);

			if (idx > -1)
			{				
					// Handle word IDs of larger than 5 digits.
					//<activity_word id="C15_01_03_word_041_100378" order="1">
				idx2 = strContent.indexOf(" order=", idx);

					//<activity_word id="C13_01_02_word_031_01787" type="study">
				if (idx2 < 0)
					idx2 = strContent.indexOf(" type=", idx);
				
				if ((idx2 > -1) && (idx2 > (idx + 19 + 25)))
					wordIDSize = 25;
					
				activityWordID = strContent.substr (idx + 19, wordIDSize);
				activityWordType = strContent.substr (idx + 19 + wordIDSize + 8, 1);
				word = new WordIDType (activityWordID, activityWordType);
				wordIdArray.push (word);
				offset = idx + 19 + wordIDSize;
			}
		}
		while (idx > -1);

		return wordIdArray;
	}

	function extractSpZActivityWordListFromGetAtomResults (strContent, hasCData, longIDKey)
	{
		var spWordIdArray = new Array();
		var offset = 0;
		var idx = -1;
		var idx2 = -1;
		var activityWordID = "";
		var activityWordText = "";
		var activityWordType = "";
		var word = null;
		var cdataOffset = 0;

		do
		{
			var wordIDSize = 24;
	
			idx = strContent.indexOf("<activity_word id=", offset);

			if (idx > -1)
			{
				// Handle word IDs of larger than 5 digits.
					//<activity_word id="C15_01_03_word_041_100378" type="study">
				idx2 = strContent.indexOf(longIDKey, idx);
				
				if ((idx2 > -1) && (idx2 > (idx + 19 + 25)))
					wordIDSize = 25;

				activityWordID = strContent.substr (idx + 19, wordIDSize);
				activityWordType = strContent.substr (idx + 19 + wordIDSize + 8, 1);

				offset = idx;

				if (hasCData)
				{
					idx = strContent.indexOf("<text><![CDATA[", offset);
					idx2 = strContent.indexOf("]]></text>", offset);
					cdataOffset = 15;
				}
				else
				{
					idx = strContent.indexOf("<text>", offset);
					idx2 = strContent.indexOf("</text>", idx);
					cdataOffset = 6;
				}

				activityWordText = strContent.substr (idx + cdataOffset, ((idx2 - idx) - cdataOffset));

				word = new spWordIdType (activityWordID, activityWordText, activityWordType);
				spWordIdArray.push (word);
				offset = idx2;
			}
		}
		while (idx > -1);

		return spWordIdArray;
	}


	function extractSuZContextPassageIDFromGetAtomResults (strContent)
	{
		var idx = -1;
		var passageID = "";
		var offset = 0;

		idx = strContent.indexOf("<context_passage id=", offset);

		if (idx > -1)
		{
			passageID = strContent.substr (idx + 21, 1);
		}

		return passageID;
	}

	function extractSuZContextPassageOmissionsCountFromGetAtomResults (strContent)
	{
		var idx = -1;
		var count = 0;

		//idx = strContent.indexOf("<omission id=", idx);
		idx = strContent.indexOf("<answer>", idx);
		while (idx != -1) {
			count++;
			//	idx = strContent.indexOf("<omission id=", idx+14);
				idx = strContent.indexOf("<answer>", idx+9);
		}

		return count;
	}

	function extractFirstAvailableTopicFromGetAtomResults (strContent)
	{
		var idx = -1;
		idx = strContent.indexOf("incomplete", idx);
		topic = strContent.substr(idx-13, 3);
		return topic;
	}

	function getRandomWordAssessmentScore()
	{
		var scores = ["missed", "slow", "fluent"];
		return getRandomFromArray(scores);
	}

	function buildWordAssessmentPostData (wordIdArray)
	{
		var variationStr = document.getElementById('R180_SELECTED_ATOM').value;
		var sPostData = "";

		if (variationStr.match("Mid-assessment Exit"))
		{
			sPostData = "<wz_word_assessment_round_atom>\n"+
			" <atom_data>\n"+
			generateTimingPlaceholderXML() +
			"  <user_directed_navigation>zone_menu</user_directed_navigation>\n"+
			" </atom_data>\n"+
			" <student_data>\n"+
			"  <activity_words>\n";
		}
		else
		{
			sPostData = "<wz_word_assessment_round_atom>\n"+
			" <atom_data>\n"+
			generateTimingPlaceholderXML() +
			"  <user_directed_navigation/>\n"+
			" </atom_data>\n"+
			" <student_data>\n"+
			"  <activity_words>\n";
		}

		for (var index = 0; index < wordIdArray.length; index++)
		{
			var chunk =  "   <activity_word id='" + wordIdArray[index].id + "' order='" + (index+1) + "'>\n";

			if ((variationStr.match("Random")) ||
				 (variationStr.match("Mid-assessment Exit")))
			{
				var randScore = getRandomWordAssessmentScore ();
				var respTime = 3400;		// missed time

				if (randScore == 'slow')
					respTime = 3000;
				else if (randScore == 'fluent')
					respTime = 1800;

				if (variationStr.match("Mid-assessment Exit"))
				{
					if (index < 5)
					{
						chunk += "    <word_score/>\n"+
						"    <attempts>\n" +
						"     <attempt id='1'>\n"+
						"      <score>" + randScore + "</score>\n"+
						"      <response_time>" + respTime + "</response_time>\n"+
						"     </attempt>\n" +
						"     <attempt id='2'/>\n"+
						"     <attempt id='3'/>\n"+
						"    </attempts>\n";
					}
					else
					{
						chunk += "    <word_score/>\n"+
						"    <attempts>\n" +
						"     <attempt id='1'/>\n"+
						"     <attempt id='2'/>\n"+
						"     <attempt id='3'/>\n"+
						"    </attempts>\n";
					}
				}
				else
				{

					chunk += "    <word_score>" + randScore + "</word_score>\n"+
					"    <attempts>\n" +
					"     <attempt id='1'>\n"+
					"      <score>" + randScore + "</score>\n"+
					"      <response_time>" + respTime + "</response_time>\n"+
					"     </attempt>\n" +
					"     <attempt id='2'>\n"+
					"      <score>" + randScore + "</score>\n"+
					"      <response_time>" + respTime + "</response_time>\n"+
					"     </attempt>\n";

					if (randScore != 'fluent')
					{
						chunk += "     <attempt id='3'>\n"+
									"      <score>" + randScore + "</score>\n"+
									"      <response_time>" + respTime + "</response_time>\n"+
									"     </attempt>\n" +
									"    </attempts>\n";
					}
					else
					{
						chunk += "     <attempt id='3'/>\n"+
						"    </attempts>\n";
					}
				}
			}
			else if ((index <  1 && variationStr.match("First 1 Missed, Remaining Fluent")) ||
						(index <  2 && variationStr.match("First 2 Missed, Remaining Fluent")) ||
						(index <  5 && variationStr.match("First 5 Missed, Remaining Fluent")) ||
						variationStr.match("All Missed"))
			{
				chunk += "    <word_score>missed</word_score>\n"+
				"    <attempts>\n"+
				"     <attempt id='1'>\n"+
				"      <score>missed</score>\n"+
				"      <response_time>3400</response_time>\n"+
				"     </attempt>\n"+
				"     <attempt id='2'>\n"+
				"      <score>missed</score>\n"+
				"      <response_time>3300</response_time>\n"+
				"     </attempt>\n"+
				"     <attempt id='3'>\n"+
				"      <score>missed</score>\n"+
				"      <response_time>3400</response_time>\n"+
				"     </attempt>\n"+
				"    </attempts>\n";
			}
			else
			{
				chunk += "    <word_score>fluent</word_score>\n"+
				"    <attempts>\n"+
				"     <attempt id='1'>\n"+
				"      <score>fluent</score>\n"+
				"      <response_time>1800</response_time>\n"+
				"     </attempt>\n"+
				"     <attempt id='2'>\n"+
				"      <score>fluent</score>\n"+
				"      <response_time>1800</response_time>\n"+
				"     </attempt>\n"+
				"     <attempt id='3'/>\n"+
				"    </attempts>\n";
			}

			chunk += "   </activity_word>\n";

			sPostData += chunk;
		}

		sPostData += "  </activity_words>\n"+
		" </student_data>\n"+
		"</wz_word_assessment_round_atom>";

		return sPostData;
	}

	function buildSelfCheckPostData (wordIdArray)
	{
		var variationStr = document.getElementById('R180_SELECTED_ATOM').value;
		var sPostData = "";
		var startRound = 1;
		var endRound = 3;

		sPostData = "<wz_self_check_atom>\n"+
		" <atom_data>\n"+
		generateTimingPlaceholderXML();

		if ((variationStr.match("Exit with 1 Round Complete")) ||
			 (variationStr.match("Exit with 2 Round Complete")))
			sPostData += "  <user_directed_navigation>zone_menu</user_directed_navigation>\n";
		else
			sPostData += "  <user_directed_navigation/>\n";

		sPostData += " </atom_data>\n"+
		" <student_data>\n"+
		"  <bad_recordings>5</bad_recordings>\n"+
		"  <rounds>\n";

		if (variationStr.match("1 Round Complete Previously"))
		{
			startRound = 2;
		}
		else if (variationStr.match("2 Rounds Complete Previously"))
		{
			startRound = 3;
		}
		else if (variationStr.match("Exit with 1 Round Complete"))
		{
			endRound = 1;
		}
		else if (variationStr.match("Exit with 2 Rounds Complete"))
		{
			endRound = 2;
		}

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

			sPostData += 	"    </activity_words>\n" +
			"   </round>\n";

		}

		sPostData += "  </rounds>\n"+
		" </student_data>\n"+
		"</wz_self_check_atom>";

		return sPostData;
	}

	function getRandomSpeedChallengeScore()
	{
		var scores = ["missed", "correct"];
		return getRandomFromArray(scores);
	}

	function getSpeedChallengeRecallLevelArray(recallLevel)
	{
		var recallLevel1 = ["s", "s", "s", "s", "s"];
		var recallLevel2 = ["s", "r", "s", "r", "s", "r", "s", "r", "s", "r"];
		var recallLevel3 = ["s", "r", "r", "s", "r", "r", "s", "r", "r", "s", "r", "r", "s", "r", "r",];
		var recallLevel4 = ["s", "r", "r", "s", "r", "r", "s", "r", "r", "s", "r", "r", "s", "r", "r",];
		var recallLevels = new Array();
		recallLevels[0] = recallLevel1;
		recallLevels[1] = recallLevel2;
		recallLevels[2] = recallLevel3;
		recallLevels[3] = recallLevel4;

		return recallLevels[recallLevel-1];
	}

	function buildSpeedChallengePostData (wordIdArray)
	{
		var variationStr = document.getElementById('R180_SELECTED_ATOM').value;

		var maxTrials;
		var recallLevel;

		// pull info from variations string
		if ((variationStr == "Default (30 trials, Recall Level 4, All Correct)") ||
		 	(variationStr == "30 trials, Recall Level 4, All Correct, Failed Review"))
		{
			maxTrials = 30;
			recallLevel = 4;
		}
		else if (variationStr == "30 trials, Recall Level 3, All Missed")
		{
			maxTrials = 30;
			recallLevel = 3;
		}
		else if (variationStr == "15 Trials, Recall Level 4, All Correct")
		{
			maxTrials = 15;
			recallLevel = 4;
		}
		else if (variationStr == "30 Trials, Recall Level 1 - 6, Random")
		{
			maxTrials = 30;
			recallLevel = getRandomFromTo(1,6);
		}
		else if (variationStr == "Early exit, 20 Trials, Recall Level 3 - 6, Random")
		{
			maxTrials = 20;
			recallLevel = getRandomFromTo(3,6);
		}

		var sPostData = "";

		sPostData += "<wz_speed_challenge_round_atom>\n";
		sPostData += " <atom_data>\n";
		sPostData += generateTimingPlaceholderXML();

		if (variationStr.match("Early exit"))
			sPostData += "  <user_directed_navigation>zone_menu</user_directed_navigation>\n";
		else
			sPostData += "  <user_directed_navigation/>\n";

		sPostData += " </atom_data>\n";
		sPostData += " <student_data>\n";
		sPostData += "  <current_recall_level>" + recallLevel + "</current_recall_level>\n";
		sPostData += "  <activity_words>\n";

		var recallLevelArray = getSpeedChallengeRecallLevelArray(recallLevel)

		// split up study vs review words
		var studyWordArray = new Array();
		var reviewWordArray = new Array();
		while (wordIdArray.length != 0)
		{
			word = wordIdArray.shift();
			if (word.type == "s")
				studyWordArray.push(word);
			else
				reviewWordArray.push(word);
		}

		var trial = 1;
		var studyWordIndex = 0;
		var reviewWordIndex = 0;
		var recallLevelIndex = 0;
		while (trial <= maxTrials)
		{
			// reset to beginning
			if (recallLevelIndex > recallLevelArray.length-1)
			{
				recallLevelIndex = 0;
				studyWordIndex = 0;
				reviewWordIndex = 0;
			}

			var wordType = recallLevelArray[recallLevelIndex++];
			var wordID;
			if (wordType == "s")
			{
				if (studyWordIndex >= studyWordArray.length-1) // used up study words
					continue;

				wordID = studyWordArray[studyWordIndex].id;

				sPostData += "   <activity_word id='" + wordID + "' type='study' ";
				studyWordIndex++;

				// score based on variation
				if (variationStr.match("All Correct"))
					score = "correct";
				else if (variationStr.match("All Missed"))
					score = "missed";
				else
					score = getRandomSpeedChallengeScore();
			}
			else if (wordType == "r")
			{
				if (reviewWordIndex >= reviewWordArray.length-1) // used up review words
					continue;

				wordID = reviewWordArray[reviewWordIndex].id;

				sPostData += "   <activity_word id='" + wordID + "' type='review' ";
				reviewWordIndex++;

				// score based on variation
				if (variationStr.match("All Missed") || variationStr.match("Failed Review"))
					score = "missed";
				else if (variationStr.match("All Correct"))
					score = "correct";
				else
					score = getRandomSpeedChallengeScore();
			}

			sPostData += "trial='" + trial + "'>\n";
			sPostData += "    <recall_level>" + (recallLevel-1) + "</recall_level>\n";
			sPostData += "    <score>" + score + "</score>\n";
			sPostData += "   </activity_word>\n";

			// increment trial count
			trial++;
		}

		/*
		if ((variationStr.match("30 Trials, Recall Level 3, Random")) ||
			 (variationStr.match("20 Trials, Recall Level 2, Random, Exit")))
		{
			var recallOrder = ["s", "r", "r", "s", "r", "r", "s", "r", "r", "s", "r", "r", "s", "r", "r"] ;
			var trialCount = 1;
			var wordWorkingArray = wordIdArray.slice (0, wordIdArray.length);		// Copy the array.
			var allCount = 0;
			var maxTrials = 30;
			var recallLev = 3;

			if (variationStr.match("20 Trials, Recall Level 2, Random, Exit"))
			{
				maxTrials = 20;
				recallLev = 2;
			}

			for (var index1 = 0; index1 < 3; index1++)
			{
				for (var index2 = 0; index2 < recallOrder.length; index2++)
				{
					var found = false;
					var wordElem = null;
					var i = 0;

					while (! found)
					{
						if ((wordWorkingArray[ i ].type == recallOrder[ index2 ]) && (i < wordWorkingArray.length))
						{
							wordElem = wordWorkingArray[ i ];
							wordWorkingArray.splice (i, 1);			// Remove the found element from the array.
							found = true;
						}
						else
							i++;

						if (i >= wordWorkingArray.length)
						{
							wordWorkingArray = wordIdArray.slice (0, wordIdArray.length);		// Copy the array again.
							i = 0;
						}
					}

					sPostData +=  "   <activity_word id='" + wordElem.id + "' type=";

					if (wordElem.type == "s")
						sPostData += "'study' ";
					else
						sPostData += "'review' ";

					sPostData += "trial='" + trialCount++ + "'>\n" +
					"     <recall_level>3</recall_level>\n"+
					"     <score>" + getRandomSpeedChallengeScore() + "</score>\n"+
					"    </activity_word>\n";

					if (++allCount >= maxTrials)
						break;
				}

				if (allCount >= maxTrials)
					break;
			}
		}
		else
		{
			for (var index = 0; index < wordIdArray.length; index++)
			{
				sPostData +=  "   <activity_word id='" + wordIdArray[index].id + "' type=";

				if (index < 5)
					sPostData += "'study' ";
				else
					sPostData += "'review' ";

				if (variationStr.match("All Correct"))
				{
					sPostData += "trial='" + (index + 1) + "'>\n" +
					"     <recall_level>3</recall_level>\n"+
					"     <score>correct</score>\n"+
					"    </activity_word>\n";
				}
				else
				{
					sPostData += "trial='" + (index + 1) + "'>\n" +
					"     <recall_level>3</recall_level>\n"+
					"     <score>missed</score>\n"+
					"    </activity_word>\n";
				}
			}
		}
		*/

		sPostData += "  </activity_words>\n";
		sPostData += " </student_data>\n";
		sPostData += "</wz_speed_challenge_round_atom>";

		return sPostData;
	}

	function buildWordReviewPostData (wordIdArray)
	{
		var variationStr = document.getElementById('R180_SELECTED_ATOM').value;
		var sPostData = "";

		sPostData = "<wz_word_review_atom>\n"+
		" <atom_data>\n"+
		generateTimingPlaceholderXML() +
		"  <user_directed_navigation/>\n"+
		" </atom_data>\n"+
		" <student_data>\n"+
		" <review_word_score>\n";

		if (variationStr.match("All Correct"))
			sPostData += "100\n";
		else if (variationStr.match("Half Correct"))
			sPostData += "50\n";
		else
			sPostData += "0\n";

		sPostData += " </review_word_score>\n"+
		"  <phases>\n"+
		"   <phase id='1'>\n"+
		"    <activity_words>\n";

		var index = 0;

		var halfWayId = wordIdArray.length > 0 ? wordIdArray.length / 2 : 0;

		for (index = 0; index < wordIdArray.length; index++)
		{
			sPostData +=  "   <activity_word id='" + wordIdArray[index].id + "' trial='" + (index + 1) + "'>\n";

			var bCorrect = false;

			if (variationStr.match("All Correct"))
				bCorrect = true;
			else if (variationStr.match("Half Correct"))
				bCorrect = index >= halfWayId;
			else
				bCorrect = false;

			if (bCorrect == true)
				sPostData +=  "      <score>correct</score>\n";
			else
				sPostData +=  "      <score>missed</score>\n";

			sPostData += "      <response_time>2300</response_time>\n"+
			"     </activity_word>\n";
		}

		sPostData += "    </activity_words>\n"+
		"   </phase>\n";

		if (variationStr.match("All Correct"))
		{
			sPostData += "   <phase id='2'/>\n";
		}
		else
		{
			sPostData += "   <phase id='2'>\n"+
			"    <activity_words>\n";

			for (index = 0; index < wordIdArray.length && index<10; index++)
			{
				sPostData +=  "   <activity_word id='" + wordIdArray[index].id + "' trial='" + (index + 1) + "'>\n";

				var bCorrect = false;

				if (variationStr.match("All Correct"))
					bCorrect = true;
				else if (variationStr.match("Half Correct"))
					bCorrect = index >= halfWayId;
				else
					bCorrect = false;

				if (bCorrect == true)
					sPostData +=  "      <score>correct</score>\n";
				else
					sPostData +=  "      <score>missed</score>\n";

				sPostData +=  "      <response_time>2300</response_time>\n"+
				"     </activity_word>\n";
			}

			sPostData += "    </activity_words>\n"+
			"   </phase>\n";
		}
		sPostData += "  </phases>\n"+
		" </student_data>\n"+
		"</wz_word_review_atom>";

		return sPostData;
	}

	//---------------------------------

	function makeRandomMisspelling (wordText)
	{
		var misspelling = wordText;
		var len = wordText.length;
		var charToChange = Math.floor(Math.random() * len);
		var theChar = misspelling.charAt(charToChange);
		var ccode = misspelling.charCodeAt(charToChange);

		if (theChar == 'z')
			ccode = "a".charCodeAt(0);
		else if (theChar == 'Z')
			ccode = "A".charCodeAt(0);
		else ccode++;

		misspelling = misspelling.replace(misspelling.charAt(charToChange), String.fromCharCode(ccode));

		return misspelling;
	}

	function getRandomSpellingAssessmentScore()
	{
		var scores = ["fluent", "not_fluent"];
		return getRandomFromArray(scores);
	}

	function buildSpellingAssessmentPostData (spWordIdArray)
	{
		var variationStr = document.getElementById('R180_SELECTED_ATOM').value;
		var sPostData = "";


		if (variationStr.match("Mid-assessment Exit"))
		{
			sPostData = "<spz_spelling_assessment_round_atom>\n"+
			" <atom_data>\n"+
			generateTimingPlaceholderXML() +
			"  <user_directed_navigation>zone_menu</user_directed_navigation>\n"+
			" </atom_data>\n"+
			" <student_data>\n"+
			"  <activity_words>\n";
		}
		else
		{
			sPostData = "<spz_spelling_assessment_round_atom>\n"+
			" <atom_data>\n"+
			generateTimingPlaceholderXML() +
			"  <user_directed_navigation/>\n"+
			" </atom_data>\n"+
			" <student_data>\n"+
			"  <activity_words>\n";
		}

		for (var index = 0; index < spWordIdArray.length; index++)
		{
			var chunk =  "   <activity_word id='" + spWordIdArray[index].id + "' order='" + (index + 1) + "'>\n";

			if ((variationStr.match("Random")) ||
				 (variationStr.match("Mid-assessment Exit")))
			{
				var randScore = getRandomSpellingAssessmentScore ();

				if (! ((variationStr.match("Mid-assessment Exit")) && (index >= 5)))
				{
					chunk += "    <score>" + randScore + "</score>\n";

					if (randScore != 'fluent')
					{
						chunk += "      <misspelling>" + makeRandomMisspelling (spWordIdArray[index].wordText) + "</misspelling>\n";
					}
					else
					{
						chunk += "    <misspelling/>\n";
					}
				}
				else
				{
					chunk += "    <score/>\n"+
					"    <misspelling/>\n";
				}

			}
			else if ((index <  1 && variationStr.match("First 1 Missed, Remaining Fluent")) ||
						(index <  2 && variationStr.match("First 2 Missed, Remaining Fluent")) ||
						(index <  3 && variationStr.match("First 3 Missed, Remaining Fluent")) ||
						variationStr.match("All Missed"))
			{
				chunk += "    <score>not_fluent</score>\n"+
				"    <misspelling>" + makeRandomMisspelling (spWordIdArray[index].wordText) + "</misspelling>\n";
			}
			else
			{
				chunk += "    <score>fluent</score>\n"+
				"    <misspelling/>\n";
			}

			chunk += "   </activity_word>\n";

			sPostData += chunk;
		}

		sPostData += "  </activity_words>\n"+
		" </student_data>\n"+
		"</spz_spelling_assessment_round_atom>";

		return sPostData;
	}

	function generateRandomSpellingError()
	{
		var set = [1,2,3,4,5,6,8,12,16,17,18,19,21,25,26,27,28,29,30,31,32];
    	return set[Math.floor(Math.random() * set.length)];
	}


	function buildSpellingClinicPostData (wordIdArray)
	{
		var sPostData = "";

		sPostData = "<spz_spelling_clinic_atom>\n"+
		" <atom_data>\n"+
		generateTimingPlaceholderXML() +
		"  <user_directed_navigation/>\n"+
		" </atom_data>\n"+
		" <student_data>\n"+
		"  <activity_words>\n";

		for (var index = 0; (index < wordIdArray.length && index < 3); index++)
		{
			var attempts = Math.floor(Math.random() * 3);

			sPostData +=  "   <activity_word id='" + wordIdArray[index].id + "' trial='" + (index + 1) + "'>\n" +
			"    <score>correct</score>\n";

			if (attempts > 0)
			{
				sPostData += "    <attempts>\n";

				for (var index2 = 0; index2 < attempts; index2++)
				{
					sPostData += "     <attempt id='" + (index2 + 1) + "'>\n"+
//					"      <error_code>" + (Math.floor(Math.random() * 18) + 1) + "</error_code>\n"+
					"      <error_code>" + (generateRandomSpellingError()) + "</error_code>\n"+
					"     </attempt>\n";
				}
				sPostData += "    </attempts>\n";
			}
			else
				sPostData += "<attempts/>\n";

			sPostData += "     </activity_word>\n";
		}

		sPostData += "  </activity_words>\n"+
		" </student_data>\n"+
		"</spz_spelling_clinic_atom>";

		return sPostData;
	}

	function getRandomSpellingChallengeScore()
	{
		var scores = ["incorrect", "correct"];
		return getRandomFromArray(scores);
	}

	function getSpellingChallengeRecallLevelArray(recallLevel)
	{
		var recallLevel1 = ["s", "s", "s"];
		var recallLevel2 = ["s", "s", "s", "r", "r"];
		var recallLevel3 = ["s", "r", "s", "r", "s", "r"];
		var recallLevel4 = ["r", "s", "r", "s", "r", "s", "r"];
		var recallLevel5 = ["r", "r", "s", "r", "r", "s", "r", "r", "s"];
		var recallLevel6 = ["r", "r", "s", "r", "r", "r", "s", "r", "r", "s"];
		var recallLevel7 = ["r", "r", "s", "r", "r", "r", "s", "r", "r", "s"];
		var recallLevels = new Array();
		recallLevels[0] = recallLevel1;
		recallLevels[1] = recallLevel2;
		recallLevels[2] = recallLevel3;
		recallLevels[3] = recallLevel4;
		recallLevels[4] = recallLevel5;
		recallLevels[5] = recallLevel6;
		recallLevels[6] = recallLevel7;

		return recallLevels[recallLevel-1];
	}

	function buildSpellingChallengePostData (spWordIdArray)
	{
		var variationStr = document.getElementById('R180_SELECTED_ATOM').value;

		var maxTrials;
		var recallLevel;

		// pull info from variations string
		if (variationStr == "Default (40 trials, Recall Level 7, All Correct)")
		{
			maxTrials = 40;
			recallLevel = 7;
		}
		else if (variationStr == "10 Trials, Recall Level 7, All Correct")
		{
			maxTrials = 10;
			recallLevel = 7;
		}
		else if (variationStr == "40 Trials, Recall Level 1 - 6, Random")
		{
			maxTrials = 40;
			recallLevel = getRandomFromTo(1,6);
		}
		else if (variationStr == "Early exit, 20 Trials, Recall Level 3 - 6, Random")
		{
			maxTrials = 20;
			recallLevel = getRandomFromTo(3,6);
		}

		// load recall level
		var recallLevelArray = getSpellingChallengeRecallLevelArray(recallLevel);

		var sPostData = "";

		sPostData += "<spz_spelling_challenge_atom>\n";
		sPostData += " <atom_data>\n";
		sPostData += generateTimingPlaceholderXML();

		if (variationStr.match("Early exit"))
			sPostData += "  <user_directed_navigation>zone_menu</user_directed_navigation>\n";
		else
			sPostData +=  "  <user_directed_navigation/>\n";

		sPostData += " </atom_data>\n";
		sPostData += " <student_data>\n";

		sPostData += "  <current_recall_level>" + recallLevel + "</current_recall_level>\n";
		sPostData += "  <activity_words>\n";

		// split up study vs review words
		var studyWordArray = new Array();
		var reviewWordArray = new Array();
		while (spWordIdArray.length != 0)
		{
			word = spWordIdArray.shift();
			if (word.type == "s")
				studyWordArray.push(word);
			else
				reviewWordArray.push(word);
		}

		var trial = 1;
		var studyWordIndex = 0;
		var reviewWordIndex = 0;
		var recallLevelIndex = 0;
		while (trial <= maxTrials)
		{
			// reset to beginning
			if (recallLevelIndex > recallLevelArray.length-1)
			{
				recallLevelIndex = 0;
				studyWordIndex = 0;
				reviewWordIndex = 0;
			}

			var wordType = recallLevelArray[recallLevelIndex++];
			var wordID;
			var wordText;
			if (wordType == "s")
			{
				if (studyWordIndex >= studyWordArray.length-1) // used up study words
					continue;

				wordID = studyWordArray[studyWordIndex].id;
				wordText = studyWordArray[studyWordIndex].wordText;

				sPostData += "   <activity_word id='" + wordID + "' type='study' ";
				studyWordIndex++;
			}
			else if (wordType == "r")
			{
				if (reviewWordIndex >= reviewWordArray.length-1) // used up review words
					continue;

				wordID = reviewWordArray[reviewWordIndex].id;
				wordText = reviewWordArray[reviewWordIndex].wordText;

				sPostData += "   <activity_word id='" + wordID + "' type='review' ";
				reviewWordIndex++;
			}

			sPostData += "trial='" + trial + "'>\n";
			sPostData += "    <attempts>\n";

			var maxAttempts = getRandomFromTo(1,4); // up to 4 attempts
			for (var attempt = 1; attempt <= maxAttempts; attempt++)
			{
				sPostData += "     <attempt id='" + attempt + "'>\n";

				if (attempt == maxAttempts)
				{
					// final attempt depends on variation
					if (variationStr.match("All Correct"))
						score = "correct";
					else if (variationStr.match("All Missed"))
						score = "incorrect";
					else
						score = getRandomSpellingChallengeScore();

					sPostData += "      <score>" + score + "</score>\n";
					sPostData += "      <response_time>3300</response_time>\n";

					if (score == "incorrect")
						sPostData += "      <misspelling error_code='" + (generateRandomSpellingError()) + "'>" + makeRandomMisspelling(wordText) + "</misspelling>\n";
					else
					 	sPostData += "      <misspelling/>\n";
				}
				else  // previous attempts are always incorrect
				{
					sPostData += "      <score>incorrect</score>\n";
					sPostData += "      <response_time>3300</response_time>\n";
					sPostData += "      <misspelling error_code='" + (generateRandomSpellingError()) + "'>" + makeRandomMisspelling(wordText) + "</misspelling>\n";
				}

				sPostData += "     </attempt>\n";
			}

			sPostData += "    </attempts>\n";
			sPostData += "   </activity_word>\n";

			// increment trial count
			trial++;
		}

		/*
		if ((variationStr.match("40 Trials, Recall Level 7, Random")) ||
			 (variationStr.match("40 Trials, Recall Level 3 - 6, Random")) ||
			 (variationStr.match("Early exit, 20 Trials, Recall Level 3 - 6, Random")))
		{
			if (variationStr.match("40 Trials, Recall Level 7, Random"))
			{
				sPostData += "  <current_recall_level>7</current_recall_level>\n";
			}
			else
			{
				sPostData += "  <current_recall_level>" + (3 + Math.floor(Math.random() * 3)) + "</current_recall_level>\n";
			}


			sPostData += "  <activity_words>\n";

			for (var round = 0; round < roundMax; round++)
			{
				for (var index = 0; index < max; index++)
				{
					var attempts = Math.floor(Math.random() * 3 + 1);

					sPostData +=  "   <activity_word id='" + spWordIdArray[index].id + "' type=";

						if (index < 3)
							sPostData += "'study' ";
						else
							sPostData += "'review' ";

					sPostData +=  " trial='" + (index + 1 + (10 * round)) + "'>\n"+
									  "    <attempts>\n";

					for (var index2 = 0; index2 < attempts; index2++)
					{
						sPostData += "     <attempt id='" + (index2 + 1) + "'>\n";

						if (index2 + 1 < attempts)
						{
							sPostData += "      <score>incorrect</score>\n"+
											 "      <response_time>3300</response_time>\n"+
//											 "      <misspelling error_code='" + (Math.floor(Math.random() * 18) + 1) + "'>" + makeRandomMisspelling (spWordIdArray[index].wordText) + "</misspelling>\n";
											 "      <misspelling error_code='" + (generateRandomSpellingError()) + "'>" + makeRandomMisspelling (spWordIdArray[index].wordText) + "</misspelling>\n";
						}
						else
						{
							sPostData += "      <score>correct</score>\n"+
											 "      <response_time>2200</response_time>\n"+
											 "      <misspelling/>\n";
						}

						sPostData += "     </attempt>\n";
					}

					sPostData += "    </attempts>\n"+
									 "   </activity_word>\n";
				}
			}
		}
		else	// 40 trials, All correct
		{
			sPostData += "  <current_recall_level>7</current_recall_level>\n"+
							 "  <activity_words>\n";

			for (var round = 0; round < 4; round++)
			{
				for (var index = 0; index < max; index++)
				{
					sPostData +=  "   <activity_word id='" + spWordIdArray[index].id + "' type=";

					if (index < 3)
						sPostData += "'study' ";
					else
						sPostData += "'review' ";

					sPostData +=  " trial='" + (index + 1 + (10 * round)) + "'>\n"+
									  "    <attempts>\n"+
									  "     <attempt id='1'>\n"+
									  "      <score>correct</score>\n"+
									  "      <response_time>2200</response_time>\n"+
									  "      <misspelling/>\n"+
									  "     </attempt>\n"+
									  "    </attempts>\n"+
									  "   </activity_word>\n";
				}
			}
		}
		*/

		sPostData += "  </activity_words>\n";
		sPostData += " </student_data>\n";
		sPostData += "</spz_spelling_challenge_atom>";

		return sPostData;
	}



	function buildProofreadingPostData (wordIdArray)
	{
		var sPostData = "";

		sPostData = "<spz_proofreading_atom>\n"+
		" <atom_data>\n"+
		generateTimingPlaceholderXML() +
		"  <user_directed_navigation/>\n"+
		" </atom_data>\n"+
		" <student_data>\n"+
		"  <activity_words>\n";

		for (var index = 0; (index < wordIdArray.length && index < 3); index++)
		{
			sPostData +=  "   <activity_word id='" + wordIdArray[index].id + "'>\n" +
							  "    <sentence_attempts_till_correct>" + (Math.floor(Math.random() * 3) + 1) + "</sentence_attempts_till_correct>\n"+
							  "   </activity_word>\n";
		}

		sPostData += "  </activity_words>\n"+
		" </student_data>\n"+
		"</spz_proofreading_atom>";

		return sPostData;
	}


	function buildContextPassagePostData (passageID, omissionsCount)
	{
		var sPostData = "";
		var variationStr = document.getElementById('R180_SELECTED_ATOM').value;

		sPostData = "<suz_context_passage_atom>\n"+
		" <atom_data>\n"+
		generateTimingPlaceholderXML();

		if (variationStr.match("Default (incorrect, exit)"))
			sPostData += " <user_directed_navigation>zone_menu</user_directed_navigation>\n";
		else
			sPostData += "  <user_directed_navigation/>\n";

		sPostData += " </atom_data>\n"+
		" <student_data>\n"+
		"  <context_passage id='" + passageID + "'>\n"+
		"	 <attempts>1</attempts>\n"+
		"	 <score>correct</score>\n"+
		"	 <omissions_correct_first_attempt>" + omissionsCount + "</omissions_correct_first_attempt>\n"+
		"	 <total_omissions>" + omissionsCount + "</total_omissions>\n"+
		"	 <response_time_first_attempt>55600</response_time_first_attempt>\n"+
		"  </context_passage>\n"+
		" </student_data>\n"+
		"</suz_context_passage_atom>";

		return sPostData;
	}

	function buildDashboardPostData (topic)
	{
		var sPostData = "";

		sPostData +=
		"<dashboard_atom>\n"+
		" <atom_data>\n"+
		generateTimingPlaceholderXML() +
		"  <user_directed_navigation/>\n"+
		" </atom_data>\n"+
		" <student_data>\n"+
		" </student_data>\n"+
		"</dashboard_atom>";

		//since we build it, lets get the the dropdown to match
		document.getElementById('R180_SELECTED_ATOM').value = topic;

		return sPostData;
	}




	function buildTopicSelectionPostData (topic)
		{
			var sPostData = "";

			sPostData +=
			"<topic_selection_atom>\n"+
			" <atom_data>\n"+
			generateTimingPlaceholderXML() +
			"  <user_directed_navigation/>\n"+
			" </atom_data>\n"+
			" <student_data>\n"+
			"  <topic>" + topic + "</topic>\n"+
			" </student_data>\n"+
			"</topic_selection_atom>";

			//since we build it, lets get the the dropdown to match
			document.getElementById('R180_SELECTED_ATOM').value = topic;

			return sPostData;
	}

	//---------------------------------

	function getSidFromResponse(strResp)
	{
		var idx = strResp.indexOf("<sid>");
		if ( idx > -1 )
		{
	    	return strResp.substr(idx+5,32);
	    }
		return null;
	}

	function getUserIDFromResponse(strResp)
	{
		var idx = strResp.indexOf("<user_id>");
		var idx2 = strResp.indexOf("</user_id>");

		if ( idx > -1 )
		{
			if (idx2 > -1)
			{

	    		return strResp.substr(idx+9,((idx2-idx)-9));
	    	}
	    }
		return null;
	}

	function getAtomNameFromResponse (strContent)
	{
		//LT - decouple from display name
		var atomName = "";
		var idx = strContent.indexOf("_atom>") + 4;

		while (strContent.charAt(idx) != '<')
			atomName += strContent.charAt(idx--);

		return atomName.split("").reverse().join("");
		/*
		var idx = strContent.indexOf("<activity><![CDATA[");
		var idx2 = strContent.indexOf("]]></activity>");

		if ((idx > -1) && (idx2 > -1))
		{
	    	return strContent.substr(idx + 19, ((idx2 - idx) - 19));
		}
		return null;
		*/
	}

	function getZoneNameFromResponse (strContent)
	{
		var idx = strContent.indexOf("<zone><![CDATA[");
		var idx2 = strContent.indexOf("]]></zone>");

		if ((idx > -1) && (idx2 > -1))
		{
	    	return strContent.substr(idx + 15, ((idx2 - idx) - 15));
		}
		return null;
	}

	function getQCIDFromResponse (strContent)
	{
		var idx = strContent.indexOf("<question id=");

		if (idx > -1)
		{
			var secondChar = strContent.substr(idx + 15, 1);

			if ((secondChar >= '0') && (secondChar <= '9'))
				return strContent.substr (idx + 14, 2);
			else
				return strContent.substr (idx + 14, 1);
		}
		return null;
	}

	function setAtomXMLPopup ( popupIndex )
	{
		var zoneAtom;
		var atomXML;
		var objAtomXML = document.getElementById('R180_SELECTED_ATOM');

		objAtomXML.options.length = 0;
		var menuLength = 0;

		if (popupIndex.length > 1)
			zoneAtom = ZoneAtomsMapArray[ TheZoneIdx ][ popupIndex ];
		else
			zoneAtom = ZoneAtomsArray[ TheZoneIdx ][ popupIndex ];

		TheZoneAtomIdx = zoneAtom.idx;

		var arr = AtomXMLArray[TheZoneIdx][TheZoneAtomIdx];

		for (var i = 0; i < arr.length; i++)
		{
			objAtomXML.options.length = ++menuLength;
			objAtomXML.options[i].value = arr[i].id;
			objAtomXML.options[i].text = arr[i].name;
		}

		objAtomXML.disabled = false;
		var atomXML = arr[0];
		document.getElementById("R180_SAVEATOM_POSTDATA").value = atomXML.xml;

		perhapsGeneratePostXMLFromGetAtomDataResults();

		// enable/disable zone menu exit checkbox
		var selectedActivity = document.getElementById("R180_SELECTED_ACTIVITY").value;
		if (selectedActivity == "topic_selection_atom" || selectedActivity == "zone_menu_atom" || selectedActivity == "dashboard_atom" || selectedActivity.search("_report") != -1)
		{
			document.getElementById("zone_menu").disabled = true;
		}
		else
		{
			document.getElementById("zone_menu").disabled = false;
		}

	}

	function perhapsGeneratePostXMLFromGetAtomDataResults ()
	{
		// handle cases where we need to generate example post data from the http results
		var httpResponseText = parent.outputFrame.document.getElementById("IF_CF_OUTPUT2").value;
		var theActivityName = getAtomNameFromResponse(httpResponseText);

		// only regenerate post xml if the selected activity popup value matches the http response activity and
		// it is one of a subset that we generate.

		var theSelectedActivityInPopup = document.getElementById('R180_SELECTED_ACTIVITY').value;

		if (theActivityName == "wz_word_assessment_round_atom" && theSelectedActivityInPopup == "wz_word_assessment_round_atom")
			document.getElementById("R180_SAVEATOM_POSTDATA").value = buildWordAssessmentPostData (extractActivityWordListFromGetAtomResults (httpResponseText));

		if (theActivityName == "wz_self_check_atom" && theSelectedActivityInPopup == "wz_self_check_atom")
			document.getElementById("R180_SAVEATOM_POSTDATA").value = buildSelfCheckPostData (extractActivityWordListFromGetAtomResults (httpResponseText));

		if (theActivityName == "wz_speed_challenge_round_atom" && theSelectedActivityInPopup == "wz_speed_challenge_round_atom")
			document.getElementById("R180_SAVEATOM_POSTDATA").value = buildSpeedChallengePostData (extractActivityWordListFromGetAtomResults (httpResponseText));

		if (theActivityName == "wz_word_review_atom" && theSelectedActivityInPopup == "wz_word_review_atom")
			document.getElementById("R180_SAVEATOM_POSTDATA").value = buildWordReviewPostData (extractActivityWordListFromGetAtomResults (httpResponseText));

		if (theActivityName.match("spz_spelling_assessment_round_atom") && theSelectedActivityInPopup.match("spz_spelling_assessment_round_atom"))
			document.getElementById("R180_SAVEATOM_POSTDATA").value = buildSpellingAssessmentPostData (extractSpZActivityWordListFromGetAtomResults (httpResponseText, true, " order="));

		if (theActivityName == "spz_spelling_clinic_atom" && theSelectedActivityInPopup == "spz_spelling_clinic_atom")
			document.getElementById("R180_SAVEATOM_POSTDATA").value = buildSpellingClinicPostData (extractSpZActivityWordListFromGetAtomResults (httpResponseText, false, ">"));

		if (theActivityName == "spz_spelling_challenge_atom" && theSelectedActivityInPopup == "spz_spelling_challenge_atom")
			document.getElementById("R180_SAVEATOM_POSTDATA").value = buildSpellingChallengePostData (extractSpZActivityWordListFromGetAtomResults (httpResponseText, true, " type="));

		if (theActivityName == "spz_proofreading_atom" && theSelectedActivityInPopup == "spz_proofreading_atom")
			document.getElementById("R180_SAVEATOM_POSTDATA").value = buildProofreadingPostData (extractSpZActivityWordListFromGetAtomResults (httpResponseText, true, ">"));

		if (theActivityName == "suz_context_passage_atom" && theSelectedActivityInPopup == "suz_context_passage_atom")
			document.getElementById("R180_SAVEATOM_POSTDATA").value = buildContextPassagePostData (extractSuZContextPassageIDFromGetAtomResults (httpResponseText), extractSuZContextPassageOmissionsCountFromGetAtomResults (httpResponseText));

		if (theActivityName == "topic_selection_atom" && theSelectedActivityInPopup == "topic_selection_atom")
			document.getElementById("R180_SAVEATOM_POSTDATA").value = buildTopicSelectionPostData (topicID);
		
		if (theActivityName == "dashboard_atom" && theSelectedActivityInPopup == "dashboard_atom")
			document.getElementById("R180_SAVEATOM_POSTDATA").value = buildDashboardPostData (extractFirstAvailableTopicFromGetAtomResults (httpResponseText));

		if (theActivityName == "dashboard_atom" && theSelectedActivityInPopup == "dashboard_atom")
			document.getElementById("R180_SAVEATOM_POSTDATA").value = buildDashboardPostData (extractFirstAvailableTopicFromGetAtomResults (httpResponseText));

	}

	function onChooseZone (obj)
	{
		var zoneAtomXML;

		if (obj.value.length > 1)
		{
			var objAtomZones = document.getElementById('R180_SELECTED_ACTIVITY');

				// Oddly, setting the popup length (number of menu items) to 0 doesn't always work.
				// Use menuLength to set the menu items specifically.
			objAtomZones.options.length = 0;
			var menuLength = 0;

			zone = ZonesMap[ obj.value ];
			TheZoneIdx = zone.idx;

			var arr = ZoneAtomsArray[ TheZoneIdx ];

			for (var i = 0; i < arr.length; i++)
			{
				objAtomZones.options.length = ++menuLength;
				objAtomZones.options[i].value = arr[i].id;
				objAtomZones.options[i].text = arr[i].name;
			}
			objAtomZones.disabled = false;
			setAtomXMLPopup ( 0 );
		}
	}

	function onChooseAtom (obj)
	{
		var atomXML;

		if (obj.value.length > 1)
		{
			setAtomXMLPopup ( obj.value );
		}
	}

	function onChooseAtomToSave(obj)
	{
		var atomXML;

		if (obj.value.length > 1)
		{
			atomXML = AtomXMLMapArray[TheZoneIdx][TheZoneAtomIdx][obj.value];
			document.getElementById("R180_SAVEATOM_POSTDATA").value = atomXML.xml;
			topicID = atomXML.id;

			perhapsGeneratePostXMLFromGetAtomDataResults();
		}
		else
		{
			document.getElementById("R180_SAVEATOM_POSTDATA").value = "";
		}
	}

	function onChooseReport (obj)
	{
	}


	function onGetTopicsData ()
	{
		var obj;

		obj = document.getElementById('R180_USERID');

		if (obj.value == "")
		{
			alert("You must specify a user id. Copy it from the XML results of the Login command.");
			obj.focus();
			return;
		}

		obj =  document.getElementById('R180_SID');

		if (obj.value == "")
		{
			alert("You must specify a session id. Copy it from the XML results of the Login command.");
			obj.focus();
			return;
		}

		var parameters;

		parameters = "command=GetTopicsData";
		parameters += "&user_id=" + document.getElementById('R180_USERID').value;
		parameters += "&sid=" +  document.getElementById('R180_SID').value;

		isGetAtom = false;
		sendGetRequest (parameters);
	}

	function onGetReadsData ()
	{
		var obj;

		obj = document.getElementById('R180_USERID');

		if (obj.value == "")
		{
			alert("You must specify a user id. Copy it from the XML results of the Login command.");
			obj.focus();
			return;
		}

		obj =  document.getElementById('R180_SID');

		if (obj.value == "")
		{
			alert("You must specify a session id. Copy it from the XML results of the Login command.");
			obj.focus();
			return;
		}

		obj = document.getElementById("R180_DASH_FILTER_TYPE");

		if (obj.value == "")
		{
			alert("You must specify a filter_type value.");
			obj.focus();
			return;
		}

		obj = document.getElementById("R180_DASH_ITEMS_PER_PAGE");

		if (obj.value == "")
		{
			alert("You must specify an items_per_page value.");
			obj.focus();
			return;
		}

		obj = document.getElementById("R180_DASH_PAGE_NUMBER");

		if (obj.value == "")
		{
			alert("You must a page_number value.");
			obj.focus();
			return;
		}

		var parameters;

		parameters = "command=GetReadsData";

		parameters += "&user_id=" + document.getElementById('R180_USERID').value;
		parameters += "&sid=" +  document.getElementById('R180_SID').value;

		parameters += "&filter_type=" + document.getElementById('R180_DASH_FILTER_TYPE').value;
		parameters += "&items_per_page=" + document.getElementById('R180_DASH_ITEMS_PER_PAGE').value;
		parameters += "&page_number=" + document.getElementById('R180_DASH_PAGE_NUMBER').value;

		isGetAtom = false;
		sendGetRequest (parameters);
	}

	function onGetReportList ()
	{
		var obj;

		obj = document.getElementById('R180_USERID');

		if (obj.value == "")
		{
			alert("You must specify a user id. Copy it from the XML results of the Login command.");
			obj.focus();
			return;
		}

		obj =  document.getElementById('R180_SID');

		if (obj.value == "")
		{
			alert("You must specify a session id. Copy it from the XML results of the Login command.");
			obj.focus();
			return;
		}

		var parameters;

		parameters = "command=GetReportList";
		parameters += "&user_id=" + document.getElementById('R180_USERID').value;
		parameters += "&sid=" +  document.getElementById('R180_SID').value;

		isGetAtom = false;
		sendGetRequest (parameters);
	}

	function onGetReportData ()
	{
		var obj;

		obj = document.getElementById('R180_USERID');

		if (obj.value == "")
		{
			alert("You must specify a user id. Copy it from the XML results of the Login command.");
			obj.focus();
			return;
		}

		obj =  document.getElementById('R180_SID');

		if (obj.value == "")
		{
			alert("You must specify a session id. Copy it from the XML results of the Login command.");
			obj.focus();
			return;
		}

		obj = document.getElementById("R180_DASH_REPORT_ID");

		if (obj.value == "")
		{
			alert("You must specify a report_id value.");
			obj.focus();
			return;
		}

		var parameters;

		parameters = "command=GetReportData";
		parameters += "&user_id=" + document.getElementById('R180_USERID').value;
		parameters += "&sid=" +  document.getElementById('R180_SID').value;
		parameters += "&report_id=" + document.getElementById("R180_DASH_REPORT_ID").value;

		isGetAtom = false;
		sendGetRequest (parameters);
	}

	function onGetPersonalBestData ()
	{
		var obj;

		obj = document.getElementById('R180_USERID');

		if (obj.value == "")
		{
			alert("You must specify a user id. Copy it from the XML results of the Login command.");
			obj.focus();
			return;
		}

		obj =  document.getElementById('R180_SID');

		if (obj.value == "")
		{
			alert("You must specify a session id. Copy it from the XML results of the Login command.");
			obj.focus();
			return;
		}

		var parameters;

		parameters = "command=GetPersonalBestData";
		parameters += "&user_id=" + document.getElementById('R180_USERID').value;
		parameters += "&sid=" +  document.getElementById('R180_SID').value;

		isGetAtom = false;
		sendGetRequest (parameters);
	}

	function onAddBookRating ()
	{
		var obj;

		obj = document.getElementById('R180_USERID');

		if (obj.value == "")
		{
			alert("You must specify a user id. Copy it from the XML results of the Login command.");
			obj.focus();
			return;
		}

		obj =  document.getElementById('R180_SID');

		if (obj.value == "")
		{
			alert("You must specify a session id. Copy it from the XML results of the Login command.");
			obj.focus();
			return;
		}

		obj = document.getElementById("R180_DASH_BOOK_ID");

		if (obj.value == "")
		{
			alert("You must specify a book_id value.");
			obj.focus();
			return;
		}

		obj = document.getElementById("R180_DASH_RATING");

		if (obj.value == "")
		{
			alert("You must specify a rating for the book (1-5).");
			obj.focus();
			return;
		}

		var parameters;

		parameters = "command=AddBookRating";
		parameters += "&user_id=" + document.getElementById('R180_USERID').value;
		parameters += "&sid=" +  document.getElementById('R180_SID').value;
		parameters += "&book_id=" + document.getElementById("R180_DASH_BOOK_ID").value;
		parameters += "&rating=" + document.getElementById("R180_DASH_RATING").value;

		isGetAtom = false;
		sendGetRequest (parameters);
	}



// ********************************************  //
// PREDEFINED COMMAND SET                        //
// ********************************************  //
function setup()
{
	setupdone = true;

	// ********************************************  //
	// The Zones                                     //
	// ********************************************  //

	if (ZonesArray.length == 0)
		addAllZones ();

	// ********************************************  //
	// The Zone Atoms                                //
	// ********************************************  //

	if (ZoneAtomsArray == null)
		prepareForZoneAtoms();

	// ********************************************  //
	// The XML                                       //
	// ********************************************  //

	if (AtomXMLArray == null)
		prepareForXML();

	// ********************************************  //
	// The Reports                                   //
	// ********************************************  //

	addAllReports();

	// ********************************************  //
	// The Specific Atoms                            //
	// ********************************************  //

	addAllSpecificAtoms ();

	// ********************************************  //
	// Topic Selection                //
	// ********************************************  //

	function pad(number, length) {
	    var str = '' + number;
	    while (str.length < length) {
	        str = '0' + str;
	    }
	    return str;
	}

	var atom;
	var zoneAtom;
	var atomXML;
	var zoneID = 0;
	var atomID = 0;

	zoneAtom = new ZoneAtom ("topic_selection_atom", "Topic Selection", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	var stage;
	var topic;
	for (var i=1; i<=3; i++)
	{
		stage = ( (i == 1) ? "A" : ( (i == 2) ? "B" : "C" ) );

		for (var j=1; j<=12; j++)
		{
				topic = stage + pad(j,2);

				atom = new AtomXML(topic,
				"<topic_selection_atom>\n"+
				" <atom_data>\n"+
				generateTimingPlaceholderXML() +
				"  <user_directed_navigation/>\n"+
				" </atom_data>\n"+
				" <student_data>\n"+
				"  <topic>" + topic + "</topic>\n"+
				" </student_data>\n"+
				"</topic_selection_atom>");

				addAtomXML (atom, atomID, zoneID);
		}
	}

/*
	atom = new AtomXML("A01",
	"<topic_selection_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <topic>A01</topic>\n"+
	" </student_data>\n"+
	"</topic_selection_atom>");

	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("A02",
	"<topic_selection_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <topic>A02</topic>\n"+
	" </student_data>\n"+
	"</topic_selection_atom>");

	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("A03",
	"<topic_selection_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <topic>A03</topic>\n"+
	" </student_data>\n"+
	"</topic_selection_atom>");

	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("A04",
	"<topic_selection_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <topic>A04</topic>\n"+
	" </student_data>\n"+
	"</topic_selection_atom>");

	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("B01",
	"<topic_selection_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <topic>B01</topic>\n"+
	" </student_data>\n"+
	"</topic_selection_atom>");

	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("C01",
	"<topic_selection_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <topic>C01</topic>\n"+
	" </student_data>\n"+
	"</topic_selection_atom>");

	addAtomXML (atom, atomID, zoneID);
*/

	// **********************  //
	//       Zone Menu         //
	// **********************  //

	atomID++;

	zoneAtom = new ZoneAtom ("zone_menu_atom", "Zone Menu", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Reading Zone Visit",
	"<zone_menu_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation>reading_zone</user_directed_navigation>\n"+
	" </atom_data>\n"+
	" <student_data/>\n"+
	"</zone_menu_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Word Zone Visit",
	"<zone_menu_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation>word_zone</user_directed_navigation>\n"+
	" </atom_data>\n"+
	" <student_data/>\n"+
	"</zone_menu_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Spelling Zone Visit",
	"<zone_menu_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation>spelling_zone</user_directed_navigation>\n"+
	" </atom_data>\n"+
	" <student_data/>\n"+
	"</zone_menu_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Success Zone Visit",
	"<zone_menu_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation>success_zone</user_directed_navigation>\n"+
	" </atom_data>\n"+
	" <student_data/>\n"+
	"</zone_menu_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Writing Zone Visit",
	"<zone_menu_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation>writing_zone</user_directed_navigation>\n"+
	" </atom_data>\n"+
	" <student_data/>\n"+
	"</zone_menu_atom>");
	addAtomXML (atom, atomID, zoneID);


	// **********************  //
	//     Dashboard       //
	// **********************  //

	atomID++;

	zoneAtom = new ZoneAtom ("dashboard_atom", "Dashboard", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default",
	"<dashboard_atom>\n"+
		" <atom_data>\n"+
		generateTimingPlaceholderXML() +
		"  <user_directed_navigation/>\n"+
		" </atom_data>\n"+
		" <student_data/>\n"+
		"</dashboard_atom>");
	addAtomXML (atom, atomID, zoneID);


	// **********************  //
	//         Reading Zone    //
	// **********************  //

	zoneID++;
	atomID = 0;

	zoneAtom = new ZoneAtom ("rz_video_atom", "Reading Zone Video", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default",
	"<rz_video_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <watch_count>1</watch_count>\n"+
	"  <watch_time>90000</watch_time>\n"+
	" </student_data>\n"+
	"</rz_video_atom>");
	addAtomXML (atom, atomID, zoneID);

	atomID++;

	zoneAtom = new ZoneAtom ("rz_reading_passage_atom", "Reading Passage", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default",
	"<rz_reading_passage_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <speed_level>2</speed_level>\n"+
	"  <words_defined>14</words_defined>\n"+
	"  <words_pronounced>1</words_pronounced>\n" +
	"  <full_reads>\n"+
	"   <word>1</word>\n"+
	"   <phrase>0</phrase>\n"+
	"   <practice>1</practice>\n"+
	"   <recording>0</recording>\n"+
	"   <self_check>0</self_check>\n"+
	"  </full_reads>\n"+
	"  <self_checks/>\n"+
	" </student_data>\n"+
	"</rz_reading_passage_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("With 1 Self Check",
	"<rz_reading_passage_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <speed_level>2</speed_level>\n"+
	"  <words_defined>14</words_defined>\n"+
	"  <words_pronounced>1</words_pronounced>\n" +
	"  <full_reads>\n"+
	"   <word>1</word>\n"+
	"   <phrase>0</phrase>\n"+
	"   <practice>0</practice>\n"+
	"   <recording>1</recording>\n"+
	"   <self_check>1</self_check>\n"+
	"  </full_reads>\n"+
	"  <self_checks>\n"+
	"	<self_check id='1'>\n"+
	"	 <words_correct_per_minute>44</words_correct_per_minute>\n"+
	"	</self_check>\n"+
	"  </self_checks>\n"+
	" </student_data>\n"+
	"</rz_reading_passage_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("User-directed to video",
	"<rz_reading_passage_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation>rz_video</user_directed_navigation>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <speed_level>2</speed_level>\n"+
	"  <words_defined>14</words_defined>\n"+
	"  <words_pronounced>1</words_pronounced>\n" +
	"  <full_reads>\n"+
	"   <word>1</word>\n"+
	"   <phrase>0</phrase>\n"+
	"   <practice>0</practice>\n"+
	"   <recording>1</recording>\n"+
	"   <self_check>1</self_check>\n"+
	"  </full_reads>\n"+
	"  <self_checks>\n"+
	"	<self_check id='1'>\n"+
	"	 <words_correct_per_minute>44</words_correct_per_minute>\n"+
	"	</self_check>\n"+
	"  </self_checks>\n"+
	" </student_data>\n"+
	"</rz_reading_passage_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("User-directed to Zone Menu",
	"<rz_reading_passage_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation>zone_menu</user_directed_navigation>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <speed_level>2</speed_level>\n"+
	"  <words_defined>14</words_defined>\n"+
	"  <words_pronounced>1</words_pronounced>\n" +
	"  <full_reads>\n"+
	"   <word>1</word>\n"+
	"   <phrase>0</phrase>\n"+
	"   <practice>0</practice>\n"+
	"   <recording>1</recording>\n"+
	"   <self_check>1</self_check>\n"+
	"  </full_reads>\n"+
	"  <self_checks>\n"+
	"	<self_check id='1'>\n"+
	"	 <words_correct_per_minute>44</words_correct_per_minute>\n"+
	"	</self_check>\n"+
	"  </self_checks>\n"+
	" </student_data>\n"+
	"</rz_reading_passage_atom>");
	addAtomXML (atom, atomID, zoneID);

	atomID++;

	zoneAtom = new ZoneAtom ("rz_quick_check_question_atom", "Quick Check", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Question 1, 2 attempts",
	"<rz_quick_check_question_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <question id='1'>\n"+
	"   <score>correct</score>\n"+
	"   <attempts>2</attempts>\n"+
	"  </question>\n"+
	" </student_data>\n"+
	"</rz_quick_check_question_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Question 2, correct",
	"<rz_quick_check_question_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <question id='2'>\n"+
	"   <score>correct</score>\n"+
	"   <attempts>1</attempts>\n"+
	"  </question>\n"+
	" </student_data>\n"+
	"</rz_quick_check_question_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Question 3",
	"<rz_quick_check_question_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <question id='3'>\n"+
	"   <score>correct</score>\n"+
	"   <attempts>1</attempts>\n"+
	"  </question>\n"+
	" </student_data>\n"+
	"</rz_quick_check_question_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Question 4",
	"<rz_quick_check_question_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <question id='4'>\n"+
	"   <score>correct</score>\n"+
	"   <attempts>1</attempts>\n"+
	"  </question>\n"+
	" </student_data>\n"+
	"</rz_quick_check_question_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Question 5",
	"<rz_quick_check_question_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <question id='5'>\n"+
	"   <score>correct</score>\n"+
	"   <attempts>1</attempts>\n"+
	"  </question>\n"+
	" </student_data>\n"+
	"</rz_quick_check_question_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Question 6",
	"<rz_quick_check_question_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <question id='6'>\n"+
	"   <score>correct</score>\n"+
	"   <attempts>1</attempts>\n"+
	"  </question>\n"+
	" </student_data>\n"+
	"</rz_quick_check_question_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Question 7",
	"<rz_quick_check_question_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <question id='7'>\n"+
	"   <score>correct</score>\n"+
	"   <attempts>1</attempts>\n"+
	"  </question>\n"+
	" </student_data>\n"+
	"</rz_quick_check_question_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Question 8",
	"<rz_quick_check_question_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <question id='8'>\n"+
	"   <score>correct</score>\n"+
	"   <attempts>1</attempts>\n"+
	"  </question>\n"+
	" </student_data>\n"+
	"</rz_quick_check_question_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Question 9",
	"<rz_quick_check_question_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <question id='9'>\n"+
	"   <score>correct</score>\n"+
	"   <attempts>1</attempts>\n"+
	"  </question>\n"+
	" </student_data>\n"+
	"</rz_quick_check_question_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Question 10",
	"<rz_quick_check_question_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <question id='10'>\n"+
	"   <score>correct</score>\n"+
	"   <attempts>1</attempts>\n"+
	"  </question>\n"+
	" </student_data>\n"+
	"</rz_quick_check_question_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Question 11",
	"<rz_quick_check_question_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <question id='11'>\n"+
	"   <score>correct</score>\n"+
	"   <attempts>1</attempts>\n"+
	"  </question>\n"+
	" </student_data>\n"+
	"</rz_quick_check_question_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Question 12",
	"<rz_quick_check_question_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <question id='12'>\n"+
	"   <score>correct</score>\n"+
	"   <attempts>1</attempts>\n"+
	"  </question>\n"+
	" </student_data>\n"+
	"</rz_quick_check_question_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Question 13",
	"<rz_quick_check_question_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <question id='13'>\n"+
	"   <score>correct</score>\n"+
	"   <attempts>1</attempts>\n"+
	"  </question>\n"+
	" </student_data>\n"+
	"</rz_quick_check_question_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Question 14",
	"<rz_quick_check_question_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <question id='14'>\n"+
	"   <score>correct</score>\n"+
	"   <attempts>1</attempts>\n"+
	"  </question>\n"+
	" </student_data>\n"+
	"</rz_quick_check_question_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Question 15",
	"<rz_quick_check_question_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <question id='15'>\n"+
	"   <score>correct</score>\n"+
	"   <attempts>1</attempts>\n"+
	"  </question>\n"+
	" </student_data>\n"+
	"</rz_quick_check_question_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Question 2, incorrect",
	"<rz_quick_check_question_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <question id='2'>\n"+
	"   <score>incorrect</score>\n"+
	"   <attempts>1</attempts>\n"+
	"  </question>\n"+
	" </student_data>\n"+
	"</rz_quick_check_question_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Question 3, user-directed to reading passage",
	"<rz_quick_check_question_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation>rz_reading_passage</user_directed_navigation>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <question id='2'>\n"+
	"   <score>correct</score>\n"+
	"   <attempts>1</attempts>\n"+
	"  </question>\n"+
	" </student_data>\n"+
	"</rz_quick_check_question_atom>");
	addAtomXML (atom, atomID, zoneID);

	atomID++;

	zoneAtom = new ZoneAtom ("rz_quick_check_progress_report_atom", "Quick Check Progress Report", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default",
	"<rz_quick_check_progress_report_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data/>\n"+
	"</rz_quick_check_progress_report_atom>");
	addAtomXML (atom, atomID, zoneID);

	atomID++;

	zoneAtom = new ZoneAtom ("rz_progress_report_atom", "Reading Progress Report", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default",
	"<rz_progress_report_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data/>\n"+
	"</rz_progress_report_atom>");
	addAtomXML (atom, atomID, zoneID);

	// **********************  //
	//         Word Zone       //
	// **********************  //

	zoneID++;
	atomID = 0;

	zoneAtom = new ZoneAtom ("wz_word_assessment_round_atom", "Word Assessment Round", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("First 1 Missed, Remaining Fluent",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("First 2 Missed, Remaining Fluent",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("First 5 Missed, Remaining Fluent",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("All Missed",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("All Fluent",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Random",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Mid-assessment Exit",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atomID++;
	zoneAtom = new ZoneAtom ("wz_word_clinic_atom", "Word Clinic", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default",
	"<wz_word_clinic_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	"</wz_word_clinic_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("User directed to Zone Menu",
	"<wz_word_clinic_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation>zone_menu</user_directed_navigation>\n"+
	" </atom_data>\n"+
	"</wz_word_clinic_atom>");
	addAtomXML (atom, atomID, zoneID);

	atomID++;
	zoneAtom = new ZoneAtom ("wz_word_match_atom", "Word Match", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default",
	"<wz_word_match_atom>\n" +
	" <atom_data>\n" +
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n" +
	" <student_data>\n" +
	"  <correct_matches_first_attempt>2</correct_matches_first_attempt>\n"+
	"  <total_attempts>3</total_attempts>\n"+
	" </student_data>\n" +
	"</wz_word_match_atom>");
	addAtomXML (atom, atomID, zoneID);


	atomID++;
	zoneAtom = new ZoneAtom ("wz_self_check_atom", "Self Check", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default",
	"<wz_self_check_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	"</wz_word_clinic_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("1 Round Complete Previously",
	"<wz_self_check_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	"</wz_word_clinic_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("2 Rounds Complete Previously",
	"<wz_self_check_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	"</wz_word_clinic_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Exit with 1 Round Complete",
	"<wz_self_check_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation>zone_menu</user_directed_navigation>\n"+
	" </atom_data>\n"+
	"</wz_word_clinic_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Exit with 2 Rounds Complete",
	"<wz_self_check_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation>zone_menu</user_directed_navigation>\n"+
	" </atom_data>\n"+
	"</wz_word_clinic_atom>");
	addAtomXML (atom, atomID, zoneID);


	atomID++;
	zoneAtom = new ZoneAtom ("wz_speed_challenge_round_atom", "Speed Challenge", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default (30 trials, Recall Level 4, All Correct)",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("30 trials, Recall Level 4, All Correct, Failed Review",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("30 trials, Recall Level 3, All Missed",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("15 Trials, Recall Level 4, All Correct",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("30 Trials, Recall Level 1 - 6, Random",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Early exit, 20 Trials, Recall Level 3 - 6, Random",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

/*
	atom = new AtomXML("Default",
	"<wz_speed_challenge_round_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <current_recall_level>4</current_recall_level>\n"+
	"  <activity_words>\n"+
	"   <activity_word id='A01_01_01_word_001_00068' type='study' trial='1'>\n"+
	"     <recall_level>3</recall_level>\n"+
	"     <score>correct</score>\n"+
	"    </activity_word>\n"+
	"   <activity_word id='A01_01_01_word_002_00325' type='study' trial='2'>\n"+
	"     <recall_level>3</recall_level>\n"+
	"     <score>correct</score>\n"+
	"    </activity_word>\n"+
	"   <activity_word id='A01_01_01_word_003_00559' type='study' trial='3'>\n"+
	"     <recall_level>3</recall_level>\n"+
	"     <score>correct</score>\n"+
	"    </activity_word>\n"+
	"   <activity_word id='A01_01_01_word_004_00661' type='study' trial='4'>\n"+
	"     <recall_level>3</recall_level>\n"+
	"     <score>correct</score>\n"+
	"    </activity_word>\n"+
	"   <activity_word id='A01_01_01_word_005_00675' type='study' trial='5'>\n"+
	"     <recall_level>3</recall_level>\n"+
	"     <score>correct</score>\n"+
	"    </activity_word>\n"+
	"   <activity_word id='A01_01_01_word_006_00701' type='review' trial='6'>\n"+
	"     <recall_level>3</recall_level>\n"+
	"     <score>missed</score>\n"+
	"    </activity_word>\n"+
	"   <activity_word id='A01_01_01_word_007_00410' type='review' trial='7'>\n"+
	"     <recall_level>3</recall_level>\n"+
	"     <score>missed</score>\n"+
	"    </activity_word>\n"+
	"   <activity_word id='A01_01_01_word_008_00473' type='review' trial='8'>\n"+
	"     <recall_level>3</recall_level>\n"+
	"     <score>correct</score>\n"+
	"    </activity_word>\n"+
	"   <activity_word id='A01_01_01_word_009_00800' type='review' trial='9'>\n"+
	"     <recall_level>3</recall_level>\n"+
	"     <score>correct</score>\n"+
	"    </activity_word>\n"+
	"  </activity_words>\n"+
	" </student_data>\n"+
	"</wz_speed_challenge_round_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("All Correct",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("All Missed",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("30 Trials, Recall Level 3, Random",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("20 Trials, Recall Level 2, Random, Exit",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);
*/

	atomID++;
	zoneAtom = new ZoneAtom ("wz_word_review_atom", "Word Review", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default",
	"<wz_word_review_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <review_word_score>95</review_word_score>\n"+
	"  <phases>\n"+
	"   <phase id='1'>\n"+
	"    <activity_words>\n"+
	"     <activity_word id='A01_01_01_word_001_00068' trial='1'>\n"+
	"      <score>missed</score>\n"+
	"      <response_time>2300</response_time>\n"+
	"     </activity_word>\n"+
	"     <activity_word id='A01_01_01_word_002_00325' trial='2'>\n"+
	"      <score>missed</score>\n"+
	"      <response_time>2300</response_time>\n"+
	"     </activity_word>\n"+
	"    </activity_words>\n"+
	"   </phase>\n"+
	"   <phase id='2'>\n"+
	"    <activity_words>\n"+
	"     <activity_word id='A01_01_01_word_003_00559' trial='1'>\n"+
	"      <score>missed</score>\n"+
	"      <response_time>2300</response_time>\n"+
	"     </activity_word>\n"+
	"     <activity_word id='A01_01_01_word_004_00661' trial='2'>\n"+
	"      <score>missed</score>\n"+
	"      <response_time>2300</response_time>\n"+
	"     </activity_word>\n"+
	"    </activity_words>\n"+
	"   </phase>\n"+
	"  </phases>\n"+
	" </student_data>\n"+
	"</wz_word_review_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("All Correct",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("All Missed",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Half Correct",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("No Phase 2",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atomID++;
	zoneAtom = new ZoneAtom ("wz_progress_report_atom", "Word Zone Progress Report", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default",
	"<wz_progress_report_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data/>\n"+
	"</wz_progress_report_atom>");
	addAtomXML (atom, atomID, zoneID);

	// **********************  //
	//     Spelling Zone       //
	// **********************  //

	zoneID++;
	atomID = 0;

	zoneAtom = new ZoneAtom ("spz_spelling_assessment_round_atom", "Spelling Assessment Round", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default (all correct)",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("First 1 Missed, Remaining Fluent",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("First 2 Missed, Remaining Fluent",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("First 3 Missed, Remaining Fluent",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("All Missed",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Random",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Mid-assessment Exit",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atomID++;
	zoneAtom = new ZoneAtom ("spz_spelling_clinic_atom", "Spelling Clinic", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);


	atomID++;
	zoneAtom = new ZoneAtom ("spz_spelling_challenge_atom", "Spelling Challenge", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default (40 trials, Recall Level 7, All Correct)",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("10 Trials, Recall Level 7, All Correct",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("40 Trials, Recall Level 1 - 6, Random",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Early exit, 20 Trials, Recall Level 3 - 6, Random",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);


	atomID++;
	zoneAtom = new ZoneAtom ("spz_cls_report_atom", "CLS Report", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default",
	"<spz_cls_report_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data/>\n"+
	"</spz_cls_report_atom>");
	addAtomXML (atom, atomID, zoneID);


	atomID++;
	zoneAtom = new ZoneAtom ("spz_proofreading_atom", "Proofreading", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);


	atomID++;
	zoneAtom = new ZoneAtom ("spz_progress_report_atom", "Spelling Zone Progress Report", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default",
	"<spz_progress_report_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data/>\n"+
	"</spz_progress_report_atom>");
	addAtomXML (atom, atomID, zoneID);

	// **********************  //
	//     Success Zone       //
	// **********************  //

	zoneID++;
	atomID = 0;

	zoneAtom = new ZoneAtom ("suz_discrepancy_passages_atom", "Discrepancy Passages", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default (Correct, 1 attempt)",
	"<suz_discrepancy_passages_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <attempts>1</attempts>\n"+
	"  <score>correct</score>\n"+
	" </student_data>\n"+
	"</suz_discrepancy_passages_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Incorrect, 1 attempts",
	"<suz_discrepancy_passages_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <attempts>1</attempts>\n"+
	"  <score>incorrect</score>\n"+
	" </student_data>\n"+
	"</suz_discrepancy_passages_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("User-directed to video",
	"<suz_discrepancy_passages_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation>suz_video</user_directed_navigation>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <attempts>0</attempts>\n"+
	"  <score>incorrect</score>\n"+
	" </student_data>\n"+
	"</suz_discrepancy_passages_atom>");
	addAtomXML (atom, atomID, zoneID);


	atomID++;
	zoneAtom = new ZoneAtom ("suz_video_atom", "Success Zone Video", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default",
	"<suz_video_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <watch_count>1</watch_count>\n"+
	"  <watch_time>90000</watch_time>\n"+
	" </student_data>\n"+
	"</suz_video_atom>");
	addAtomXML (atom, atomID, zoneID);


	atomID++;
	zoneAtom = new ZoneAtom ("suz_context_passage_atom", "Context Passages", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);


	atom = new AtomXML("Default (Correct, 1 attempt)",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);


	atom = new AtomXML("Default (incorrect, exit)",
	"generated_from_getatomdata_results_xml");
	addAtomXML (atom, atomID, zoneID);


	atomID++;
	zoneAtom = new ZoneAtom ("suz_final_recording_atom", "Final Recording", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default",
	"<suz_final_recording_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <valid_recordings>3</valid_recordings>\n"+
	"  <words_read>56</words_read>\n"+
	"  <approved_recording>\n"+
	"   <recording_length>120000</recording_length>\n"+
	"   <self_check_words_missed>7</self_check_words_missed>\n"+
	"   <words_correct_per_minute>24</words_correct_per_minute>\n"+
	"  </approved_recording>\n"+
	" </student_data>\n"+
	"</suz_final_recording_atom>");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("No approved recording",
	"<suz_final_recording_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data>\n"+
	"  <valid_recordings>1</valid_recordings>\n"+
	"  <words_read>56</words_read>\n"+
	" </student_data>\n"+
	"</suz_final_recording_atom>");
	addAtomXML (atom, atomID, zoneID);


	atomID++;
	zoneAtom = new ZoneAtom ("suz_topic_progress_report_atom", "Success Zone Topic Progress Report", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default",
	"<suz_topic_progress_report_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data/>\n"+
	"</suz_topic_progress_report_atom>");
	addAtomXML (atom, atomID, zoneID);


	// **********************  //
	//     Writing Zone       //
	// **********************  //

	zoneID++;
	atomID = 0;

	zoneAtom = new ZoneAtom ("wrz_respond_and_write_atom", "Respond and Write", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default",
	"<wrz_respond_and_write_atom>\n"+
	"	<atom_data>\n"+
	generateTimingPlaceholderXML() +
	"		<user_directed_navigation/>\n"+
	" </atom_data>\n"+
	"	<student_data>\n"+
	"		<current_period>publish</current_period>\n"+
	"		<topic_sentence>\n"+
	"			<selection>positive</selection>\n"+
	"			<done_flag>true</done_flag>\n"+
	"		</topic_sentence >\n"+
	"		<write>\n"+
	"			<sentences>\n"+
	"				<sentence id='sentence2'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='sentence3'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='conclusion'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"			</sentences>\n"+
  "		</write>\n"+
	"		<self_check>\n"+
	"			<sentences>\n"+
	"				<sentence id='sentence2'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='sentence3'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='conclusion'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"			</sentences>\n"+
	"			<strong_reasons>\n"+
	"				<rating>average</rating>\n"+
	"				<go_on_flag>true</go_on_flag>\n"+
	"				<text_edited_flag>true</text_edited_flag>\n"+
	"			</strong_reasons>\n"+
	"			<precise_words>\n"+
	"				<rating>average</rating>\n"+
	"				<show_me_flag>true</show_me_flag>\n"+
	"				<text_edited_flag>true</text_edited_flag>\n"+
	"				<outstanding_errors_flag>true</outstanding_errors_flag>\n"+
	"			</precise_words>\n"+
	"			<complete_sentences>\n"+
	"				<rating>average</rating>\n"+
	"				<show_me_flag>true</show_me_flag>\n"+
	"				<text_edited_flag>true</text_edited_flag>\n"+
	"				<outstanding_errors_flag>true</outstanding_errors_flag>\n"+
	"			</complete_sentences>\n"+
	"			<correct_spelling>\n"+
	"				<rating>average</rating>\n"+
	"				<show_me_flag>true</show_me_flag>\n"+
	"				<text_edited_flag>true</text_edited_flag>\n"+
	"				<outstanding_errors_flag>true</outstanding_errors_flag>\n"+
	"			</correct_spelling>\n"+
	"		</self_check>\n"+
	"		<publish>\n"+
	"			<recording_played_back_flag>true</recording_played_back_flag>\n"+
	"			<text_edited_flag>true</text_edited_flag>\n"+
	"			<send_flag>true</send_flag>\n"+
	"			<text><![CDATA[Birds have very pretty wings. Birds are very pretty colors. Birds are wonderfully beautiful things!]]></text>\n"+
	"		</publish>\n"+
	"		<metrics>\n"+
	"			<full_reads>\n"+
	"				<phrase>2</phrase>\n"+
	"			</full_reads>\n"+
	"			<periods>\n"+
	"				<period>read</period>\n"+
	"				<period>topic_sentence_selection</period>\n"+
	"				<period>topic_sentence_presentation</period>\n"+
	"				<period>supporting_sentences</period>\n"+
	"				<period>conclusion</period>\n"+
	"				<period>strong_reasons</period>\n"+
	"				<period>precise_words</period>\n"+
	"				<period>complete_sentences</period>\n"+
	"				<period>correct_spelling</period>\n"+
	"				<period>publish</period>\n"+
	"			</periods>\n"+
	"			<button_clicks>\n"+
 	"				<button_click id='record'>2</button_click>\n"+
	"				<button_click id='passage'>2</button_click>\n"+
	"				<button_click id='video'>2</button_click>\n"+
	"			</button_clicks>\n"+
	"		</metrics>\n"+
	"	</student_data>\n"+
	"</wrz_respond_and_write_atom>\n");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Topic Sentence Selection zone_menu exit",
	"<wrz_respond_and_write_atom>\n"+
	"	<atom_data>\n"+
	generateTimingPlaceholderXML() +
	"		<user_directed_navigation>zone_menu</user_directed_navigation>\n"+
	" </atom_data>\n"+
	"	<student_data>\n"+
	"		<current_period>publish</current_period>\n"+
	"		<topic_sentence>\n"+
	"			<selection>positive</selection>\n"+
	"			<done_flag>false</done_flag>\n"+
	"		</topic_sentence >\n"+
	"		<write>\n"+
	"			<sentences>\n"+
	"				<sentence id='sentence2'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'/>\n"+
	"						<editable_text id='2'/>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='sentence3'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'/>\n"+
	"						<editable_text id='2'/>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='conclusion'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'/>\n"+
	"						<editable_text id='2'/>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"			</sentences>\n"+
  "		</write>\n"+
	"		<self_check>\n"+
	"			<sentences>\n"+
	"				<sentence id='sentence2'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'/>\n"+
	"						<editable_text id='2'/>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='sentence3'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'/>\n"+
	"						<editable_text id='2'/>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='conclusion'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'/>\n"+
	"						<editable_text id='2'/>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"			</sentences>\n"+
	"			<strong_reasons>\n"+
	"				<rating/>\n"+
	"				<go_on_flag>false</go_on_flag>\n"+
	"				<text_edited_flag>false</text_edited_flag>\n"+
	"			</strong_reasons>\n"+
	"			<precise_words>\n"+
	"				<rating/>\n"+
	"				<show_me_flag>false</show_me_flag>\n"+
	"				<text_edited_flag>false</text_edited_flag>\n"+
	"				<outstanding_errors_flag>false</outstanding_errors_flag>\n"+
	"			</precise_words>\n"+
	"			<complete_sentences>\n"+
	"				<rating/>\n"+
	"				<show_me_flag>false</show_me_flag>\n"+
	"				<text_edited_flag>false</text_edited_flag>\n"+
	"				<outstanding_errors_flag>false</outstanding_errors_flag>\n"+
	"			</complete_sentences>\n"+
	"			<correct_spelling>\n"+
	"				<rating/>\n"+
	"				<show_me_flag>false</show_me_flag>\n"+
	"				<text_edited_flag>false</text_edited_flag>\n"+
	"				<outstanding_errors_flag>false</outstanding_errors_flag>\n"+
	"			</correct_spelling>\n"+
	"		</self_check>\n"+
	"		<publish>\n"+
	"			<recording_played_back_flag>false</recording_played_back_flag>\n"+
	"			<text_edited_flag>false</text_edited_flag>\n"+
	"			<send_flag>false</send_flag>\n"+
	"			<text/>\n"+
	"		</publish>\n"+
	"		<metrics>\n"+
	"			<full_reads>\n"+
	"				<phrase>2</phrase>\n"+
	"			</full_reads>\n"+
	"			<periods>\n"+
	"				<period>read</period>\n"+
	"				<period>topic_sentence_selection</period>\n"+
	"			</periods>\n"+
	"			<button_clicks>\n"+
 	"				<button_click id='record'>2</button_click>\n"+
	"				<button_click id='passage'>2</button_click>\n"+
	"				<button_click id='video'>2</button_click>\n"+
	"			</button_clicks>\n"+
	"		</metrics>\n"+
	"	</student_data>\n"+
	"</wrz_respond_and_write_atom>\n");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Topic Sentence Selection resume and complete",
	"<wrz_respond_and_write_atom>\n"+
	"	<atom_data>\n"+
	generateTimingPlaceholderXML() +
	"		<user_directed_navigation/>\n"+
	" </atom_data>\n"+
	"	<student_data>\n"+
	"		<current_period>publish</current_period>\n"+
	"		<topic_sentence>\n"+
	"			<selection>positive</selection>\n"+
	"			<done_flag>true</done_flag>\n"+
	"		</topic_sentence >\n"+
	"		<write>\n"+
	"			<sentences>\n"+
	"				<sentence id='sentence2'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='sentence3'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='conclusion'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"			</sentences>\n"+
  "		</write>\n"+
	"		<self_check>\n"+
	"			<sentences>\n"+
	"				<sentence id='sentence2'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wings.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wings.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='sentence3'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wings.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wings.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='conclusion'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wings.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wings.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"			</sentences>\n"+
	"			<strong_reasons>\n"+
	"				<rating>average</rating>\n"+
	"				<go_on_flag>true</go_on_flag>\n"+
	"				<text_edited_flag>true</text_edited_flag>\n"+
	"			</strong_reasons>\n"+
	"			<precise_words>\n"+
	"				<rating>average</rating>\n"+
	"				<show_me_flag>true</show_me_flag>\n"+
	"				<text_edited_flag>true</text_edited_flag>\n"+
	"				<outstanding_errors_flag>true</outstanding_errors_flag>\n"+
	"			</precise_words>\n"+
	"			<complete_sentences>\n"+
	"				<rating>average</rating>\n"+
	"				<show_me_flag>true</show_me_flag>\n"+
	"				<text_edited_flag>true</text_edited_flag>\n"+
	"				<outstanding_errors_flag>true</outstanding_errors_flag>\n"+
	"			</complete_sentences>\n"+
	"			<correct_spelling>\n"+
	"				<rating>average</rating>\n"+
	"				<show_me_flag>true</show_me_flag>\n"+
	"				<text_edited_flag>true</text_edited_flag>\n"+
	"				<outstanding_errors_flag>true</outstanding_errors_flag>\n"+
	"			</correct_spelling>\n"+
	"		</self_check>\n"+
	"		<publish>\n"+
	"			<recording_played_back_flag>true</recording_played_back_flag>\n"+
	"			<text_edited_flag>true</text_edited_flag>\n"+
	"			<send_flag>true</send_flag>\n"+
	"			<text><![CDATA[Birds have very pretty wings. Birds are very pretty colors. Birds are wonderfully beautiful things!]]></text>\n"+
	"		</publish>\n"+
	"		<metrics>\n"+
	"			<full_reads>\n"+
	"				<phrase>2</phrase>\n"+
	"			</full_reads>\n"+
	"			<periods>\n"+
	"				<period>topic_sentence_selection</period>\n"+
	"				<period>topic_sentence_presentation</period>\n"+
	"				<period>supporting_sentences</period>\n"+
	"				<period>conclusion</period>\n"+
	"				<period>strong_reasons</period>\n"+
	"				<period>precise_words</period>\n"+
	"				<period>complete_sentences</period>\n"+
	"				<period>correct_spelling</period>\n"+
	"				<period>publish</period>\n"+
	"			</periods>\n"+
	"			<button_clicks>\n"+
 	"				<button_click id='record'>2</button_click>\n"+
	"				<button_click id='passage'>2</button_click>\n"+
	"				<button_click id='video'>2</button_click>\n"+
	"			</button_clicks>\n"+
	"		</metrics>\n"+
	"	</student_data>\n"+
	"</wrz_respond_and_write_atom>\n");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Complete Sentences zone_menu exit",
	"<wrz_respond_and_write_atom>\n"+
	"	<atom_data>\n"+
	generateTimingPlaceholderXML() +
	"		<user_directed_navigation/>\n"+
	" </atom_data>\n"+
	"	<student_data>\n"+
	"		<current_period>publish</current_period>\n"+
	"		<topic_sentence>\n"+
	"			<selection>positive</selection>\n"+
	"			<done_flag>true</done_flag>\n"+
	"		</topic_sentence >\n"+
	"		<write>\n"+
	"			<sentences>\n"+
	"				<sentence id='sentence2'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='sentence3'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='conclusion'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"			</sentences>\n"+
  "		</write>\n"+
	"		<self_check>\n"+
	"			<sentences>\n"+
	"				<sentence id='sentence2'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='sentence3'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='conclusion'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"			</sentences>\n"+
	"			<strong_reasons>\n"+
	"				<rating>average</rating>\n"+
	"				<go_on_flag>true</go_on_flag>\n"+
	"				<text_edited_flag>true</text_edited_flag>\n"+
	"			</strong_reasons>\n"+
	"			<precise_words>\n"+
	"				<rating>average</rating>\n"+
	"				<show_me_flag>true</show_me_flag>\n"+
	"				<text_edited_flag>true</text_edited_flag>\n"+
	"				<outstanding_errors_flag>true</outstanding_errors_flag>\n"+
	"			</precise_words>\n"+
	"			<complete_sentences>\n"+
	"				<rating>average</rating>\n"+
	"				<show_me_flag>false</show_me_flag>\n"+
	"				<text_edited_flag>false</text_edited_flag>\n"+
	"				<outstanding_errors_flag>false</outstanding_errors_flag>\n"+
	"			</complete_sentences>\n"+
	"			<correct_spelling>\n"+
	"				<rating/>\n"+
	"				<show_me_flag>false</show_me_flag>\n"+
	"				<text_edited_flag>false</text_edited_flag>\n"+
	"				<outstanding_errors_flag>false</outstanding_errors_flag>\n"+
	"			</correct_spelling>\n"+
	"		</self_check>\n"+
	"		<publish>\n"+
	"			<recording_played_back_flag>false</recording_played_back_flag>\n"+
	"			<text_edited_flag>false</text_edited_flag>\n"+
	"			<send_flag>false</send_flag>\n"+
	"			<text/>\n"+
	"		</publish>\n"+
	"		<metrics>\n"+
	"			<full_reads>\n"+
	"				<phrase>2</phrase>\n"+
	"			</full_reads>\n"+
	"			<periods>\n"+
	"				<period>read</period>\n"+
	"				<period>topic_sentence_selection</period>\n"+
	"				<period>topic_sentence_presentation</period>\n"+
	"				<period>supporting_sentences</period>\n"+
	"				<period>conclusion</period>\n"+
	"				<period>strong_reasons</period>\n"+
	"				<period>precise_words</period>\n"+
	"				<period>complete_sentences</period>\n"+
	"			</periods>\n"+
	"			<button_clicks>\n"+
 	"				<button_click id='record'>2</button_click>\n"+
	"				<button_click id='passage'>2</button_click>\n"+
	"				<button_click id='video'>2</button_click>\n"+
	"			</button_clicks>\n"+
	"		</metrics>\n"+
	"	</student_data>\n"+
	"</wrz_respond_and_write_atom>\n");
	addAtomXML (atom, atomID, zoneID);

	atom = new AtomXML("Complete Sentences resume and complete",
	"<wrz_respond_and_write_atom>\n"+
	"	<atom_data>\n"+
	generateTimingPlaceholderXML() +
	"		<user_directed_navigation/>\n"+
	" </atom_data>\n"+
	"	<student_data>\n"+
	"		<current_period>publish</current_period>\n"+
	"		<topic_sentence>\n"+
	"			<selection>positive</selection>\n"+
	"			<done_flag>true</done_flag>\n"+
	"		</topic_sentence >\n"+
	"		<write>\n"+
	"			<sentences>\n"+
	"				<sentence id='sentence2'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='sentence3'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='conclusion'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wigs.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"			</sentences>\n"+
  "		</write>\n"+
	"		<self_check>\n"+
	"			<sentences>\n"+
	"				<sentence id='sentence2'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wings.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wings.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='sentence3'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wings.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wings.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"				<sentence id='conclusion'>\n"+
	"					<editable_texts>\n"+
	"						<editable_text id='1'><![CDATA[pretty wings.]]></editable_text>\n"+
	"						<editable_text id='2'><![CDATA[pretty wings.]]></editable_text>\n"+
	"					</editable_texts>\n"+
	"				</sentence>\n"+
	"			</sentences>\n"+
	"			<strong_reasons>\n"+
	"				<rating>average</rating>\n"+
	"				<go_on_flag>true</go_on_flag>\n"+
	"				<text_edited_flag>true</text_edited_flag>\n"+
	"			</strong_reasons>\n"+
	"			<precise_words>\n"+
	"				<rating>average</rating>\n"+
	"				<show_me_flag>true</show_me_flag>\n"+
	"				<text_edited_flag>true</text_edited_flag>\n"+
	"				<outstanding_errors_flag>true</outstanding_errors_flag>\n"+
	"			</precise_words>\n"+
	"			<complete_sentences>\n"+
	"				<rating>average</rating>\n"+
	"				<show_me_flag>true</show_me_flag>\n"+
	"				<text_edited_flag>true</text_edited_flag>\n"+
	"				<outstanding_errors_flag>true</outstanding_errors_flag>\n"+
	"			</complete_sentences>\n"+
	"			<correct_spelling>\n"+
	"				<rating>average</rating>\n"+
	"				<show_me_flag>true</show_me_flag>\n"+
	"				<text_edited_flag>true</text_edited_flag>\n"+
	"				<outstanding_errors_flag>true</outstanding_errors_flag>\n"+
	"			</correct_spelling>\n"+
	"		</self_check>\n"+
	"		<publish>\n"+
	"			<recording_played_back_flag>true</recording_played_back_flag>\n"+
	"			<text_edited_flag>true</text_edited_flag>\n"+
	"			<send_flag>true</send_flag>\n"+
	"			<text><![CDATA[Birds have very pretty wings. Birds are very pretty colors. Birds are wonderfully beautiful things!]]></text>\n"+
	"		</publish>\n"+
	"		<metrics>\n"+
	"			<full_reads>\n"+
	"				<phrase>2</phrase>\n"+
	"			</full_reads>\n"+
	"			<periods>\n"+
	"				<period>complete_sentences</period>\n"+
	"				<period>correct_spelling</period>\n"+
	"				<period>publish</period>\n"+
	"			</periods>\n"+
	"			<button_clicks>\n"+
 	"				<button_click id='record'>2</button_click>\n"+
	"				<button_click id='passage'>2</button_click>\n"+
	"				<button_click id='video'>2</button_click>\n"+
	"			</button_clicks>\n"+
	"		</metrics>\n"+
	"	</student_data>\n"+
	"</wrz_respond_and_write_atom>\n");
	addAtomXML (atom, atomID, zoneID);

	atomID++;
	zoneAtom = new ZoneAtom ("wrz_topic_progress_report_atom", "Writing Zone Topic Progress Report", zoneID, atomID);
	addZoneAtom (zoneAtom, zoneID);

	atom = new AtomXML("Default",
	"<wrz_topic_progress_report_atom>\n"+
	" <atom_data>\n"+
	generateTimingPlaceholderXML() +
	"  <user_directed_navigation/>\n"+
	" </atom_data>\n"+
	" <student_data/>\n"+
	"</wrz_topic_progress_report_atom>");
	addAtomXML (atom, atomID, zoneID);

}

/********
 * Testing Area
 * *******/

function _display()
{
	for(var i=0; i<AtomXMLArray.length;i++)
	{
		for(var j=0;j<AtomXMLArray[i].length;j++)
			{
				console.log("========="+i+"======="+j+"======"+"\n");
				console.log(AtomXMLArray[i][j][0]);
			}
	}
}
function _login()
{
	parameters = "command=LoginValidate";
	parameters += "&username=ss4"; 
	parameters += "&password=Welcome_1"; 
	parameters += "&community=R180NG";
	parameters += "&replace_session=1";

	parameters += "&client_datetime=" + Date.parse(Date());
	isGetAtom = false;
	_sendGetRequest (parameters);	
}
function _sendGetRequest(parameters)
{
	var https = require('https');

	//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
	var options = {
	  host: 'integration5.education.scholastic.com',
	  path: '/r180ng/core.cd?'+ parameters
	};

	callback = function(response) {
	  var str = '';

	  //another chunk of data has been recieved, so append it to `str`
	  response.on('data', function (chunk) {
	    str += chunk;
	  });

	  //the whole response has been recieved, so we just print it out here
	  response.on('end', function () {
		
	    console.log(str);
	    var sid = getSidFromResponse (str);
	    console.log("Sid:===="+sid);
	    var userid = getUserIDFromResponse (str);
	    console.log("User ID:===="+userid);
	  });
	};

	https.request(options, callback).end();
}

function testing_area()
{
	console.log(generateRealTimingXML());
}

testing_area();





