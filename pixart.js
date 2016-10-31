/*

PIXART
A JS Painting Website

In this exercise, students will build out a simple paint application. This application will have a form where users can set a color that they would like to paint with. The user can then mouse over cells that they would like to paint with that color.

*/



/*

Step 1: Building the canvas
Our canvas is 500px by 500px and we need to fill it with cells (which a class of .square) that are 10px by 10px.

First, add however many divs with a class of "square" as you need to to fill our the #canvas element.

If #canvas is 500 x 500, how many 10 x 10 squares can we fit in to it?

How we we create elements in JavaScript and add them to the page?

*/
var canvas = document.getElementById("canvas")
console.log( canvas.getBoundingClientRect().width )
var canvasWidth = canvas.getBoundingClientRect().width
var canvasHeight = canvas.getBoundingClientRect().height
var canvasSize = (canvasWidth/10) * (canvasHeight/10)


//.square class already in the CSS
// class square {
// 	constructor(height, width) {
// 	    this.height = "10px"
// 	    this.width = "10px"
// 	    this.background = "white"
// 	    this.border = "none"
//   }
// }
// console.dir(square) // function

function createCanvas() {
	for (i = 0; i < canvasSize; i++) {
		var pixel = document.createElement("div")
		pixel.className = "square"
		canvas.appendChild( pixel )
	}
}

createCanvas()
/*

Step 2: Form Event
When the user submits the form, either by hitting enter in the text input field or by clicking on the submit button, we should then get the color value that they entered and save it to a variable called currentColor.

Once we have the color, we should update our .brush element, so that the user can see what color they're painting with at any given time.

hints:
(1) you may need to look up form specific events,
(2) you may need to avoid the browser's default behavior when submitting a form,
(3) you should query for the input field from the event target
(4) once you have the input field, it's current value is stored in the value property

*/


var currentColor // so I can use it later
document.getElementById("color-field").setAttribute("style", "defaultValue: enter an HTML color name")

document.getElementById("set-color").onclick = function() {
	event.preventDefault()
	document.getElementById("color-field").submit
	currentColor = document.getElementById("color-field").value
	console.log("submitted... " + document.getElementById("color-field").value)
	document.querySelector(".brush").setAttribute("style", "background-color: " + currentColor)
	// console.log( document.querySelector(".brush").className ) 
}

// console.dir( document.getElementById("color-field").value )
// console.log(currentColor)

/*

Step 3: Readying our Canvas
Now that we can get the color the user wants to paint with from our form, we need to make it so they can actually paint with that color. Create an event handler that will change the background color of the event target to the current color and attach it to every div.square that you created made above.

Hints:
(1) you probably want to write your function here and then attach the event in your loop up in Step 1
(2) think about what event we might want to attach our event handler too; what mouse events are there that might make sense?

*/

// var canvasSize = (canvasWidth/10) * (canvasHeight/10) // above


// console.dir( canvas.childNodes[this].mouseover )
// for (i = 0; i < canvasSize; i++) { // attempt 1
// 	canvas.childNodes[i].mouseover =  function() {
// 		console.log(i + " moused over!")
// 		// this.setAttribute("style", "background-color: " + currentColor)
// 	} // closing function
// }

console.dir( canvas.childNodes )

canvas.onmouseover = function() {
	event.preventDefault()
	for (i = 0; i < canvasSize; i++) {
		canvas.childNodes[i].onmouseover =  function() {
			event.stopPropagation() // not sure where to put this - not need but runs faster with it
			// console.log(i + " moused over!")

			if (event.relatedTarget.className == "square") {
				event.relatedTarget.setAttribute("style", "background-color: " + currentColor)
				// console.log( event.relatedTarget)
				// canvas.childNodes[i].setAttribute("style", "background-color: " + currentColor)
				// canvas.onmouseout = break // keeps affecting other elements outside/underneath the canvas??????????????????
			} else {} // SOLVED.... but probably not the best way... haha
		} // closing function onmouseover childNode
	// event.stopPropagation()

	} // closing for loop i
}

