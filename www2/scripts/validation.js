/**
 * Function is called by appliance.js on load
 * This function is dedicated for Software system
 */
function checkFormValidationSoftware()
{
	$("#applianceSettings").validate({
		
		rules: {
			appliance_name: {
				required: true,
				checkServerName: true
			},
			ip_address: {
				required: true,
				checkIPAddress: true				
			},
			subnet_mask: {
				required: true,
				checkSubnetMask: true
			},
			default_gateway: {
				required: true,
				checkDefaultGateway: true
			},
			primary_dns_server: {
				required: true,
				checkPrimaryDNS:true
			},
			secondary_dns_server: {
				required: false,
				checkSecondaryDNS: true			
			},
			mail_server: {
				required: true,
				checkMailServerAddr: true
			},
			mail_server_port: {
				required: true,
				checkMailServerPort: true
			},
			admin_email: {
				required: true,
				checkEmail: true
			},
			inbound_fax: {
				required: true,
				checkInboundFaxNum: true
			},
			csid: {
				required: true,
				checkCSID: true
			}			
		},
		submitHandler: function (formR) {
			var ty = appStorage.get('_pType');
			if(ty === 'software')
			{
				savePBXPage();	
			}
			else if(ty === 'hardware')
			{
				savePRIPage();	
			}
		}
	});
	
}

$.validator.addMethod("checkServerName", function(elmnt) {
	if( checkServerName().length == 0) {
		return true;
	} else {
		return false;	
	}
}, checkServerName);

$.validator.addMethod("checkIPAddress", function(elmnt) {
	if( checkIPAddress().length == 0) {
		return true;	
	}
	return false;
	
},checkIPAddress);

$.validator.addMethod("checkSubnetMask", function(elmnt) {
	if(checkSubnetMask().length == 0) {
		return true;   
	}
	return false;   
}, checkSubnetMask);
					  
$.validator.addMethod("checkDefaultGateway", function(elmnt) {
	if(checkDefaultGateway().length == 0) {
		return true;	
	} else {
		return false;
	}	
}, checkDefaultGateway);

$.validator.addMethod("checkPrimaryDNS", function(elmnt) {
	if(checkPrimaryDNS().length == 0) {
		return true;	
	} else {
		return false;
	}	
}, checkPrimaryDNS);

$.validator.addMethod("checkSecondaryDNS", function(elmnt) {
	if(checkSecondaryDNS().length == 0) {
		return true;
	} else {
		return false;
	}
}, checkSecondaryDNS);

$.validator.addMethod("checkMailServerAddr", function(elmnt) {
	if(checkMailServerAddr().length == 0) {
		return true;
	} else {
		return false;
	}	
}, checkMailServerAddr);

$.validator.addMethod("checkMailServerPort", function(elmnt) {
	if(checkMailServerPort().length == 0) {
		return true;	
	} else {
		return false;	
	}
}, checkMailServerPort);

$.validator.addMethod("checkEmail", function(elmnt) {
	if(checkEmail().length == 0) {
		return true;	
	} else {
		return false;	
	}
	
}, checkEmail);

$.validator.addMethod("checkInboundFaxNum", function(elmnt) {
	if(checkInboundFaxNum().length == 0) {
		return true;
	} else {
		return false;
	}
	
}, checkInboundFaxNum);

$.validator.addMethod("checkCSID", function(elmnt) {
	if(checkCSID().length == 0) {
		return true;
	} else {
		return false;
	}		
}, checkCSID);

/**
 * Function validate the appliance_name
 * @return "string" containing cause of failure
 * 		   empty string
 */
function checkServerName()
{
	var serName = $("#appliance_name").val();
	
	if(serName.length < 2) 
	{ 
		return "Appliance Name must be at least 2 characters long";
		//return false;
	}
	
	if(serName.length > 19) 
	{ 
		return "Appliance Name must be less than 19 characters long"; 
		//return false;
	} 
	
	if(/\s/.test(serName))
  	{
       return "Appliance Name cannot contain spaces";   
	   //return false;
  	}
	
	if(/[0-9]/i.test(serName.charAt(0)))
	{
	   return "Appliance Name cannot start with a number";
	  // return false;
	}
	
	if(!(/[a-zA-Z]/.test(serName.charAt(0))))
	{
		return "Appliance Name must start with alpha character";
		//return false;
	}
	
	if(!(/^[a-zA-Z0-9]+$/.test(serName)))
	{
		return "Appliance Name can only contain alpha/numeric values";
	}
	return "";
}

/**
 * Function validate the ip_address
 * @return "string" containing cause of failure
 * 		   empty string
 */
function checkIPAddress()
{
	var ipAddr = $("#ip_address").val();
	
	if(ipAddr.length < 1)
	{
		return "This field is required.";
		//return false;
	}
	
	if (!(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddr)))  
  	{  
		return "IPv4 address";
		//return false;
  	}
	return "";
}

/**
 * Function validate the subnet_mask
 * @return "string" containing cause of failure
 * 		   empty string 		
 */
function checkSubnetMask()
{
	var subMask = $("#subnet_mask").val();
	
	if(subMask.length < 1)
	{
		return "Enter the correct Subnet Mask.";
		//return false;
	}
	
	if (!(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(subMask)))  
  	{  
		return "Enter the correct Subnet Mask. (Ex. 255.255.255.0)";
		//return false;
  	}
	return "";
}
 
/**
 * Function validate the default_gateway
 * @return "string" containing cause of failure
 * 			empty string
 */
function checkDefaultGateway()
{
	var defGat = $("#default_gateway").val();
	
	if(defGat.length < 1)
	{
		return "Enter the correct Default Gateway.";
		//return false;
	}
	
	if (!(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(defGat)))  
  	{  
		return "Enter the correct Default Gateway. (Ex. 192.168.1.1)";
		//return false;
  	}
	return "";
}

/**
 * Function to validate the primary_dns_server
 * @return "string" with cause of failure
 * 			empty string otherwise
 */
function checkPrimaryDNS()
{
	var prDNS = $("#primary_dns_server").val();
	
	if(prDNS.length < 1)
	{
		return "Enter the correct Primary DNS Server.";
		//return false;
	}
	
	if (!(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(prDNS)))  
  	{  
		return "Enter the correct Primary DNS Server. (Ex. 192.168.5.1)";
		//return false;
  	}
	return "";
}

/**
 * Function to validate the secondary_dns_server
 * @return "string" with cause of failure
 * 			empty string otherwise
 */
function checkSecondaryDNS()
{
	var secDNS = $("#secondary_dns_server").val();
	
	if(secDNS.length ==0 )
	{
		return "";	
	}
		
	if (!(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(secDNS)))  
  	{  
		return "Enter the correct Secondary DNS Server. (Ex. 192.168.5.3)";
		//return false;
  	}
	return "";
}

/**
 * Function to validate the mail_server
 * @return "string" containing the error
 * 			emtpy string otherwise
 */
function checkMailServerAddr()
{
	var mailSvr = $("#mail_server").val();
	
	if(mailSvr.length < 1)
	{
		return "Enter the Mail Server address";	
	}
	return "";
}

/**
 * Function validate the mail_server_port
 * @return "string" with error
 * 			empty string otherwise
 */
function checkMailServerPort()
{
	var mailPort = $("#mail_server_port").val() + "";
	
	if(mailPort.length == 0)
	{
		return "Enter the port number";	
	}
	mailPort = Number(mailPort);
	if(isNaN(mailPort))
	{
		return "Port number must be a number";	
	}
	
	if(mailPort < 0 )
	{
		return "Port number cannot be negative";	
	}
	
	if(!isInteger(mailPort))
	{
		return "Value must be positive whole number";
	}
	return "";
}

/**
 * Function validate the email
 * //don't use this 
 * //TODO implement this
 */
function checkEmail()
{
	var em = $("#admin_email").val();
	
	if(em.length < 1) 
	{
		return "This field is required.";	
	}
	
	if(!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(em)))
	{
		return "Syntax error";
	}
	return "";
}

/**
 * Function validate the Inbound Fax Number
 * phoneUS
 */
function checkInboundFaxNum()
{
	var faxN = $("#inbound_fax").val() + "";
	if(faxN.length == 0)
	{
		return "Enter Inbound Fax Number";	
	}
	
	if(!(/^\+?([1])?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/.test(faxN))) 
	{
		return "Inbound Fax Number does not match expected format. Ex. xxx-xxx-xxxx";	
	}
	return "";
}

/**
 * Function to validate CSID
 * @return "string" containing error
 * 			empty string otherwise
 */
function checkCSID()
{
	var csidN = $("#csid").val();
	
	if(csidN.length < 1)
	{
		return "Enter CSID";	
	}
	
	if(csidN.length > 30)
	{
		return "CSID must be 30 characters or less";	
	}
	return "";
}