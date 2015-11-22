var j; var ctx; var c;




function init(){
c = document.getElementById("myCanvas");
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
    socket.send(JSON.stringify({code: 1} + e.keyCode));
}, false);
var interval;

document.getElementById("stopButton").onclick = function() {
        clearInterval(timerID);
    }
	
// document.getElementById("startButton").onclick = function(){
	// timerID = setInterval(everyoneGO, 50);
// }	
	
	
};



/////////// L I G H T B I K E //////////////////////////////////////////////
function Moto(canvas, numJoueur, posW, posH, contx, direction) {
    this.canvas = canvas;
    this.numJoueur = numJoueur;
    this.posH = posH;
    this.posW = posW;
    this.contx = contx;
    var dath;
	var angle = 0;
	this.direction = direction;
    var bike = new Image();
    var bike_prof = new Image();
	


    if (numJoueur == 1) {

        bike.src = "styles/j1_up.png";
        bike_prof.src = "styles/j1_prof.gif";
        //angle = 270;
        team = "fuar";
		dath = "blue";
		
    }
    else if (numJoueur == 2) {

        bike.src = "styles/j2_up.png";
        bike_prof.src = "styles/j2_prof.gif";
//        angle = 90;
        team = "te";
		dath = "yellow";
		
    }
    else if (numJoueur == 3) {

        bike.src = "styles/j3_up.png";
        bike_prof.src = "styles/j3_prof.gif";
//        angle = 270;
        team = "fuar";
		dath = "purple";
		
    }
    else if (numJoueur == 4) {

        bike.src = "styles/j4_up.png";
        bike_prof.src = "styles/j4_prof.gif";
//        angle = 90;
        team = "te";
		dath = "red";
		
    }
    else if (numJoueur == 5) {

        bike.src = "styles/j5_up.png";
        bike_prof.src = "styles/j5_prof.gif";
//        angle = 270;
        team = "fuar";
		dath = "green";
		
    }
    else if (numJoueur == 6) {

        bike.src = "styles/j6_up.png";
        bike_prof.src = "styles/j6_prof.gif";
        //angle = 90;
        team = "te";
		dath = "orange";
		
    };

	 Moto.prototype.cas = function (){
        
		var haut = "ard";
		var droite = "deis";
		var bas = "bun";
		
         // ard = haut
        if(direction == "ard")
           angle = 0;
        
         // deis = droite
        if(this.direction == "deis")
            angle = 90;
        
         // bun = bas
        if(direction == "bun")
            angle = 180;
		
		  // clé = gauche
        if(direction == "cle")
            angle = 270;
		
		return angle;
    };

    Moto.prototype.dessiner = function () {
			angle = this.cas(direction);
        bike.onload = function () {
            //time to draw... bang bang
            var TO_RADIANS = Math.PI / 180;
            contx.save();
            contx.translate(posW, posH);
            contx.rotate(angle * TO_RADIANS);
            contx.drawImage(bike, -(bike.width / 2), -(bike.width / 2));
            contx.restore();
			
        }
    };
	
    Moto.prototype.setPosW = function (width) {
        this.posW = width;
    };

    Moto.prototype.setPosH = function (height) {
        this.posH = height;
    };
    
    Moto.prototype.laMuerta = function (){
		contx.clearRect((posW-16), (posH-16), 32, 32);
        bike.src="styles/Badaboum!.png";
        this.dessiner();
        setTimeout(function(){
          contx.clearRect((posW-16), (posH-16), 32, 32);
        }, 1250);
    };
	
	// Moto.prototype.goGoGO = function (){
			
			// if(direction=="cle"){
				// ctx.clearRect((posW - 16), (posH - 16), 32, 32);
				// j[numJoueur] = new Moto(c, numJoueur, posW-3), posH, ctx, direction);
				// this.dessiner();
			// }
			
			// if(j[numJoueur].direction=="deis"){
				// ctx.clearRect((j[numJoueur].posW - 16), (j[numJoueur].posH - 16), 32, 32);
				// j[numJoueur] = new Moto(c, numJoueur, (j[numJoueur].posW+3), j[numJoueur].posH, ctx, j[numJoueur].direction);
				// j[numJoueur].dessiner();
			// }
			
			// if(j[numJoueur].direction=="ard"){
				// ctx.clearRect((j[numJoueur].posW - 16), (j[numJoueur].posH - 16), 32, 32);
				// j[numJoueur] = new Moto(c, numJoueur, j[numJoueur].posW, (j[numJoueur].posH-3), ctx, j[numJoueur].direction);
				// j[numJoueur].dessiner();
			// }
			
			// if(j[numJoueur].direction=="bun"){
				// ctx.clearRect((j[numJoueur].posW - 16), (j[numJoueur].posH - 16), 32, 32);
				// j[i] = new Moto(c, numJoueur, j[numJoueur].posW, (j[numJoueur].posH+3), ctx, j[numJoueur].direction);
				// j[numJoueur].dessiner();
			// }

		// };
	
	
		
	}
		
	
    /*afficher la photo de profil dans le deuxième canvas.
     * Moto.prototype.displayProfile = function(){
     
     bike_prof.onload = function(){
     txc.drawImage(bike_prof, bike_prof.current * bike_prof.width, 0, 
     bike_prof.width, bike_prof.height, c1.width/2, c1.heigth/2, bike_prof.width, bike_prof.height);
     bike_prof.current = (bike_prof.current + 1) % bike_prof.total_frames;
     }*/
     
	 

////////////////////////////////////////////////

//convertir l'arriv�e des donn�es en pourcentage en coordonn�es de canvas.
	function toX(weedz){
		x = (c.width*weedz)/100;
		return (x);
    };
	function toY(hait){
		y = (c.height*hait)/100;
		return (y);
	}
	
function ajouterJoueur(numjou, posiW, posiH, direction) {
	var x = toX(posiW);
	var y = toY(posiH);
    j[numjou] = new Moto(c, numjou, x, y, ctx, direction);
    j[numjou].dessiner();
}


function everyoneGO(){
	for(var i = 1; i <= 6; i++){
		if(j[i] != null){
			goGoGO(i);
			console.log('hi ' + i);
		}
	}
}
	
	function goGoGO(numJoueur){

			
			if(j[numJoueur].direction=="cle"){
				//console.log('go  '+numJoueur)
				ctx.clearRect((j[numJoueur].posW - 16), (j[numJoueur].posH - 16), 32, 32);
				j[numJoueur] = new Moto(c, numJoueur, (j[numJoueur].posW-3), j[numJoueur].posH, ctx, j[numJoueur].direction);
				j[numJoueur].dessiner();
			}
			
			if(j[numJoueur].direction=="deis"){
				ctx.clearRect((j[numJoueur].posW - 16), (j[numJoueur].posH - 16), 32, 32);
				j[numJoueur] = new Moto(c, numJoueur, (j[numJoueur].posW+3), j[numJoueur].posH, ctx, j[numJoueur].direction);
				j[numJoueur].dessiner();
			}
			
			if(j[numJoueur].direction=="ard"){
				ctx.clearRect((j[numJoueur].posW - 16), (j[numJoueur].posH - 16), 32, 32);
				j[numJoueur] = new Moto(c, numJoueur, j[numJoueur].posW, (j[numJoueur].posH-3), ctx, j[numJoueur].direction);
				j[numJoueur].dessiner();
			}
			
			if(j[numJoueur].direction=="bun"){
				ctx.clearRect((j[numJoueur].posW - 16), (j[numJoueur].posH - 16), 32, 32);
				j[numJoueur] = new Moto(c, numJoueur, j[numJoueur].posW, (j[numJoueur].posH+3), ctx, j[numJoueur].direction);
				j[numJoueur].dessiner();
			}
			
			if (j[numJoueur] == null)
				console.log("hi");
		}
	
	
	
