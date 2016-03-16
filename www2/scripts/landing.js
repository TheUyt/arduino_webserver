//onLoad of /streemsettings
$(document).ready(function() {
	loadPersistStorage();
	getSession();
	authenticate();
});

/**
 * Funtion authenticating with server
 */
function authenticate()
{
	$.ajax({
		url: '/api/token' + '?_=' + getTime(),
		type: 'GET',
		dataType: 'json',
		headers: {"Authorization":"StreemAlert " + _key
				 },
		success: function(data) {
		    loadPersistStorage();
			_key = data.Appliance;
			appStorage.set('_key',_key);
			loadPlatformTypeSettings();
		},
		error: function(xhr, status, error) {
			
			if(xhr.status >= 400 && xhr.status < 500)
			{
				alert(error);
				var serverPath = getFullHostNameForStreemAlert();
				var targetLoc = serverPath + "logout.php";
				location.href = targetLoc;
			}
		},
		complete: function(xhr, status) {			
		}
		   
	});
}

function loadPlatformTypeSettings()
{
	
	$.ajax({
		url: '/api/status/platformType' + '?_=' + getTime(),
		type: 'GET',
		dataType: 'json',
		headers: {"Authorization":"Appliance " + _key
				 },
		success: function(data) {
		    if(data.platformType === 'software')
			{
				appStorage.set('_pType','software');
				window.location.href = "index-pbx.html?platformType=software";
			}
			else
			{
				appStorage.set('_pType','hardware');
				window.location.href = "index-pri.html?platformType=hardware";
			}
		},
		error: function(xhr, status, error) {
			
			if(xhr.status >= 400 && xhr.status < 500)
			{
				alert(error);
				var serverPath = getFullHostNameForStreemAlert();
				var targetLoc = serverPath + "logout.php";
				location.href = targetLoc;
			}
		},
		complete: function(xhr, status) {			
		}
		   
	});
	
}