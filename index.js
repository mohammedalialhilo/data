var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function Deck() {
    var deck = new Array();
    //skapar deck
    for (var i = 0; i < suits.length; i++) {
        for (var x = 0; x < values.length; x++) {
            var card = { Value: values[x], Suit: suits[i] };
            deck.push(card);
        }
    }
    //blandar deck
    for (var i = 0; i < 100; i++) {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];
        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
    return deck;
}

function Play() {
    var deck = Deck();
    var players = new Array();
    let status = undefined;
    //skapar spelare 
    for (var i = 1; i < 5; i++) {
        var hand = new Array();
        var points = 0;
        var player = { Name: 'Player ' + i, Hand: hand, Points: points, Status: status };
        players.push(player);
    }
    //delar kort
    for (var i = 0; i < 13; i++) {
        for (var x = 0; x < players.length; x++) {
            var card = deck.pop();
            players[x].Hand.push(card);
        }
    }

    for (var i = 0; i < players.length; i++) {
        let score = 0;
        let scount = 0;
        let ccount = 0;
        let dcount = 0;
        let hcount = 0;
        for (var x = 0; x < hand.length; x++) {
            let cardp = players[i].Hand[x].Value;
            //kolar efter värde A,Q,K,J och lägger till points direct
            if (cardp.includes('Q')) {
                score += 2;
            } else if (cardp.includes('J')) {
                score += 1;
            } else if (cardp.includes('K')) {
                score += 3;
            } else if (cardp.includes('A')) {
                score += 4;
            }
            //k färg 
            let cardt = players[i].Hand[x].Suit;
            if (cardt.includes('spades')) {
                scount++;
            } else if (cardt.includes('diamonds')) {
                dcount++;
            } else if (cardt.includes('clubs')) {
                ccount++;
            } else if (cardt.includes('hearts')) {
                hcount++;
            }
        }
        //kolar ifall behöver att adda point ifrån färg mängd i handen
        if (scount == 6 || scount == 1) {
            score += 3;
        }
        if (hcount == 6 || hcount == 1) {
            score += 3;
        }
        if (dcount == 6 || dcount == 1) {
            score += 3;
        }
        if (ccount == 6 || ccount == 1) {
            score += 3;
        }

        if (scount == 0) {
            score += 4;
        }
        if (hcount == 0) {
            score += 4;
        }
        if (dcount == 0) {
            score += 4;
        }
        if (ccount == 0) {
            score += 4;
        }
        players[i].Points = score;
        //ser om spelare kommer att spela
        if (12 <= score) {
            players[i].Status = 'PLAY!';
        } else if (score < 12) {
            players[i].Status = 'PASS!';
        }
    }
    console.log(players);
    return players;
}
Play();