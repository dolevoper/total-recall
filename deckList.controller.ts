import { getCardsDue } from "./decks.model.js";
import { startReview } from "./review.model.js";

export function review(deckId: string) {
    startReview(getCardsDue(deckId));
}