import { Card, Feedback, review } from "./cards.model.js";

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

    review(currentCard.id, feedback);

    if (feedback < 3) {
        cardsToReview.push(currentCard);
    }

    nextCard();
}

export function onUpdate(callback: Function) {
    callbacks.push(callback);
}

function nextCard() {
    currentCard = cardsToReview.shift();

    setTimeout(function () {
        callbacks.forEach(function (callback) {
            callback();
        });
    });
}
