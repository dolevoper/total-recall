// [x] array of cards
// [x] card has front and back
// [x] display first card
// [x] let the user flip
// [x] let the user continue to next card
// [x] when all cards reviewed show done message

type Card = {
    front: string,
    back: string
};

const cards: Card[] = [
    {
        front: "Hello",
        back: "שלום"
    },
    {
        front: "World",
        back: "עולם"
    },
    {
        front: "Card",
        back: "קלף"
    },
    {
        front: "Repetition",
        back: "חזרה"
    },
    {
        front: "Software",
        back: "תוכנה"
    }
];

let currentCardIndex = 0;

function displayCurrentCard() {
    const currentCard = cards[currentCardIndex];

    document.querySelector("#currentCard .card__front")!.textContent = currentCard.front;
    document.querySelector("#currentCard .card__back")!.textContent = currentCard.back;
}

document.querySelector("#btnFlip")?.addEventListener("click", function () {
    document.querySelector("#currentCard")?.classList.toggle("card--flipped");
});

document.querySelector("#btnNextCard")?.addEventListener("click", function () {
    if (currentCardIndex === cards.length - 1) {
        document.querySelector("#reviewZone")!.innerHTML = "<h2>All done!</h2>";
        return;
    }

    currentCardIndex++;
    displayCurrentCard();
});

displayCurrentCard();

