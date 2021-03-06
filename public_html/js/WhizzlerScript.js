// ALL VARIABLE AND CONSTANT DECLARATIONS ARE
// MADE AT THE TOP OF THIS FILE

// FIRST THE CONSTANTS, WHICH ARE THINGS THAT NEVER
// CHANGE AND ARE USED FOR INITIALIZATION AND
// RESETTING OF GAME CONTROL SETTINGS

// FIRST FOR INITIALIZING THE CANVAS
var MIN_CANVAS_DIM;
var MAX_CANVAS_DIM;
var CANVAS_STEP;

// THESE ARE FOR INITIALIZING THE FPS SLIDER
var FPS_MIN;
var FPS_MAX;
var FPS_STEP;
var FPS_INIT;

// THESE ARE FOR INITIALIZING POSITION CONTROLS
var XY_MIN;
var XY_MAX;
var XY_INIT;
var XY_STEP;

var INIT_X;
var INIT_Y;

// INITIAL WHIZZLE VELOCITY
var V_INIT;
var V_MAX;

// INITIAL WEIGHT
var INIT_WEIGHT;
var WEIGHT_MAX;

// TYPES OF WHIZZLES
var ELLIPSE_WHIZZLE_TYPE;
var RECTANGLE_WHIZZLE_TYPE;
var OUTLINE_WHIZZLE_MODE;
var FILLED_WHIZZLE_MODE;

// WHIZZLE PROPERTIES
var W_TYPE;
var W_MODE;
var W_OUTLINE_COLOR;
var W_FILL_COLOR;
var W_WIDTH;
var W_HEIGHT;
var W_X;
var W_Y;
var W_VX;
var W_VY;
var W_WEIGHT;
var W_INIT_X;
var W_INIT_Y;
var W_DRAGGING;
var W_FREQ;


//NOTES (FREQUENCIES)
var A_0;
var B_0;
var C_1;
var D_1;
var E_1;
var F_1;
var Gs_1;
var A_1;
var B_1;
var C_2;
var D_2;
var E_2;
var F_2;
var Gs_2;
var A_2;
var B_2;
var C_3;
var D_3;
var E_3;
var F_3;
var Gs_3;
var A_3;
var B_3;
var C_4;
var D_4;
var E_4;
var F_4;
var Gs_4;
var A_4;
var B_4;
var C_5;
var D_5;
var E_5;
var F_5;
var Gs_5;
var A_5;
var B_5;
var C_6;
var D_6;
var E_6;
var F_6;
var Gs_6;
var A_6;
var B_6;
var C_7;
var D_7;
var E_7;
var F_7;


// NOW FOR THE VARIABLES, THINGS THAT MAY CHANGE
// DURING THE EXECUTION OF THIS APPLICATION

// CANVAS SETTINGS
var canvasWidth;
var canvasHeight;
var canvas;
var canvas2D;
var dragging;

// TIMER SETTINGS FOR RUNNING, SLOWING DOWN, SPEEDING UP,
// AND PAUSING THE ANIMATION
var timer;
var fps;
var fpsInc;
var millisPerFrame;

// WHIZZLE INITIALIZATION SETTINGS
var initX;
var initY;
var xInc;
var yInc;
var xAcc;
var yAcc;
var centerX;
var centerY;
var radius;

// HERE IS OUR ARRAY OF WHIZZLES AND A COUNTER
var whizzles;
var whizzleCounter;

var audioContext = new AudioContext();
var gainNode = audioContext.createGain();
var osc0, osc1, osc2, osc3, osc4, osc5, osc5, osc6, osc7, osc8, osc9;
var nodes;
/*
 * This function prepares the initial controls and canvas
 * so that the app can run.
 */
function initTheWhizzler()
{
    // INITIALIZE THE THINGS THAT WILL NEVER CHANGE
    initConstants();
    
    // INITIALIZE THE HTML5 RENDERING SURFACE
    initCanvas();
    
    // INITIALIZE THE APPLICATION CONTROLS
    initControls();
    
    // INITIALIZE THE DATA STRUCTURE FOR STORING THE WHIZZLES
    initData();    
    
    initOsc();
}

/**
 * This function initializes all the things that will never change and
 * are used for initializing and resetting controls and other data.
 */
function initConstants()
{
    // 2 TYPES OF WHIZZLES
    ELLIPSE_WHIZZLE_TYPE = "Ellipse";
    RECTANGLE_WHIZZLE_TYPE = "Rectangle";
    
    // 2 MODES OF WHIZZLE RENDERING
    OUTLINE_WHIZZLE_MODE = "Outline";
    FILLED_WHIZZLE_MODE = "Filled";    
    
    //INIT WEIGHT
    INIT_WEIGHT = 1;
    WEIGHT_MAX = 15;
    
    // CANVAS DIMENSION BOUNDARIES
    MIN_CANVAS_DIM = 100;
    MAX_CANVAS_DIM = 1400;
    CANVAS_STEP = 100;

    // POSSIBLE WHIZZLE LOCATIONS
    XY_MIN = 0;
    XY_MIN = 0;
    XY_MAX = MAX_CANVAS_DIM;
    XY_MAX = MAX_CANVAS_DIM;    

    // THE INITIAL VELOCITY FOR ALL WHIZZLES FOR BOTH AXES
    V_INIT = 5;
    V_MAX = 50;

    // FPS INITIALIZION
    FPS_MIN = 1;
    FPS_MAX = 100;
    FPS_STEP = 1;
    FPS_INIT = 30;
    
    // WHIZZLE PROPERTIES, THIS HELPS US ACCESS AND CHANGE
    // DATA INSIDE A WHIZZLE
    W_TYPE      = 0;
    W_MODE      = 1;
    //W_COLOR     = 2;
    W_OUTLINE_COLOR = 2;
    W_WIDTH     = 3;
    W_HEIGHT    = 4;
    W_X         = 5;
    W_Y         = 6;
    W_VX        = 7;
    W_VY        = 8;
    W_FILL_COLOR = 9;
    W_WEIGHT = 10;
    W_INIT_X = 11;
    W_INIT_Y = 12;
    W_DRAGGING = 13;
    W_FREQ = 14;

    // INCREMENT FOR SLIDERS
    XY_STEP = 1;
    
    // INITIAL SIZE OF WHIZZLES
    XY_INIT = 50;
    
    //NOTES
    A_0 = 27.5;
    B_0 = 30.87;
    C_1 = 32.7;
    D_1 = 36.71;
    E_1 = 41.2;
    F_1 = 43.65;
    Gs_1 = 51.91;
    A_1 = 55;
    B_1 = 61.74;
    C_2 = 65.41;
    D_2 = 73.42;
    E_2 = 82.41;
    F_2 = 87.31;
    Gs_2 = 103.83;
    A_2 = 110;
    B_2 = 123.47;
    C_3 = 130.81;
    D_3 = 146.83;
    E_3 = 164.81;
    F_3 = 174.61;
    Gs_3 = 207.65;
    A_3 = 220;
    B_3 = 246.94;
    C_4 = 261.63;
    D_4 = 293.66;
    E_4 = 329.63;
    F_4 = 349.23;
    Gs_4 = 415.3;
    A_4 = 440;
    B_4 = 493.88;
    C_5 = 523.25;
    D_5 = 587.33;
    E_5 = 659.25;
    F_5 = 698.46;
    Gs_5 = 830.61;
    A_5 = 880;
    B_5 = 987.77;
    C_6 = 1046.5;
    D_6 = 1174.66;
    E_6 = 1318.51;
    F_6 = 1396.91;
    Gs_6 = 1661.22;
    A_6 = 1760;
    B_6 = 1975.33;
    C_7 = 2093;
    D_7 = 2349.32;
    E_7 = 2637.02;
    F_7 = 2793.83;
}

/*
 * This function initializes the HTML5 canvas so that we 
 * can rendering whizzles to it.
 */
function initCanvas()
{
    canvasWidth = 800;
    canvasHeight = 500;
    canvas = document.getElementById("whizzler_canvas");
    canvas2D = canvas.getContext("2d");
    dragging = false;
    $("#whizzler_canvas").click(function(){
        //resetWhizzles();
    });
}

/*
 * This function initializes the controls that are available at the
 * start of the app. Note that the whizzle controls are added dynamically
 * as whizzles are added.
 */
function initControls()
{
    initButtonAnimations();
    
    // INITIALIZE THE THREE SLIDER CONTROLS
    initSlider("#canvas_width_slider", MIN_CANVAS_DIM, MAX_CANVAS_DIM, CANVAS_STEP, canvasWidth, updateCanvas);
    initSlider("#canvas_height_slider", MIN_CANVAS_DIM, MAX_CANVAS_DIM, CANVAS_STEP, canvasHeight, updateCanvas);
    initSlider("#anim_speed_slider", FPS_MIN, FPS_MAX, FPS_STEP, FPS_INIT, updateSpeed);
    
    // AND THE CUSTOM JSCOLOR CONTROL FOR CHANGING THE
    // CANVAS' BACKGROUND COLOR
    $("#canvas_background_color").change(function(){
        var selectedColor = $("#canvas_background_color").val();
        $("#whizzler_canvas").css("background-color", "#" + selectedColor);
    });
}

function initButtonAnimations()
{
    $("button").mouseenter(function() {
        $(this).animate({
            opacity: '0.75',
            borderWidth: '5'
        });
    });
    $("button").mouseleave(function() {
        $(this).animate({
            opacity: '1.0',
            borderWidth: '2'
        });
    });
}

/*
 * Initializes a slider for use. Note that this function accepts
 * the update method as an argument. This is the function that
 * will be called as the user moves the slider. Note that we
 * are using a JQuery Slider. This is a custom UI component
 * provided by the JQuery library.
 * 
 * http://jqueryui.com/slider/
 */
function initSlider(slider, initMin, initMax, initStep, initValue, updateMethod)
{
    $(slider).slider();
    $(slider).slider({ min: initMin });
    $(slider).slider({ max: initMax });
    $(slider).slider({ step: initStep });
    $(slider).slider({ value: initValue });
    $(slider).slider({
        slide: function(){ updateMethod();}
    });
}

/* 
 * Initializes data for our app, including the array that will
 * contain all the whizzles.
 */
function initData()
{
    INIT_X = canvasWidth/2;
    INIT_Y = canvasHeight/2;
    // INIT FRAME RATE STUFF
    fps = FPS_INIT;
    fpsInc = FPS_STEP;
    millisPerFrame = 1000/fps;

    // WE HAVE NOT YET STARTED ANIMATION, SO MAKE THE TIMER NULL,
    // NOTE THAT EVERY TIME WE PAUSE THE TIMER WE'LL NEED TO ALSO
    // MAKE THE TIMER NULL
    timer = null;
    
    // THIS WILL HOLD ALL THE WHIZZLES
    whizzles = new Array();
    whizzleCounter = 0;
}

/*
 * This makes and returns a whizzle, which has a bunch of
 * properties, which can really be anything, but we'll put
 * rendering settings inside.
 */
function Whizzle(initIdNum)
{
    this.properties = new Array();
    this.idNum = initIdNum;
    this.setProperty = function(property, value) {
        this.properties[property] = value;
    };
    this.getProperty = function(property) {
        return this.properties[property];
    };
}

/*
 * Called when the FPS changes, it updates the frame
 * rate and then restarts the timer if the animation
 * is currently running.
 */
function updateSpeed()
{
    // UDPATE THE FPS WITH THE SLIDER VALUE
    fps = $("#anim_speed_slider").slider("value");
    millisPerFrame = 1000/fps;

    // IF THE ANIMATION IS RUNNING, UPDATE THE
    // TIMER WITH THE NEW FRAME RATE
    if (timer !== null)
    {
        clearInterval(timer);
        timer = setInterval(stepSimulation, millisPerFrame);
    }
}

/*
 * Clears all the old whizzles off the screen.
 */
function resetWhizzles()
{
    pauseWhizzles();
    canvas2D.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < whizzleCounter; i++) {
        var whiz = whizzles[i];
        initX = whiz.getProperty(W_INIT_X);
        initY = whiz.getProperty(W_INIT_Y);
        whiz.setProperty(W_X, initX);
        whiz.setProperty(W_FREQ, getNewFreq(initX));
        whiz.setProperty(W_Y, initY);
    }
    render();
}

/*
 * Pauses animation.
 */
function pauseWhizzles()
{
    if (timer !== null)
    {
        clearInterval(timer);
        timer = null;
    }
}

/*
 * Starts animation, which causes the stepSimulation method
 * to be called each frame.
 */
function startWhizzles()
{
    timer = setInterval(stepSimulation, millisPerFrame);
}

/*
 * Called after canvas settings are changed, it uses the
 * settings in the canvas controls to update the canvas.
 */
function updateCanvas()
{
    canvasWidth = $("#canvas_width_slider").slider("value");
    canvasHeight = $("#canvas_height_slider").slider("value");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    INIT_X = canvasWidth/2;
    INIT_Y = canvasHeight/2;
    resetWhizzles();
}

/*
 * Called whtn the user presses the Add Whizzle button, it
 * makes all the new controls and puts them in the DOM.
 */
function addWhizzle()
{
    // STOP THE SIMULATION
    if (timer !== null)
    {
        clearInterval(timer);
        timer = null;
    }
    
    // RESET ALL THE WHIZZLES ALREADY RUNNING        
    resetWhizzles();

    // LET'S BUILD THE NEWEST WHIZZLE CONTROLS
    
    // FIRST, MAKE A WHIZZLE DIV
    var whizzleId = "" + whizzleCounter;
    $("#whizzles").append("<div id='" + whizzleId + "' class='whizzle'></div>");
    whizzleId = "#" + whizzleId;
    
    // ADD THE TITLE DIV
    var whizzleDiv = $(whizzleId);
    whizzleDiv.append("<div class='toolbar_title'></div>");
    var toolbarTitleDiv = whizzleDiv.find(".toolbar_title");
    toolbarTitleDiv.text("Whizzle #");
    toolbarTitleDiv.append("<span class='whizzle_id'>" + whizzleCounter + "</span>");
    
    // NOW ADD THE DIV TO HOLD THE MIN, MAX, AND REMOVE BUTTONS
    whizzleDiv.append("<div class='buttons_toolbar'></div>");
    var buttonsDiv = whizzleDiv.find(".buttons_toolbar");
    
    // AND THE MIN BUTTON
    // NOTE THAT THIS BUTTON CURRENTLY DOESN'T DO ANYTHING
    buttonsDiv.append("<button class='min_button'>-</button>");
    whizzleDiv.find(".min_button").click(function() {
        var toolbar = $(this).parent().parent().find(".whizzle_controls_toolbar");
        toolbar.hide();
    });

    // AND THE MAX BUTTON
    // NOTE THAT THIS BUTTON CURRENTLY DOESN'T DO ANYTHING
    buttonsDiv.append("<button class='max_button'>+</button>");
    whizzleDiv.find(".max_button").click(function() {
        var toolbar = $(this).parent().parent().find(".whizzle_controls_toolbar");
        toolbar.show();
    });

    // AND THE REMOVE BUTTON
    buttonsDiv.append("<button class='remove_button'>X</button>");
    var removeButton = buttonsDiv.find(".remove_button");
    removeButton.click(function(){
        removeWhizzle($(whizzleId));
    });

    // NOW ADD ALL THE WHIZZLE CONTROLS. FIRST THE DIV TO HOLD THEM
    whizzleDiv.append("<div class='whizzle_controls_toolbar'></div>");
    var whizzleControlsDiv = whizzleDiv.find('.whizzle_controls_toolbar');

    // ADD THE WHIZZLE TYPE SELECTION DROP DOWN LISTS
    whizzleControlsDiv.append("<div class='whizzle_toolbar'><span class='whizzle_toolbar_title'>Type:</span><div class='whizzle_toolbar_control'><select class='whizzle_type' name='whizzle_type'><option value='" + ELLIPSE_WHIZZLE_TYPE + "'>" + ELLIPSE_WHIZZLE_TYPE + "</option><option value='" + RECTANGLE_WHIZZLE_TYPE + "'>" + RECTANGLE_WHIZZLE_TYPE + "</option></select></div></div><br />\n");
    whizzleControlsDiv.append("<div class=\"whizzle_toolbar\"><span class=\"whizzle_toolbar_title\">Mode:</span> <div class='whizzle_toolbar_control'><select class='whizzle_mode' name='whizzle_mode'><option value='" + OUTLINE_WHIZZLE_MODE + "'>" + OUTLINE_WHIZZLE_MODE + "</option><option value='" + FILLED_WHIZZLE_MODE + "'>" + FILLED_WHIZZLE_MODE + "</option></select></div></div><br />\n");
    whizzleControlsDiv.append("<div class=\"whizzle_toolbar\"><span class=\"whizzle_toolbar_title\">Outline: <span class=\"outline_js_color_span\"></span></div>\n");
    whizzleControlsDiv.append("<div class=\"whizzle_toolbar\"><span class=\"whizzle_toolbar_title\">Weight: <span class='whizzle_weight_display'>" + INIT_WEIGHT + "</span></span> <div class='whizzle_weight_slider'></div></div><br />\n");
    whizzleControlsDiv.append("<div class=\"whizzle_toolbar\"><span class=\"whizzle_toolbar_title\">Fill: <span class=\"fill_js_color_span\"></span></div>\n");
    whizzleControlsDiv.append("<div class=\"whizzle_toolbar\"><span class=\"whizzle_toolbar_title\">Width: <span class='whizzle_width_display'>" + XY_INIT + "</span></span> <div class='whizzle_width_slider'></div></div><br />\n");
    whizzleControlsDiv.append("<div class=\"whizzle_toolbar\"><span class=\"whizzle_toolbar_title\">Height: <span class='whizzle_height_display'>" + XY_INIT + "</span></span> <div class='whizzle_height_slider'></div></div><br />\n");
    whizzleControlsDiv.append("<div class=\"whizzle_toolbar\"><span class=\"whizzle_toolbar_title\">Start X: <span class='whizzle_startX_display'>" + INIT_X + "</span></span> <div class='whizzle_x_slider'></div></div><br />\n");
    whizzleControlsDiv.append("<div class=\"whizzle_toolbar\"><span class=\"whizzle_toolbar_title\">Start Y: <span class='whizzle_startY_display'>" + INIT_Y + "</span></span> <div class='whizzle_y_slider'></div></div><br />\n");
    whizzleControlsDiv.append("<div class=\"whizzle_toolbar\"><span class=\"whizzle_toolbar_title\">Start Vx: <span class='whizzle_startVx_display'>" + V_INIT + "</span></span> <div class='whizzle_vX_slider'></div></div><br />\n");
    whizzleControlsDiv.append("<div class=\"whizzle_toolbar\"><span class=\"whizzle_toolbar_title\">Start Vy: <span class='whizzle_startVy_display'>" + V_INIT + "</span></span> <div class='whizzle_vY_slider'></div></div><br />\n");
    
    // NOW INIT THE JS COLOR SELECTORS
    var jsColorSpan = whizzleControlsDiv.find(".outline_js_color_span");
    var jsColorInput = document.createElement('input');
    jsColorInput.style.width = '5em';
    var jsColor = new jscolor.color(jsColorInput);
    jsColor.fromHSV(.0, 1.0, 1.0);
    jsColorSpan.append(jsColorInput);
    
    jsColorInput = jsColorSpan.find("input");
    jsColorInput.change(function(){
        var selectedColor = "#" + $(this).val();
        //$("#whizzler_canvas").css("background-color", "#" + selectedColor);
        //$(".outline_js_color_span").css("background-color", "#" + selectedColor);
        //W_OUTLINE_COLOR = selectedColor;
        updateWhizzleColor(whizzleId, selectedColor, "outline");
    });    

    var jsColorSpan2 = whizzleControlsDiv.find(".fill_js_color_span");
    var jsColorInput2 = document.createElement('input');
    jsColorInput2.style.width = '5em';
    var jsColor2 = new jscolor.color(jsColorInput2);
    jsColor2.fromHSV(.2, .6, .2);
    jsColorSpan2.append(jsColorInput2);
    
    jsColorInput2 = jsColorSpan2.find("input");
    jsColorInput2.change(function(){
        var selectedColor = "#" + $(this).val();
        //$("#whizzler_canvas").css("background-color", "#" + selectedColor);
        //$("#whizzler_fill").css("background-color", "#" + selectedColor);
        //W_FILL_COLOR = selectedColor;
        updateWhizzleColor(whizzleId, selectedColor, "fill");
    }); 

    // NOW INIT THE SLIDERS THAT WE JUST ADDED
    initWhizzleSlider(whizzleDiv.find(".whizzle_weight_slider"), XY_MIN, WEIGHT_MAX, XY_STEP, INIT_WEIGHT);
    initWhizzleSlider(whizzleDiv.find(".whizzle_width_slider"), XY_MIN, XY_MAX/10, XY_STEP, XY_INIT);
    initWhizzleSlider(whizzleDiv.find(".whizzle_height_slider"), XY_MIN, XY_MAX/10, XY_STEP, XY_INIT);
    initWhizzleSlider(whizzleDiv.find(".whizzle_x_slider"),  XY_MIN, canvasWidth, XY_STEP, canvasWidth/2);
    initWhizzleSlider(whizzleDiv.find(".whizzle_y_slider"),  XY_MIN, canvasHeight, XY_STEP, canvasHeight/2);
    initWhizzleSlider(whizzleDiv.find(".whizzle_vX_slider"), XY_MIN, V_MAX, XY_STEP, V_INIT);    
    initWhizzleSlider(whizzleDiv.find(".whizzle_vY_slider"), XY_MIN, V_MAX, XY_STEP, V_INIT);

    // SETUP ALL THE EVENT RESPONSES
    $(whizzleId).find(".whizzle_type").change(function(){
        updateWhizzleAfterControlChange(whizzleId, $(this), W_TYPE, false);
    });
    $(whizzleId).find(".whizzle_mode").change(function(){
        updateWhizzleAfterControlChange(whizzleId, $(this), W_MODE, false);
    });
    /*$(whizzleId).find(".outline_js_color_span").change(function(){
        updateWhizzleColor(whizzleId, W_OUTLINE_COLOR, "outline");
    });
    $(whizzleId).find(".fill_js_color_span").change(function(){
        updateWhizzleColor(whizzleId, W_FILL_COLOR, "fill");
    });*/
    $(whizzleId).find(".whizzle_weight_slider").slider({
        slide: function(){
            updateSliderDisplay($(this), ".whizzle_weight_display");
            updateWhizzleAfterControlChange(whizzleId, $(this), W_WEIGHT, true);
        }
    });
    $(whizzleId).find(".whizzle_width_slider").slider({
        slide: function(){
            updateSliderDisplay($(this), ".whizzle_width_display");
            updateWhizzleAfterControlChange(whizzleId, $(this), W_WIDTH, true);
        }
    });
    $(whizzleId).find(".whizzle_height_slider").slider({
        slide: function(){
            updateSliderDisplay($(this), ".whizzle_height_display");
            updateWhizzleAfterControlChange(whizzleId, $(this), W_HEIGHT, true);
        }
    });
    $(whizzleId).find(".whizzle_x_slider").slider({
        slide: function(){
            updateSliderDisplay($(this), ".whizzle_startX_display");
            updateWhizzleAfterControlChange(whizzleId, $(this), W_X, true);
            updateWhizzleAfterControlChange(whizzleId, $(this), W_INIT_X, true);
            updateWhizzleAfterControlChange(whizzleId, $(this), W_FREQ, true);
            //initX = $(this).slider("value");
        }
    });    
    $(whizzleId).find(".whizzle_y_slider").slider({
        slide: function(){
            updateSliderDisplay($(this), ".whizzle_startY_display");
            updateWhizzleAfterControlChange(whizzleId, $(this), W_Y, true);
            updateWhizzleAfterControlChange(whizzleId, $(this), W_INIT_Y, true);
            //initY = $(this).slider("value");
        }
    });    
    $(whizzleId).find(".whizzle_vX_slider").slider({
        slide: function(){
            updateSliderDisplay($(this), ".whizzle_startVx_display");
            updateWhizzleAfterControlChange(whizzleId, $(this), W_VX, true);
        }
    });
    $(whizzleId).find(".whizzle_vY_slider").slider({
        slide: function(){
            updateSliderDisplay($(this), ".whizzle_startVy_display");
            updateWhizzleAfterControlChange(whizzleId, $(this), W_VY, true);
        }
    });
    
    //var osc = addNote();
    $("#whizzler_canvas").mousedown(function (e) {
        //osc.frequency.value = 300;
        var parentOffset = $(this).parent().offset();
        //or $(this).offset(); if you really just want the current element's offset
        var x = e.pageX - parentOffset.left;
        var y = e.pageY - parentOffset.top;
        if (isClickInside(whizzleId, x, y)) {
            dragging = true;
            setDragging(whizzleId, true);
        }
    });

    $("#whizzler_canvas").mousemove(function (e) {
        if (dragging) {
            var parentOffset = $(this).parent().offset();
            //or $(this).offset(); if you really just want the current element's offset
            var x = e.pageX - parentOffset.left;
            var y = e.pageY - parentOffset.top;
            updateWhizzleWhenDragged(whizzleId, x, y);
            clearCanvas();
            render();
        }
        //render();
    });

    $("#whizzler_canvas").mouseup(function (e) {
        if (dragging) {
            render();
        }
        setDragging(whizzleId, false);
        dragging = false;
    });

    
    // FINALLY, MAKE THE WHIZZLE WITH ALL THE CURRENT UI SETTINGS
    // AND PUT IT IN THE ARRAY
    var whizzleToAdd = makeWhizzle($("#whizzles").last(), whizzleCounter);    
    whizzles[whizzleCounter] = whizzleToAdd;
    whizzleCounter++;
    
    // UPDATE THE CANVAS DISPLAY
    render();
}

function updateWhizzleWhenDragged(whizzleId, x, y) {
    var indexStr = whizzleId.substr(1);
    var index = Number(indexStr).valueOf();
    var whiz = whizzles[index];
    if (whiz.getProperty(W_DRAGGING)) {
        whiz.setProperty(W_X, x);
        whiz.setProperty(W_INIT_X, x);
        whiz.setProperty(W_FREQ, getNewFreq(x));
        whiz.setProperty(W_Y, y);
        whiz.setProperty(W_INIT_Y, y);
    }}

function setDragging(whizzleId, dragging) {
    var indexStr = whizzleId.substr(1);
    var index = Number(indexStr).valueOf();
    var whiz = whizzles[index];
    whiz.setProperty(W_DRAGGING, dragging);
}

function isClickInside(whizzleId, x, y) {
    // GET THE AFFECTED WHIZZLE
    var indexStr = whizzleId.substr(1);
    var index = Number(indexStr).valueOf();
    var whiz = whizzles[index];
    radius = whiz.getProperty(W_WIDTH)/2;
    centerX = whiz.getProperty(W_X) + radius;
    centerY = whiz.getProperty(W_Y) + (whiz.getProperty(W_HEIGHT)/2);
    var dx = centerX-x;
    var dy = centerY-y;
    return( dx*dx+dy*dy <= radius*radius );
}

function updateSliderDisplay(whizSlider, displaySpanClass)
{
    var whizzleSliderData = whizSlider.slider("value");
    var whizzleDiv = whizSlider.parent();
    var whizSpan = whizzleDiv.find(displaySpanClass);
    whizSpan.text(whizzleSliderData); 
}

function updateWhizzleColor(whizzleId, newColor, propToChange) {
    // PAUSE EVERYTHING AND CLEAR THE CANVAS
    pauseWhizzles();
    
    // GET THE AFFECTED WHIZZLE
    var indexStr = whizzleId.substr(1);
    var index = Number(indexStr).valueOf();
    var whiz = whizzles[index];
    
    // CHANGE THE AFFECTED WHIZZLE
    if(propToChange === "outline")
        whiz.setProperty(W_OUTLINE_COLOR, newColor);
    else
        whiz.setProperty(W_FILL_COLOR, newColor);
    
    // CLEAR THE CANVAS AND RENDER FROM SCRATCH WITH THE CHANGE
    clearCanvas();
    render();
}
/*
 * Provides the response to when the user changes a value
 * in a whizzle control.
 */
function updateWhizzleAfterControlChange(whizzleId, control, valueToChange, isSlider)
{
    // PAUSE EVERYTHING AND CLEAR THE CANVAS
    pauseWhizzles();
    
    // GET THE UPDATED VALUE
    var newValue;
    if (isSlider)
        newValue = control.slider("value");
    else
        newValue = control.val();
    
    // GET THE AFFECTED WHIZZLE
    var indexStr = whizzleId.substr(1);
    var index = Number(indexStr).valueOf();
    var whiz = whizzles[index];
    
    if(valueToChange === W_FREQ)
        newValue = getNewFreq(newValue);
    // CHANGE THE AFFECTED WHIZZLE
    whiz.setProperty(valueToChange, newValue);
    
    // CLEAR THE CANVAS AND RENDER FROM SCRATCH WITH THE CHANGE
    clearCanvas();
    render();
}

/*
 * This function removes a whizzle.
 */
function removeWhizzle(whizzleToRemove)
{
    // GET THE ID NUMBER OF THE WHIZZLE TO REMOVE, WHICH
    // CORRESPONDS TO ITS INDEX IN THE ARRAY
    var whizzleId = whizzleToRemove.find('.whizzle_id');
    var whizzleIdText = whizzleId.text();
    var whizzleIdNum = Number(whizzleIdText);

    // REMOVE THIS WHIZZLE
    var parent = whizzleToRemove.parent();
    whizzleToRemove.remove();
    console.log("" + whizzleCounter);

    // DEC THE COUNTER
    whizzleCounter--;
    
    // UPDATE THE WHIZZLE ARRAY
    for (var i = whizzleIdNum; i < whizzleCounter; i++)
    {
        whizzles[i] = whizzles[i+1];
    }
    
    // NOW GO THROUGH ALL THE WIZZLES TO CORRECT
    // ANY POSSIBLE IDS
    for (var i = 0; i < whizzleCounter; i++)
    {
        whizzles[i].idNum = i;
    }    
    
    // AND MAKE SURE THE DISPLAY IS UPDATED PROPERLY
    var children = parent.children('.whizzle');
    children.each(function (i) {
        var idSpan = $(this).find('.whizzle_id');
        idSpan.text("" + i);
    });
}

/*
 * Used for setting up a whizzle slider
 */
function initWhizzleSlider(whizzleSlider, initMin, initMax, initStep, initValue)
{
    // NOTE THAT .slider IS A JQuery METHOD FOR THE CUSTOM
    // JQuery UI SLIDER COMPONENT
    whizzleSlider.slider();
    whizzleSlider.slider({ min: initMin });
    whizzleSlider.slider({ max: initMax });
    whizzleSlider.slider({ step: initStep });
    whizzleSlider.slider({ value: initValue });    
}

/*
 * This method retrives the controls setttings for the proper
 * whizzle and makes and returns a new whizzle.
 */
function makeWhizzle(whizzleDiv, initIdNum)
{
    // FIRST GET ALL THE DATA
    var wControls = whizzleDiv.find(".whizzle_controls_toolbar");
    var wTypeControl = wControls.find(".whizzle_type");
    var wType = wTypeControl.val();
    var wModeControl = wControls.find(".whizzle_mode");
    var wMode = wModeControl.val();
    var wOutlineControl = wControls.find(".outline_js_color_span");
    var jsColorInput = wOutlineControl.find("input");
    var wOutline = "#" + jsColorInput.val();
    var wWeight = wControls.find(".whizzle_weight_slider").slider("value");
    var wFillControl = wControls.find(".fill_js_color_span");
    var jsColorInput2 = wFillControl.find("input");
    var wFill = "#" + jsColorInput2.val();
    var wWidth = wControls.find(".whizzle_width_slider").slider("value");
    var wHeight = wControls.find(".whizzle_height_slider").slider("value");
    var wX = wControls.find(".whizzle_x_slider").slider("value");
    var wY = wControls.find(".whizzle_y_slider").slider("value");
    var wVx = wControls.find(".whizzle_vX_slider").slider("value");
    var wVy = wControls.find(".whizzle_vY_slider").slider("value");

    // AND NOW USE IT TO MAKE AND RETURN A NEW WHIZZLE
    
    // FIRST CONSTRUCT IT
    var newWhizzle = new Whizzle(initIdNum);
    
    // NOW INIT ALL ITS PROPERTIES
    newWhizzle.setProperty(W_TYPE, wType);
    newWhizzle.setProperty(W_MODE, wMode);
    newWhizzle.setProperty(W_OUTLINE_COLOR, wOutline);
    newWhizzle.setProperty(W_WEIGHT, wWeight);
    newWhizzle.setProperty(W_FILL_COLOR, wFill);
    newWhizzle.setProperty(W_WIDTH, wWidth);
    newWhizzle.setProperty(W_HEIGHT, wHeight);
    newWhizzle.setProperty(W_X, wX);
    newWhizzle.setProperty(W_INIT_X, wX);
    newWhizzle.setProperty(W_FREQ, getNewFreq(wX));
    newWhizzle.setProperty(W_Y, wY);
    newWhizzle.setProperty(W_INIT_Y, wY);
    newWhizzle.setProperty(W_VX, wVx);
    newWhizzle.setProperty(W_VY, wVy);
    newWhizzle.setProperty(W_DRAGGING, false);
    
    // NOW RETURN THE WHIZZLE
    return newWhizzle;
}

/*
 * Called oncde per frame, it just updates and renders.
 */
function stepSimulation()
{
    // UPDATE ALL WHIZZLES
    updateWhizzles();
    
    // AND RENDER. NOTE WE DON'T CLEAR THE CANVAS
    render();
}

/*
 * Updates the position of each whizzle using its velocity and bouncing
 * it off of walls.
 */
function updateWhizzles()
{
    // GO THROUGH ALL THE WHIZZLES
    for (var i = 0; i < whizzleCounter; i++)
    {
        var whiz = whizzles[i];
        whiz.setProperty(W_X, whiz.getProperty(W_X) + whiz.getProperty(W_VX));
        whiz.setProperty(W_Y, whiz.getProperty(W_Y) + whiz.getProperty(W_VY));
        
        var newFreq = getNewFreq(whiz.getProperty(W_X));
        whiz.setProperty(W_FREQ, newFreq);
        initOsc(newFreq);
        //nodes[i].start();
        //nodes[i].stop(audioContext.currentTime + .5);
        
        // CLAMPING, WHICH BOUNCES IT OFF WALLS
        if (whiz.getProperty(W_X) <= 0)
            whiz.setProperty(W_VX, whiz.getProperty(W_VX) * -1);
        if ((whiz.getProperty(W_X) + whiz.getProperty(W_WIDTH)) >= canvasWidth) 
            whiz.setProperty(W_VX, whiz.getProperty(W_VX) * -1);
        if (whiz.getProperty(W_Y) <= 0)
            whiz.setProperty(W_VY, whiz.getProperty(W_VY) * -1);
        if ((whiz.getProperty(W_Y) + whiz.getProperty(W_HEIGHT)) >= canvasHeight)
            whiz.setProperty(W_VY, whiz.getProperty(W_VY) * -1);
    }
}

/*
 * This method renders all the whizzles, whether they are rectangles
 * or ovals, filled or not.
 */
function render()
{
    // GO THROUGH ALL THE WHIZZLES
    for (var i = 0; i < whizzleCounter; i++)
    {
        // GET THE WHIZZLE
        var whiz = whizzles[i];
        
        // START RENDERING
        canvas2D.beginPath();
        
        // THESE SHOULD BE CUSTOM COLORS
        var outline = whiz.getProperty(W_OUTLINE_COLOR);//"#009900";
        canvas2D.strokeStyle = outline;
        var weight = whiz.getProperty(W_WEIGHT);
        canvas2D.lineWidth = weight;
        //canvas2D.fillStyle = "#009900";
        var fill = whiz.getProperty(W_FILL_COLOR);
        canvas2D.fillStyle = fill;
        var x = whiz.getProperty(W_X);
        var y = whiz.getProperty(W_Y);
        var width = whiz.getProperty(W_WIDTH);
        var height = whiz.getProperty(W_HEIGHT);
        
        // RENDER AS AN ELLIPSE, WHICH IS A LITTLE TRICKY
        // IF WE WANT IT TO LOOK GOOD
        if (whiz.getProperty(W_TYPE) === ELLIPSE_WHIZZLE_TYPE)
        {            
            drawEllipse(x, y, width, height, whiz.getProperty(W_MODE));
        }
        // RENDER WHIZZLE AS RECTANGLE
        else if (whiz.getProperty(W_TYPE) === RECTANGLE_WHIZZLE_TYPE)
        {
            canvas2D.rect(x, y, width, height);
            if (whiz.getProperty(W_MODE) === FILLED_WHIZZLE_MODE)
            {
                canvas2D.fill();
            }
            else
            {
                canvas2D.stroke();
            }
        }
    }
}

/*
 * Renders an ellipse using a Bezier curve.
 */
function drawEllipse(x, y, w, h, mode) 
{
    var kappa = .5522848,
            ox = (w / 2) * kappa, // control point offset horizontal
            oy = (h / 2) * kappa, // control point offset vertical
            xe = x + w,           // x-end
            ye = y + h,           // y-end
            xm = x + w / 2,       // x-middle
            ym = y + h / 2;       // y-middle

    canvas2D.beginPath();
    canvas2D.moveTo(x, ym);
    canvas2D.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    canvas2D.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    canvas2D.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    canvas2D.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    canvas2D.closePath();
    if (mode === OUTLINE_WHIZZLE_MODE)
        canvas2D.stroke();
    else
        canvas2D.fill();
}

/*
 * Clears the canvas, removing all past whizzle paths.
 */
function clearCanvas()
{
    canvas2D.clearRect(0, 0, canvas.width, canvas.height);    
}

/*
 * This helper method gets the whizzle that corresponds to
 * a given slider control. This is useful when setting up
 * the controls such that we may respond to a slider change
 * by updating the correct whizzle data.
 */
function getSliderWhizzle(slider)
{
    var sliderParent = slider.parent();            
    var sliderGrandParent = sliderParent.parent();
    var whizzleId = sliderGrandParent.find(".whizzle_id");
    var whizzleIdNum = whizzleId.text();
    var whiz = whizzles[whizzleIdNum];
    return whiz;
}

//Init Oscillators
function initOsc(freq) {
    //var nodes = new Array();
    osc0 = audioContext.createOscillator();
    /*osc1 = audioContext.createOscillator();
    osc2 = audioContext.createOscillator();
    osc3 = audioContext.createOscillator();
    osc4 = audioContext.createOscillator();
    osc5 = audioContext.createOscillator();
    osc6 = audioContext.createOscillator();
    osc7 = audioContext.createOscillator();
    osc8 = audioContext.createOscillator();
    osc9 = audioContext.createOscillator();*/
    
    //nodes = [osc0, osc1, osc2, osc3, osc4, osc5, osc5, osc6, osc7, osc8, osc9];
    
    var real = new Float32Array([0,0.4,0.4,1,1,1,0.3,0.7,0.6,0.5,0.9,0.8]);

    var imag = new Float32Array(real.length);
    var hornTable = audioContext.createPeriodicWave(real, imag);
    
    osc0.setPeriodicWave(hornTable);
    /*osc1.setPeriodicWave(hornTable);
    osc2.setPeriodicWave(hornTable);
    osc3.setPeriodicWave(hornTable);
    osc4.setPeriodicWave(hornTable);
    osc5.setPeriodicWave(hornTable);
    osc6.setPeriodicWave(hornTable);
    osc7.setPeriodicWave(hornTable);
    osc8.setPeriodicWave(hornTable);
    osc9.setPeriodicWave(hornTable);*/
    
    osc0.frequency.value = freq;
    /*osc1.frequency.value = getNewFreq(x);
    osc2.frequency.value = getNewFreq(x);
    osc3.frequency.value = getNewFreq(x);
    osc4.frequency.value = getNewFreq(x);
    osc5.frequency.value = getNewFreq(x);
    osc6.frequency.value = getNewFreq(x);
    osc7.frequency.value = getNewFreq(x);
    osc8.frequency.value = getNewFreq(x);
    osc9.frequency.value = getNewFreq(x);*/
    
    osc0.connect(gainNode);
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = .3;
    osc0.start();
    osc0.stop(audioContext.currentTime + .5);
    //return osc0;
}

function getNewFreq(x) {
    var dx = canvasWidth / 48;
    var freq = [A_0,B_0,C_1,D_1,E_1,F_1,Gs_1,
        A_1,B_1,C_2,D_2,E_2,F_2,Gs_2,
        A_2,B_2,C_3,D_3,E_3,F_3,Gs_3,
        A_3,B_3,C_4,D_4,E_4,F_4,Gs_4,
        A_4,B_4,C_5,D_5,E_5,F_5,Gs_5,
        A_5,B_5,C_6,D_6,E_6,F_6,Gs_6,
        A_6,B_6,C_7,D_7,E_7,F_7];
    for (var i = 0; i < 48; i++) {
        if (x < dx*(i+1))
            return freq[i];
    }
}