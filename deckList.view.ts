import { countCardsDue, getAll } from "./decks.model.js";

export function render(deckList: HTMLElement, onReviewClick: (deckId: string) => void) {
    const decks = getAll().map(function (deck) {
        const cardsDue = countCardsDue(deck.id);
        const deckElement = document.createElement("li");

        deckElement.classList.add("deck");
        deckElement.innerHTML = `<h2>${deck.name}</h2>
            ${cardsDue === 0 ?
            "<p>All caught up!</p>" :
            `<p>Cards due: ${cardsDue}</p>
            <a href="review.html" onclick="startReview(getCardsDue(${deck.id}))">Review</a>`}`;

        deckElement.querySelector("a")?.addEventListener("click", function () {
            onReviewClick(deck.id);
        });

        return deckElement;
    })

    deckList.append(...decks);
}