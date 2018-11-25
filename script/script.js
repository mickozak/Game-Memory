const cards = document.querySelectorAll('.memory-card')

let hasFilppedCard = false
let lockBoard = false
let firstCard, secondCard

function flipCard() {
    if (lockBoard) return
    if (this===firstCard) return
    this.classList.add('flip')
    console.log(this)
    this.style.setProperty('transform','rotateY(180deg)')
    if (!hasFilppedCard){
        hasFilppedCard = true
        firstCard=this
        return
    }
        secondCard=this
        checkForMatch()
}

function checkForMatch(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework
    isMatch ? disableCards() : unFlipCards()
}

function disableCards(){
    firstCard.removeEventListener('click',flipCard)
    secondCard.removeEventListener('click',flipCard)
    resetBoard()
}

function unFlipCards(){
    lockBoard = true
    setTimeout(()=>{
        firstCard.classList.remove('flip')
        firstCard.style.setProperty('transform','none')
        secondCard.classList.remove('flip')
        secondCard.style.setProperty('transform','none')
        resetBoard()
    },1500)
}

function resetBoard(){
    [hasFilppedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

(function shuffle(){
    cards.forEach(card=>{
        let randomPos = Math.floor(Math.random()*12)
        card.style.order = randomPos
    })
})()

cards.forEach(card =>{
    card.addEventListener('click',flipCard)})

