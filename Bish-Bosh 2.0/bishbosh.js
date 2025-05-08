document.addEventListener("DOMContentLoaded", () => {
  const inputBishNumber = document.getElementById("bishNumber");
  const inputBoshNumber = document.getElementById("boshNumber");
  const inputLootLimit = document.getElementById("loopLimit");
  const formSettings = document.getElementById("formSettings");
  const resultListOutput = document.getElementById("bishBoshResultList");

  // Funktion för att nollställa listan
  const clearList = () => {
    resultListOutput.innerHTML = "";
  };

  // Nollställ listan när sidan laddas
  clearList();

  // Generera Bish-Bosh-lista
  formSettings.addEventListener("submit", (e) => {
    e.preventDefault();
    const bishNumber = inputBishNumber.value;
    const boshNumber = inputBoshNumber.value;
    const loopLimit = inputLootLimit.value;

    // Nollställ listan innan du genererar en ny
    clearList();

    makeBishBoshList(bishNumber, boshNumber, loopLimit);
  });

  // Generera och visa Bish-Bosh-lista
  const makeBishBoshList = (bishNumber, boshNumber, loopLimit) => {
    let maxLength = 0; // Variabel för att spara längden på det längsta resultatet
    for (let i = 1; i <= loopLimit; i++) {
      let result = "";
      if (i % bishNumber === 0) result += "Bish";
      if (i % boshNumber === 0) {
        if (result) result += "-";
        result += "Bosh";
      }
      if (result === "") {
        result = i.toString(); // Om det inte är Bish, Bosh eller Bish-Bosh, använd talet som sträng
      }
      // Spara längden på det längsta resultatet
      maxLength = Math.max(maxLength, result.length);
      resultListOutput.innerHTML += `<li class="list-group-item">${result}</li>`;
    }

    // Justera bredden baserat på det längsta resultatet
    adjustWidth(maxLength + 2); // +2 för att ge lite extra utrymme
  };

  // Funktion för att justera bredden
  const adjustWidth = (maxLength) => {
    const container = document.querySelector("#bishBoshResultList");
    // Beräkna bredden baserat på det längsta resultatet
    const fontSize = parseFloat(window.getComputedStyle(container).fontSize);
    const width = maxLength * fontSize * 0.6; // Justera faktorn (0.6) baserat på typsnitt och stil
    container.style.width = `${width}px`;
  };
});
