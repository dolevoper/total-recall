import { Card } from "./review.model";

export function renderCard(cardElement: HTMLElement, card: Card) {
    cardElement.querySelector(".card__front")!.textContent = card.front;

    if (!cardElement.classList.contains("card--flipped")) {
        cardElement.querySelector(".card__back")!.textContent = card.back;
    } else {
        function updateCardBack() {
            cardElement.querySelector(".card__back")!.textContent = card.back;
            cardElement.removeEventListener("transitionend", updateCardBack);
        }

        cardElement.addEventListener("transitionend", updateCardBack);
    }

    cardElement.classList.remove("card--flipped");
}

export function flipCard(card: HTMLElement) {
    card.classList.toggle("card--flipped");
}

export function showFeedback(feedbackForm: HTMLFormElement) {
    feedbackForm.classList.remove("invisible");
}

export function hideFeedback(feedbackForm: HTMLFormElement) {
    feedbackForm.classList.add("invisible");
}

export function renderDone(reviewZone: HTMLElement) {
    reviewZone.innerHTML = "<h2>All done!</h2>";
}