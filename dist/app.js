import { onSubmitFeedback } from "./review.controller.js";
import { getCurrentCard } from "./review.model.js";
import { flipCard, _renderCard } from "./review.view.js";
const reviewZone = document.getElementById("reviewZone");
function displayCurrentCard() {
    const currentCard = getCurrentCard();
    _renderCard(reviewZone, currentCard);
}
document.querySelector("#btnFlip")?.addEventListener("click", function () {
    flipCard(reviewZone);
});
document.querySelector("#feedbackForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    onSubmitFeedback(e.submitter.value);
    displayCurrentCard();
});
displayCurrentCard();
