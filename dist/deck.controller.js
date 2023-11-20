import { getById as getCardById, upsertCard } from "./cards.model.js";
import { getById as getDeckById, upsertDeck } from "./decks.model.js";
import { renderCard, updateCard, updateDeck } from "./deck.view.js";
export function init(deckForm, cardList, deckId) {
    if (!deckId) {
        updateDeck(deckForm, {
            id: crypto.randomUUID(),
            name: "",
            cardIds: []
        });
        return;
    }
    const deck = getDeckById(deckId);
    updateDeck(deckForm, deck);
    deck.cardIds
        .map(getCardById)
        .forEach((card) => addCard(cardList, card, false));
}
export function addCard(cardList, card, focus = true) {
    const cardWorkingCopy = {
        id: crypto.randomUUID(),
        front: "",
        back: "",
        repetitions: 0,
        interval: 0,
        ef: 2.5,
        ...card
    };
    function updateFront(value) {
        cardWorkingCopy.front = value;
        updateCard(cardWorkingCopy);
    }
    function updateBack(value) {
        cardWorkingCopy.back = value;
        updateCard(cardWorkingCopy);
    }
    renderCard(cardList, cardWorkingCopy, updateFront, updateBack, focus);
}
export function saveDeck(formData) {
    const id = formData.get("deckId")?.toString();
    const name = formData.get("deckName")?.toString();
    if (!name || !id) {
        throw new Error();
    }
    const cards = formData.getAll("cards").map((card) => JSON.parse(card.toString()));
    cards.forEach(upsertCard);
    upsertDeck({
        id,
        name,
        cardIds: cards.map((card) => card.id)
    });
}
