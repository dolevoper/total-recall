import { isDue } from "./cards.model.js";
import { appUUID } from "./consts.js";
const decksStorageKey = `${appUUID}_totalrecall_decks`;
const decks = new Map(JSON.parse(localStorage.getItem(decksStorageKey) ?? "[]").map((deck) => [deck.id, deck]));
export function upsertDeck(deck) {
    decks.set(deck.id, deck);
    save();
}
export function getAll() {
    return [...decks.values()];
}
export function getById(id) {
    const deck = decks.get(id);
    if (!deck) {
        throw new Error();
    }
    return deck;
}
export function getCardsDue(deckId) {
    const deck = getById(deckId);
    return deck.cardIds.filter((cardId) => isDue(cardId));
}
export function countCardsDue(deckId) {
    return getCardsDue(deckId).length;
}
function save() {
    localStorage.setItem(decksStorageKey, JSON.stringify(getAll()));
}
