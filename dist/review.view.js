import { getById } from "./cards.model.js";
export function renderCard(cardElement, cardId) {
    const card = getById(cardId);
    cardElement.querySelector(".card__front").textContent = card.front;
    if (!cardElement.classList.contains("card--flipped")) {
        cardElement.querySelector(".card__back").textContent = card.back;
    }
    else {
        function updateCardBack() {
            cardElement.querySelector(".card__back").textContent = card.back;
            cardElement.removeEventListener("transitionend", updateCardBack);
        }
        cardElement.addEventListener("transitionend", updateCardBack);
    }
    cardElement.classList.remove("card--flipped");
}
export function flipCard(card) {
    card.classList.toggle("card--flipped");
}
export function showFeedback(feedbackForm) {
    feedbackForm.classList.remove("invisible");
}
export function hideFeedback(feedbackForm) {
    feedbackForm.classList.add("invisible");
}
export function renderDone(reviewZone) {
    reviewZone.innerHTML = "<h2>All done!</h2>";
}
