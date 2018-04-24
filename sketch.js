var font;
//will contain all the partciles/vehicles that will be created using the points returned from the text
var vehicles = [];
//the size of the text
var sizeOfText = 192;
var points;
var col;
var textMsg
var pointsLength;
//will run before setup() and draw()
function preload() {
    //load the font from the file
    font = loadFont('AvenirNextLTPro-Demi.otf');
}

//runs before draw() only once
function setup() {
    //define the canvas
    var canvas = createCanvas(1000, 500);
    // Move the canvas so it’s inside our <div id="sketch-holder">.
    canvas.parent('sketch-holder');
    //    canvas.mousePressed(changeText);
    //give the canvas a colour
    background(51);
    col = $('#color-input').val();
    //    textFont(font);
    //    textSize(192);
    //    fill(255);
    //    noStroke();
    //    text('train', 100, 200);

    //set the text to be displayed and formated
    textMsg = 'Train';
    swapText();
    //set the size of the text - helps with textWidth function to return the correct value in order to place the text in the middle of the screen
    textSize(sizeOfText);
    //get an array of points from a text
    points = font.textToPoints(textMsg, width / 2 - textWidth(textMsg) / 2, height / 1.5, sizeOfText);
    //save the points length
    pointsLength = points.length;
    //    //minimize the text size so it fits to screen - doesn't work
    //    while (points[points.length - 1].x > width) {
    //        sizeOfText--;
    //        points = font.textToPoints(textMsg, width / 2 - textWidth(textMsg) / 2, height / 2, sizeOfText);
    //    }


    //for each point create a vehicle/particle  and save it into the vehicles array
    for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        //        stroke(255, 255, 255);
        //        strokeWeight(8);
        //        point(pt.x, pt.y);
        //create new Vehicle(particle)
        var vehicle = new Vehicle(pt.x, pt.y, col);
        vehicles.push(vehicle);
    }
}
//runs till the program is stopped
function draw() {
    background(51);
    col = $('#color-input').val();
    for (var i = 0; i < vehicles.length; i++) {
        //get a reference of each particle
        var v = vehicles[i];
        //will call the update function (update the position)
        v.update();
        //will call the show function (prints the particles on screen)
        v.show();
        //will apply behaviors
        v.behaviors();
        changeColor(v);
    }
    changeText();

}

function changeText() {
    //set a new text message to display
    //get the value of the text input box using the id
    textMsg = $('#text-input').val();

    //recalculate the points
    points = font.textToPoints(textMsg, width / 2 - textWidth(textMsg) / 2, height / 1.5, sizeOfText);
    //if the new text has less characters splice the array of vehicles so it matches the number of points
    if (pointsLength - points.length > 0) {
        vehicles.splice(points.length, pointsLength - points.length);
        //refresh the points length
        pointsLength = points.length;
    } else {
        //if the new text has more characters add new vehicles to the array
        for (var i = 0; i < points.length - pointsLength; i++) {
            var vehicle = new Vehicle(0, 0, col);
            vehicles.push(vehicle);
        }
        //refresh the points length
        pointsLength = points.length;
    }
    //update the target of the particles.
    for (var i = 0; i < vehicles.length; i++) {
        var pt = points[i];
        vehicles[i].updadeTarget(pt);
    }
}
//change the colour of the particles according to the value selected
function changeColor(v) {
    $('#color-input').on('change', function () {
        v.updateColor($('#color-input').val());
    });
}

//swap the letters 
function swapText() {
    $("#swap-text").on('click', function () {
        var input_text = $('#text-input').val();
        input_text = reverseString(input_text);
        //        console.log(input_text);
        $('#text-input').val(input_text);

    });
}

function reverseString(str) {
    return str.split("").reverse().join("");
}
