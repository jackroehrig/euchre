const cards = [];
let messageArea = document.querySelector('#message-area')

const theme = {
    src: '',
    alt: ''
}

let dealer;

let trump = '';

let goAloneTeammate = {
    player: null,
    isDealer: false
};

let players;

let pickedUpCard;

let teams = []

let middleCards = [];

let teamThatPicked;

let nextDealer;

let emptyPlayer = {
    name: 'Empty',
    isEmpty: true
}

let emptyCard = 'empty'

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
    default:
        theme.src = '../assets/images/card_backs/solid_red_card_back.png';
        theme.alt = 'solid red playing card back'
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
    if(!button){
        document.querySelectorAll('.exit-button').forEach(elem => elem.addEventListener('click', callback))
    } else {
        button.addEventListener('click', callback)
    }
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
        Array.from(themes.children).forEach(child => {
            if(typeof child == 'object'){
                child.classList = 'not-highlighted theme-box'
            }
        })
        e.currentTarget.classList = 'highlighted theme-box'
        localStorage.setItem('theme', e.currentTarget.id)
    })

    card.addEventListener('mouseover', (e) => {
        if(localStorage.getItem('theme') != e.currentTarget.id){
            e.currentTarget.classList.remove('not-highlighted')
            e.currentTarget.classList.add('highlighted')
            e.currentTarget.classList.add('theme-box')
        }
    })

    card.addEventListener('mouseleave', (e) => {
        if(localStorage.getItem('theme') != e.currentTarget.id){
            e.currentTarget.classList.remove('highlighted')
            e.currentTarget.classList.add('not-highlighted')
            e.currentTarget.classList.add('theme-box')
        }
    })
}

async function startingDeal(playerHands){

    players = [...playerHands]

    players.forEach(player => player.tricks = 0)

    teams = [{
        teamMates: [players[0].name, players[2].name],
        score: 0
    }, {
        teamMates: [players[1].name, players[3].name],
        score: 0
    }]

    players[0].team = 1
    players[2].team = 1
    players[1].team = 2
    players[3].team = 2


    document.querySelectorAll('.name-area').forEach(area => area.classList.remove('invisible'))

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
            nextDealer = document.querySelector('#bottom-name').innerHTML
        } else if(degrees == 180){
            cardToDeal.style.left = '46.75%';
            cardToDeal.classList.add('deal-card-down')
            currentDealee.name = document.querySelector('#bottom-name').innerHTML
            currentDealee.direction = 'down'
            nextDealer = document.querySelector('#left-name').innerHTML
        } else if(degrees == 270){
            cardToDeal.style.left = '45%';
            cardToDeal.classList.add('deal-card-left')
            currentDealee.name = document.querySelector('#left-name').innerHTML
            currentDealee.direction = 'left'
            nextDealer = document.querySelector('#top-name').innerHTML
        } else {
            cardToDeal.style.left = '46.75%';
            cardToDeal.style.top = '37.8%';
            cardToDeal.classList.add('deal-card-up')
            currentDealee.name = document.querySelector('#top-name').innerHTML
            currentDealee.direction = 'up'
            nextDealer = document.querySelector('#right-name').innerHTML
        }

        await delay(250);
            
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

            dealer = currentDealee.name

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
            
            let pickOrPass = document.querySelector('#pick-or-passPRE'); 
            pickOrPass.id = 'pick-or-pass';
            pickOrPass.classList.add('invisible')

            dealCards(dealer, playerHands)


            break;
        }
    }
}

// Once deal is decided and cards are deal then the person to the left of the dealer must come to the screen

async function dealCards(name, playerHands){
    playerHands.forEach(player => player.tricks = 0)
    players = [...playerHands]

    document.querySelector('#scoreboard').classList.remove('invisible')

    renderScoreboard()
    
    renderHands(playerHands)

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
            await delay(250)
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

    setTimeout(() => {
        document.querySelector('#pick-or-pass').classList.remove('invisible')
        renderHands(playerHands, true)
    }, 2000)


    let flippedSuit;

    let tester;
    cards[20][0] == '1' ? tester = cards[20][2] : tester = cards[20][1]

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
        player.isEmpty = false

        if(player.name == dealersName) {
            dealersDirection = index
        }
    })

    // Render Buttons for first pass through
    while (actionBox.firstChild) {
        actionBox.removeChild(actionBox.firstChild);
    }
    let pickButton = document.createElement('button')
    let passButton = document.createElement('button')
    pickButton.id = 'pick-button'
    passButton.id = 'pass-button'
    pickButton.innerHTML = 'Pick Up'
    passButton.innerHTML = 'Pass'
    actionBox.append(pickButton, passButton)


    addButtonEvent('id', 'pick-button', async () => {
        teamThatPicked = players[1].team
        
        let playerToMove;

        if(goAlone.checked){
            goAloneTeammate.player = playerHands[3]
            if(goAloneTeammate.player.name == dealersName){
                goAloneTeammate.isDealer = true
            }
        }

        goAlone.checked = false;
        
        switch(dealersDirection){
            case 0:
                flippedCard.classList.add('move-right')   
                await delay()
                playerToMove = playerHands.pop()
                playerHands.unshift(playerToMove)
                if(goAloneTeammate.player){
                    playerHands[0] = emptyPlayer
                }
                renderHands(playerHands, true)
                break;
            case 1:
                flippedCard.classList.add('move-down')
                if(goAloneTeammate.player){
                    playerHands[3] = emptyPlayer
                }
                renderHands(playerHands, false)
                break;
            case 2:
                flippedCard.classList.add('move-left')
                await delay()
                playerToMove = playerHands.shift()
                playerHands.push(playerToMove)
                if(goAloneTeammate.player){
                    playerHands[2] = emptyPlayer
                }
                renderHands(playerHands, true)
                break;
            case 3:
                flippedCard.classList.add('move-up')
                if(!goAloneTeammate.player){  
                    await delay()
                    for(let i = 0; i < 2; i++){
                        playerToMove = playerHands.pop()
                        playerHands.unshift(playerToMove)
                    }
                    renderHands(playerHands, true)
                } else {
                    await delay()
                    playerToMove = playerHands.pop()
                    playerHands.unshift(playerToMove)
                    if(goAloneTeammate.player){
                        playerHands[0] = emptyPlayer
                    }
                    renderHands(playerHands, true)
                }
                break;
        }

        pickedUpCard = flippedCard
        players = [...playerHands]

        document.querySelector('#pick-or-pass').classList.add('invisible')

        if(!goAloneTeammate.isDealer){
            dealerDecide(flippedCard)
        } else {
            playRound()
        }
    })

    

    addButtonEvent('id', 'pass-button', () => {
        if(dealersDirection == 1) {
            flippedCard.classList.add('dealer-passed')
            while (actionBox.firstChild) {
                actionBox.removeChild(actionBox.firstChild);
            }
        } 
        let playerToMove = playerHands.shift()
        playerHands.push(playerToMove)
        players = [...playerHands]
        if(dealersDirection != 0){
            dealersDirection--
        } else {
            dealersDirection = 3
        }
        renderHands(playerHands, true)
        if(dealersDirection == 0) {
            renderSuitButtons(flippedSuit, 0)
        }

        goAlone.checked = false
    })
}

function renderSuitButtons(flippedSuit, dealersDirection){
    let suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs']
    let goAlone = document.getElementById('go-alone')

    suits.forEach(suit => {
        if(suit.toLowerCase() != flippedSuit){
            let newSuitButton = document.createElement('button')
            newSuitButton.innerHTML = suit
            newSuitButton.id = `${suit.toLowerCase()}-button`

            document.querySelector('#pick-up').append(newSuitButton)

            addButtonEvent('id', `${suit.toLowerCase()}-button`, () => {

                let dealersName = players[dealersDirection].name

                if(goAlone.checked){
                    goAloneTeammate.player = players[3]
                    if(goAloneTeammate.player.name == dealersName){
                        goAloneTeammate.isDealer = true
                    }
                }

                goAlone.checked = false;

                teamThatPicked = players[1].team

                trump = suit.toLowerCase()

                document.querySelector('#pick-or-pass').classList.add('invisible')

                let playerToMove;
                let playersCopy = [...players]
                switch(dealersDirection){
                    case 0:
                        if(goAloneTeammate.player){
                            players[3] = emptyPlayer
                        }
                        break;
                    case 1:
                        if(goAloneTeammate.player){
                            players[3] = emptyPlayer
                        }
                        playerToMove = players.shift()
                        players.push(playerToMove)
                        break;
                    case 2:
                        if(goAloneTeammate.player){
                            players[3] = emptyPlayer
                            playerToMove = players.pop()
                            players.unshift(playerToMove)
                        } else {
                            for(let i = 0; i < 2; i++){
                                playerToMove = players.pop()
                                players.unshift(playerToMove)
                            }
                        }
                        break;
                    case 3:
                        if(goAloneTeammate.player){
                            players[3] = emptyPlayer
                        }
                        playerToMove = players.pop()
                        players.unshift(playerToMove)
                        break;
                }

                if(dealersDirection != 0){
                    playRound()
                } else {
                    playRound(false)
                }

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
                for(let i = 0; i < 2; i++){
                    let playerToMove = players.shift()
                    players.push(playerToMove)
                }
                players.forEach(player => player.hand = [])
                document.querySelector('#pick-or-pass').classList.add('invisible')
                document.querySelector('.top-card-to-side').remove()
                document.querySelector('.flipped-card').remove()
                renderHands(players)
                async () => await delay()
                dealCards(players[0].name, players)
            }
        } else {
            dealersDirection == 0 ? dealersDirection = 3 : dealersDirection--
            let playerToMove = players.shift()
            players.push(playerToMove)
            renderHands(players, true)
        }
        goAlone.checked = false;
    })
}

function dealerDecide(pickedUpCard){

    let newCard = document.createElement('img')
    newCard.src = pickedUpCard.src
    document.body.append(newCard)
    newCard.classList.add('decide-card')

    let newHeader = document.createElement('h2')
    newHeader.innerHTML = 'Please choose the card you would like to switch out'
    document.body.append(newHeader)
    newHeader.classList.add('decide-header')

    let playerToMove;

    let dealerHand = document.querySelectorAll('#bottom-hand img')
    dealerHand.forEach((card, index) => {
        card.classList.add('dealer-card')
        card.addEventListener('click', async (e) => {
            players[1].hand[index] = pickedUpCard.src[pickedUpCard.src.length - 7] == '1' ? pickedUpCard.src.slice(-7) : pickedUpCard.src.slice(-6)
            renderHands(players)
            newCard.remove()
            newHeader.remove()
            await delay(500)
            if(!players[2].isEmpty){
                playerToMove = players.shift()
                players.push(playerToMove)
            } else {
                for(let i = 0; i < 2; i++){
                    playerToMove = players.pop()
                    players.unshift(playerToMove)
                }
            }
            playRound()
            dealerHand.forEach(card => {
                card.removeEventListener('click', (e) => {
                    e.target.src = pickedUpCard.src
                })
            })
        })
    })
}

function playRound(firstDidntPickSuit = true){
    renderScoreboard(true)
    firstDidntPickSuit ? renderHands(players, true, true): renderHands(players, false, true)
}


function renderHands(playerHands, needToVerify = false, playing = false){
    let nameElems = document.querySelectorAll('.name')
    let cardAreas = document.querySelectorAll('.hand')
    let trickNumbers = document.querySelectorAll('.tricks')
    let nameAreas = document.querySelectorAll('.name-area')

    nameElems.forEach(elem => {
        elem.innerHTML = ''
        elem.style.left = '';
    })

    cardAreas.forEach(area => {
        while(area.firstChild){
            area.removeChild(area.firstChild)
        }
    })


    playerHands.forEach((player, index) => {
        if(player.isEmpty){
            nameAreas[index].classList.add('invisible')
        } else if(player.name != dealer){
            nameAreas[index].classList.contains('invisible') ? nameAreas[index].classList.remove('invisible') : null
            nameElems[index].innerHTML = player.name
            trickNumbers[index].innerHTML = player.tricks
        } else {
            nameAreas[index].classList.contains('invisible') ? nameAreas[index].classList.remove('invisible') : null
            nameElems[index].innerHTML = `${player.name} (Dealer)`
            if(index == 1){
                document.querySelector('#bottom-name').style.left = '23%';
            } else if (index == 3){
                document.querySelector('#top-name').style.left = '25%';
            }
        }
    })
    
    
    playerHands.forEach((player, index1) => {
        if(!player.isEmpty){ 
            player.hand.forEach((cardLink, index2) => {   
                if(index1 == 1){
                    let newCard = document.createElement('img')
                    newCard.src = `../assets/images/card_fronts/${cardLink}`
                    newCard.alt = cardLink
                    newCard.style.left = `${index2 * 20}%`
                    newCard.classList.add('card')
                    cardAreas[index1].append(newCard)
                } else {
                    let newCard = document.createElement('img')
                    newCard.src = theme.src
                    newCard.alt = theme.alt
                    newCard.style.left = `${index2 * 20}%`
                    newCard.classList.add('card')
                    cardAreas[index1].append(newCard)
                }
            })
        }
    })

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

    if(!playerHands[1].isEmpty){
        if(playing){
            let playersCards = document.querySelectorAll('#bottom-hand img')
            playersCards.forEach(card => {
                card.addEventListener('mouseover', (e) => e.target.style.cursor = 'pointer')
                card.addEventListener('click', handlePlayClick)
            })
        }
    } else {
        middleCards.unshift(emptyCard)
        if(middleCards.length != 4){
            renderMiddle()
            let playerToMove = players.shift()
            players.push(playerToMove)
            renderHands(players, true, true)
        } else {
            setUpWinnerFunc()
        }
    }
}

function handlePlayClick(e){
    e.target.addEventListener('mouseover', (e) => e.target.style.cursor = 'initial')
    e.target.removeEventListener('click', handlePlayClick)

    players[1].hand.forEach((card, index) => {
        if(e.target.alt == card){
            players[1].hand.splice(index, 1)
        }
    })

    e.target.classList.remove('card')
    e.target.style = ''

    let playedCard = {
        img: e.target,
        player: ''
    }

    middleCards.unshift(playedCard)
    renderHands(players)
    document.body.append(playedCard.img)
    playedCard.img.classList.add('played-card')

    let shouldFindWinner = false

    if(players[2].isEmpty && middleCards.length == 3){
        middleCards.push(emptyCard)
        shouldFindWinner = true
    }

    if(middleCards.length == players.length){
        shouldFindWinner = true
    }

    if(!shouldFindWinner){
        setTimeout(async () => {
            await renderMiddle()
            if(players[2].isEmpty && middleCards.length <= 2){
                middleCards.unshift(emptyCard)
                await renderMiddle()
                let playerToMove = players.shift()
                players.push(playerToMove)
            }
            let playerToMove = players.shift()
            players.push(playerToMove)
            renderHands(players, true, true)
        }, 1000)
    } else {
        setUpWinnerFunc()
    }
}

function setUpWinnerFunc(){
    let trumpCards = [];
    let firSuitCards = [];
    middleCards.forEach(card => card !== 'empty' ? card.img.alt[0] == '1' ? card.img.alt = card.img.alt.slice(1) : null : null)
    let firstSuitNum = middleCards[3] !== 'empty' ? middleCards[3].img.alt[0] : middleCards[2].img.alt[0]
    let firstSuit = middleCards[3] !== 'empty' ? middleCards[3].img.alt[1] : middleCards[2].img.alt[1]

    if(firstSuitNum == 'J'){
        firstSuit == 'H' && trump == 'diamonds'
        ? firstSuit = 'D'
        : firstSuit == 'D' && trump == 'hearts'
        ? firstSuit = 'H'
        : firstSuit == 'S' && trump == 'clubs'
        ? firstSuit = 'C'
        : firstSuit == 'C' && trump == 'spades'
        ? firstSuit = 'S'
        : null
    }

    middleCards.forEach((card, index) => {
        if(card != 'empty'){
            card.index = index

            if(card.img.alt[0] == 'J'){
                if(trump[0].toUpperCase() == card.img.alt[1]){
                    card.img.alt = `R${card.img.alt.slice(1)}`
                }

                switch(trump){
                    case 'diamonds':
                        card.img.alt[1] == 'H' ? card.img.alt = `L${card.img.alt.slice(1)}` : null
                        break;
                    case 'hearts':
                        card.img.alt[1] == 'D' ? card.img.alt = `L${card.img.alt.slice(1)}` : null
                        break;
                    case 'spades':
                        card.img.alt[1] == 'C' ? card.img.alt = `L${card.img.alt.slice(1)}` : null
                        break;
                    case 'clubs':
                        card.img.alt[1] == 'S' ? card.img.alt = `L${card.img.alt.slice(1)}` : null
                        break;
                }
            }
            
            switch(index){
                case 0:
                    card.player = players[1].name
                    break;
                case 1:
                    card.player = players[0].name
                    break;
                case 2:
                    card.player = players[3].name
                    break;
                case 3:
                    card.player = players[2].name
                    break;
            }

            if(card.img.alt[1] == trump[0].toUpperCase() || card.img.alt[0] == 'L'){
                trumpCards.push(card)
            } else if(card.img.alt[1] == firstSuit){
                firSuitCards.push(card)
            }
        }
    })

    if(trumpCards[0]){
        highCardWinner(trumpCards)
    } else {
        highCardWinner(firSuitCards)
    } 
}

async function highCardWinner(cards){
    cards.forEach(card => {
        card.img.alt = card.img.alt.slice(0, 1)
        switch(card.img.alt){
            case '0':
                card.img.alt = '10'
                break;
            case 'J':
                card.img.alt = '11';
                break;
            case 'Q':
                card.img.alt = '12';
                break;
            case 'K':
                card.img.alt = '13';
                break;
            case 'A':
                card.img.alt = '14';
                break;
            case 'L':
                card.img.alt = '15';
                break;
            case 'R':
                card.img.alt = '16';
        }
        card.img.alt = parseInt(card.img.alt)
    })
    cards.sort((card1, card2) => card1.img.alt - card2.img.alt)
    let winner = cards[cards.length-1].player;
    let winnerMessage = document.querySelector('#winner-message')
    winnerMessage.innerHTML = `${winner} has won the round`;

    players.forEach(player => {
        if(player.name == winner){
            player.tricks++
        }
    })

    await delay(3000)
    
    middleCards.forEach(card => {
        if(card != 'empty'){
            card.img.remove()
        }     
    })

    winnerMessage.innerHTML = ''

    middleCards = [];
    
    let tester = 
    players[0].isEmpty
        ? players[1].hand.length
        : players[0].hand.length

    if(tester != 0){
        dealer = '';
        let playerToMove;

        switch(cards[cards.length-1].index){
            case 0:
                renderHands(players, false, true)
                break;
            case 1:
                playerToMove = players.pop()
                players.unshift(playerToMove)
                renderHands(players, true, true)
                break;
            case 2:
                for(let i = 0; i < 2; i++){
                    playerToMove = players.pop()
                    players.unshift(playerToMove)
                }
                renderHands(players, true, true)
                break;
            case 3:
                playerToMove = players.shift()
                players.push(playerToMove)
                renderHands(players, true, true)
                break;
        }
    } else {
        let team1Total = 0;
        let team2Total = 0;

        if(!goAloneTeammate.player){
            if(players[0].team == 1){
                team1Total += players[0].tricks + players[2].tricks
                team2Total += players[1].tricks + players[3].tricks
            } else {
                team1Total += players[1].tricks + players[3].tricks
                team2Total += players[0].tricks + players[2].tricks
            }

            if(team1Total > team2Total){
                teamThatPicked == 1 ? team1Total == 5 ? teams[0].score += 2: teams[0].score += 1: teams[0].score += 2
            } else {
                teamThatPicked == 2 ? team2Total == 5 ? teams[1].score += 2: teams[1].score += 1: teams[1].score += 2
            }
        } else {
            goAloneTeammate.player.hand = []
            if(players[1].team == 1){
                if(goAloneTeammate.player.team == 1){
                    team1Total += players[1].tricks;
                    team2Total += players[0].tricks + players[2].tricks;
                    Object.assign(players[3], goAloneTeammate.player)
                } else {
                    team1Total += players[1].tricks + players[3].tricks;
                    if(players[0].isEmpty){
                        team2Total += players[2].tricks
                        Object.assign(players[0], goAloneTeammate.player)
                    } else {
                        team2Total += players[0].tricks
                        Object.assign(players[2], goAloneTeammate.player)
                    }
                }
            } else {
                if(goAloneTeammate.player.team == 2){
                    team1Total += players[0].tricks + players[2].tricks;
                    team2Total += players[1].tricks;
                    Object.assign(players[3], goAloneTeammate.player)
                } else {
                    team2Total += players[1].tricks + players[3].tricks;
                    if(players[0].isEmpty){
                        team1Total += players[2].tricks
                        Object.assign(players[0], goAloneTeammate.player)
                    } else {
                        team1Total += players[0].tricks
                        Object.assign(players[2], goAloneTeammate.player)
                    }
                }
            }

            if(team1Total > team2Total){
                teamThatPicked == 1 ? team1Total == 5 ? teams[0].score += 4: teams[0].score += 1: teams[1].score += 2
            } else {
                teamThatPicked == 2 ? team2Total == 5 ? teams[1].score += 4: teams[1].score += 1: teams[0].score += 2
            }

            goAloneTeammate.player = null
        }

        trump = '';

        document.querySelector('.top-card-to-side').remove()
        document.querySelector('.flipped-card').remove()

        renderScoreboard()

        if(theresAWinner()){
            await delay(2000)
            handleWin()
        } else {
            let nextDealersDirection

            players.forEach((player, index) => {
                if(player.name == nextDealer){
                    nextDealersDirection = index
                }
            })

            let playerToMove;

            switch(nextDealersDirection){
                case 1:
                    playerToMove = players.shift()
                    players.push(playerToMove)
                    break;
                case 2:
                    for(let i = 0; i < 2; i++){
                        playerToMove = players.pop()
                        players.unshift(playerToMove)
                    }
                    break;
                case 3:
                    playerToMove = players.pop()
                    players.unshift(playerToMove)
                    break;
        }

        

        dealer = nextDealer

        dealCards(nextDealer, players)
        }
    }
}

function theresAWinner(){
    let winnerMessage = document.getElementById('winner-message')

    if(teams[0].score >= 10){
        winnerMessage.innerHTML = `${teams[0].teamMates[0]} and ${teams[0].teamMates[1]}'s team has won!`
        return true
    } else if(teams[1].score >= 10){
        winnerMessage.innerHTML = `${teams[1].teamMates[0]} and ${teams[1].teamMates[1]}'s team has won!`
        return true
    }
    return false
}

function handleWin(){
    let winScreen = document.getElementById('handle-win')
    winScreen.classList.remove('invisible')
}

function renderScoreboard(renderTrump = false){
    let scoreboard = document.querySelector('#scoreboard')

    while(scoreboard.firstChild.innerHTML){
        scoreboard.firstChild.innerHTML = ''
    }

    document.querySelector('#team1').innerHTML = `${teams[0].teamMates[0]} & ${teams[0].teamMates[1]}: ${teams[0].score}`
    document.querySelector('#team2').innerHTML = `${teams[1].teamMates[0]} & ${teams[1].teamMates[1]}: ${teams[1].score}`

    if(renderTrump){
        document.querySelector('#trump').innerHTML = `Trump: ${trump[0].toUpperCase() + trump.slice(1, trump.length)}`
    }
}

async function renderMiddle(){
    middleCards.forEach((card, index) => {
        if(card != 'empty'){
            switch(index){
                case 0:
                    card.img.classList.replace('played-card','right-played')
                    break;
                case 1:
                    card.img.classList.replace('right-played','top-played')
                    break;
                case 2:
                    card.img.classList.replace('top-played','left-played')
                    break;
            }
        }
    })
}

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

