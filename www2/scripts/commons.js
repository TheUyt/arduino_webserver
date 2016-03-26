/**
 * function for updating the PBX settings
 */
function updatePBXSettingsOnPage(data)
{
	updateCommonSettingsOnBothPRIAndPBXPage(data);
	$("#pbx_gateway").val(data.pbxIPAddress);
	
	var pbxAuthentication = data.pbxAuthentication + "";
	
	if(pbxAuthentication === "true")
	{
		$("#auth_req").prop('checked',true);
		toggleChild('pbx_gateway');
		$("#pbx_username").val(data.pbxUsername);
		$("#pbx_password").val(data.pbxPassword);
	}
		
	//TO CHECK
	//$("id").is(':checked');
	
	if(data.t38TXEnabled === 'true')
	{
		$("#transmit_enabled").prop('checked', true);
		$("#transmit_request_enabled").removeAttr("disabled");
	}
	else
	{
		$("#transmit_enabled").prop('checked', false);
		$("#transmit_request_enabled").attr("disabled", true);
	}
	
	if(data.t38RXEnabled === 'true')
	{
		$("#receive_enabled").prop('checked', true);
		$("#receive_request_enabled").removeAttr("disabled");
	}
	else
	{
		$("#receive_enabled").prop('checked', false);	
		$("#receive_request_enabled").attr("disabled", true);
	}
	
	if(data.t38TXRequest === 'true')
	{
		$("#transmit_request_enabled").prop('checked', true);
	}
	else
	{
		$("#transmit_request_enabled").prop('checked', false);
	}
	
	if(data.t38RXRequest === 'true')
	{
		$("#receive_request_enabled").prop('checked', true);
	}
	else
	{
		$("#receive_request_enabled").prop('checked', false);
	}	
}

function updatePRISettingsOnPage(data)
{
	updateCommonSettingsOnBothPRIAndPBXPage(data);
	
	$("#pri_variant").val(data.t1SwitchVariantType);
	$("#line_encoding").val(data.t1LineEncoding);
	$("#framing_type").val(data.t1Framing);
}
function updateCommonSettingsOnBothPRIAndPBXPage(data)
{
	$("#appliance_name").val(data.serverName);
	$("#ip_address").val(data.ipAddress);
	$("#subnet_mask").val(data.subnetMask);
	$("#default_gateway").val(data.defaultGateway);
	
	//do the primary and alternate DNS
	var primaryDNS = data.primaryDNS;
	var alternateDNS = data.alternateDNS;
	
	if(primaryDNS.indexOf("None") >= 0)
	{
		$("#primary_dns_server").val("");	
	}
	else
	{
		$("#primary_dns_server").val(primaryDNS);
	}
	
	if(alternateDNS.indexOf("Register") >= 0)
	{
		$("#secondary_dns_server").val("");	
	}
	else
	{
		$("#secondary_dns_server").val(alternateDNS);
	}
	
	$("#mail_server").val(data.mailSvrAddress);
	$("#mail_server_port").val(data.mailSvrPort);
	$("#admin_email").val(data.emailAddress);
	$("#inbound_fax").val(data.inboundFaxNumber);
	$("#csid").val(data.csid);
	
//	var faxHeaderStringValue = data.faxHeader;
//	$("#fax_headers").val(faxHeaderStringValue);
	
	//do the InboundPorts settings
	var licensedPorts = parseInt(data.licensedPorts + "");
	var inboundPortsSelect = $("#inbound_ports");
	for(j = 0; j <= licensedPorts; j++)
	{
		inboundPortsSelect
			.append($("<option/>", {
				value: j,
			    text: j+""
		}));
	}
	
	$("#inbound_ports").val(parseInt(data.numInboundPorts+""));
	
	
	//do processing for numberNormalization
	var numArray = data.numberNormalization;
	var hashArray = {};
	for(var key in numArray)
	{
		if(numArray.hasOwnProperty(key))
		{
			var id = numArray[key].id	
			var value = numArray[key].value;
			hashArray[id] = value;
		}
	}
	var lengthNumNormalization = Object.keys(hashArray).length;
	
	//go through each hashArray object in order starting with 
	// 1 -> length
	var iPattern = "";
	var iTranslation = "";
	var iComment = "";
	var iButtons = "";
	var outData = "";
	var rowNumber = "";
	for(i = 1; i <= lengthNumNormalization; i++)
	{
		var fullTrans = hashArray[i + ""].split(">");
		
		if(typeof fullTrans[0] == 'undefined')
		{
			fullTrans[0] = "";	
		}
		if(typeof fullTrans[1] == 'undefined')
		{
			fullTrans[1] = "";	
		}
		if(typeof fullTrans[2] == 'undefined')
		{
			fullTrans[2] = "";	
		}
		rowNumber = "<td>" + i + "</td>";
		iPattern = "<td><span class='display-text'>" + fullTrans[0] + "</span><input type='text' class='hide' name='ot_text' id='ot_input_text' value='" + fullTrans[0] + "' /></td>";
		iTranslation = "<td><span class='display-text'>" + fullTrans[1] + "</span><input type='text' class='hide' name='ot_translation' id='ot_input_translation' value='" + fullTrans[1] + "' /></td>";
		iComment = "<td><span class='display-text'>" + fullTrans[2] + "</span><input type='text' class='hide' name='ot_comments' id='ot_input_comments' value='" + fullTrans[2] + "' /></td>";
		iButtons = "<td><span class='icon edit-item'></span><span class='icon save-item hide'></span><span class='icon remove-item'></span></span><span class='icon move-item'></span></td>";
		outData += "<tr class='ui-sortable-handle'>" + rowNumber + iPattern + iTranslation + iComment + iButtons + "</tr>";
	}
	$("#ot_list").html(outData);
}

/**
 * Function update the label on the page
 */
function updateInternetConnectionLabel(data)
{
	if(data.internetConnection == true)
	{
		if(!($('.sub.offline').hasClass('hide')))
		{
			$('.sub.offline').toggleClass('hide');
		}
		
		if($('.sub.online').hasClass('hide'))
		{
			$('.sub.online').toggleClass('hide');
		}
	}
	else
	{
		if($('.sub.offline').hasClass('hide'))
		{
			$('.sub.offline').toggleClass('hide');
		}
		
		if(!($('.sub.online').hasClass('hide')))
		{
			$('.sub.online').toggleClass('hide');
		}
	}
	
}

function updateStreemVersionLabel(data)
{
	$('.streem-version').html("Streem Center Version " + data.streemVersion);
}

/**
 * Function to load all the fax_headers on select element
 * Currently NOT_USED
 */
function loadFaxHeaderSelector(data)
{
	var faxTypeArray = data.faxHeaderTypes;
	var faxHashArray = {};
	var faxSelector = $("#fax_headers");
	for(key in faxTypeArray)
	{
		if(faxTypeArray.hasOwnProperty(key))
		{
			var id = faxTypeArray[key].id	
			var value = faxTypeArray[key].value;
			
			faxSelector
				.append($("<option/>", {
				 value: value,
				 text: id
			}));
		}
	}
}

function loadPRISelectorSettings(data)
{
	//load the switchVariantTypes
	var switchArray = data.t1SwitchVariantTypes;
	var switchSelect = $("#pri_variant");
	for(switchIndex = 0; switchIndex < switchArray.length; switchIndex++)
	{
		var switchValue = switchArray[switchIndex];
		switchSelect
			.append($("<option/>", {
				value: switchValue,
			    text: switchValue
		}));
	}
	
	//load the lineEncodingTypes
	var lineArray = data.t1LineEncodingTypes;
	var lineSelect = $("#line_encoding");
	for(lineIndex = 0; lineIndex < lineArray.length; lineIndex++)
	{
		var lineValue = lineArray[lineIndex];
		lineSelect
			.append($("<option/>", {
			 	value: lineValue,
				text: lineValue
		}));
	}
	
	//load the framingTypes
	var framingArray = data.t1FramingTypes;
	var framingSelect = $("#framing_type");
	for(framingIndex = 0; framingIndex < framingArray.length; framingIndex++)
	{
		var framingValue = framingArray[framingIndex];
		framingSelect
			.append($("<option/>", {
				value: framingValue,
				text: framingValue
		}));					  
	}
}


/**
 * Function is called when save button is pressed either on PBX or PRI page
 */
function grabCommonSettingsBetweenPRIAndPBX()
{
	var data = {};
	
	data.serverName = $("#appliance_name").val();
	data.ipAddress = $("#ip_address").val();
	data.subnetMask = $("#subnet_mask").val();
	data.defaultGateway = $("#default_gateway").val();
	data.primaryDNS = $("#primary_dns_server").val();
	data.alternateDNS = $("#secondary_dns_server").val();
	data.mailSvrAddress = $("#mail_server").val();
	data.mailSvrPort = $("#mail_server_port").val();
	data.emailAddress = $("#admin_email").val();	
	data.inboundFaxNumber = ($("#inbound_fax").val() + "").replace(/-/g, '');
	data.csid = $("#csid").val();
	//data.faxHeader = $("#fax_headers").val();
	data.numInboundPorts = $("#inbound_ports").val();
	var out_array = Array();
	var combinedTrans = "";
	var index = 0;
		
	$("#ot_list tr").each(function() {
		var out_object = {};
		var row = $(this);
		var ot_text = row.find("#ot_input_text").val();
		var ot_translations = row.find("#ot_input_translation").val();
		var ot_comments = row.find("#ot_input_comments").val();
		combinedTrans = ot_text +">"+ot_translations + ">" + ot_comments;
		out_object["id"] = index + 1 + "";
		out_object["value"] = combinedTrans;
		out_array[index] = out_object;
		index++;
	});
	
	data.numberNormalization = out_array;
	
	//always set to false
	data.dnsNetworkType = "false";
	data.ipNetworkType = "false";
	
	return data;
}

function grabPBXSettings()
{
	var data = {};
	
	if($("#transmit_enabled").is(":checked"))
	{
		data.t38TXEnabled = "true";
	}
	else
	{
		data.t38TXEnabled = "false";
	}
		
	if($("#transmit_request_enabled").is(":checked"))
	{
		data.t38TXRequest = "true";
	}
	else 
	{
		data.t38TXRequest = "false";
	}
	
	if($("#receive_enabled").is(":checked"))
	{
		data.t38RXEnabled = "true";
	}
	else
	{
		data.t38RXEnabled = "false";
	}
	
	if($("#receive_request_enabled").is(":checked"))
	{
		data.t38RXRequest = "true";
	}
	else
	{
		data.t38RXRequest = "false";
	}
	
	data.pbxIPAddress = $("#pbx_gateway").val();
	
	if($("#auth_req").is(":checked"))
	{
		data.pbxAuthentication = "true";
		data.pbxUsername = $("#pbx_username").val();
		data.pbxPassword = $("#pbx_password").val();
	}
	else
	{
		data.pbxAuthentication = "false";
	}
	return data;
}

function grabPRISettings()
{
	var data = {};
	data.t1SwitchVariantType = $("#pri_variant").val(); 
	data.t1LineEncoding = $("#line_encoding").val(); 
	data.t1Framing = $("#framing_type").val(); 
	return data;
}

/**
 * Function should be called when clicked on "User Manager" Heading on StreemSettings page
 */
function onClickOfUserManager()
{
	var serverPath = getFullHostNameForStreemAlert();
	var targetLoc = serverPath + "SearchUser.php?appMenu=UMT&Menu=USER&Button=but1&Option=16&Caption=Users";
	location.href = targetLoc;	
}

function onClickOfHomePage()
{
	
}

function onClickOfLogout()
{
	var serverPath = getFullHostNameForStreemAlert();
	var targetLoc = serverPath + "logout.php";
	location.href = targetLoc;	
}

function onClickOfManageProfile()
{
	var serverPath = getFullHostNameForStreemAlert();
	var targetLoc = serverPath + "MasterUser.php?CHLD=1&EUID=&Menu=USER&Button=but1&Option=13&Caption=Edit%20User";
	var newwin = window.open(
					targetLoc,
					'_uchild',
					'width=1000px,height=800px,scrollbars=yes,resizable=yes'
				 );
	newwin.focus();
	
}

function updateSystemStatusDashboard(data)
{
	var anm = "slow";
	if(data.errCode === '0')
	{
		$('.status.stopped').hide(anm);
		$('.status.running').show(anm);
		$('.status.errorSystem').hide(anm);
		if(isLoadingScreenOpen() == true)
		{
			hideLoadingScreenMessage();	
		}
		$("#headerMsg").hide(anm);	
	} 
	else if(data.errCode === API_SERVER_RESTARTING)
	{
		$('.status.stopped').show(anm);
		$('.status.running').hide(anm);
		$('.status.errorSystem').hide(anm);
		$("#stoppedStatusId").html("<br /> Server Rebooting <br />");
		
		//close the previous dialog
		if(isLoadingScreenOpen == true)
		{
			hideLoadingScreenMessage();
		}
		
		showServerRestartLoadingScreen();	
		
	}
	else
	{
				
		var errorsArr = data.errors;
		var reIndex = $.inArray("Rebooting", errorsArr);
		var stIndex =  $.inArray("Stopped", errorsArr)
		var outIndex = $.inArray("Configuration Out of Sync.", errorsArr);
		var configIndex = $.inArray("System Configuration Required.", errorsArr);
		if(reIndex != -1 || stIndex != -1)
		{
			$('.status.stopped').show(anm);
			$('.status.running').hide(anm);
			$('.status.errorSystem').hide(anm);

			
			var val = "<br />";
			for(i = 0; i < errorsArr.length; i++)
			{
				val += "* " + errorsArr[i] + "<br />";
			}
			
			$("#stoppedStatusId").html(val);
		}
		else if(configIndex != -1)
		{
			$('.status.stopped').show(anm);
			$('.status.running').hide(anm);
			$('.status.errorSystem').hide(anm);	
			
			var val = "<br />";
			
			val += "* " + "System Configuration Required" + "<br />";
			
			
			$("#stoppedStatusId").html(val);
		}
		else if((outIndex != -1) && (errorsArr.length == 1))
		{
			$('.status.stopped').hide(anm);
			$('.status.running').show(anm);
			$('.status.errorSystem').hide(anm);
		}
		else 
		{
			$('.status.stopped').hide(anm);
			$('.status.running').hide(anm);
			$('.status.errorSystem').show(anm);
			
			var val = "<br />";
			for(i = 0; i < errorsArr.length; i++)
			{
				val += "* " +errorsArr[i] + "<br />";
			}
			$("#errorStatusId").html(val);
		}
		
		if(outIndex != -1)
		{
			$("#headerMsg").show(anm);			
		}
		else
		{
			$("#headerMsg").hide(anm);	
		}
		
		//show Dialog based on different conditions
		if(reIndex != -1)
		{
			showServerRestartLoadingScreen();	
		} 
		else if(stIndex != -1)
		{
			showServicesRestartLoadingScreen();
		}
		else
		{
			hideLoadingScreenMessage();	
		}
			
		
	}
}

/**
 * Function shows the server restart loading screen
 */
function showServerRestartLoadingScreen()
{
	$("#loading-text-id").html("Restarting Server... <br /> <small>This will take a few minutes</small>");
		$("#messageDia").dialog({
			dialogClass: 'alert',
			model: true,	
			width: 350,
			resizable: false			
		});	
		$(".ui-dialog-titlebar").hide();
		$("#messageDia").focus();
		$("#restartServerBtn").attr("disabled", true);
		$("#restartBtn").attr("disabled",true);	
}

function showServicesRestartLoadingScreen()
{
	$("#loading-text-id").html("Restarting Services... <br /> <small>This will take a few minutes</small>");
		$("#messageDia").dialog({
			dialogClass: 'alert',
			model: true,	
			width: 350,
			resizable: false
		});	
		$(".ui-dialog-titlebar").hide();
		$("#messageDia").focus();
		$("#restartBtn").attr("disabled",true);
}

function showLoadingScreen()
{
	$("#loading-text-id").html("Loading... <br /> <small>Server Settings</small>");
		$("#messageDia").dialog({
			dialogClass: 'alert',
			model: true,	
			width: 350,
			resizable: false
		});	
		$(".ui-dialog-titlebar").hide();
		$("#messageDia").focus();
}

function showSavingScreen()
{
	$("#loading-text-id").html("Saving... <br /> <small>Server Settings</small>");
	$("#messageDia").dialog({
		dialogClass: 'alert',
		model: true,	
		width: 350,
		resizable: false
	});	
	$(".ui-dialog-titlebar").hide();
	$("#messageDia").focus();
}

function hideLoadingScreenMessage()
{
	$("#restartBtn").removeAttr("disabled");
	$("#restartServerBtn").removeAttr("disabled");
	$("#messageDia").dialog('close');
}

function isLoadingScreenOpen()
{
	var val = $("#messageDia").dialog('isOpen');
	return val;
}

/**
 * Function will compare the currData and data object to see if ipAddress and serverName is 
 * modified
 * 
 * @requirements: currData structure contains server saved data
 */
function showAlertBoxForUpdates(data)
{
	var ip = "";
	var serN = "";
	
	if(data.ipAddress !== currData.ipAddress)
	{
		ip = "IP Address : " + currData.ipAddress + " -> " + data.ipAddress;
	}
	if(data.serverName !== currData.serverName)
	{
		serN = "Appliance Name : " + currData.serverName + " -> " + data.serverName;	
	}
	var res = true;
	
	if(ip.length != 0 || serN.length != 0)
	{
		var addT = "";
		
		if(ip.length != 0)
		{
			addT = "\nAccess this page by using new IP Address after few minutes: \n\nhttp://" + data.ipAddress + "/streemalert";	
		}
		res = confirm("Updating following settings require reboot/restart\n" +
					  "\n" + 
					  serN + "\n" + ip + "\n" + addT);
	}
	return res;
}

/**
 * Function
 */
function clearCommonPageData()
{
	$("#inbound_ports").empty();
	$("#pri_variant").empty();
	$("#line_encoding").empty();
	$("#framing_type").empty();
	
}

function onClickOfWebcam()
{
    //window.location.href = "http://10.10.10.130";
    window.open("http://10.10.10.130");
}
