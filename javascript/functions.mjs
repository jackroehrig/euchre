

// function to add functionality to buttons in main menu and options menus

const cards = [];
let messageArea = document.querySelector('#message-area')

const theme = {
    src: '',
    alt: ''
}

let trump = '';

let goAlonePlayer;

let players;

let pickedUpCard;

switch(localStorage.getItem('theme')){
    case 'solid-red':
        theme.src = '../assets/images/card_backs/solid_red_card_back.png';
        theme.alt = 'solid red playing card back'
        break;
    case 'solid-blue':
        theme.src = '../assets/images/card_backs/blue_card_back.png'
        theme.alt = 'solid blue playing card back'
        break;
    case 'red-grid':
        theme.src = '../assets/images/card_backs/red_grid_card_back.png'
        theme.alt = 'red grid patterned playing card back'
        break;
}

for(let i = 9; i < 15; i++){
    if(i >= 11){
        switch(i){
            case 11:
                cards.push('JC.png')
                cards.push('JD.png')
                cards.push('JH.png')
                cards.push('JS.png')
                break;
            case 12:
                cards.push('QC.png')
                cards.push('QD.png')
                cards.push('QH.png')
                cards.push('QS.png')
                break;
            case 13:
                cards.push('KC.png')
                cards.push('KD.png')
                cards.push('KH.png')
                cards.push('KS.png')
                break;
            case 14:
                cards.push('AC.png')
                cards.push('AD.png')
                cards.push('AH.png')
                cards.push('AS.png')
                break;
        }
    } else {
        cards.push(`${i}C.png`)
        cards.push(`${i}D.png`)
        cards.push(`${i}H.png`)
        cards.push(`${i}S.png`)
    }
}

function addButtonEvent(attr, name, callback) {
    let button = document.querySelector(`[${attr} = ${name}]`)
    button.addEventListener('click', callback)
}

function addSliderEvent(name) {
    let slider = document.querySelector(`#${name}`)
    slider.addEventListener('input', (e) => {
        document.querySelector(`#${name}umeNum`).innerHTML = e.target.value;
        localStorage.setItem(`${name}umeNum`, e.target.value)
    })
}

function addSwitchEvent(id){
    let switchButton = document.querySelector(`#${id}`)
    switchButton.addEventListener('change', (e) => {
        localStorage.setItem(id, e.target.checked)
    })
}

function addThemeEvent(id){
    let card = document.querySelector(`#${id}`)

    card.addEventListener('click', (e) => {
        let themes = document.querySelector('#themes')
        for(key in themes.children){
            if(typeof themes.children[key] == 'object'){
                themes.children[key].classList = 'not-highlighted'
            }
        }
        e.currentTarget.classList = 'highlighted'
        localStorage.setItem('theme', e.currentTarget.id)
    })

    card.addEventListener('mouseover', (e) => {
        if(localStorage.getItem('theme') != e.currentTarget.id){
            e.currentTarget.classList.remove('not-highlighted')
            e.currentTarget.classList.add('highlighted')
        }
    })

    card.addEventListener('mouseleave', (e) => {
        if(localStorage.getItem('theme') != e.currentTarget.id){
            e.currentTarget.classList.remove('highlighted')
            e.currentTarget.classList.add('not-highlighted')
        }
    })
}

async function startingDeal(playerHands){

    players = playerHands

    renderHands(playerHands)

    let centerArea = document.querySelector('#center-area')
    let middleTopCard = document.querySelector('.top-card')

    middleTopCard.src = theme.src
    middleTopCard.alt = theme.alt

    messageArea.innerHTML = 'Dealing for first black Jack to see who deals first...'
    await delay(2000);
    messageArea.innerHTML = ''

    shuffleCards(cards)
    let firstDeal = Math.floor(Math.random() * 4) + 1
    let degrees = 90 * firstDeal;
    let currentDealee = {};
    for(let i = 0; i < cards.length; i++){
        let cardToDeal = document.createElement('img')
        centerArea.append(cardToDeal)
        cardToDeal.src = `../assets/images/card_fronts/${cards[i]}`;
        cardToDeal.style.transform = `rotate(${degrees}deg)`;
        cardToDeal.style.zIndex = -1;
        if(degrees == 90){
            cardToDeal.style.left = '48.5%';
            cardToDeal.classList.add('deal-card-right')
            currentDealee.name = document.querySelector('#right-name').innerHTML
            currentDealee.direction = 'right'
        } else if(degrees == 180){
            cardToDeal.style.left = '46.75%';
            cardToDeal.classList.add('deal-card-down')
            currentDealee.name = document.querySelector('#bottom-name').innerHTML
            currentDealee.direction = 'down'
        } else if(degrees == 270){
            cardToDeal.style.left = '45%';
            cardToDeal.classList.add('deal-card-left')
            currentDealee.name = document.querySelector('#left-name').innerHTML
            currentDealee.direction = 'left'
        } else {
            cardToDeal.style.left = '46.75%';
            cardToDeal.style.top = '37.8%';
            cardToDeal.classList.add('deal-card-up')
            currentDealee.name = document.querySelector('#top-name').innerHTML
            currentDealee.direction = 'up'
        }

        await delay();
            
        if(degrees == 360){
            degrees = 90;
        } else {
            degrees += 90;
        }

        if(cards[i] == 'JS.png' || cards[i] == 'JC.png'){
            await delay();
            document.querySelectorAll('.deal-card-left, .deal-card-right, .deal-card-up, .deal-card-down').forEach(card => card.remove())

            messageArea.innerHTML = currentDealee.name != 'You' ?`${currentDealee.name} has received the first deal!` : 'You have received the first deal!'

            await delay()

            messageArea.innerHTML = ''

            switch(currentDealee.direction){
                case 'up':
                    middleTopCard.classList.add('send-up')
                    await delay()
                    let playerToMove = playerHands.pop()
                    playerHands.unshift(playerToMove)
                    break;
                case 'left':
                    middleTopCard.classList.add('send-left')
                    await delay()
                    for(let i = 0; i < 2; i++){
                        let playerToMove = playerHands.pop()
                        playerHands.unshift(playerToMove)
                    }
                    break;
                case 'right':
                    middleTopCard.classList.add('send-right')
                    await delay()
                    break;
                case 'down':
                    middleTopCard.classList.add('send-down')
                    await delay()
                    for(let i = 0; i < 3; i++){
                        let playerToMove = playerHands.pop()
                        playerHands.unshift(playerToMove)
                    }
                    break;
            }

            renderHands(playerHands)
            
            dealCards(playerHands[0].name, playerHands)


            break;
        }
    }
}

function renderHands(playerHands, needToVerify = false){
    
    let nameElems = document.querySelectorAll('p')
    let cardAreas = document.querySelectorAll('.hand')
    nameElems.forEach(elem => elem.innerHTML = '')
    cardAreas.forEach(area => {
        while(area.firstChild){
            area.removeChild(area.firstChild)
        }
    })


    playerHands.forEach((player, index) => nameElems[index].innerHTML = player.name)
    
    if(playerHands[0].hand[0]) {
        playerHands.forEach((player, index1) => {
            player.hand.forEach((cardLink, index2) => {
                if(index1 == 1){
                    let newCard = document.createElement('img')
                    newCard.src = `../assets/images/card_fronts/${cardLink}`
                    newCard.alt = cardLink
                    newCard.style.left = `${index2 * 20}%`
                    newCard.classList.add('card')
                    cardAreas[index1].append(newCard)
                    newCard.addEventListener('click', (e) => {
                        e.target.src = pickedUpCard.src
                    })
                } else {
                    let newCard = document.createElement('img')
                    newCard.src = theme.src
                    newCard.alt = theme.alt
                    newCard.style.left = `${index2 * 20}%`
                    newCard.classList.add('card')
                    cardAreas[index1].append(newCard)
                }
            })
        })
    }

    if(needToVerify){
        let covering = document.createElement('div')
        covering.classList.add('covering')
        covering.setAttribute('id', 'bottom-hand')
        covering.style.zIndex = '1000'
        covering.style.backgroundColor = 'black';
        document.body.append(covering)

        let verifyBox = document.getElementById('verify-player')
        verifyBox.classList.remove('invisible')

        document.querySelector('#verify-header').innerHTML = `Please verify you are ${playerHands[1].name}`

        let verifyButton = document.querySelector('#verify')
        verifyButton.innerHTML = `I am ${playerHands[1].name}`

        addButtonEvent('id', 'verify', () => {
            covering.classList.add('invisible')
            verifyBox.classList.add('invisible')
        })
    }
}


// Once deal is decided and cards are deal then the person to the left of the dealer must come to the screen

async function dealCards(name, playerHands){
    messageArea.innerHTML = `It is ${name}'s deal...`
    
    shuffleCards(cards)

    let topCard = document.createElement('img')
    topCard.src = theme.src
    topCard.alt = theme.alt
    topCard.classList.add('top-card')
    document.body.append(topCard)
    await delay()
    messageArea.innerHTML = ''

    let deal = {
        number: [2, 3, 2, 3, 3, 2, 3, 2],
        direction: 'down'
    }

    let deckLocation = 0;

    for(let i = 0; i < deal.number.length; i++) {
        let cardsToSend = deal.number[i];
        while(cardsToSend > 0){
            let newCard = document.createElement('img')
            newCard.src = theme.src
            newCard.alt = theme.alt
            newCard.style.zIndex = -10;
            document.body.append(newCard)
            switch(deal.direction){
                case 'up':
                    newCard.style.transform = 'rotate(-50deg)'
                    newCard.classList.add('deal-card')
                    newCard.classList.add('up-deal')
                    playerHands[0].hand.push(cards[deckLocation])
                    if(cardsToSend == 1) deal.direction = 'right'
                    break;
                case 'right':
                    newCard.classList.add('top-card')
                    newCard.classList.add('right-deal')
                    playerHands[1].hand.push(cards[deckLocation])
                    if(cardsToSend == 1) deal.direction = 'down'
                    break;
                case 'down':
                    newCard.style.transform = 'rotate(-130deg)'
                    newCard.style.top = '43%'
                    newCard.classList.add('deal-card')
                    newCard.classList.add('down-deal')
                    playerHands[2].hand.push(cards[deckLocation])
                    if(cardsToSend == 1) deal.direction = 'left'
                    break;
                case 'left':
                    newCard.classList.add('top-card')
                    newCard.classList.add('left-deal')
                    playerHands[3].hand.push(cards[deckLocation])
                    if(cardsToSend == 1) deal.direction = 'up'
            }
            deckLocation++
            cardsToSend--
            await delay(500)
        }
    }
    let flippedCard = document.createElement('img')
    flippedCard.src = `../assets/images/card_fronts/${cards[20]}`
    flippedCard.alt = cards[20]
    flippedCard.classList.add('flipped-card')
    document.body.append(flippedCard)

    await delay(3500)
    
    topCard.classList.add("top-card-to-side")
    flippedCard.classList.add('move-to-center')

    document.querySelector('.move-to-center').addEventListener('animationend', () => {
        document.querySelector('#pick-or-pass').classList.remove('invisible')
        renderHands(playerHands, true)
    })

    let flippedSuit;

    let tester;
    cards[20][0] == 1 ? tester = cards[20][2] : tester = cards[20][1]

    console.log(cards[20])
    console.log(tester)
    switch(tester){
        case 'C':
            flippedSuit = 'clubs';
            break;
        case 'D':
            flippedSuit = 'diamonds';
            break;
        case 'H':
            flippedSuit = 'hearts';
            break;
        case 'S':
            flippedSuit = 'spades';
            break;
    }

    startRound(flippedSuit, name, playerHands)
}

function startRound(flippedSuit, dealersName, playerHands){
    let goAlone = document.getElementById('go-alone')
    let dealersDirection;
    trump = flippedSuit;
    let flippedCard = document.querySelector('.flipped-card')
    let actionBox = document.querySelector('#pick-up')

    playerHands.forEach((player, index) => {
        if(player.name == dealersName) {
            dealersDirection = index
        }
    })

    addButtonEvent('id', 'pick-button', async () => {
        switch(dealersDirection){
            case 0:
                flippedCard.classList.add('move-right')
                await delay()
                let playerToMove = playerHands.pop()
                playerHands.unshift(playerToMove)
                renderHands(playerHands, true)
                break;
            case 1:
                flippedCard.classList.add('move-down')
                break;
            case 2:
                flippedCard.classList.add('move-left')
                await delay()
                playerToMove = playerHands.shift()
                playerHands.push(playerToMove)
                renderHands(playerHands, true)
                break;
            case 3:
                flippedCard.classList.add('move-up')
                await delay()
                for(let i = 0; i < 2; i++){
                    let playerToMove = playerHands.pop()
                    playerHands.unshift(playerToMove)
                }
                renderHands(playerHands, true)
                break;
        }

        await delay(1)
        
        if(goAlone.checked){
            goAlonePlayer = playerHands.pop()
            renderHands(playerHands, true)
        }
        pickedUpCard = flippedCard
        await dealerDecide(flippedCard)
    })

    addButtonEvent('id', 'pass-button', () => {

        if(dealersDirection == 1) {
            flippedCard.classList.add('dealer-passed')
            while (actionBox.firstChild) {
                actionBox.removeChild(actionBox.firstChild);
            }
            dealersDirection--
            renderSuitButtons(flippedSuit, dealersDirection)
        } 

        let playerToMove = playerHands.shift()
        playerHands.push(playerToMove)
        renderHands(playerHands, true)

        if(dealersDirection != 0){
            dealersDirection--
        } else {
            dealersDirection = 3
        }

    })
}

function renderSuitButtons(flippedSuit, dealersDirection){
    console.log(flippedSuit)
    let suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs']
    suits.forEach(suit => {
        if(suit.toLowerCase() != flippedSuit){
            let newSuitButton = document.createElement('button')
            newSuitButton.innerHTML = suit
            newSuitButton.id = `${suit.toLowerCase()}-button`

            document.querySelector('#pick-up').append(newSuitButton)

            addButtonEvent('id', `${suit.toLowerCase()}-button`, () => {
                trump = suit.toLowerCase()
                if(document.querySelector('#go-alone').checked){
                    goAlonePlayer = players.pop()
                    console.log(players)
                    renderHands(players, true)
                }
                document.querySelector('#pick-or-pass').classList.add('invisible')
                playRound()

            })
        }
    })
    let passButton = document.createElement('button')
    passButton.innerHTML = 'Pass'
    passButton.id = 'pass-button'
    document.querySelector('#pick-up').append(passButton)
     
    addButtonEvent('id', 'pass-button', () => {
        if(dealersDirection == 1) {
            if(localStorage.getItem('screw-dealer')){
                document.querySelector('#error-message').innerHTML = 'You must choose a suit.'
            } else {
                startRound(players[1].name, players)
            }
        } else {
            let playerToMove = players.shift()
            players.push(playerToMove)
            renderHands(players, true)

            if(dealersDirection != 0){
                dealersDirection--
            } else {
                dealersDirection = 3
            }
        }
    })
}

async function dealerDecide(pickedUpCard){

    await delay(1)

    document.querySelector('#pick-or-pass').classList.add('invisible')

    let newCard = document.createElement('img')
    newCard.src = pickedUpCard.src
    document.body.append(newCard)
    newCard.classList.add('decide-card')

    let newHeader = document.createElement('h2')
    newHeader.innerHTML = 'Please choose the card you would like to switch out'
    document.body.append(newHeader)
    newHeader.classList.add('decide-header')

    let dealerHand = document.querySelectorAll('#bottom-hand img')
    dealerHand.forEach(card => {
        card.style.zIndex = 100;
        card.classList.add('dealer-card')
        card.addEventListener('click', () => {
            newCard.remove()
            newHeader.remove()
        })

        let playerToMove = players.shift()
        players.push(playerToMove)

        renderHands(players)
    })

    
    
}

function playRound(){

}


// USEFULL FUNCTIONS

function delay(length = 1000){
    return new Promise(resolve => setTimeout(resolve, length))
}

function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array
}

export {addButtonEvent, addSliderEvent, addSwitchEvent, addThemeEvent, startingDeal, cards}

