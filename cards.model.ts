export type Feedback = 0 | 1 | 2 | 3 | 4 | 5;

export type Card = {
    id: string,
    front: string,
    back: string,
    repetitions: number,
    interval: number,
    ef: number
};

const cards = new Map<string, Card>();

export function getAll() {
    return [...cards.values()];
}

export function upsertCard(card: Card) {
    cards.set(card.id, card);
}
