import * as myStuff from '../javascript/functions.mjs';

const playerHands = [
    {
        name: '',
        hand: []
    },
    {
        name: '',
        hand: []
    },
    {
        name: '',
        hand: []
    },
    {
        name: '',
        hand: []
    }

]

myStuff.addButtonEvent('class', 'menu-button', () => window.location.href = 'http://127.0.0.1:5500/index.html')

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

