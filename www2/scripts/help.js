// JavaScript Document

function DoShowHelp()
{
// alert(window.location);
	var barref = "Help.php?HelpSource="+window.location;
	var nswidth = 800;
	var nsheight = 600;
	var iewidth = 800;
	var ieheight = 600;

  	var centerx = ( screen.width-nswidth ) / 2  ;
  	var centery = ( screen.height-nsheight ) / 2  ;

   	newwin = window.open(barref,'','width=' + nswidth.toString() +
		                     ',height=' + nsheight.toString() + ',status=no,scrollbars=yes', false);
   	newwin.moveTo(centerx,centery);

	newwin.focus();

	return true;
}

function DoShowThisHelp(helpfile)
{
// alert(helpfile);
	var barref = getFullHostNameForStreemAlert() + helpfile;
	var nswidth = 800;
	var nsheight = 600;
	var iewidth = 800;
	var ieheight = 600;

  	var centerx = ( screen.width-nswidth ) / 2  ;
  	var centery = ( screen.height-nsheight ) / 2  ;

   	newwin = window.open(barref,'','width=' + nswidth.toString() +
		                     ',height=' + nsheight.toString() + ',status=no,resizable=yes,scrollbars=yes', false);
   	newwin.moveTo(centerx,centery) ;

	newwin.focus();

	return true;
}

function getUrlValue()
{
	var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
}

/**
 * Function returns the following information
 * http://SERVER/streemalert/
 */
function getFullHostNameForStreemAlert()
{
	var protocolUsed = location.protocol;
	var hostnameUsed = location.hostname;
	var result = protocolUsed + "//" + hostnameUsed + "/streemalert/";
	return result;
}

function getTime()
{
	return new Date().getTime();
}

function isInteger(n)
{
	return n % 1 === 0;
}