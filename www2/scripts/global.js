var _key = "";
var _userId = "";
var _userName = "";
var _email = "";
var appStorage;
var API_SERVER_RESTARTING = 5001;
var currData; //stores the current server data values
/**
 * Function determine if the user is logged in or not
 * //Should go under global file
 */
function getSession()
{
	_getStreemAlertSession();
}

/**
 * 
 * var serverPath = getFullHostNameForStreemAlert();
	var targetLoc = serverPath + "logout.php";
	location.href = targetLoc;
 */

/**
 * Function to retreive streem alert session information
 */
function _getStreemAlertSession()
{
	_key = getUrlValue()["k"];
	_userId = getUrlValue()["u"];
	_userName = decodeURIComponent(getUrlValue()["n"]);	
	_email = getUrlValue()["e"];
	
	appStorage.set('_key',_key);
	appStorage.set('_userId',_userId);
	appStorage.set('_userName',_userName);	
	appStorage.set('_email',_email);
}

function loadPersistStorage()
{
 	appStorage = new Persist.Store('CleoStreem');	
}

function savePersistStorage()
{
	//appStorage.save();
}
