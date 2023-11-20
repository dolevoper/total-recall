import { countCardsDue, getAll } from "./decks.model.js";
export function render(deckList, onReviewClick) {
    const decks = getAll().map(function (deck) {
        const cardsDue = countCardsDue(deck.id);
        const deckElement = document.createElement("li");
        const text = cardsDue === 0 ?
            "All caught up!" :
            `Cards due: ${cardsDue}`;
        const actions = [
            ...(cardsDue === 0 ? [] : ['<a class="review-link" href="review.html">Review</a>']),
            `<a class="deck__actions__group-start" href="deck.html?id=${deck.id}">✏️Edit</a>`,
            '<button class="btn-danger">🗑️Delete</button>'
        ];
        deckElement.classList.add("deck");
        deckElement.innerHTML = `<h2>${deck.name}</h2>
            <p>${text}</p>
            <menu class="deck__actions">
                ${actions.join("\n")}
            </menu>`;
        deckElement.querySelector(".review-link")?.addEventListener("click", function () {
            onReviewClick(deck.id);
        });
        return deckElement;
    });
    deckList.append(...decks);
}
