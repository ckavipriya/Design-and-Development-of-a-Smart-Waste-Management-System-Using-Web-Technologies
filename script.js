function showNotification(){

alert("⚠ Smart Alert: Garbage bin in Area A is almost full. Collection required!");

}

function aiReply(){

let q = document.getElementById("question").value.toLowerCase();

if(q.includes("plastic")){
document.getElementById("answer").innerHTML =
"Plastic should be placed in the recycling bin.";
}

else if(q.includes("food")){
document.getElementById("answer").innerHTML =
"Food waste should go into the organic waste bin.";
}

else if(q.includes("glass")){
document.getElementById("answer").innerHTML =
"Glass should be disposed in recyclable waste.";
}

else{
document.getElementById("answer").innerHTML =
"Please separate waste into recyclable, organic and non-recyclable.";
}

}
