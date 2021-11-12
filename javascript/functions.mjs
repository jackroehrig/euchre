

// function to add functionality to buttons in main menu and options menus

const cards = [];

for(let i = 2; i < 15; i++){
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

async function startingDeal(){
    let centerArea = document.querySelector('#center-area')
    let middleTopCard = document.querySelector('.top-card')
    let messageArea = document.querySelector('#message-area')
    let theme = {
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

    middleTopCard.src = theme.src
    middleTopCard.alt = theme.alt

    messageArea.innerHTML = 'Dealing for first black Jack to see who deals first...'
    await delay();
    await delay();
    messageArea.innerHTML = ''

    shuffleArray(cards)
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

            messageArea.innerHTML = `${currentDealee.name} has received the first deal!`

            await delay()

            messageArea.innerHTML = ''

            switch(currentDealee.direction){
                case 'up':
                    middleTopCard.classList.add('send-up')
                    break;
                case 'left':
                    middleTopCard.classList.add('send-left')
                    break;
                case 'right':
                    middleTopCard.classList.add('send-right')
                    break;
                case 'down':
                    middleTopCard.classList.add('send-down')
                    break;
            }

            break;
        }
    }
}

function delay(){
    return new Promise(resolve => setTimeout(resolve, 1000))
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array
}

export {addButtonEvent, addSliderEvent, addSwitchEvent, addThemeEvent, startingDeal, cards}