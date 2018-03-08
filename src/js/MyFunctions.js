var modal = document.getElementById('id01');

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



function Show_UserInfo(){
	
	
	if(document.getElementById("Info_").style.display=='none'){
		document.getElementById("Info_").style.display= 'block';
		document.getElementById("A_U").style.display= 'block';
		document.getElementById("A_D").style.display= 'none';
	}
	else{
		document.getElementById("Info_").style.display='none';
		document.getElementById("A_U").style.display='none';
		document.getElementById("A_D").style.display= 'block';		
	}
	
}

function Show_Points_(){
	
	if(document.getElementById("Points_").style.display=='none'){
		document.getElementById("Points_").style.display= 'block';
		document.getElementById("P_U").style.display= 'block';
		document.getElementById("P_D").style.display= 'none';
	}
	else{
		document.getElementById("Points_").style.display='none';
		document.getElementById("P_U").style.display='none';
		document.getElementById("P_D").style.display= 'block';		
	}
	

	
	
	
}



function Show_Interest(){
	if(document.getElementById("Interest_").style.display=='none'){
		document.getElementById("Interest_").style.display= 'block';
		document.getElementById("I_U").style.display= 'block';
		document.getElementById("I_D").style.display= 'none';
		}
	else{
		document.getElementById("Interest_").style.display='none';
		document.getElementById("I_U").style.display='none';
		document.getElementById("I_D").style.display= 'block';		
	}
	
}

function Show_Settings(){
	if(document.getElementById("Settings_").style.display=='none'){
		document.getElementById("Settings_").style.display= 'block';
		document.getElementById("S_U").style.display= 'block';
		document.getElementById("S_D").style.display= 'none';
		}
	else{
		document.getElementById("Settings_").style.display='none';
		document.getElementById("S_U").style.display='none';
		document.getElementById("S_D").style.display= 'block';		
	}
	
}




function Apply_Changes(){
	//Change User Name
	var x= document.getElementById("CN_").value;
	document.getElementById("PN_").innerHTML=x;
	document.getElementById("Name_").innerHTML=x;
	document.getElementById("CN_").value=x;
	//Changing NickName
	var x= document.getElementById("CNN_").value;
	document.getElementById("PO_").innerHTML=x;
	document.getElementById("NickName").innerHTML=x;
	
    document.getElementById("CNN_").value=x
	
	
	//Update Saying
	var x= document.getElementById("CS_").value;
	document.getElementById("Saying_").innerHTML=x;
	document.getElementById("CS_").value=x;
	
	
	//Update User Interest
	var a= document.getElementById("CSports").value;
	var b= document.getElementById("CSeason").value;
	var c= document.getElementById("CMovie").value;
	var d= document.getElementById("CSong").value;
	var e= document.getElementById("CPersonality").value;
	
	document.getElementById("ISport_").innerHTML=a;
	document.getElementById("ISeason_").innerHTML=b;
	document.getElementById("IMovie_").innerHTML=c;
	document.getElementById("ISong_").innerHTML=d;
	document.getElementById("IPersonality_").innerHTML=e;
	
	
	 document.getElementById("CSports").value=a;
	document.getElementById("CSeason").value=b;
	document.getElementById("CMovie").value=c;
	document.getElementById("CSong").value=d;
	document.getElementById("CPersonality").value=e;
	
	
	
	//Change Color Theme
	var x= document.getElementById("CC_").value;
	document.getElementById("T1").style.backgroundColor=x;
	document.getElementById("Info").style.backgroundColor=x;
	document.getElementById("Points").style.backgroundColor=x;
	document.getElementById("Interest").style.backgroundColor=x;
	document.getElementById("Settings").style.backgroundColor=x;
	document.getElementById("CC_").style.backgroundColor=x;
	
	var y= document.getElementById("CBC_").value;
	document.getElementById("Back_").style.backgroundColor=y;
	document.getElementById("CBC_").style.backgroundColor=y;
	
	
	var z= document.getElementById("CTC_").value;
	document.getElementById("Body_").style.color=z;
	document.getElementById("CTC_").style.color=z;
	
	
	
	
	alert("Changes Applied Successfully!!");
	
	}























