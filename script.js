function showStatus(){

alert("Smart Alert: Garbage bin in Area A is almost full.");

}

function aiReply(){

let q=document.getElementById("question").value.toLowerCase();

if(q.includes("plastic")){
document.getElementById("answer").innerHTML="Plastic should go to recycling bin.";
}

else if(q.includes("food")){
document.getElementById("answer").innerHTML="Food waste goes in organic bin.";
}

else{
document.getElementById("answer").innerHTML="Separate waste into recyclable and non-recyclable.";
}

}
