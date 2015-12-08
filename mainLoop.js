exports.mainLoop = function(){
  setInterval(mainFunction, 1000/25);
}

var mainFunction = function(){
                  if (tabID[i].d == 37){					//go to left
                      tabID[i].x -= 1;	
                  } else if (tabID[i].d == 39){			//go to right
                      tabID[i].x += 1;
                  } else if (tabID[i].d == 38){			//go to top
                      tabID[i].y -= 1;
                  } else if (tabID[i].d == 40){			//go to bot'
                      tabID[i].y += 1;
                  }

                   //TestCollision : two players
                  var collision = {} //the 2 playerID in collision
                  for(player_collision in tabID){
                      player_collision = i + 1;
                      if (player_collision == 7){
                          player_collision = 1;
                      }
                           
                      if(tabID[i].x == tabID[player_collision].x && 
                          tabID[i].y == tabID[player_collision].y) 
                      {	
                                  wss.broadcast({//Notify everyone about the collision
                                      code: 5,
                                      collsion: {
                                          id_1: i,
                                          id_2: player_collision
                                      }
                                  })
                      }
                  }
          
                  
                   if (tabID[i].x == 100) {//out of horizontal canvas
                          tabID[i].x = 0;
                   } else if (tabID[i].x == 0) {
                           tabID[i].x = 100;
                   }
                          
                   if  (tab[i].y == 100) {//out of vertical canvas
                          tab[ID].y =0;
                   } else if (tabID[i].y == 0) {
                           tabID[i].y = 100;   
			 
			 	 // 2) BROADCAST PLAYER & NEW DIRECTION
	         	 // Notify everyone about this player's change;
	         	 // -> send broadcast code 5
	  		
                          wss.broadcast({//Notify everyone about the change of direction
                                 code: 5,
                                 player: {
                                    id: this.playerID,
                                    x: tabID[this.playerID].x,
                                    y: tabID[this.playerID].y,
                                    d: tabID[this.playerID].d
                                  }
                             })
		    }
}
