var table = {
    countChanged:0,
    countNotChanged:0,
    winChanged:0,
    loseChanged:0,
    winNotChanged:0,
    loseNotChanged:0
};
var countGame = 0;
var cards = getCards();
var openCard = -1;
var chooseCard2 = -1;
var chooseCard = -1;
var card_coin_lose = -1;
var stop = false;

function newGame() {
    document.getElementById('0').src="img/card_back.png";
    document.getElementById('1').src="img/card_back.png";
    document.getElementById('2').src="img/card_back.png";
    document.getElementById('win').style="color: white;";
    document.getElementById('lose').style="color: white;";
    cards = getCards();
    openCard = -1;
    card_coin_lose = -1;
    chooseCard2 = -1;
    chooseCard = -1;
    stop = false;
}

function statistic() {
    setTimeout(newGame, 1500);
    if (chooseCard == chooseCard2) {
        table.countNotChanged++;
        if (win()) {
            document.getElementById('win').style="text-shadow: white 1px 0 10px;";
            table.winNotChanged++;
        } else {
            document.getElementById('lose').style="text-shadow: white 1px 0 10px;";
            table.loseNotChanged++;
        }
    } 
    else {
        table.countChanged++;
        if (win()) {
            document.getElementById('win').style="text-shadow: white 1px 0 10px;";
            table.winChanged++;
        } else {
            document.getElementById('lose').style="text-shadow: white 1px 0 10px;"
            table.loseChanged++;
        }
    }
    countGame++;
    document.getElementById('counter_game').innerHTML = countGame;
    document.getElementById('count_top').innerHTML = table.countChanged;
    document.getElementById('count_bott').innerHTML = table.countNotChanged;
    document.getElementById('win_top').innerHTML = table.winChanged;
    document.getElementById('win_bott').innerHTML = table.winNotChanged;
    document.getElementById('lose_top').innerHTML = table.loseChanged;
    document.getElementById('lose_bott').innerHTML = table.loseNotChanged;
}

function getCards() {
    var cards = [0, 0, 0];
    cards[Math.floor(Math.random() * 3)] = 1;
    return cards;
}

function firstOpen() {
    for (var i = 0; i < 3; i++) {
        chooseCard2 = chooseCard;
        if (i == chooseCard) continue;
        if (cards[i] == 0) {
            openCard = i;
            document.getElementById(openCard).src="img/card_goat.png";
            break;
        }
    }
    for (var i = 0; i < 3; i++) {
        if (i != openCard && i != chooseCard) {
            card_coin_lose = i;
        }
    }
}   

function choiceCard(card) {
    if (stop) return;
    if (openCard == -1) {
        chooseCard = card.id;
        for (var i = 0; i < 3; i++) {
            document.getElementById(i).src="img/card_wait_2.png";
        }
        document.getElementById(card.id).src="img/card_wait.png";
        firstOpen();
    }
    else if (card.id != openCard) {
        chooseCard = card.id;
        if (win()) {
            if (chooseCard == chooseCard2) {
                for (var i = 0; i < 3; i++) {
                    if (document.getElementById(i).src="img/card_wait.png") { 
                        document.getElementById(i).src="img/card_goat.png";
                    }
                }
                document.getElementById(chooseCard).src="img/card_win.png";
            } else {
                document.getElementById(chooseCard).src="img/card_win.png";
                document.getElementById(chooseCard2).src="img/card_goat.png";
            }
        } else {
            if (chooseCard == chooseCard2) {
                document.getElementById(card_coin_lose).src="img/card_coin.png";
                document.getElementById(chooseCard).src="img/card_lose.png";
            } else {
                document.getElementById(chooseCard).src="img/card_lose.png";
                document.getElementById(chooseCard2).src="img/card_coin.png";
            }
        }
        stop = true;
        statistic();
    }
}

function win() {
    if (chooseCard == cards.indexOf(1)) return true;
    return false;
}



// ======= about site =======
var close;
function about() {
    document.getElementById('about_text').style="display: flex; position: absolute; flex-direction: column; justify-content: space-evenly;";
    document.getElementById('about_btn').style="display: block;";
    if (close == true) {
        document.getElementById('about_btn').style="display: none;";
        document.getElementById('about_text').style="display: none;";
        close = false;
    } else {
        close = true;
    }
}