var j; var ctx; var c;
	var dathUser = localStorage.getItem("dath");
	var pseudoUser = localStorage.getItem("pseudonyme");
	var bleue 		= [true, "j1_left.png", "j1_up.png", "j1_right.png", "j1_down.png"]; 
	var jaune 	= [true, "j2_left.png", "j2_up.png", "j2_right.png", "j2_down.png"]; 
	var violette 		= [true, "j3_left.png", "j3_up.png", "j3_right.png", "j3_down.png"];
	var rouge 	= [true, "j4_left.png", "j4_up.png", "j4_right.png", "j4_down.png" ];
	var verte 		= [true, "j5_left.png", "j5_up.png", "j5_right.png", "j5_down.png" ];
	var orange 	= [true, "j6_left.png", "j6_up.png", "j6_right.png", "j6_down.png" ];

	var allBikes = [bleue, jaune, violette, rouge, verte, orange];


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
function Moto(numJoueur, posW, posH, direction, moto, pseudo) {
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
	this.moto = moto;
	

	}
	
	
    Moto.prototype.dessiner = function (numjou) {
		
		// ard = haut
        if(this.direction == "ard")
           this.bike.src =this.moto[2];
        
         // deis = droite
        if(this.direction == "deis")
			 this.bike.src = this.moto[3];
			
         // bun = bas
        if(this.direction == "bun")
             this.bike.src = this.moto[4];
		
		  // clé = gauche
        if(this.direction == "cle")
             this.bike.src = this.moto[1];
			
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
        this.bike.src="styles/KABOUM!.png";
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
	
function ajouterMONJoueur(numjou, posiW, posiH, direction) {
	var x = toX(posiW);
	var y = toY(posiH);
    j[numjou] = new Moto(numjou, x, y, direction, pseudoUser, dathUser, pseudoUser);
	j[numjou].dessiner(numjou);
	allBikes[dathUser][0] = false;
    j[numjou].dessiner(numjou);
}
	
function ajouterAutreJoueur(numjou, posiW, posiH, direction, autrePseudo){
	var x = toX(posiW);
	var y = toY(posiH);
	for(var i = 0; i <= 6; i++){
		if(allBikes[i][0]){
			 j[numjou] = new Moto(numjou, x, y, direction, allBikes[i], autrePseudo);
			 j[numjou].dessiner(numjou);
			allBikes[i][0] = false;
			break;
		}
	}
}


function everyoneGO(){
	for(var i = 0; i <= 6; i++){
		if(j[i] != null){
			j[i].goGoGO();
		}
	}
}


function enregistrerCouleur(value){
	console.log(value);
	window.localStorage.setItem("dath", value);
}

function enregistrerPseudo(){
	var texte= document.querySelector("#pseudo");
	pseudo = texte.value;
	window.localStorage.setItem("pseudonyme", pseudo);
	document.querySelector("#formPart").style.display="none";
	document.querySelector("#canvasPart").style.display="block";
	send();
}

function afficherTOUT(){

	console.log(dathUser);
	console.log(pseudoUser);
}



// // faire en sorte que chaque nouvelle moto qui arrive ou que les motos déjà présentes aient une couleur autre que celle choisie par l'utilisateur. 
// var bleu[motobleue.png, booleen];

// function assignerCouleur(bleu[]){
	// bleu[booleen]= false;
// }

// // function (pseudo){
// //		if (bleu[booleen]){
			// ajouterJoueur(pseudo, ...);
			// bleu[booleen] = false;
			// break;
// }













