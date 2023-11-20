import { Card, upsertCard } from "./cards.model.js";
import { renderCard, updateCard } from "./deck.view.js";
import { upsertDeck } from "./decks.model.js";

export function addCard(cardList: HTMLElement) {
    const card: Card = {
        id: crypto.randomUUID(),
        front: "",
        back: "",
        repetitions: 0,
        interval: 0,
        ef: 2.5
    };

    function updateFront(value: string) {
        card.front = value;
        updateCard(card);
    }

    function updateBack(value: string) {
        card.back = value;
        updateCard(card);
    }

    renderCard(cardList, card, updateFront, updateBack);
}

export function saveDeck(formData: FormData) {
    const name = formData.get("deckName")?.toString();

    if (!name) {
        throw new Error();
    }

    const cards = formData.getAll("cards").map((card) => JSON.parse(card.toString()) as Card);

    cards.forEach(upsertCard);

    upsertDeck({
        id: crypto.randomUUID(),
        name,
        cardIds: cards.map((card) => card.id)
    });
}