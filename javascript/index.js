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

import * as myStuff from './functions.mjs';

let settingsMenu = document.querySelector('.settings-menu')
let gameOptionsMenu = document.querySelector('.game-options')
// let names = [];

myStuff.addButtonEvent('name', 'play', () => gameOptionsMenu.classList.remove('invisible'))
myStuff.addButtonEvent('name', 'settings', () => settingsMenu.classList.remove('invisible'))
myStuff.addButtonEvent('name', 'exit', () => window.close())


myStuff.addButtonEvent('id', 'close-settings', () => settingsMenu.classList.add('invisible'))
myStuff.addButtonEvent('id', 'close-game-options', () => gameOptionsMenu.classList.add('invisible'))

myStuff.addButtonEvent('class', 'start-button', (e) => {
    e.preventDefault()
    if(document.querySelector('#computer').checked){
        window.location.href = 'html/play_AI.html'
    } else if(document.querySelector('#multiplayer').checked){
        window.location.href = 'html/play_multiplayer.html'
    } else {
        document.querySelector('#choose-option').innerHTML = 'Please choose either vs. Computer or Multiplayer.'
    }
})

// let playerOptions = document.getElementById('player-options')
// let numbersLabel = document.createElement('label')
// let label1 = document.createElement('label')
// let playerNumber1 = document.createElement('input')
// playerNumber1.type = 'text';
// let label2 = document.createElement('label')
// let playerNumber2 = document.createElement('input')
// playerNumber2.type = 'text';
// let label3 = document.createElement('label')
// let playerNumber3 = document.createElement('input')
// playerNumber3.type = 'text';
// let label4 = document.createElement('label')
// let playerNumber4 = document.createElement('input')
// playerNumber4.type = 'text';
// let namesElmArr = []
// namesElmArr.push(numbersLabel, label1, playerNumber1, label2, playerNumber2, label3, playerNumber3, label4, playerNumber4)

// document.querySelector('#multiplayer').addEventListener('change', () => {
//     if(document.querySelector('#multiplayer').checked && !document.querySelector('[type = text]')){
//         numbersLabel.innerHTML = 'Please enter the names of each player:'
//         label1.innerHTML = 'Player 1:'
//         label2.innerHTML = 'Player 2:'
//         label3.innerHTML = 'Player 3:'
//         label4.innerHTML = 'Player 4:'
//         playerOptions.append(numbersLabel, document.createElement('br'), document.createElement('br'), label1, playerNumber1, document.createElement('br'), document.createElement('br'), label2, playerNumber2, document.createElement('br'), document.createElement('br'), label3, playerNumber3, document.createElement('br'), document.createElement('br'), label4, playerNumber4)
//     } 
// })

// document.querySelector('#computer').addEventListener('change', () => {
//     if(numbersLabel.innerHTML){
//         namesElmArr.forEach(e => playerOptions.removeChild(e))
//         document.querySelector('.start-button').getElementsByClassName.transform = 'translateY(100vw)'
//     }
// })

myStuff.addSliderEvent('musicVol')
myStuff.addSliderEvent('soundVol')
myStuff.addSliderEvent('masterVol')

myStuff.addSwitchEvent('screw-dealer')
myStuff.addSwitchEvent('farmers-hand')

myStuff.addThemeEvent('solid-red')
myStuff.addThemeEvent('solid-blue')
myStuff.addThemeEvent('red-grid')



//For persistent settings
window.onload = () => {
    let volumes = document.querySelectorAll('.settings-menu p')
    let ranges = document.querySelectorAll('[type = "range"]')
    let switches = document.querySelectorAll('[type = "checkbox"]')
    let themes = document.querySelectorAll('.not-highlighted')
    volumes.forEach(tag => tag.innerHTML = localStorage.getItem(tag.id) ? localStorage.getItem(tag.id) : 100)
    ranges.forEach(tag => tag.value = localStorage.getItem(`${tag.name}umeNum`) ? localStorage.getItem(`${tag.name}umeNum`) : 100)
    switches.forEach(tag => tag.checked = localStorage.getItem(tag.id) !== null ? localStorage.getItem(tag.id) === 'true' : tag.id == 'screw-dealer' ? true: false)
    for(let i = 0; i < themes.length; i++) {
        let tag = themes[i] 
        if(tag.id == localStorage.getItem('theme')){
            tag.classList.remove('not-highlighted')
            tag.classList.add('highlighted')
            break;
        } else if(i == 2){
            localStorage.setItem('theme', themes[0].id)
            themes[0].classList.remove('not-highlighted')
            themes[0].classList.add('highlighted')
        }
    }

}


