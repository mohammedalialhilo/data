 class Location {
     constructor(id, exits) {
         this.id = id;
         this.exits = exits;
         this.name = generatename();
     }
 }
 let locations = new Array();


 function getExits(room) {
     return room.exits;
 }

 function findpath(start, end) {
     let paths = [
         [start]
     ];
     let npath = new Array;
     let subpath = new Array;
     let cpath = new Array;
     let newexits = new Array;
     let tp = new Array;

     if (start < 0 || start >= locations.length) {
         return false;
     }

     while (true) {
         for (subpath of paths) {
             newexits = getExits(locations[subpath[subpath.length - 1]]);
             for (nexits of newexits) {
                 if (!subpath.includes(nexits)) {
                     tp = subpath.slice();
                     tp.push(nexits);
                     if (nexits == end) {
                         cpath.push(tp);
                     } else { npath.push(tp); }
                 }


             }
         }
         if (npath.length == 0)
             return cpath;
         paths = npath.slice();
         npath = new Array;
         console.log(paths);
         console.log(cpath);

     }

 }

 function rdn(range) {
     return Math.floor(Math.random() * range);
 }

 function generatename() {
     let s = ["Jolly", "Happy", "Evil"];
     let t = ["Hall", "Room", "Corridor"];
     let d = ["Happiness", "Joy", "Hope"];

     let name = s[rdn(s.length)] + " " + t[rdn(t.length)] + " of " + d[rdn(d.length)];
     //console.log(name)
     return name;
 }


 function generatemap(roomnr, comlexity) {

     for (let i = 0; i < roomnr; i++) {

         room = new Location(i, [i - 1, i + 1]);
         if (i == 0) {
             room.exits[0] == roomnr - 1;
         } else if (i == roomnr - 1) {
             room.exits[1] = 0;
         }
         locations.push(room);
     }

     if (comlexity > 1) {
         for (let i = 0; i < comlexity; i++) {
             let s = Math.floor(Math.random() * roomnr);
             let d = Math.floor(Math.random() * roomnr);
             if (s == d)
                 continue;
             locations[s].exits.push(d);
             locations[d].exits.push(s);
         }
     }
     /*locations[0] = new Location(0, [1, 4]);
     locations[5] = new Location(5, [5]);
     locations[4] = new Location(4, [0, 3, 5])*/
     console.log(locations);
     return locations;
 }

 generatemap(10099, 20)
 console.log(locations);
 //findpath(1, 5);
 generatename();