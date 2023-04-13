'use strict';

//koppel onderdelen uit DOM met JS en voeg 
//functionaliteiten toe
//variabelen die ik nog ga gebruiken
const myField = document.getElementById("field")
const fieldSize = document.getElementById("field-size")
let myCardArray = ['duck', 'kitten', 'piglet', 'puppy', 'calf', 'veal', 'lamb', 'rooster', 'horse', 'mouse', 'dog', 'cat', 'goose', 'goat', 'sheep', 'pig', 'cow', 'chick', 'hen'];
myField.addEventListener("click", onClickCard)
fieldSize.addEventListener("change", selectFieldSize);
let boardClass;
let chosenFieldSize;
let boardSize;
let myCardSet;
let  doubledCards;

//Maak een template (class) voor javascript objecten:
// card (1&2), sound, set (match card 1 + 2).
//via cardObject kun je de kaarten manipuleren. 
class Card {
    constructor(cardObject) {
        this.card1 = cardObject.card1;
        this.card2 = cardObject.card1;
        this.snd = cardObject.snd;
        this.set = cardObject.set;
        this.timer = document.getElementById("time-remaining");
        this.cardsFlipped = document.getElementById("flips");
    }
}

function shuffleCards() {
    for (let i = myCardArray.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        let k = myCardArray[i];
        myCardArray[i] = myCardArray[j];
        myCardArray[j] = k;
    }
}



//Haal variabelen uit JSON bestand
//Dit bestand kent waarden ook kaart 1 en kaart 2 toe!
fetch('js/cards.json')
    .then(response => response.json())
    .then(data => {
        myCardArray = data.map(card => new Card(card));
        //map() creates a new array from calling a function for every array element. map() calls a function once for each element in an array. 
        //voor elke variabale(card) uit mycardArray, maak voor elke card een nieuwe card aan in de class Card. 
        console.log(myCardArray);
    })


//maak kaarten klikbaar en manipuleerbaar
function onClickCard(e) {
    if (e.target.className === 'covered')  //wanneer target class covered heeft:
        e.target.className = 'uncovered'; //verander naam class in uncovered (waardoor als het goed is de afbeelding van het dier verschijnt).
    e.target.parentNode.firstChild.getAttribute('animalType');
    console.log(e.target.parentNode.firstChild.getAttribute('animalType')); //In console toon welke kaart wordt aangeklikt.
    //check hoeveel kaarten zijn aangeklikt
    if (this.card1  === 'uncovered' && this.card2 === 'uncovered') {
        checkForMatch();
    } else{
        this.card1 = 'covered' && this.card2 === 'covered';
    }
}

function checkForMatch() {
    console.log('Checking for match');
}

//Kies speelveldgrootte;
function selectFieldSize(e) {
    chosenFieldSize = e.target.value; //chosenFieldsize is waarde van geselecteerde variabele
    boardSize = document.getElementById("boardsize");
    myCardSet = shuffleCards(myCardArray);

    switch (chosenFieldSize) {
        case '4':
          boardClass = 'board4'; //Als keuze is board 4
          myCardSet = myCardArray.slice(0,8); //selecteer 8 kaartjes uit myCardArray 
          break;
        case '5':
          boardClass= 'board5';
        myCardSet = myCardArray.slice(0,12);
          break;
        case '6':
          boardClass= 'board6';
        myCardSet = myCardArray.slice(0,18);
          break;
      }

    //De kaarten verdubbelen
    doubledCards = myCardSet.concat(myCardSet);
    //Kaarten schudden
    shuffleCards(doubledCards);
    //Voeg kaarten toe aan speelveld
    populateField(doubledCards);
    //koppel speelveldgrote aan kaartset
    boardClass = doubledCards;

}

//voeg kaarten toe aan speelveld;
function populateField(doubledCards) {
    myField.innerHTML = ''; // Koppel input uit functie myField aan HTML bestand.'
    doubledCards.forEach(card => {  // haal uit const myCardSet elk element en wijs dat toe aan 'card'.
        let newTile = document.createElement('div'); //maak variabele newTile die is gekoppeld aan nieuw 'div' element in html.
        let newCard = document.createElement('img'); // zelfde maaar dan met 'img' 
        let newCoverCard = document.createElement('img'); //zelfde maar dan voor Covercard
        newTile.setAttribute('class', boardClass); //Deze stond niet echt goed bescherven in de opdracht. maar: -->
        //Haalt de juiste specificaties uit de CSS om newTile vorm te geven.
        let imageURL = 'img/' + card.card1 + '.jpg'; //ken elke afbeelding uit folder img toe aan imageURL.
        newCard.setAttribute('src', imageURL); //elke afbeelding uit imageURL vormt een nieuwe card
        newCoverCard.setAttribute('src', 'img/cover.png') //haal afbeelding cover.jpg uit de src(folder) img.
        newCoverCard.setAttribute('class', 'covered') //ken aan newcovercard de class covered toe, die weer in CSS gedefinieerd wordt. 
        newCard.setAttribute('animalType', card.card1); //koppel newCard aan naam kaart en variabele card
        newTile.appendChild(newCard); //maak newCard kind van newTile
        newTile.appendChild(newCoverCard);//maak newCoverCard kind van newTile
        myField.appendChild(newTile); //maak newTile kind van myfield.
    });
}



//selecteer de maat van het speelveld en selecteer het
//juiste aantal kaarten.

    //kies grootte speelveld en slice het aantal kaart


//verdubbel de kaarten zodat er 2 van elk zijn. 

//Koppel de afbeeldingen uit de map img aan kaarten
//geef alles een voorkant en achterkant. 

// draai kaart om wanneer er op geklikt wordt.

//shuffle kaarten nadat het totaal kaarten geselecteerd is. 


//voeg functies toe:
//keepScore(), nextMove(), resetGame() 

//anderefuncties: 
//setTimeout()
// bouw timer met setInterval() en clearInterval()
//voeg geluid toe

//voeg startscherm toe met prompt voor invoeren naam. 
//Sla high scores op, voeg per level (grootte speelveld) 
//toe via local storage.
