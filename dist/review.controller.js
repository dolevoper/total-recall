import { parseFeedback } from "./cards.model.js";
import { getCurrentCard, giveFeedback, isDone, onUpdate } from "./review.model.js";
import { showFeedback, flipCard, renderCard, renderDone, hideFeedback } from "./review.view.js";
export function init(reviewZone, cardElement, feedbackForm) {
    render(reviewZone, cardElement);
    onUpdate(function () {
        render(reviewZone, cardElement);
        hideFeedback(feedbackForm);
    });
}
export function onCardFlip(cardElement, feedbackForm) {
    flipCard(cardElement);
    showFeedback(feedbackForm);
}
export function onSubmitFeedback(value) {
    const feedback = parseFeedback(value);
    giveFeedback(feedback);
}
function render(reviewZone, cardElement) {
    if (isDone()) {
        renderDone(reviewZone);
        return;
    }
    renderCard(cardElement, getCurrentCard());
}
