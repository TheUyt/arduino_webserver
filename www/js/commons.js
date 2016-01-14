


function onLoadOfIndexPage()
{
    //alert("hello");
    updateInteriorTemp("30");
    updateAmmoniaLevel("10");
    updateDoorStatus("Open");
    updateInteriorLightStatus("Off");
    updateExteriorLightStatus("On");
}

function updateInteriorTemp(temp)
{
    document.getElementById("interior-temp").innerHTML = "Inside Temperature: " + temp + " degrees";
}

function updateAmmoniaLevel(level)
{
    document.getElementById("ammonia-level").innerHTML = "Ammonia Reading: " + level;
}

function updateDoorStatus(doorStatus)
{
    document.getElementById("door-status").innerHTML = "Door Status: " + doorStatus;
}

function updateInteriorLightStatus(lightStatus)
{
    document.getElementById("interior-light-status").innerHTML = "Inside Light Status: " + lightStatus;
}

function updateExteriorLightStatus(lightStatus)
{
    document.getElementById("exterior-light-status").innerHTML = "Outside Light Status: " + lightStatus;
}
