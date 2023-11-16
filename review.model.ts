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

export function getCurrentCard() {
    return cards[currentCardIndex];
}

export function isDone() {
    return currentCardIndex === cards.length - 1;
}

export function nextCard() {
    if (isDone()) {
        throw new Error("Review is done.");
    }

    currentCardIndex++;
}
