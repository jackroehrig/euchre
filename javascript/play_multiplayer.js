import * as myStuff from '../javascript/functions.mjs';

const playerHands = [
    {
        name: '',
        hand: [],
        color: '0000FF'
    },
    {
        name: '',
        hand: [],
        color: 'FFFF00'
    },
    {
        name: '',
        hand: [],
        color: 'FF0000'
    },
    {
        name: '',
        hand: [],
        color: '00FF00'
    }

]

let exitMenu = document.getElementById('handle-menu')

myStuff.addButtonEvent('class', 'menu-button', () => document.getElementById('handle-menu').classList.remove('invisible'))
myStuff.addButtonEvent('id', 'play-again', () => document.location.reload(true))
myStuff.addButtonEvent('class', 'exit-button', () => window.location.href = '/index.html')
myStuff.addButtonEvent('class', 'exit-button', () => window.location.href = '/index.html')
myStuff.addButtonEvent('id', 'close-exit-menu', () => exitMenu.classList.add('invisible'))

window.onload = () => document.getElementById('player-names').classList.remove('invisible')

myStuff.addButtonEvent('id', 'multiplayerStart', (e) => {
    e.preventDefault()
    let inputs = document.querySelectorAll('[type = text]')
    inputs.forEach((input, index) => {
        playerHands[index].name = input.value
    })
    document.getElementById('player-names').classList.add('invisible')
    myStuff.startingDeal(playerHands)
})

