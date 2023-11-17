import { isDue } from "./cards.model.js";

type Deck = {
    id: string,
    name: string,
    cardIds: string[]
};

const decks = new Map<string, Deck>();

export function upsertDeck(deck: Deck) {
    decks.set(deck.id, deck);
}

export function getAll() {
    return [...decks.values()];
}

export function getById(id: string) {
    const deck = decks.get(id);

    if (!deck) {
        throw new Error();
    }

    return deck;
}

export function countCardsDue(deckId: string) {
    const deck = getById(deckId);

    return deck.cardIds.filter((cardId) => isDue(cardId)).length;
}
