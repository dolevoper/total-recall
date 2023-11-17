import { parseFeedback } from "./cards.model.js";
import { getCurrentCard, giveFeedback, isDone, onUpdate } from "./review.model.js";
import { showFeedback, flipCard, renderCard, renderDone, hideFeedback } from "./review.view.js";

export function init(reviewZone: HTMLElement, cardElement: HTMLElement, feedbackForm: HTMLFormElement) {
    render(reviewZone, cardElement);

    onUpdate(function () {
        render(reviewZone, cardElement);
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
}

function render(reviewZone: HTMLElement, cardElement: HTMLElement) {
    if (isDone()) {
        renderDone(reviewZone);
        return;
    }

    renderCard(cardElement, getCurrentCard());
}