
'use strict';

import "core-js";
//import "regenerator-runtime/runtime";

import MTooltip from './MTooltip.js';

function Main(e)
{
    window.mtooltip = new MTooltip();

} // Main


function OnLoaded(e)
{
    window.mtooltip.Init();

} // OnLoaded


window.addEventListener( "DOMContentLoaded", Main );
window.addEventListener( "load",             OnLoaded );
