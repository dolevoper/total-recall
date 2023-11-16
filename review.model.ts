type Feedback = 0 | 1 | 2 | 3 | 4 | 5;

type Card = {
    front: string,
    back: string
    lastFeedback?: Feedback;
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

export function giveFeedback(feedback: Feedback) {
    getCurrentCard().lastFeedback = feedback;
}

export function parseFeedback(feedback: unknown): Feedback {
    const asNumber = Number(feedback);

    if (asNumber < 0 || asNumber > 5 || !Number.isInteger(asNumber)) {
        throw new Error();
    }

    return asNumber as Feedback;
}
