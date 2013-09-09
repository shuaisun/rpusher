
var http = require("http"),
    url = require("url"),
	util = require("util"),
	qs = require('querystring')
	content_gen = require('./content_gen_lib');

function endPostRequest(data,request,response)
{
	data = decodeURI(data);
	var POST =  qs.parse(data);
	//console.log(POST.content);
	console.log(POST.variation);
	gen_content = content_gen.generateFakeActivityXML(POST.content,POST.variation);
	console.log(gen_content);
	response.writeHead(200, {
		 'Content-Type': 'text/plain'
	});
	response.end(gen_content);
}

function endGetRequest(request,response)
{	
	var _get = url.parse(request.url, true).query;
	response.writeHead(200, {
		 'Content-Type': 'text/plain'
	});
	response.end('Here is your data: ' + _get['terminate']);
	process.exit(0);

}

function onRequest(request, response)
{	
	if(request.method === "POST") {
	                //Handle "POST" Request
	    var data = "";
		           
		request.on("data", function(chunk) {                      //Data Listener
			data += chunk;
		});
		
		request.on(
			'end', 
			function ()
			{ endPostRequest(data,request,response);}            //End of Post Listener
		);
	}
	
	else{          //Handle "GET" Request	
		request.on(
			'end', 
			function () 
			{ endGetRequest(request,response);}             //End of Get Listener
		);
	}
}
	
http.createServer(onRequest).listen(8123);

