import { getCurrentCard, giveFeedback, isDone, nextCard, onUpdate, parseFeedback } from "./review.model.js";
import { showFeedback, flipCard, renderCard, renderDone, hideFeedback } from "./review.view.js";

export function init(reviewZone: HTMLElement, cardElement: HTMLElement, feedbackForm: HTMLFormElement) {
    renderCard(cardElement, getCurrentCard());

    onUpdate(function () {
        if (isDone()) {
            renderDone(reviewZone);
            return;
        }

        renderCard(cardElement, getCurrentCard());
        hideFeedback(feedbackForm);
    });
}

export function onCardFlip(cardElement: HTMLElement, feedbackForm: HTMLFormElement) {
    flipCard(cardElement);
    showFeedback(feedbackForm);
}

export function onSubmitFeedback(value: unknown) {
    const feedback = parseFeedback(value);
    
    giveFeedback(feedback);
    nextCard();
}