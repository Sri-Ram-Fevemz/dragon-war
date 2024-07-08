

/* ******************************  LIGHT MODE *******************************/
// variables
const bg = document.querySelector('#bg-1') // background-1 query 
bg.classList.add('dark-mode') // #bg-1 to all class list 'dark-mode'

const switchEle = document.querySelector('.switch-btn') // switch-btn class 
const switchStatus = document.querySelector('.switch-status') // switch-status class
const switchThumb = document.querySelector('.switch-thumb') // thumb

// local storage create a item eg.'mode'
const MODE = localStorage.getItem('mode')
// assing a local storage item in background 'mode'
if (MODE === 'light-mode') { // check a is equal the string 
    bg.classList.add('light-mode')  // if 'light mode' add class 'light-mode' to #bg-1
    switchThumb.style.transform = 'translateX(25px)' // translate thumb 
    switchEle.style.background = '#66cc00' // switch background colour to change
}
// toggle switch function on/off
function toggleSwitch() {
    switchEle.classList.toggle('on')
    bg.classList.toggle('light-mode')
    // if bg contains light mode do the work
    if (bg.classList.contains('light-mode')) {
        localStorage.setItem('mode', 'light-mode')
        switchThumb.style.transform = 'translateX(25px)'
        switchEle.style.background = '#66cc00'
        // else do this work
    } else {
        localStorage.setItem('mode', 'dark-mode')
        switchThumb.style.transform = 'translateX(0px)'
        switchEle.style.background = '#ccc'
    }
}

/* ********************************** Functions ****************************** */

// button variables
const storeBtn = document.querySelector('#store') // Store Button
const forestBtn = document.querySelector('#forest')  // Food Button 
const warBtn = document.querySelector('#war') // War Button

// Hero texts
const xpElement = document.querySelector('#xp span')
const healthElement = document.querySelector('#health span')
const goldElement = document.querySelector('#gold span')

// text variables
const locationElementP = document.querySelector('#location-p')

// Local Variables 
let xp = 0
let health = 100
let gold = 100
let currentWeapons = 0
let fighting
let monsterHealth
let inventory = ['stick']

// local storage variables
const xpLocal = localStorage.getItem(''),
    healthLocal = localStorage.getItem(''),
    goldLocal = localStorage.getItem(''),
    currentWeaponsLocal = localStorage.getItem(''),
    monsterHealthLocal = localStorage.getItem(''),
    inventoryLocal = localStorage.getItem('')

const goldBuyHealth = 25
const goldBuyWeapon = 100

function heroUpdate() {
    xpElement.innerText = xp
    healthElement.innerText = health
    goldElement.innerText = gold
}

heroUpdate()

const locations = [
    {
        // Home Square
        name: "home square",
        "button-text": ['Store', 'Food', 'War'],
        "button-func": [goStore, goFood, goWar],
        text: "You are in the home squre.You go anywhere."
    },
    {
        // Store
        name: 'store',
        "button-text": ['Buy +10 Health (50 gold)', 'Buy 1 Weapon (100 gold)', 'Go Home'],
        "button-func": [buyHealth, buyWeapon, goHome],
        text: "You are in the store you can buy and sell your things"
    },

    {
        // Find Somethings 
        name: 'Forest',
        "button-text": ['Find and eat mushroom ', 'Mine Gold', 'Go Home'],
        "button-func": [findMushroom, mineGold, goHome],
        text: "You are in the forest you can find food and mine gold"
    },

    {
        // Find Somethings 
        name: 'Battle Ground',
        "button-text": ['Attack ', 'Defense', 'Go Home'],
        "button-func": [attack, defense, goHome],
        text: "You are in the battle ground you can fight and kill the dragon."
    }


]


// onclick functions

storeBtn.onclick = goStore
forestBtn.onclick = goFood
warBtn.onclick = goWar


// Update the locations 
function update(location) {
    storeBtn.innerText = location['button-text'][0]
    forestBtn.innerText = location['button-text'][1]
    warBtn.innerText = location['button-text'][2]

    storeBtn.onclick = location['button-func'][0]
    forestBtn.onclick = location['button-func'][1]
    warBtn.onclick = location['button-func'][2]


    locationElementP.innerText = location.text


}
// Home
function goHome() {
    update(locations[0]) // location --------------------->  0

}
// Go Store function
function goStore() {
    update(locations[1]) // location --------------------->  1
}
// Health
function buyHealth() {


    if (health < 100) {
        gold -= goldBuyHealth
        health += 10
    } else {
        locationElementP.innerText = "Your health is full.You can't buy the health"
    }
    heroUpdate()
}
// Weapon
function buyWeapon() { }


// Go food function
function goFood() {
    update(locations[2]) // location --------------------->  2
}
// Find the Mushroom
function findMushroom() { }

// Mine the Gold
function mineGold() { }
// Go war function
function goWar() {
    update(locations[3]) // location ----------------------> 3
}

function attack() {

}
function defense() {

}
