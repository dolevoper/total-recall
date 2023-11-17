import { upsertCard } from "./cards.model.js";
import { upsertDeck } from "./decks.model.js";

const cards = [
    {
        id: crypto.randomUUID(),
        front: "Father",
        back: "אבא",
        repetitions: 0,
        interval: 1,
        ef: 2.5
    },
    {
        id: crypto.randomUUID(),
        front: "Hello",
        back: "שלום",
        repetitions: 0,
        interval: 1,
        ef: 2.5
    },
    {
        id: crypto.randomUUID(),
        front: "World",
        back: "עולם",
        repetitions: 0,
        interval: 1,
        ef: 2.5
    },
    {
        id: crypto.randomUUID(),
        front: "Card",
        back: "קלף",
        repetitions: 0,
        interval: 1,
        ef: 2.5
    },
    {
        id: crypto.randomUUID(),
        front: "Repetition",
        back: "חזרה",
        repetitions: 0,
        interval: 1,
        ef: 2.5
    },
    {
        id: crypto.randomUUID(),
        front: "Software",
        back: "תוכנה",
        repetitions: 0,
        interval: 1,
        ef: 2.5
    }
];

cards.forEach(upsertCard);
upsertDeck({
    id: crypto.randomUUID(),
    name: "English Vocab",
    cardIds: cards.map((card) => card.id)
});
// upsertDeck({
//     id: crypto.randomUUID(),
//     name: "English Vocab",
//     cardIds: []
// });
// upsertDeck({
//     id: crypto.randomUUID(),
//     name: "English Vocab",
//     cardIds: []
// });
