type Feedback = 0 | 1 | 2 | 3 | 4 | 5;

export type Card = {
    front: string,
    back: string,
    repetitions: number,
    interval: number,
    ef: number
};

const callbacks = [] as Function[];
const cards: Card[] = [
    {
        front: "Hello",
        back: "שלום",
        repetitions: 0,
        interval: 1,
        ef: 2.5
    },
    {
        front: "World",
        back: "עולם",
        repetitions: 0,
        interval: 1,
        ef: 2.5
    },
    {
        front: "Card",
        back: "קלף",
        repetitions: 0,
        interval: 1,
        ef: 2.5
    },
    {
        front: "Repetition",
        back: "חזרה",
        repetitions: 0,
        interval: 1,
        ef: 2.5
    },
    {
        front: "Software",
        back: "תוכנה",
        repetitions: 0,
        interval: 1,
        ef: 2.5
    }
];

let currentCard: Card | undefined = {
    front: "Father",
    back: "אבא",
    repetitions: 0,
    interval: 1,
    ef: 2.5
};

export function getCurrentCard() {
    if (!currentCard) {
        throw new Error();
    }

    return currentCard;
}

export function isDone() {
    return !currentCard;
}

export function nextCard() {
    currentCard = cards.shift();

    setTimeout(function () {
        callbacks.forEach(function (callback) {
            callback();
        });
    });
}

export function giveFeedback(feedback: Feedback) {
    const currentCard = getCurrentCard();

    if (feedback < 3) {
        currentCard.repetitions = 0;
        currentCard.interval = 1;

        cards.push(currentCard);

        return;
    } else {
        if (currentCard.repetitions === 0) {
            currentCard.interval = 1;
        } else if (currentCard.repetitions === 1) {
            currentCard.interval = 3;
        } else {
            currentCard.interval = Math.round(currentCard.interval * currentCard.ef);
        }

        currentCard.repetitions++;
    }

    currentCard.ef = calculateEf(currentCard.ef, feedback);
}

export function parseFeedback(feedback: unknown): Feedback {
    const asNumber = Number(feedback);

    if (asNumber < 0 || asNumber > 5 || !Number.isInteger(asNumber)) {
        throw new Error();
    }

    return asNumber as Feedback;
}

export function onUpdate(callback: Function) {
    callbacks.push(callback);
}

function calculateEf(currentEf: number, feedback: Feedback) {
    return Math.min(1.3, currentEf + (0.1 - (5 - feedback) * (0.08 + (5 - feedback) * 0.02)));
}
