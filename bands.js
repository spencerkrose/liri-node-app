// this is a quick thing that I built with a switch case to checks if the variable name foodItem is an apple or banana
// you can see I'm passing the variable into the switch and now that variable is what the switch case is actually checking
// So this swtitch is going to look at the value of food item and if it equals any of the cases it will do something.
// Case is the keyword that says "hey! if the switch equals this, do this!"
// The first case is checking for string "apple". Because the value of foodItem is not "apple" it continues on and doesn't do anything.
// The second case is checking for string "banana". Because the value of foodItem is "banana" it says goes "hey! my condition I was checking for was met! Now I'm going to do the thing the use told me to."
// So now this statement executes what I told it to do after the colon in case "banana":
// it should console log "this is a banana".
var foodItem = "banana";

switch (foodItem) {
  case "apple":
    console.log("this is an apple");
    break;
  case "banana":
    console.log("this is a banana");
    break;
  default:
    console.log("please enter apple or banana");
}
//  there are 2 other things going on with this, 'break' and 'default
// break is the keyword that tells the statement "hey! this case was met, don't check any cases after this one". 

// default is kind of like when you have an if else statement but don't give anything specific for the else.
// the difference is default will fire off every time unless you have those breaks. 

// so for example if you changed var foodItem = "bacon" it would not satisfy either the case for "apple" or "banana"
// it would console.log please enter apple or banana

// BUT if you removed the breaks and var foodItem still equalled "banana" it would console log "this is a banana" AND please enter apple or banana
// thats why we add breaks, so that it doesn't execute anything after the case condition is met.