var j; var ctx; var c;
	var dathUser = localStorage.getItem("dath");
	var pseudoUser = localStorage.getItem("pseudonyme");
	var bleu 		= ["j1_left.jpg", true]; 
	var jaune 	= ["j2_left.jpg", true]; 
	var violet 		= ["j3_left.png", true];
	var rouge 	= ["j4_left.jpg", true];
	var vert 		= ["j5_left.png", true];
	var orange 	= ["j6_left.png", true];



function init(){
c = document.querySelector("#myCanvas");
 ctx = c.getContext("2d");
//    var c1=document.getElementById("yarBike");
//    var txc = c1.getContext("2d");
var timerID = 0;
// var posW = 500;
// var posH = 0;

var team;

//var numjou = 0;
j = [null, null, null, null, null, null];

//gauche = 37
//droite = 39
//haut = 38
//bas = 40
c.addEventListener("keypress", function(e){
    socket.send(JSON.stringify({code: 5} + e.keyCode));
}, false);
var interval;

document.getElementById("stopButton").onclick = function() {
        clearInterval(timerID);
    }
	
document.getElementById("startButton").onclick = function(){
	timerID = setInterval(everyoneGO, 50);
}	
	
	
};



/////////// L I G H T B I K E //////////////////////////////////////////////
function Moto(numJoueur, posW, posH, direction, pseudo, moto) {
    this.canvas = c; 
    this.numJoueur = numJoueur;
	this.posW = posW;
    this.posH = posH;
    this.ctxt = ctx; 
	this.pseudo = pseudo;
	this.moto = moto;
    this.dath;
	this.direction = direction;
    this.bike = new Image();

    if (moto == bleu) {
		
        team = "fuar";
		dath = "blue";
		
    }
    else if (numJoueur == 2) {

        team = "te";
		this.dath = "yellow";
		
    }
    else if (numJoueur == 3) {

        team = "fuar";
		this.dath = "purple";
		
    }
    else if (numJoueur == 4) {

        team = "te";
		this.dath = "red";
		
    }
    else if (numJoueur == 5) {

        team = "fuar";
		this.dath = "green";
		
    }
    else if (numJoueur == 6) {

        team = "te";
		this.dath = "orange";
		
    };

	}
	
	
    Moto.prototype.dessiner = function (numjou) {
		
		// ard = haut
        if(this.direction == "ard")
           this.bike.src =this.moto[0];
        
         // deis = droite
        if(this.direction == "deis")
			 this.bike.src = "styles/j" + this.numJoueur + "_right.png";
			
         // bun = bas
        if(this.direction == "bun")
             this.bike.src = "styles/j" + this.numJoueur + "_down.png";
		
		  // clé = gauche
        if(this.direction == "cle")
             this.bike.src = "styles/j" + this.numJoueur + "_left.png";
			
		this.bike.onload = function () 
				//time to draw... bang bang
				j[numjou].ctxt.drawImage(j[numjou].bike, j[numjou].posW, j[numjou].posH);		
			
    };
	
	
	
	
    Moto.prototype.setPosW = function (width) {
        this.posW = width;
    };

    Moto.prototype.setPosH = function (height) {
        this.posH = height;
    };
    
	
	
	
    Moto.prototype.laMuerta = function (){
		this.ctxt.clearRect(this.posW, this.posH, 32, 32);
		this.ctxt.clearRect(this.posW, this.posH, 32, 32);
        this.bike.src="styles/Badaboum!.png";
        this.bike.onload = function(){
			cthis.ctxt.drawImage(bike, this.posW, this.posH);
        setTimeout(function(){
          this.ctxt.clearRect(this.posW, this.posH, 32, 32);
        }, 1250);
		}
    };
	

	
	
	
 Moto.prototype.goGoGO = function (){
                        
                        if(this.direction = "ard"){
                                 this.ctxt.clearRect(this.posW, this.posH, 32, 32);
                                 this.posH -= 3;
                         }
                        
                         if(this.direction=="deis"){
                                 this.ctxt.clearRect(this.posW, this.posH, 32, 32);
                                 this.posW += 3;
                         }
                        
                         if(this.direction=="bun"){
                                 this.ctxt.clearRect(this.posW, this.posH, 32, 32);
                                 this.posH += 3;
                         }
                        
                         if(this.direction=="cle"){
                                 this.ctxt.clearRect(this.posW, this.posH, 32, 32);
                                 this.posW -= 3;
                         }
                         this.dessiner(this.numJoueur);
                 };
         

////////////////////////////////////////////////

//convertir l'arriv�e des donn�es en pourcentage en coordonn�es de canvas.
	function toX(weedz){
		x = (c.width*weedz)/100;
		return (x);
    	};
	function toY(hait){
		y = (c.height*hait)/100;
		return (y);
	};
	
function ajouterJoueur(numjou, posiW, posiH, direction) {
	var x = toX(posiW);
	var y = toY(posiH);
    j[numjou] = new Moto(numjou, x, y, direction, pseudoUser, dathUser);
    j[numjou].dessiner(numjou);
};

function everyoneGO(){
	for(var i = 0; i <= 6; i++){
		if(j[i] != null){
			j[i].goGoGO();
		}
	}
}


function enregistrerCouleur(value){
	console.log(value);
	dath = value;
	localStorage.setItem("dath", value);
}

function enregistrerPseudo(){
	var texte= document.querySelector("#pseudo");
	pseudo = texte.value;
	localStorage.setItem("pseudonyme", pseudo);
	document.querySelector("#formPart").style.display="none";
	document.querySelector("#canvasPart").style.display="block";
	send();
}

function afficherTOUT(){

	console.log(dathUser);
	console.log(pseudoUser);
}


function assignerCouleur(moto){
	moto[1] = false;
}



// // faire en sorte que chaque nouvelle moto qui arrive ou que les motos déjà présentes aient une couleur autre que celle choisie par l'utilisateur. 
// var bleu[motobleue.jpg, booleen];

// function assignerCouleur(bleu[]){
	// bleu[booleen]= false;
// }

// // function (pseudo){
// //		if (bleu[booleen]){
			// ajouterJoueur(pseudo, ...);
			// bleu[booleen] = false;
			// break;
// }













