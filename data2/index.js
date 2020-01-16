 class Location {
     constructor(id, connections) {
         this.id = id;
         this.connections = connections;
     }
 }
 let locations = new Array();
 for (let i = 1; i < 6; i++) {

     locations[i] = new Location(i, [i -= 1, i += 2]);
     i--;
     console.log(locations[i]);
 }
 locations[1] = new Location(1, [2, 5]);
 locations[6] = new Location(6, [5]);
 locations[5] = new Location(5, [1, 4, 6])

 function findpath(start, slut) {
     for (let x = 0;)


 }
 findpath();