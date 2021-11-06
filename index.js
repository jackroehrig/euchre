/*

1. User loads website. Sees a menu with the Title, Play Game Button, Settings Button, And maybe more if needed.Exit Game???
possible settings: volume, game options(farmers hand, screw the dealer,  etc.), different themes(local storage?), more?

2. After pressing play game the user reaches a menu asking wether they'd like to play multiplayer or with AIs, possibly difficulty for AI, more?

3. After starting the game a shuffled deck will automatically be dealt for the first black jack to determine the first dealer.

4. Players will then be dealt their hand and a card will be laid face up in the center of the screen on top of 3 other cards facedown.

5. The first person to the left of the dealer will then decide wether they would like the dealer to pick up the card. This goes around until it's either been picked up and whatever suit that card was is now trump or it comes back to the dealer and it gets flipped over.

6. If the card is flipped over the turn will go back to the player to the dealers left to decide wether he would like to choose one of the three remaining suits. This goes around until it reaches the dealer. If the user has choosen to keep the screw the dealer setting on, which is on automatically, the dealer must then decide one the three remaining suits. If the user has choosen to turn that option off the dealer must re-deal. If a player chooses to make the dealer pick up the card or chooses the suit or the dealer picks it up himself/chooses the suit they will have the option to go alone. This removes their teammate from that hand and they play alone for more points.

7. Once the game has begun, the player to the left of the dealer starts play(unless that player is the teammate of someone who went alone, then play starts with the dealers teammate). Each player will play their card the cards will go towards whoever took the hand. When a hand is won points will be added to a scoreboard. The first team to ten wins.

8. When the game is over a popup will appear notifying the user of wether they won or lost and buttons to play again, view a popup setting menu, or return to the main menu.

*/

const gameOptions = {
    musicVolume: 100,
    soundsVolume: 100,
    masterVolume: 100,
    screwTheDealer: true,
    farmersHand: false,
    cardTheme: 'solidRed'
}



let optionsMenu = document.querySelector('.game-options')

addButtonEvent('name', 'play', () => window.location.href = 'play_game.html')
addButtonEvent('name', 'options', () => optionsMenu.classList.remove('invisible'))
addButtonEvent('name', 'exit', () => window.close())
addButtonEvent('id', 'close-options', () => optionsMenu.classList.add('invisible'))

addSliderEvent('musicVol')
addSliderEvent('soundVol')
addSliderEvent('masterVol')

// function to add functionality to buttons in main menu and options menus
function addButtonEvent(attr, name, callback) {
    let button = document.querySelector(`[${attr} = ${name}]`)
    button.addEventListener('click', callback)
}

function addSliderEvent(name) {
    let slider = document.querySelector(`[name = ${name}]`)
    slider.addEventListener('change', (e) => {
        document.querySelector(`#${name}`).innerHTML = e.target.value;
        localStorage.setItem(name, e.target.value)
    })
}

window.onload = () => {
    let volumes = document.querySelectorAll('.game-options p')
    let ranges = document.querySelectorAll('[type = "range"]')
    volumes.forEach(tag => tag.innerHTML = localStorage.getItem(tag.id) ? localStorage.getItem(tag.id) : 100)
    ranges.forEach(tag => tag.value = localStorage.getItem(tag.name) ? localStorage.getItem(tag.name) : 100)
}

