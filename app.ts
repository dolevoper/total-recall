// [x] array of cards
// [x] card has front and back
// [x] display first card
// [x] let the user flip
// [x] let the user continue to next card
// [x] when all cards reviewed show done message
// [x] next card always show front first
// [ ] feedback after card was flipped - scale from 0 to 5

import { getCurrentCard, giveFeedback, isDone, nextCard, parseFeedback } from "./review.model.js";

function displayCurrentCard() {
    const currentCard = getCurrentCard();

    document.querySelector("#reviewZone")?.classList.remove("review-zone--reviewed");
    document.querySelector("#currentCard")?.classList.remove("card--flipped");
    document.querySelector("#currentCard .card__front")!.textContent = currentCard.front;
    document.querySelector("#currentCard .card__back")!.textContent = currentCard.back;
}

document.querySelector("#btnFlip")?.addEventListener("click", function () {
    document.querySelector("#reviewZone")?.classList.add("review-zone--reviewed");
    document.querySelector("#currentCard")?.classList.toggle("card--flipped");
});

document.querySelector("#feedbackForm")?.addEventListener("submit", function (e: SubmitEvent) {
    e.preventDefault();

    const feedback = parseFeedback((e.submitter as HTMLButtonElement).value);
    giveFeedback(feedback);

    if (isDone()) {
        document.querySelector("#reviewZone")!.innerHTML = "<h2>All done!</h2>";
        return;
    }

    nextCard();
    displayCurrentCard();
});

displayCurrentCard();

