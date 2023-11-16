import { Card, Feedback, upsertCard } from "./cards.model.js";

const callbacks = [] as Function[];

let cardsToReview = [] as Card[];
let currentCard = undefined as Card | undefined;

export function startReview(cards: Card[]) {
    cardsToReview = cards.slice(1);
    currentCard = cards[0];
}

export function getCurrentCard() {
    if (!currentCard) {
        throw new Error();
    }

    return currentCard;
}

export function isDone() {
    return !currentCard;
}

export function giveFeedback(feedback: Feedback) {
    const currentCard = getCurrentCard();

    if (feedback < 3) {
        currentCard.repetitions = 0;
        currentCard.interval = 1;

        cardsToReview.push(currentCard);
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

    upsertCard(currentCard);
    nextCard();
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

function nextCard() {
    currentCard = cardsToReview.shift();

    setTimeout(function () {
        callbacks.forEach(function (callback) {
            callback();
        });
    });
}
