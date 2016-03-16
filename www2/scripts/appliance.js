
var serverTimeout;
/* some general clean up for the page */

/* turns child elements on/off when a checkbox is selected */
function toggleChild(rel) {
    jQuery("ul[rel='" + rel + "']").toggleClass('hide');
}

/* turns hint on/off with a checkbox */
function toggleHints() {
    jQuery('.hint').toggleClass('hide').toggleClass('show');
}

/* adds placeholders dynamically */
jQuery(document).ready(function() {
  // $('.ip').attr('placeholder', '192.168.1.1');
   //$('.port').attr('placeholder', '5080');
  // $('.phone').attr('placeholder', '(800) 123-4567');
  // $('.email').attr('placeholder', 'email@streem.net');
	$('.status.errorSystem').hide();
	$('.status.stopped').hide();
	$('.status.running').hide();
	
	//clear the <select> elements
	
	
	loadPersistStorage();
	
	//get the stuff from storage
	_key = appStorage.get('_key');
	_userId = appStorage.get('_userId');
	_userName = appStorage.get('_userName');
	_email = appStorage.get('_email');
	
	//change the name on the page
	$('.profile-name').text(_userName);
	$('.profile-widget-main h2').replaceWith("<h2>"+_userName+"</h2>");
	$('.profile-widget-main p').replaceWith("<p>"+ _email + "</p>");
	
	//show the loading screen
	showLoadingScreen();
	
	checkFormValidationSoftware();
	
	//get server possible settings for select bars
	getServerConfigPossbileValues();
	
	//hide the loading screen
	hideLoadingScreenMessage();
	
	//one time System status
	getSystemStatusFromServer();
	
	//one time internet connection
	getInternetConnectionFromServer();
	
	//one time streem version
	getStreemVersionFromServer();
	
	window.setInterval(function() {
		getSystemStatusFromServer();
	}, 15000);
	
	//get the internet connection every 15 seconds
	window.setInterval(function() {
		getInternetConnectionFromServer();
	}, 15000);
	
	//get streem version every 15 seconds
	window.setInterval(function() {
		getStreemVersionFromServer();
	}, 15000);
	
	
});

/* function to add a row to the Outbound Translations table dynamically */
function addToList(event) {
    event.defaultPrevented;
	
	//get the existing row count
	var numRows = $("#sortable tbody > tr").length;
	
    var pattern         = jQuery("#ot_control #ot_pattern").val();
    var translation     = jQuery("#ot_control #ot_translation").val();
    var comment         = jQuery("#ot_control #ot_comments").val();
    var list            = jQuery("#ot_list").html();
	var row = numRows + 1;
	var rowString = "<td>" + row + "</td>";
    var iPattern        = "<td><span class='display-text'>" + pattern + "</span><input type='text' class='hide' name='ot_text' id='ot_input_text' value='" + pattern + "' /></td>";
    var iTranslation    = "<td><span class='display-text'>" + translation + "</span><input type='text' class='hide' name='ot_translation' id='ot_input_translation' value='" + translation + "' /></td>";
    var iComment        = "<td><span class='display-text'>" + comment + "</span><input type='text' class='hide' name='ot_comments' id='ot_input_comments' value='" + comment + "' /></td>";
    var iButtons        = "<td><span class='icon edit-item'></span><span class='icon save-item hide'></span><span class='icon remove-item'></span><span class='icon move-item'></span></td>";
    var data            = "<tr class='ui-sortable-handle'>" + rowString + iPattern + iTranslation + iComment + iButtons + "</tr>";
    jQuery("#ot_list").html(list + data);
    jQuery("#ot_control").find('input').val('');
}

/* other functions used for the Outbound Translations table 
 * and other functionality related to the page
 */
jQuery(function($) {
    /* adjusts sizing to prevent a display issue when drag/drop is used */
    var fixHelper = function(e, ui) {
        ui.children().each(function() {
            $(this).width($(this).width());
        });
        return ui;
    };

    /* enables drag/drop on tables */
    $("#sortable tbody").sortable({
            helper: fixHelper,
            cursor: "move"
    });
    
   
    /* when the "delete" button is clicked in the table, this removes that row */
    $('#ot_list').on("click", ".remove-item", function() {
        $(this).parents("tr").remove();
		updateTranslationOrder();
    });
    
    /* when the "edit" button is clicked, this hides the spans and shows the inputs */
    $('#ot_list').on("click", ".edit-item", function() {
        $(this).toggleClass('hide');
        $(this).next('.save-item').toggleClass('hide');
        $(this).parents("tr").find(".display-text").toggleClass('hide');
        $(this).parents("tr").find("input").toggleClass('hide');
	
    });
	

    /* when the inputs within the table are updated, update the span to use the same value */
    //$("#ot_list").on("change", "input", function() {
    //   $(this).prev('.display-text').html($(this).val());
    //   /* unfortunately hacky addition, to deal with jQuery oddities toward dyanmically created inputs */
    //   $(this).attr('value', ($(this).val()));
    //});
    
    /* when the "save" button is click, hide the inputs, show the spans */
    $('#ot_list').on("click", ".save-item", function() {
        $(this).toggleClass('hide');
	$(this).parents("tr").find(".display-text").each(function() {
	   var value = $(this).next('input').val();
	   $(this).html(value);
	});	
        $(this).prev('.edit-item').toggleClass('hide');
        $(this).parents("tr").find(".display-text").toggleClass('hide');
        $(this).parents("tr").find("input").toggleClass('hide');      
    });    
	
	
	$("#sortable tbody").on("sortstop", function(event, ui) {
		updateTranslationOrder();
	});
	
	
	if(getUrlValue()["platformType"] === "software")
	{
		$("#transmit_enabled").change(function() {
			
			if($(this).is(":checked")) 
			{
				//enable the "#transmit_request_enabled"
				$("#transmit_request_enabled").removeAttr("disabled");
			}
			else
			{
				$("#transmit_request_enabled").attr("disabled", true);	
				$("#transmit_request_enabled").attr("checked", false);
				
			}			
		});
		
		
		$("#receive_enabled").change(function() {
			
			if($(this).is(":checked")) 
			{
				$("#receive_request_enabled").removeAttr("disabled");
			}
			else
			{
				$("#receive_request_enabled").attr("disabled", true);
				$("#receive_request_enabled").attr("checked", false);
			}				
		});	
	}
	
	
})

function updateTranslationOrder()
{
	var rowNumb = 1;
	$("#sortable tbody > tr").each ( function (i , val) {			
		$("td:first", this).text(rowNumb++);				
	});
}


/**
 * Function to retrieve streem server related configuration settings
 */
function getDataFromServer()
{
	$.ajax({
		url: '/api/server-config' + '?_=' + getTime(),
		type: 'GET',
		dataType: 'json',
		headers: {"Authorization":"Appliance " + _key
				 },
		success: function(data) {
			currData = data; //stores the server data to object
			var errCode = data.errCode;
			var errMsg = data.errMsg;
			if(errCode === '0')
			{
				var platFormType = getUrlValue()["platformType"];
				
				if(platFormType === "software")
				{
					updatePBXSettingsOnPage(data);	
				}
				else if(platFormType === "hardware")
				{
					updatePRISettingsOnPage(data);
				}
			}		
		},
		error: function(xhr, status, error) {		
			if(xhr.status == 401)
			{
				alert("Session Expired. Log in again");	
				onClickOfLogout();
			}
		}		
	});
}

/**
 * Function to save config data to server
 */
function saveConfigDataToServer(dataObject)
{
	showSavingScreen();
	var jsonData = JSON.stringify(dataObject);
	
	$.ajax({
		url: '/api/server-config' + '?_=' + getTime(),
		type: 'PUT',
		dataType: 'json',
		data: jsonData,
		jsonp: false,
		headers: {"Content-Type":"application/json",
				  "Accept":"application/json",
				  "Authorization":"Appliance " + _key
				 },
		success: function(resultData) {
			var errCode = resultData.errCode;
			var errMsg = resultData.errMsg;			
			
			alert(errMsg);
			
			if(errCode === "0")
			{
				clearCommonPageData();
				getServerConfigPossbileValues();
			}			
		},
		error: function(xhr, status, error){
			if(xhr.status == 401)
			{
				alert("Session Expired. Log in again");	
				onClickOfLogout();
			}
		},
		complete: function(resultData) {
			if(resultData.status != 200)
			{
				alert(resultData.statusText);	
			}
			hideLoadingScreenMessage();
			$("#saveBtnId").removeAttr("disabled");
		}		
	});
	
}

/**
 * Function to retrieve internet connection from streem server
 */
function getInternetConnectionFromServer()
{
	$.ajax({
		url: '/api/status/internetConnection' + '?_=' + getTime(),
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			updateInternetConnectionLabel(data);				
		},
		error: function(xhr, status, error) {	
			
			if(xhr.status == 0)
			{
				var data = {};
				data.internetConnection = false;
				updateInternetConnectionLabel(data);
			}
			
		}		
	});
}

function getStreemVersionFromServer()
{
	$.ajax({
		url: '/api/status/streemVersion' + '?_=' + getTime(),
		type: 'GET',
		dataType: 'json',
		headers: {"Authorization":"Appliance " + _key
				 },
		success: function(data) {
			
			if(typeof data.errCode === "undefined") 
			{
				updateStreemVersionLabel(data);	
			}
		},
		error: function(xhr, status, error) {			
			if(xhr.status == 401)
			{
				alert("Session Expired. Log in again");	
				onClickOfLogout();
			}
		}		
	});
	
}

function getServerConfigPossbileValues()
{
	$.ajax({
		url: '/api/server-settings' + '?_=' + getTime(),
		type: 'GET',
		dataType: 'json',
		headers: {"Authorization":"Appliance " + _key
				 },
		success: function(data) {
			//loadFaxHeaderSelector(data);
			
			var platFormType = getUrlValue()["platformType"];
			
			if(platFormType === "hardware")
			{
				loadPRISelectorSettings(data);
			}
		},
		error: function(xhr, status, error) {	
			if(xhr.status == 401)
			{
				alert("Session Expired. Log in again");	
				onClickOfLogout();
			}
			else if(xhr.status != 0)
			{
				alert(xhr.statusText);	
			}
		},
		complete: function (data) {
			//now get configuration data
			getDataFromServer();	
		}
	});
}

function savePBXPage()
{
	var commonData = grabCommonSettingsBetweenPRIAndPBX();
	var pbxData = grabPBXSettings();
	
	var data = $.extend({}, commonData, pbxData);
	
	if(showAlertBoxForUpdates(data) == true)
	{
		$("#saveBtnId").attr("disabled",true);
		saveConfigDataToServer(data);
	}
}

function savePRIPage()
{
	var commonData = grabCommonSettingsBetweenPRIAndPBX();
	var priData = grabPRISettings();
	var data = $.extend({}, commonData, priData);
	
	if(showAlertBoxForUpdates(data) == true)
	{
		$("#saveBtnId").attr("disabled",true);
		saveConfigDataToServer(data);
	}
}

function serverRestartBtnClick()
{
	var response = confirm("Server will be restarted");
	
	if(response == true)
	{
		$("#loading-text-id").html("Restarting Server... <br /> <small>This will take a few minutes</small>");
		$("#messageDia").dialog({
			dialogClass: 'alert',
			model: true,	
			width: 350
		});	
		$(".ui-dialog-titlebar").hide();
		$("#messageDia").focus();
		$("#restartServerBtn").attr("disabled", true);
		$("#restartBtn").attr("disabled",true);
		sendServerRestartRequest();	
	}
	
}

function servicesRestartBtnClick()
{
	var res = confirm("Services will be restarted within 3 mins");
	if(res == true)
	{
		$("#loading-text-id").html("Restarting Services... <br /> <small>This will take a few minutes</small>");
		$("#messageDia").dialog({
			dialogClass: 'alert',
			model: true,	
			width: 350
		});	
		$(".ui-dialog-titlebar").hide();
		$("#messageDia").focus();
		$("#restartBtn").attr("disabled",true);
		sendServicesRestartRequest();	
	}
}

/**
 * Function to restart the server
 * Procedure:
 * Request will be sent and return back with 'success' that it will be restarted within 30 seconds
 * 
 * Now it should track/send multiple requests after ward
 */
function sendServerRestartRequest()
{
	$.ajax({
		url: '/api/server/restart' + '?_=' + getTime(),
		type: 'PUT',
		dataType: 'json',
		data: '{}',
		jsonp: false,
		headers: {"Content-Type":"application/json",
				  "Accept":"application/json",
				  "Authorization":"Appliance " + _key
				 },
		success: function(resultData) {
			var errCode = resultData.errCode;
			var errMsg = resultData.errMsg;			
			
			if(errCode === "0")
			{				
				serverTimeout = window.setInterval(function() {
					trackRestartServerProgress();
				}, 15000);
			} 
			else
			{
				alert(errMsg);
				$("#restartBtn").removeAttr("disabled");
				$("#restartServerBtn").removeAttr("disabled");
				$("#messageDia").dialog('close');
			}
			
			
		},
		error: function(xhr, status, error){
			if(xhr.status == 401)
			{
				alert("Session Expired. Log in again");	
				onClickOfLogout();
			}
			else if(xhr.status !=0)
			{
				alert(xhr.statusText);
				$("#restartBtn").removeAttr("disabled");
				$("#restartServerBtn").removeAttr("disabled");
				$("#messageDia").dialog('close');
			}
			
		},
		complete: function(resultData) {
		}	
	});	
}

/**
 * This function will track the server restart progress during restart process
 * 
 * //THIS HAS NOTHING TO DO WITH THE FUNCTIONALITY
 */
function trackRestartServerProgress()
{
	$.ajax({
		url: '/api/status/system' + '?_=' + getTime(),
		type: 'GET',
		dataType: 'json',
		headers: {"Authorization":"Appliance " + _key
				 },
		success: function(data) {
			
			//we receive something//
			//now stop the call that was set using time interval
			if(data.errCode === "0" || data.errCode === "-1") {
				$("#restartBtn").removeAttr("disabled");
				$("#restartServerBtn").removeAttr("disabled");
				$("#messageDia").dialog('close');
				window.clearInterval(serverTimeout);
				getSystemStatusFromServer();
			}
			
		},
		error: function(xhr, status, error) {	
			if(xhr.status == 401)
			{
				alert("Session Expired. Log in again");	
				onClickOfLogout();
			}
		},
		complete: function (data) {
			
		}
	});
	
}


function sendServicesRestartRequest()
{
	$.ajax({
		url: '/api/server/restartServices' + '?_=' + getTime(),
		type: 'PUT',
		dataType: 'json',
		data: '{}',
		jsonp: false,
		headers: {"Content-Type":"application/json",
				  "Accept":"application/json",
				  "Authorization":"Appliance " + _key
				 },
		success: function(resultData) {
			var errCode = resultData.errCode;
			var errMsg = resultData.errMsg;			
			alert(errMsg);
			$("#restartBtn").removeAttr("disabled");
			$("#messageDia").dialog('close');
		},
		error: function(xhr, status, error){
			if(xhr.status == 401)
			{
				alert("Session Expired. Log in again");	
				onClickOfLogout();
			}
			else if(xhr.status != 0)
			{
				alert(xhr.statusText);	
				$("#restartBtn").removeAttr("disabled");
				$("#messageDia").dialog('close');
			}
			
		},
		complete: function(resultData) {
			getSystemStatusFromServer();
		}	
	});	
}

/**
 * API call function to reteive the system status from the server
 * 
 * Status Information
 * 
 * JSON Object
 * {
 * 	  errCode:
 * 	  errMsg:
 * 	  errors: []
 * }
 */
function getSystemStatusFromServer()
{
	$.ajax({
		url: '/api/status/system' + '?_=' + getTime(),
		type: 'GET',
		dataType: 'json',
		headers: {"Authorization":"Appliance " + _key
				 },
		success: function(data) {
			updateSystemStatusDashboard(data);			
		},
		error: function(xhr, status, error) {	
			if(xhr.status == 401)
			{
				alert("Session Expired. Log in again");	
				onClickOfLogout();
			}
			else if(xhr.status != 0)
			{
				alert(xhr.statusText);	
			}
		},
		complete: function (data) {
			
		}
	});
	
}

