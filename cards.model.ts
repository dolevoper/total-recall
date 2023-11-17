import { appUUID } from "./consts.js";

const cardsStorageKey = `${appUUID}_totalrecall_cards`;

export type Feedback = 0 | 1 | 2 | 3 | 4 | 5;

export type Card = {
    id: string,
    front: string,
    back: string,
    lastReviewed?: number,
    repetitions: number,
    interval: number,
    ef: number
};

const cards = new Map<string, Card>(
    (JSON.parse(localStorage.getItem(cardsStorageKey) ?? "[]") as Card[]).map((card) => [card.id, card])
);

export function getAll() {
    return [...cards.values()];
}

export function getById(id: string) {
    const card = cards.get(id);

    if (!card) {
        throw new Error();
    }

    return card;
}

export function upsertCard(card: Card) {
    cards.set(card.id, card);
    save();
}

export function isDue(cardId: string) {
    const card = getById(cardId);

    if (!card.lastReviewed) {
        return true;
    }

    const daysSinceLastReview = (+new Date() - card.lastReviewed) / 24 / 60 / 60 / 1000;

    return card.interval <= daysSinceLastReview;
}

export function review(cardId: string, feedback: Feedback) {
    const currentCard = getById(cardId);

    upsertCard({
        ...currentCard,
        repetitions: calculateRepetitions(currentCard.repetitions, feedback),
        interval: calculateInterval(currentCard.repetitions, currentCard.interval, currentCard.ef, feedback),
        ef: calculateEf(currentCard.ef, feedback),
        lastReviewed: +new Date()
    });
}

export function parseFeedback(feedback: unknown): Feedback {
    const asNumber = Number(feedback);

    if (asNumber < 0 || asNumber > 5 || !Number.isInteger(asNumber)) {
        throw new Error();
    }

    return asNumber as Feedback;
}

function calculateRepetitions(repetitions: number, feedback: Feedback) {
    return feedback < 3 ? 0 : repetitions + 1;
}

function calculateInterval(repetitions: number, interval: number, ef: number, feedback: Feedback) {
    if (feedback < 3) {
        return 0;
    }

    switch (repetitions) {
        case 0: return 1;
        case 1: return 3;
        default: return Math.round(interval * ef);
    }
}

function calculateEf(currentEf: number, feedback: Feedback) {
    return Math.min(1.3, currentEf + (0.1 - (5 - feedback) * (0.08 + (5 - feedback) * 0.02)));
}

function save() {
    localStorage.setItem(cardsStorageKey, JSON.stringify(getAll()));
}