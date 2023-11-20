export function updateDeck(deckForm, deck) {
    deckForm.elements.namedItem("deckId").value = deck.id;
    deckForm.elements.namedItem("deckName").value = deck.name;
}
export function renderCard(cardList, card, onFrontUpdate, onBackUpdate, focus = true) {
    const li = document.createElement("li");
    li.classList.add("card-list__item");
    const cardInput = document.createElement("input");
    cardInput.id = `card-${card.id}`;
    cardInput.type = "hidden";
    cardInput.name = "cards";
    cardInput.value = JSON.stringify(card);
    const frontTextarea = document.createElement("textarea");
    frontTextarea.id = `card-${card.id}-front`;
    frontTextarea.rows = 5;
    frontTextarea.value = card.front;
    frontTextarea.addEventListener("input", function (e) {
        onFrontUpdate(e.currentTarget.value);
    });
    const frontLabel = document.createElement("label");
    frontLabel.htmlFor = frontTextarea.id;
    frontLabel.textContent = "Front";
    const frontContainer = document.createElement("div");
    frontContainer.classList.add("form-control");
    frontContainer.append(frontLabel, frontTextarea);
    const backTextarea = document.createElement("textarea");
    backTextarea.id = `card-${card.id}-back`;
    backTextarea.rows = 5;
    backTextarea.value = card.back;
    backTextarea.addEventListener("input", function (e) {
        onBackUpdate(e.currentTarget.value);
    });
    const backLabel = document.createElement("label");
    backLabel.htmlFor = backTextarea.id;
    backLabel.textContent = "Back";
    const backContainer = document.createElement("div");
    backContainer.classList.add("form-control");
    backContainer.append(backLabel, backTextarea);
    li.append(cardInput, frontContainer, backContainer);
    cardList.append(li);
    focus && frontTextarea.focus();
}
export function updateCard(card) {
    const cardInput = document.getElementById(`card-${card.id}`);
    if (!cardInput) {
        throw new Error();
    }
    cardInput.value = JSON.stringify(card);
}
