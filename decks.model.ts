import { isDue } from "./cards.model.js";
import { appUUID } from "./consts.js";

const decksStorageKey = `${appUUID}_totalrecall_decks`;

export type Deck = {
    id: string,
    name: string,
    cardIds: string[]
};

const decks = new Map<string, Deck>(
    (JSON.parse(localStorage.getItem(decksStorageKey) ?? "[]") as Deck[]).map((deck) => [deck.id, deck])
);

export function upsertDeck(deck: Deck) {
    decks.set(deck.id, deck);
    save();
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

export function getCardsDue(deckId: string) {
    const deck = getById(deckId);

    return deck.cardIds.filter((cardId) => isDue(cardId));
}

export function countCardsDue(deckId: string) {
    return getCardsDue(deckId).length;
}

function save() {
    localStorage.setItem(decksStorageKey, JSON.stringify(getAll()));
}
