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

myStuff.addButtonEvent('class', 'menu-button', () => window.location.href = 'http://127.0.0.1:5500/index.html')

window.onload = () => document.getElementById('player-names').classList.remove('invisible')

myStuff.addButtonEvent('id', 'multiplayerStart', (e) => {
    e.preventDefault()
    let inputs = document.querySelectorAll('[type = text]')
    inputs.forEach((input, index) => {
        playerHands[index].name = input.value
        // playerHands[index].color = Math.floor(Math.random()*16777215).toString(16);
    })
    document.getElementById('player-names').classList.add('invisible')
    myStuff.startingDeal(playerHands)
})

