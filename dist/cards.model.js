import { appUUID } from "./consts.js";
const cardsStorageKey = `${appUUID}_totalrecall_cards`;
const cards = new Map(JSON.parse(localStorage.getItem(cardsStorageKey) ?? "[]").map((card) => [card.id, card]));
export function getAll() {
    return [...cards.values()];
}
export function getById(id) {
    const card = cards.get(id);
    if (!card) {
        throw new Error();
    }
    return card;
}
export function upsertCard(card) {
    cards.set(card.id, card);
    save();
}
export function isDue(cardId) {
    const card = getById(cardId);
    if (!card.lastReviewed) {
        return true;
    }
    const daysSinceLastReview = (+new Date() - card.lastReviewed) / 24 / 60 / 60 / 1000;
    return card.interval <= daysSinceLastReview;
}
export function review(cardId, feedback) {
    const currentCard = getById(cardId);
    upsertCard({
        ...currentCard,
        repetitions: calculateRepetitions(currentCard.repetitions, feedback),
        interval: calculateInterval(currentCard.repetitions, currentCard.interval, currentCard.ef, feedback),
        ef: calculateEf(currentCard.ef, feedback),
        lastReviewed: +new Date()
    });
}
export function parseFeedback(feedback) {
    const asNumber = Number(feedback);
    if (asNumber < 0 || asNumber > 5 || !Number.isInteger(asNumber)) {
        throw new Error();
    }
    return asNumber;
}
function calculateRepetitions(repetitions, feedback) {
    return feedback < 3 ? 0 : repetitions + 1;
}
function calculateInterval(repetitions, interval, ef, feedback) {
    if (feedback < 3) {
        return 0;
    }
    switch (repetitions) {
        case 0: return 1;
        case 1: return 3;
        default: return Math.round(interval * ef);
    }
}
function calculateEf(currentEf, feedback) {
    return Math.min(1.3, currentEf + (0.1 - (5 - feedback) * (0.08 + (5 - feedback) * 0.02)));
}
function save() {
    localStorage.setItem(cardsStorageKey, JSON.stringify(getAll()));
}
