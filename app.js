// Selecting and applying dark mode to background
const bg = document.querySelector('#bg-1')
bg.classList.add('dark-mode')

// Selecting elements related to the switch button and its status
const switchEle = document.querySelector('.switch-btn')
const switchStatus = document.querySelector('.switch-status')
const switchThumb = document.querySelector('.switch-thumb')

// Retrieving mode from localStorage and applying light mode if stored mode is 'light-mode'
const MODE = localStorage.getItem('mode')
if (MODE === 'light-mode') {
    bg.classList.add('light-mode') // Apply light mode class to background
    switchThumb.style.transform = 'translateX(25px)' // Move switch thumb to light mode position
    switchEle.style.background = '#66cc00' // Set switch button background color to green
}

// Function to toggle switch between light and dark mode
function toggleSwitch() {
    switchEle.classList.toggle('on') // Toggle switch button's 'on' class
    bg.classList.toggle('light-mode') // Toggle light mode class on background
    if (bg.classList.contains('light-mode')) {
        localStorage.setItem('mode', 'light-mode') // Store light mode in localStorage
        switchThumb.style.transform = 'translateX(25px)' // Move switch thumb to light mode position
        switchEle.style.background = '#66cc00' // Set switch button background color to green
    } else {
        localStorage.setItem('mode', 'dark-mode') // Store dark mode in localStorage
        switchThumb.style.transform = 'translateX(0px)' // Move switch thumb to dark mode position
        switchEle.style.background = '#ccc' // Set switch button background color to light gray
    }
}

// Selecting buttons and elements related to user stats and location
const storeBtn = document.querySelector('#store') 
const forestBtn = document.querySelector('#forest') 
const warBtn = document.querySelector('#war')

const xpElement = document.querySelector('#xp span')
const healthElement = document.querySelector('#health span')
const goldElement = document.querySelector('#gold span')
const locationElementP = document.querySelector('#location-p')

// Initial values for user stats and game state
// let xp = 0
// let health = 80
// let gold = 100
// let currentWeapons = 0
// let fighting
// let monsterHealth
// let inventory = ['stick']

// Storing initial user data in localStorage
let data = {
    xp: 0,
    health: 60,
    gold: 101,
    currentWeapons: 0,
    fighting: true,
    monsterHealth: 200,
    inventory: ['stick']
}
localStorage.setItem('user', JSON.stringify(data))
let user = JSON.parse(localStorage.getItem('user'))

// Values for buying health and weapons
let goldBuyHealth = 25
let goldBuyWeapon = 100

// Function to update hero's stats on the interface
function heroUpdate() {
    xpElement.innerText = user.xp
    healthElement.innerText = user.health
    goldElement.innerText = user.gold
}

heroUpdate() // Initial update of hero's stats

// Array of locations with their respective properties
const locations = [
    {
        name: "home square",
        "button-text": ['Store', 'Forest', 'War'],
        "button-func": [goStore, goForest, goWar],
        text: "You are in the home square. You can go anywhere."
    },
    {
        name: 'store',
        "button-text": [`Buy +10 Health (${goldBuyHealth} gold)`, 'Buy 1 Weapon (100 gold)', 'Go Home'],
        "button-func": [buyHealth, buyWeapon, goHome],
        text: "You are in the store. You can buy and sell your things."
    },
    {
        name: 'Forest',
        "button-text": ['Find and eat mushroom ', 'Mine Gold', 'Go Home'],
        "button-func": [findMushroom, mineGold, goHome],
        text: "You are in the forest. You can find food and mine gold."
    },
    {
        name: 'Battle Ground',
        "button-text": ['Attack ', 'Defense', 'Go Home'],
        "button-func": [attack, defense, goHome],
        text: "You are in the battle ground. You can fight and kill the dragon."
    }
]

storeBtn.onclick = goStore
forestBtn.onclick = goForest
warBtn.onclick = goWar

// Function to update buttons and text based on current location
function update(location) {
    storeBtn.innerText = location['button-text'][0]
    forestBtn.innerText = location['button-text'][1]
    warBtn.innerText = location['button-text'][2]

    storeBtn.onclick = location['button-func'][0]
    forestBtn.onclick = location['button-func'][1]
    warBtn.onclick = location['button-func'][2]

    locationElementP.innerText = location.text
}

// Initial location is set to home square
function goHome() {
    update(locations[0])
}

// Function to go to store location
function goStore() {
    update(locations[1])
}

// Function to buy health at store
function buyHealth() {
    if (user.gold > 0 && user.gold > goldBuyHealth) {

        let randomGoldBuyHealth = Math.floor(Math.random() * 5) + 1

        console.log(randomGoldBuyHealth);

        if (user.health < 100 && user.gold > goldBuyHealth) {
            user.gold -= goldBuyHealth
            user.health += 10
            locationElementP.innerText = `You bought +10 health.`
            goldBuyHealth += randomGoldBuyHealth
            storeBtn.innerText = `Buy +10 Health (${goldBuyHealth} gold)`
        } else {
            locationElementP.innerText = "Your health is full. You can't buy more health."
        }
    } else {
        locationElementP.innerText = "You don't have enough gold. Go mine gold or fight against dragons."
    }
  
    heroUpdate()
}

// Function to buy weapon at store
function buyWeapon() {
    // if (user.gold >= goldBuyWeapon) {
    //     user.gold -= goldBuyWeapon
    //     user.currentWeapons++
    //     locationElementP.innerText = `You bought 1 weapon.`
    // } else {
    //     locationElementP.innerText = "You don't have enough gold to buy a weapon."
    // }
    // heroUpdate()
}

// Function to go to forest location
function goForest() {
    update(locations[2])
}

// Function to find mushroom in forest
function findMushroom() {
    // if (user.inventory.includes('mushroom')) {
    //     locationElementP.innerText = "You already have a mushroom."
    // } else {
    //     user.inventory.push('mushroom')
    //     locationElementP.innerText = "You found and ate a mushroom. It tasted delicious!"
    // }
}

// Function to mine gold in forest
function mineGold() {
    // const minedGold = Math.floor(Math.random() * 20) + 10
    // user.gold += minedGold
    // locationElementP.innerText = `You mined ${minedGold} gold.`
    // heroUpdate()
}

// Function to go to war location
function goWar() {
    update(locations[3])
}

// Function to attack in battle ground
function attack() {
    // const damage = Math.floor(Math.random() * 20) + 10
    // const monsterDamage = Math.floor(Math.random() * 20) + 10

    // user.health -= monsterDamage
    // user.monsterHealth -= damage

    // if (user.monsterHealth <= 0) {
    //     locationElementP.innerText = `You defeated the dragon! You gained 50 XP and 100 gold.`
    //     user.xp += 50
    //     user.gold += 100
    //     user.fighting = false
    // } else {
    //     locationElementP.innerText = `You attacked the dragon for ${damage} damage. The dragon attacked you for ${monsterDamage} damage.`
    // }

    // heroUpdate()
}

// Function to defend in battle ground
function defense() {
    // const monsterDamage = Math.floor(Math.random() * 20) + 10
    // user.health -= monsterDamage
    // locationElementP.innerText = `You defended against the dragon's attack, but took ${monsterDamage} damage.`
    // heroUpdate()
}
