import { Feedback, review } from "./cards.model.js";
import { appUUID } from "./consts.js";

const cardsToReviewStorageKey = `${appUUID}_totalrecall_review__cardsToReview`;
const currentCardStorageKey = `${appUUID}_totalrecall_review__currentCard`;

const callbacks = [] as Function[];

let cardsToReview = JSON.parse(localStorage.getItem(cardsToReviewStorageKey) ?? "[]") as string[];
let currentCard = JSON.parse(localStorage.getItem(currentCardStorageKey) ?? "null") as string | null;

export function startReview(cardIds: string[]) {
    cardsToReview = cardIds.slice(1);
    currentCard = cardIds[0];
    save();
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

    review(currentCard, feedback);

    if (feedback < 3) {
        cardsToReview.push(currentCard);
    }

    nextCard();
    save();
}

export function onUpdate(callback: Function) {
    callbacks.push(callback);
}

function nextCard() {
    currentCard = cardsToReview.shift() ?? null;

    setTimeout(function () {
        callbacks.forEach(function (callback) {
            callback();
        });
    });
}

function save() {
    localStorage.setItem(cardsToReviewStorageKey, JSON.stringify(cardsToReview));
    localStorage.setItem(currentCardStorageKey, JSON.stringify(currentCard));
}
