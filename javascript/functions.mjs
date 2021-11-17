

// function to add functionality to buttons in main menu and options menus

const cards = [];
let messageArea = document.querySelector('#message-area')

const theme = {
    src: '',
    alt: ''
}

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

            dealCards(playerHands[0].name, playerHands)

            renderHands(playerHands)

            break;
        }
    }
}

function renderHands(playerHands){
    let nameElems = document.querySelectorAll('p')
    playerHands.forEach((player, index) => nameElems[index].innerHTML = player.name)
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

    document.querySelector('.move-to-center').addEventListener('animationend', () => document.querySelector('#pick-or-pass-box').classList.remove('invisible'))

    let flippedSuit;

    switch(cards[20][1]){
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

    startGame(flippedSuit, name, playerHands)
}

function startGame(flippedSuit, dealersName, playerHands){
    let goAlone = document.getElementById('go-alone')
    let goAlonePlayer
    let dealersDirection;
    const trump = flippedSuit;
    let flippedCard = document.querySelector('.flipped-card')

    playerHands.forEach((player, index) => {
        if(player.name == dealersName) {
            dealersDirection = index
        }
    })

    addButtonEvent('id', 'pick-button', () => {
        switch(dealersDirection){
            case 0:
                flippedCard.classList.add('move-right')
                break;
            case 1:
                flippedCard.classList.add('move-down')
                break;
            case 2:
                flippedCard.classList.add('move-left')
                break;
            case 3:
                flippedCard.classList.add('move-up')
                break;
        }

        if(goAlone.checked){
            goAlonePlayer = playerHands.pop()
            renderHands(playerHands)
        }
    })

    addButtonEvent('id', 'pass-button', () => {

        if(dealersDirection == 1) {
            flippedCard.classList.add('dealer-passed')
            document.querySelector('.suit-or-pass').classList.remove('invisible')
            renderSuitButtons(flippedSuit)
        }

        let playerToMove = playerHands.shift()
        playerHands.push(playerToMove)
        renderHands(playerHands)

        if(dealersDirection != 0){
            dealersDirection--
        } else {
            dealersDirection = 3
        }

    })
}

function delay(length = 1000){
    return new Promise(resolve => setTimeout(resolve, length))
}

function renderSuitButtons(flippedSuit){
    let suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs']
    suits.forEach(suit => {
        if(suit.toLowerCase() != flippedSuit){
            let newSuitButton = document.createElement('button')
            newSuitButton.innerHTML = suit
            newSuitButton.id = `${suit.toLowerCase()}-button`
            document.querySelector('#pick-suit').append(newSuitButton)
        }
    })
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

