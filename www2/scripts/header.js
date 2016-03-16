jQuery(document).ready(function() {
	document.body.addEventListener('click', CloseProfile, true);
});

function CloseProfile() {
	window.document.getElementById('popout').style.display='none';
	window.document.getElementById('popout2').style.display='none';
}

function OnProfile(  ) {
	if ( window.document.getElementById('popout').style.display == '' ) {
		window.document.getElementById('popout').style.display='none';
	}
	else {
		window.document.getElementById('popout').style.display = '';
	}
	
    return true;
}

function OnUserAdmin(  ) {
	if ( window.document.getElementById('popout2').style.display == '' ) {
		window.document.getElementById('popout2').style.display='none';
	}
	else {
		window.document.getElementById('popout2').style.display = '';
	}
	
    return true;
}