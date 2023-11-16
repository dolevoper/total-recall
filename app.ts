// [x] array of cards
// [x] card has front and back
// [x] display first card
// [x] let the user flip
// [x] let the user continue to next card
// [x] when all cards reviewed show done message
// [x] next card always show front first
// [ ] feedback after card was flipped

import { getCurrentCard, isDone, nextCard } from "./review.model.js";

function displayCurrentCard() {
    const currentCard = getCurrentCard();

    document.querySelector("#currentCard")?.classList.remove("card--flipped");
    document.querySelector("#currentCard .card__front")!.textContent = currentCard.front;
    document.querySelector("#currentCard .card__back")!.textContent = currentCard.back;
}

document.querySelector("#btnFlip")?.addEventListener("click", function () {
    document.querySelector("#currentCard")?.classList.toggle("card--flipped");
});

document.querySelector("#btnNextCard")?.addEventListener("click", function () {
    if (isDone()) {
        document.querySelector("#reviewZone")!.innerHTML = "<h2>All done!</h2>";
        return;
    }

    nextCard();
    displayCurrentCard();
});

displayCurrentCard();

