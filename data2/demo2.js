// create new Vue instance bound to #app


new Vue ({
    el: '#app',
    // the data members for this instance
    data: {
        myMap: [],
        allPaths: [],
        alert: "",
        nrOfRooms: 0,
        complexity: 1,
        searchFrom: 0,
        searchTo: 0,
        maxX: 900,
        maxY: 900 
        },
    // and the methods
    methods: {
       
        genMap: function() {
            this.allPaths = [];
            document.querySelector("#searchresult").innerHTML = "";
            if(this.nrOfRooms<1 || this.complexity < 1) {
                this.alert = "Wrong parameters";
                return;
            }
            this.alert = "";
            this.myMap = generateMap(this.nrOfRooms, this.complexity);
            this.showMap();
            this.plotMap();
        },
        generatePaths: function() {
            this.allPaths = [];
            if( this.searchFrom == this.searchTo || this.searchFrom < 0 || this.searchTo < 0 || this.searchFrom>=this.myMap.length || this.searchTo >= this.myMap.length) {
                this.alert = "There is something wrong with your search parameters";
                return;
            }
            this.allPaths = getFullPath(this.searchFrom, this.searchTo, this.myMap);
            if(this.allPaths.length<1) {
                this.alert = "No pathways found";
            }
            else
                this.alert = this.allPaths.length + " paths found";
            
            let txtpaths = "<table border=1>";
            for( path of this.allPaths) {
                txtpaths += "<tr><td>" + path + "</td></tr>";
            }
            document.querySelector("#searchresult").innerHTML = txtpaths;
        },
        showMap: function() {
            console.log("In showMap");
            let map = document.querySelector("#map");
            let table = "<h1>Rooms</h1><table border=1>";
            for( let i =0; i < this.myMap.length; i++) {
                table += "<tr><td>" + this.myMap[i].id + "</td><td>" + this.myMap[i].name + "</td><td>";
                for( each_exit of this.myMap[i].exits) 
                    table += each_exit+" ";
                table += "</td></tr>"
            }
            table += "</table>";
            map.innerHTML = table;
        },
        plotMap: function() {
            let canvas = document.querySelector("#graphical");
            let draw = canvas.getContext("2d");
            canvas.width = this.maxX;
            canvas.height = this.maxY;
            draw.clearRect(0, 0, canvas.width, canvas.height);
            let xy = [];
            draw.font = "30px Comic Sans MS";
            
            for(room in this.myMap) {
                
                draw.fillStyle = "red";
                draw.textAlign = "center";
                xy = this.coords(room);
                draw.fillText(room, xy[0], xy[1]);
            }


            
        },
        coords: function(room) { 
            let angle = room * 360/this.nrOfRooms;
            let radius = this.maxX/2 * 0.9;
            let x,y;
            x = Math.cos(angle * 3.14/180) * radius + this.maxX/2;
            y = Math.sin(angle*3.14/180) * radius + this.maxY/2;
            return [x,y];           
        }

    }
});

// enkel klass för att skapa en plats med namn och id samt utgångar
class Location {
    constructor(name, id, exits) {
        this.name = name;
        this.id = id;
        this.exits = exits;
    }
}

// hjälpfunktion som plockar ut exits från en location och returnerar dem som en array
function exits(location) {
    return location.exits;
}



// tracear en väg från source till destination (id-nummer)
function getFullPath(source, destination, myMap) {

    destination = parseInt(destination);
    // current list of all paths that are unexplored
    let paths = [[parseInt(source)]];
    // is built each iteration and copied to path afterwards
    let npath = [];
    // one of the paths in paths
    let subpath = [];
    // the array containing paths leading to destination
    let cpath = [];
    // array holding the exits from a specific location
    let newexits = [];
    // the new path based on subpath + exits
    let tp=[];

    // error check, is source not even in the map?
    if(source < 0 || source > myMap.length)
        return [];

    while(true) {

        // explore each path in paths
        for(subpath of paths) {
            // find exits for last location in subpath
            newexits = exits(myMap[subpath[subpath.length-1]]);
            // make new paths out of the subpath + exits
            for(nexit of newexits) {
                // is this location not in the path
                console.log(subpath);
                console.log(nexit);
                if(!subpath.includes(nexit)) {
                    // copy subpath to tp
                    tp = subpath.slice();
                    // push location to it
                    tp.push(nexit);
                    // are we there yeti?
                    if(nexit == destination)
                        // push it to cpath instead of npath
                        cpath.push(tp);
                    else 
                        npath.push(tp);
                }
            }
        }
        // new paths found during iteration?
        if(npath.length < 1)
            // nope, then we are done
            return cpath;
        // otherwise we copy npath to paths and do it all again
        paths = npath.slice();
        npath = [];
    }
}

// ---------------------------------------------------------------------------
// map generator 
//
// rooms = number of rooms to generate
// complexity = a factor determining the number of paths, if 1 it will result in a 
// linear map with paths = rooms - 1
//
// ----------------------------------------------------------------------------

// depends on myMap[]
function generateMap( rooms, complexity) {
    // clear array
    let myMap = [];

    for(let i = 0; i < rooms; i++) {
        room = new Location( generateRoomNames(), i, [i-1, i+1])
        // change exits if it is the first or last room
        if(i==0)
            room.exits[0] = rooms-1;
        else if(i == rooms-1)
            room.exits[1] = 0;
        myMap.push(room);
        //console.log(room);
    }
    // if higher complexity is required, generate mor paths
    if(complexity>1) {
        for(let i = 0; i<complexity; i++) {
            let s = Math.floor(Math.random()*rooms);
            let d = Math.floor(Math.random()*rooms);
            // link back to its own room
            if(s == d)
                continue;
            // link already exists
            if(myMap[s].exits.includes(d))
                continue;
            myMap[s].exits.push(d);
            myMap[d].exits.push(s);
            
        }
    }
    document.querySelector("#search").hidden = false;
    return myMap;
}

// shittty name generator
function generateName( len ) {
    let vowels = "aoueiy";
    let consonants = "bdfghjklmnprstvwxz";

    let name = "";
    if(len < 1) 
        return "Stupid";
    
    for(let i = 0; i < len; i++) {
        if(i%2==0)
            name += consonants[Math.floor(Math.random()*consonants.length)];
        else
            name += vowels[Math.floor(Math.random() * vowels.length)];
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// better room name generator
function generateRoomNames() {
    let s = ["Dark", "Light", "Bloody", "Sinister", "Narrow", "Ominous", "Evil", "Jolly", "Soundless"];
    let t = ["Room", "Hall", "Pathway", "Gangway", "Passage", "Niche"];
    let u = ["Despair", "Foreboding", "Ruthlesness", "Bones", "Cliches", "Unfullfilling", "Hope", "Happiness"];

    return name = s[Math.floor(Math.random()*s.length)] + " " +t[Math.floor(Math.random()*t.length)] + " of " + u[Math.floor(Math.random()*u.length)];
} 

// disable the view of search
document.querySelector("#search").hidden = true;
