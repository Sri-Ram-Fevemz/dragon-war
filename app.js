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

// Popup message box
const formElement = document.querySelector('.form')
const closeElement = document.querySelector('.close')
const formInputElement = document.querySelector('#form-input')
const formBtnElement = document.querySelector('#form-btn')
const formStatuslement = document.querySelector('#form-status span')

// Storing initial user data in localStorage
let data = {
    xp: 0,
    health: 100,
    gold: 100,
    currentWeapons: 0,
    fighting: true,
    monsterHealth: 200,
    inventory: ['stick']
}

const weapon = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dragger",
        power: 25
    },
    {
        name: "hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
]

const monsters = [
    {
        name: "Goblin",
        level: 1,
        health: 10
    },
    {
        name: "Skeleton",
        level: 2,
        health: 25
    },
    {
        name: "Troll",
        level: 3,
        health: 30
    },
    {
        name: "Minotaur",
        level: 4,
        health: 50
    },
    {
        name: "wypern",
        level: 5,
        health: 70
    },
    {
        name: "Cyclops",
        level: 6,
        health: 100
    },
    {
        name: "Hydra",
        level: 7,
        health: 200
    },
    {
        name: "Dragon Lord",
        level: 8,
        health: 300
    },
    {
        name: "Dragon Sorcerer",
        level: 10,
        health: 500
    },
]


// Values for buying health and weapons
let goldBuyHealth = 25
let goldBuyWeapon = 100

// Function to update hero's stats on the interface
function heroUpdate() {
    data.health > 100 ? data.health = 100 : data.health
    xpElement.innerText = data.xp
    healthElement.innerText = data.health
    goldElement.innerText = data.gold
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
        "button-text": ['Find Monsters', 'Find Gold', 'Go Home'],
        "button-func": [findMonster, findGold, goHome],
        text: "You are in the forest. You can find monster and gold."
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
    if (data.gold > 0 && data.gold > goldBuyHealth) {
        let randomGoldBuyHealth = Math.floor(Math.random() * 5) + 1
        if (data.health < 100 && data.gold > goldBuyHealth) {
            data.gold -= goldBuyHealth
            data.health += 10
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
    if (data.currentWeapons < weapon.length - 1) {
        if (data.gold >= goldBuyWeapon) {
            data.gold -= goldBuyWeapon
            data.currentWeapons++
            let newWeapon = weapon[data.currentWeapons].name
            locationElementP.innerText = `You bought ${newWeapon} weapon.`
            data.inventory.push(newWeapon)
            locationElementP.innerText += "Your inventory is " + data.inventory
        } else {
            locationElementP.innerText = "You don't have enough gold to buy a weapon."
        }
    } else {
        locationElementP.innerText = "You already buy most powerful weapons."
        forestBtn.innerText = "Sell Weapon"
        forestBtn.onclick = sellWeapon
    }
    heroUpdate()
}


function sellWeapon() {
    if (data.inventory.length > 1) {
        data.gold += 50
        let currentWeapon = data.inventory.pop()
        locationElementP.innerText = "You sold a " + currentWeapon + " ."
        locationElementP.innerText += "Your inventory is and " + data.inventory
    } else {
        locationElementP.innerText = "You have only one weapon.You can't sold " + data.inventory + " ."
        data.currentWeapons = 0
    }
    heroUpdate()
}

// Function to go to forest location
function goForest() {
    update(locations[2])
}

// Function to find mushroom in forest
function findMonster() {

}

// Function to mine gold in forest
function findGold() {

    formElement.classList.remove("hidden")
    setTimeout(function () {
        formElement.classList.add("hidden")
    }, 10000);

    let randomNUM = Math.floor(Math.random() * 10) + 1

    function numberGuess() {
        console.log(randomNUM);
        let userInput = formInputElement.value
        let randomGold = Math.floor(Math.random() * 100) + 1
        if (userInput == randomNUM) {
            data.gold += randomGold + 100
            locationElementP.innerText = `You finded ${randomGold + 100} gold.`
            formStatuslement.innerText = `Correct.You finded ${randomGold + 100} gold.`
            randomNUM = Math.floor(Math.random() * 10) + 1

        } else if (userInput > randomNUM) {
            data.gold -= randomGold - 25
            locationElementP.innerText = `You lost ${Math.abs(randomGold - 25)} gold.`
            formStatuslement.innerText = `Too High.You lost ${Math.abs(randomGold - 25)} gold.`
        }
        else {
            data.gold -= randomGold - 25
            locationElementP.innerText = `You lost ${Math.abs(randomGold - 25)} gold.`
            formStatuslement.innerText = `Too Low.You lost ${Math.abs(randomGold - 25)} gold.`
        }
        heroUpdate()
    }
    formBtnElement.addEventListener('click', () => {
        numberGuess()
        heroUpdate()
    })


    heroUpdate()

}
closeElement.addEventListener('click', () => {
    formElement.classList.toggle("hidden")
})



// Function to go to war location
function goWar() {
    update(locations[3])
}

// Function to attack in battle ground
function attack() {

    heroUpdate()
}

// Function to defend in battle ground
function defense() {
    heroUpdate()
}


