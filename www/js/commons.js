/**
*   Created by jhogue 1/14/2016
*
*
*/


function onLoadOfIndexPage()
{
    //alert("hello");
    updateInteriorTemp("30");
    updateAmmoniaLevel("10");
    updateDoorStatus("Open");
    updateInteriorLightStatus("Off");
    updateExteriorLightStatus("On");
    updateHeatLampStatus("On");
    updateFanStatus("On");
}

/**
 *  This function updates the inside temperature reading that is displayed on the webpage.
 *
 */
function updateInteriorTemp(temp)
{
    document.getElementById("interior-temp").innerHTML = "Inside Temperature: " + temp + " degrees";
}

/**
 *  This function updates the ammonia reading that is displayed on the webpage.
 *
 */
function updateAmmoniaLevel(level)
{
    document.getElementById("ammonia-level").innerHTML = "Ammonia Reading: " + level;
}

/**
 *  This function updates the door status reading that is displayed on the webpage.
 *
 */
function updateDoorStatus(doorStatus)
{
    document.getElementById("door-status").innerHTML = "Door Status: " + doorStatus;
}

/**
 *  This function updates the inside light status that is displayed on the webpage.
 *
 */
function updateInteriorLightStatus(lightStatus)
{
    document.getElementById("interior-light-status").innerHTML = "Inside Light Status: " + lightStatus;
}

/**
 *  This function updates the outside light status that is displayed on the webpage.
 *
 */
function updateExteriorLightStatus(lightStatus)
{
    document.getElementById("exterior-light-status").innerHTML = "Outside Light Status: " + lightStatus;
}

/**
 *  This function updates the fan status that is displayed on the webpage.
 *
 */
function updateFanStatus(fanStatus)
{
    document.getElementById("fan-status").innerHTML = "Fan Status: " + fanStatus;
}

/**
 *  This function updates the heat lamp status that is displayed on the webpage.
 *
 */
function updateHeatLampStatus(heatStatus)
{
    document.getElementById("heat-lamp-status").innerHTML = "Heat Lamp Status: " + heatStatus;
}

//*********************************************************************************//
//*********************************************************************************//
//  These are our configuration functions that allow us to set the thresholds
//*********************************************************************************//
//*********************************************************************************//

/**
 *  This function sets the minimum temp that we will allow the coop to reach before the heat lamps are turned on.
 *
 */
function setMinimumTemp(temp)
{
    
}

/**
 *  This function sets the maximum temp that we will allow the coop to reach before the cooling fan is turned on.
 *
 */
function setMaximumTemp(temp)
{
    
}

/**
 *  This function sets the maximum ammonia reading that we will allow the coop to reach before the fan is turned on.
 *
 */
function setMaximumAmmoniaLevel(level)
{
    
}

//*********************************************************************************//
//*********************************************************************************//



//*********************************************************************************//
//*********************************************************************************//
//  These are our action functions that allow us to control the coop peripherals
//*********************************************************************************//
//*********************************************************************************//

function turnOnFan()
{

        updateFanStatus("On");
}

function turnOffFan()
{
        updateFanStatus("Off");
}

function turnOnHeatLamp()
{
    updateHeatLampStatus("On");
}

function turnOffHeatLamp()
{
    updateHeatLampStatus("Off");
}

function turnOnInteriorLight()
{
    updateInteriorLightStatus("On");
}

function turnOffInteriorLight()
{
    updateInteriorLightStatus("Off");
}

function turnOnExteriorLight()
{
    updateExteriorLightStatus("On");
}

function turnOffExteriorLight()
{
    updateExteriorLightStatus("Off");
}

function openDoor()
{
    updateDoorStatus("Open");
}

function closeDoor()
{
    updateDoorStatus("Closed");
}

//*********************************************************************************//
//*********************************************************************************//
