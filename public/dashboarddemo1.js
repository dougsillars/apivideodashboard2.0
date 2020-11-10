const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const live = urlParams.get('live');
console.log("live?",live);
var framerate = 10;
var audioBitrate = 11025;
var width = 240;
var height = 240;
var livestreamTimeout = 15000;
var livestreamOk = true;


if(live){
	
	var mediaRecorder;
 	//var socket =io();
 	var socket;
	
	var state ="stop";
	console.log("state initiated = " +state); 
	connect_server();
   
    
   
      //onloadstuff
    window.onload = function(){
		//dragand drop for live
		dropVideo();
		//style radio buttons
		radioButton();
		
    //define the video player  and url 
    //only start the live player X seconds after starting recording
        setTimeout(function (){
     
			var liveManifest = document.getElementById("liveManifest").innerHTML;
			var liveResponse = document.getElementById("liveResponse").innerHTML;
			//{ "liveStreamId": "li2kvDGqdxa0q5AsOOBaGA1k", "streamKey": "3622465d-7de4-44ce-bc70-49b09484efb7", "name": "website live4", "record": false, "broadcasting": true, "assets": { "iframe": "<iframe src=\"https://embed.api.video/live/li2kvDGqdxa0q5AsOOBaGA1k\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\" allowfullscreen=\"\"></iframe>", "player": "https://embed.api.video/live/li2kvDGqdxa0q5AsOOBaGA1k", "hls": "https://live.api.video/li2kvDGqdxa0q5AsOOBaGA1k.m3u8", "thumbnail": "https://cdn.api.video/live/li2kvDGqdxa0q5AsOOBaGA1k/thumbnail.jpg" } }
			
			
			console.log("liveResponse",liveResponse);
			//<div id="liveManifest" style="display:none">https://live.api.video/li1kkTR1SwmEpuIZB2Dg9mBw.m3u8  </div>
			//liveManifest https://live.api.video/li2kvDGqdxa0q5AsOOBaGA1k.m3u8  
			var jsonResponse = JSON.parse(liveResponse);
			var videoId = jsonResponse.liveStreamId;
			var playerUrl = jsonResponse.assets.player;
			var responseString = "<a href='"+playerUrl+"#autoplay' target='_blank'>Your livestream is ready to view!</a>";
			console.log("videoId",videoId);
	
				
			//now we can enter the livestream JSON response... but only if the playback is ok
			//livestreamOk onlu fails if you dont give camera access - or if you use safarii
			if(livestreamOk){
				//place the JSON into the response area
			//	document.getElementsByClassName("result__server__body")[0].innerHTML = liveResponse;
				document.getElementsByClassName("resultsWrapper")[0].innerHTML = responseString;
			}
		  },livestreamTimeout);  
		  
		  


	  }
	
	

}else{
	
	//not live
	window.onload = function(){
		

		radioButton();
   		dropVideo();
	}
		
}


function radioButton(){
	var useSandbox = document.getElementById("useSandbox").innerHTML;
	useSandbox = useSandbox.trim();
	var productionAvailable = document.getElementById("productionAvailable").innerHTML;
	productionAvailable = productionAvailable.trim();
	console.log("useSandbox", useSandbox, typeof(useSandbox), useSandbox.length);
	
	if(useSandbox === "true"){
		document.getElementById("sandbox").checked = "true";
		console.log("checking sandbox radio");
		document.getElementById("vodsandbox").value="true";
		document.getElementById("livesandbox").value="true";

		document.getElementById("sandboxDiv").className="sandboxActive";
		document.getElementById("productionDiv").className="production";
	}else if(useSandbox === "false"){
		//productiion
		document.getElementById("production").checked = "true";
		console.log("checking prod radio");
		document.getElementById("vodsandbox").value="false";
		document.getElementById("livesandbox").value="false";

		document.getElementById("sandboxDiv").className="sandbox";
		document.getElementById("productionDiv").className="productionActive";
	}
	if(productionAvailable ==="false"){
		//disable the prodction radio button
		document.getElementById("production").disabled = "true";
		document.getElementsByClassName("production")[0].style.color = "gray";
	}
	
	//now - what if the default was overridden by the user
	
	var radioSandbox = document.getElementById("sandboxDiv");
	var radioProduction = document.getElementById("productionDiv");
	radioSandbox.addEventListener('click', function(){
		document.getElementById("sandbox").checked = "true";
		console.log("checking sandbox radio");
		document.getElementById("vodsandbox").value="true";
		document.getElementById("livesandbox").value="true";
		console.log("sandbox clicked");

		document.getElementById("sandboxDiv").className="sandboxActive";
		document.getElementById("productionDiv").className="production";
	});
	//only chage stuff to productionif production is possible
	if(productionAvailable ==="true"){
		radioProduction.addEventListener('click', function(){
		
	
			document.getElementById("production").checked = "true";
			console.log("checking prod radio");
			document.getElementById("vodsandbox").value="false";
			document.getElementById("livesandbox").value="false";
			console.log("prod clicked");

			document.getElementById("sandboxDiv").className="sandbox";
			document.getElementById("productionDiv").className="productionActive";
		
		});
	}
}
 
function dropVideo(){
	
	let dropArea = document.getElementsByClassName("action__upload")[0];
	console.log(dropArea);

	dropArea.addEventListener('dragenter', preventDefaults, false);
	dropArea.addEventListener('dragleave', preventDefaults, false);
	dropArea.addEventListener('dragover', preventDefaults, false);
	dropArea.addEventListener('drop', preventDefaults, false);

	;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
		dropArea.addEventListener(eventName, preventDefaults, false);
		console.log("prevented defauls");
	})

	function preventDefaults (e) {
	  e.preventDefault()
	  e.stopPropagation()
	}

	dropArea.addEventListener('drop', handleDrop, false);

	function handleDrop(e) {
		let dt = e.dataTransfer;
		console.log("dt", dt);
		
		//the drop gives me a file list
		let fileList = dt.files;
		console.log("filelist?",fileList);
   	 	//just do the form here
		var fileElement = document.getElementById("file");
		//var newFileList = new FileList();
		fileElement.files =fileList ;
		console.log("fileElement", fileElement.files);
		//var upload = document.getElementById('upload');
		
		
		
		//forminJS.append('username', 'Chris');
	    //forminJS.append('source', file[0], 'myvideo.mp4');
		//console.log("forminJSuserbname",forminJS.getAll('username'));
		//console.log("forminJSfile",forminJS.getAll('source'));
		//console.log("forminJS", forminJS);
		
        //uploadForm.submit("/", method = 'POST',  enctype="multipart/form-data");
	    //var fileElement = document.getElementById('file');
		//fileElement.files[0] = file[0];
		
		//console.log("formData2",formData);
		//console.log("fileelement",fileElement);
		//console.log("fileelement files",fileElement.files);
		//uploadForm.submit("/", method = 'POST',  enctype="multipart/form-data");
        uploadForm.submit("/", method = 'POST',  enctype="multipart/form-data");
	 
	  }
  }
		
	
	
	




 
 function thisFileUpload() {
    //get VOD video to upload
	 const fileElement = document.getElementById('file');
	 fileElement.click();
	//upload file to NodeJS for upload to api.video
	fileElement.addEventListener("change", function() {	
		console.log("fileslist", fileElement.files);
	    console.log("file selected", document.getElementById('file').files[0]);
		uploadForm.submit("/", method = 'POST',  enctype="multipart/form-data");
		 
		});
    //send to Node server to uploa
	console.log('done');
};

 function initiateLivestream() {
	 //set up livestream
	 //warm up the camera
	 connect_server();
	
	 livestreamForm.requestSubmit();
	
  }




function video_show(stream){
	console.log("videoshow");
	//console.log("output_video", output_video);
	if ("srcObject" in output_video) {
	//	console.log("videoshowif");
		output_video.muted = true;
		output_video.srcObject = stream;
		
	} else {
	//	console.log("videoshowelse");
		output_video.src = window.URL.createObjectURL(stream);
		
	}
  output_video.addEventListener( "loadedmetadata", function (e) {
	  console.log("outputvideoevent listener");
  		console.log(output_video);
		output_message.innerHTML="Local video source size:"+output_video.videoWidth+"x"+output_video.videoHeight ;
	}, false );
	//console.log("output_video", output_video);
}

function show_output(str){
	output_console+="\n"+str;
	console.log("response data",str);
	output_console.scrollTop = output_console.scrollHeight;
};

	function connect_server(){

		var socketio_address = "/";
		console.log("connect server started");
		navigator.getUserMedia = (navigator.mediaDevices.getUserMedia ||
                          navigator.mediaDevices.mozGetUserMedia ||
                          navigator.mediaDevices.msGetUserMedia ||
                          navigator.mediaDevices.webkitGetUserMedia);
		if(!navigator.getUserMedia){fail('No getUserMedia() available.');}
	//	if(!MediaRecorder){fail('No MediaRecorder available.');}
        
		var socketOptions = {secure: true, reconnection: true, reconnectionDelay: 1000, timeout:15000, pingTimeout: 			15000, pingInterval: 45000,query: {framespersecond: framerate, audioBitrate: audioBitrate}};
		
		//start socket connection
		console.log("socket address", socketio_address);
		socket = io.connect(socketio_address, socketOptions);
		console.log("socket", socket);
		// console.log("ping interval =", socket.pingInterval, " ping TimeOut" = socket.pingTimeout);
 		//output_message.innerHTML=socket;
		
		socket.on('connect_timeout', (timeout) => {
   			console.log("state on connection timeout= " +timeout);
			output_message.innerHTML="Connection timed out";
			//recordingCircle.style.fill='gray';
			
		});
		socket.on('error', (error) => {
   			console.log("state on connection error= " +error);
			output_message.innerHTML="Connection error";
		//	recordingCircle.style.fill='gray';
		});
		
		socket.on('connect_error', function(){ 
   			console.log("state on connection error= " +state);
			console.log("Connection Failed");
			output_message.innerHTML="Connection Failed";
		//	recordingCircle.style.fill='gray';
		});

		socket.on('message',function(m){
			console.log("state on message= " +state);
			console.log('recv server message',m);
			output_message.innerHTML+=('SERVER:'+m);
			
		});

		socket.on('fatal',function(m){

			output_message.innerHTML+=('Fatal ERROR: unexpected:'+m);
			//alert('Error:'+m);
			console.log("fatal socket error!!", m);
			console.log("state on fatal error= " +state);
			//already stopped and inactive
			console.log('media recorder restarted');
			//recordingCircle.style.fill='gray';
			
			//mediaRecorder.start();
			//state="stop";
			//restart the server
	
		
			//should reload?
		});
		
		socket.on('ffmpeg_stderr',function(m){
			//this is the ffmpeg output for each frame
			output_message.innerHTML+=('FFMPEG:'+m);	
		});

		socket.on('disconnect', function (reason) {
			console.log("state disconec= " +state);
			output_message.innerHTML+=('ERROR: server disconnected!');
			console.log('ERROR: server disconnected!' +reason);
			
			//error message to users
			//document.getElementsByClassName("resultsWrapper")[0].innerHTML
			document.getElementsByClassName("resultsWrapper")[0].innerHTML="This demo requires a steady internet connection with a fast upload rate. Please try again later.";
					
	
		});
	
		state="ready";
		console.log("connected state = " +state);
		console.log("connect server successful");
	//	output_message.innerHTML="connect server successful";
		requestMedia();
}
function requestMedia(){
/*	var audioBitrate = 11025;
	var width = 240;
	var height = 240;
	var framerate = 15;
	*/
	console.log("request media");
	var constraints = { audio: {sampleRate: audioBitrate},
		video:{
	        width: { min: 100, ideal: width, max: 1920 },
	        height: { min: 100, ideal: height, max: 1080 },
			frameRate: {ideal: framerate}
	    }
	};
	console.log(constraints);
	navigator.getUserMedia = (navigator.mediaDevices.getUserMedia ||
                      navigator.mediaDevices.mozGetUserMedia ||
                      navigator.mediaDevices.msGetUserMedia ||
                      navigator.mediaDevices.webkitGetUserMedia);
	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		console.log("settings", stream);
		
		//let supported = navigator.mediaDevices.getSupportedConstraints();
		//console.log("supported details", supported);
		//console.log("chose the camera");
		//removed for production
		//to see local video add a class video_show to the page
		//video_show(stream);//only show locally, not remotely
		//recordingCircle.style.fill='red';
		//socket.emit('config_rtmpDestination', url);
		socket.emit('start','start');
		mediaRecorder = new MediaRecorder(stream);
		mediaRecorder.start(250);

		//show remote stream
		var livestream = document.getElementsByClassName("Livestream");
		console.log("adding live stream");
		livestream.innerHtml = "test";

		mediaRecorder.onstop = function(e) {
			console.log("stopped!");
			console.log(e);
			//stream.stop();
				
		}
		
		mediaRecorder.onpause = function(e) {
			console.log("media recorder paused!!");
			console.log(e);
			//stream.stop();
				
		}
		
		mediaRecorder.onerror = function(event) {
			let error = event.error;
			console.log("error", error.name);

  	  };	
		
		mediaRecorder.ondataavailable = function(e) {
		//  console.log("ondataavailable");
		  socket.emit("binarystream",e.data);
		  state="start";
		  //chunks.push(e.data);
		}
	}).catch(function(err) {
		//console.log('The following error occured: ' + err);
		//this goes to the 
		//show_output('Live stream error:'+err);
		console.log('Live stream error:'+err);
		console.log(err);
		var error ="unknown";
		var errorMessage = "Sorry, an unknown error occurred.";
		var blackbox = document.getElementsByClassName("resultsWrapper");
		//there is only one element with the class resultsWrapper
		if(err.message){
			error = err.message;
		}
		
		
		if(error.includes("MediaRecorder")){
			console.log("error", error);
			//getUserMedia is not supported in the browser (probably safari)
			errorMessage="Sorry, but your browser does not support the MediaRecorder API required for live streaming.  Please try Firefox, Chrome or Edge.";
		}else if("The request is not allowed"){
			errorMessage="Sorry, but you must allow camera and microphone access to record video.";
			
		}
				//livestream is not ok :(
					livestreamOk = false;
		blackbox[0].innerHTML=errorMessage;
		 state="stop";
		
	});
}


function stopStream(){
	  	console.log("stop pressed:");
	  	//stream.getTracks().forEach(track => track.stop())
	  	mediaRecorder.stop();
	 // 	recordingCircle.style.fill='gray';

}