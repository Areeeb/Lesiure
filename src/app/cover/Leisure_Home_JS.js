
function LogIn_Over(){
	if(document.getElementById("LI").style.display=="none"){
		document.getElementById("LI").style.display="block";
	}	
	
}

function LogIn_Out(){
	if(document.getElementById("LI").style.display=="block"){
		document.getElementById("LI").style.display="none";
	}	
}

function SignUp_Over(){
	if(document.getElementById("SU").style.display=="none"){
		document.getElementById("SU").style.display="block";
	}	
	
}

function SignUp_Out(){
	if(document.getElementById("SU").style.display=="block"){
		document.getElementById("SU").style.display="none";
	}	
}

var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}