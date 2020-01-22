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

 function findpath(src, end) {


     let paths = [
         [src]
     ];
     let npath = [];
     let subpath = [];
     let cpath = [];
     let newexits = [];
     let tp = [];
     if (src < 0 || src >= locations.length) {
         return [];
     }
     while (true) {
         for (subpath of paths) {
             newexits = getExits(locations[subpath[subpath.length - 1]]);
             for (nexit of newexits) {
                 if (!subpath.includes(nexit)) {
                     tp = subpath.slice();
                     tp.push(nexit);

                     if (nexit == end)
                         cpath.push(tp);
                     else
                         npath.push(tp);
                 }
             }
         }
         if (npath.length == 0) {
             return cpath;
         }
         paths = npath.slice();
         npath = [];
         //console.log(cpath);
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

 function generatemap() {
     let roomnr = document.getElementById("antalnr").value;
     let comlexity = document.getElementById("con").value;
     generatename();
     for (let i = 0; i < roomnr; i++) {

         room = new Location(i, [i - 1, i + 1]);
         if (i == 0) {
             room.exits[0] = roomnr - 1;
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
     document.getElementById("hidden1").style.display = "block";
     for (let x = 0; x < locations.length; x++) {
         let info = document.createElement("p");
         info.innerHTML += locations[x].name + "  exits: " + locations[x].exits;
         document.getElementById("hidden1").appendChild(info);
     }
     document.getElementById("hidden2").style.display = "block";
     console.log(locations);
     return locations;
 }

 function find() {
     console.time('find');

     let src = parseInt(document.getElementById("src").value);
     let end = parseInt(document.getElementById("end").value);
     if (Number.isInteger(src) && Number.isInteger(end)) {
         if (src <= locations.length && src >= 0 && end <= locations.length && end >= 0) {
             let p = findpath(src, end);
             console.log(p)
         } else console.log("unvalid");
     } else {
         console.log("NO")
     }
     console.timeEnd('find');
 }