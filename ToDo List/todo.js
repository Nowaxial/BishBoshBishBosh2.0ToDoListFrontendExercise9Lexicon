document.addEventListener("DOMContentLoaded", () => {
  // Variabler för de element som används i koden
  const shoppingForm = document.getElementById("shopping-form");
  const shoppingInput = document.getElementById("shopping-input");
  const shoppingList = document.getElementById("shopping-list");
  const emptyShoppingList = document.getElementById("empty-shoppinglist");
  const copyrightYear = document.getElementById("copyright-year");
  const footerCheckIcon = document.getElementById("footer-check-icon");
  const clearCompletedBtn = document.getElementById("clear-completed");

  let shoppingItems = [];
  let nextShoppingListId = 1;

  // Aktivera tooltip för dumpster-fire ikonen
  activateToolTipDumpsterFireICon();

  // Hover-effekt för dumpster-fire ikonen
  hoverEffectDumspterIconFire();

  // Funktion som uppdaterar copyright-year
  updateCopyrightYear();

  // Funktion som initialiserar shopping-form
  initializeShoppingForm();

  // Funktion som uppdaterar antalet varor och avslutade varor
  updateCounts();

  // Visa modalen när "clearCompletedBtn" klickas
  clearCompletedBtn.addEventListener("click", function () {
    const deleteModal = new bootstrap.Modal(
      document.getElementById("deleteModal")
    );
    deleteModal.show();
  });

  // Ta bort alla avklarade varor
  document.getElementById("delete-all-completed").addEventListener("click", () => {
      // Filtera ut alla avklarade varor
      shoppingItems = shoppingItems.filter((item) => !item.completed);

      const completedSelectors = [".shopping-item.completed",".shopping-item.bg-success-subtle",".shopping-item.bg-warning-subtle",].join(", ");

      shoppingList.querySelectorAll(completedSelectors).forEach((item) => {item.remove();}); 

      if (shoppingItems.length === 0) {emptyShoppingList.style.display = "block";}

      updateCounts();

      // Stäng modal
      const modal = bootstrap.Modal.getInstance("#deleteModal");
      modal?.hide();
    });

  // Ta bort ALLA varor 
  document.getElementById("delete-all-items").addEventListener("click", () => {
    shoppingItems = []; 
    shoppingList.querySelectorAll(".shopping-item").forEach((item) => item.remove()); 
    emptyShoppingList.style.display = "block"; // Visa "tom lista"
    updateCounts(); // Uppdatera räknare
    bootstrap.Modal.getInstance(document.getElementById("deleteModal")).hide(); // Stäng modal
  });

  // Funktion som lägger till ny vara (text) i shoppinglistan och använder sig av addShoppingItem som skapar ett nytt element
  function initializeShoppingForm() {
    shoppingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const text = shoppingInput.value.trim();
      if (text) {
        addShoppingItem(text);
        shoppingInput.value = "";
        shoppingInput.focus();
      } else {
        shoppingInput.focus();
      }
    });
  }


  // Funktion som lägger till ett nytt inköpsobjekt i shoppinglistan
  function addShoppingItem(text, completed = false, id = null) {
    const itemId = id || nextShoppingListId++;
    const newItem = { id: itemId, text, completed, createdAt: new Date() };

    if (!id) shoppingItems.push(newItem);

    if (shoppingItems.length === 1) {
      emptyShoppingList.style.display = "none";
    }

    const itemElement = createShoppingElement(newItem);

    shoppingList.insertBefore(itemElement, emptyShoppingList);
    updateCounts(); // Uppdatera antalet varor
    return itemElement;
  }

  // Funktion som skapar ett nytt HTML-element som representerar ett inköpsobjekt
  function createShoppingElement(item) {
    // Skapa huvudelementet
    const itemElement = document.createElement("div");
    itemElement.className = `list-group-item shopping-item ${
      item.completed ? "completed bg-success-subtle" : ""
    }`;
    itemElement.setAttribute("data-id", item.id);
    itemElement.style.cursor = "pointer";

    // Bygg upp HTML-strukturen
    itemElement.innerHTML = `
    <div class="d-flex align-items-center">
      <i class="fas ${
        item.completed ? "fa-check-square text-success" : "fa-square text-muted"
      } me-2 status-icon"></i>
      <span class="flex-grow-1 ${
        item.completed ? "text-decoration-line-through text-muted" : ""
      }">${item.text}</span>
      <div class="action-buttons">
        <button class="btn btn-sm btn-link text-info p-0 me-2 edit-btn opacity-75">
          <i class="fas fa-pen-to-square"></i>
        </button>
        <button class="btn btn-sm btn-link text-danger p-0 delete-btn opacity-75">
          <i class="fas fa-dumpster"></i>
        </button>
      </div>
    </div>
  `;

    // Hämta referenser till elementen
    const statusIcon = itemElement.querySelector(".status-icon");
    const textSpan = itemElement.querySelector("span");
    const editBtn = itemElement.querySelector(".edit-btn");
    const deleteBtn = itemElement.querySelector(".delete-btn");

    // Funktion för att växla status på ett inköpsobjektet
    const toggleItemStatus = () => {
      item.completed = !item.completed;

      // Uppdatera visuella element
      if (item.completed) {
        // Markera som avklarad
        statusIcon.classList.replace("fa-square", "fa-check-square");
        statusIcon.classList.replace("text-muted", "text-success");
        textSpan.classList.add("text-decoration-line-through", "text-muted");
        itemElement.classList.add(
          "bg-warning-subtle",
          "border-start",
          "border-warning",
          "border-2"
        );
      } else {
        // Återställ till oavklarad
        statusIcon.classList.replace("fa-check-square", "fa-square");
        statusIcon.classList.replace("text-success", "text-muted");
        textSpan.classList.remove("text-decoration-line-through", "text-muted");
        itemElement.classList.remove(
          "bg-warning-subtle",
          "border-start",
          "border-warning",
          "border-2"
        );
      }
      updateCounts(); // Uppdatera antalet varor och avslutade varor
      console.log("Toggling item:", item.id, "New status:", !item.completed);
    };

    // Lägg till hover-effekt på inköpsobjektet
    function addHoverEffect() {
      itemElement.addEventListener("mouseenter", () => {
        itemElement.classList.add("bg-secondary-subtle");
      });

      itemElement.addEventListener("mouseleave", () => {
        itemElement.classList.remove("bg-secondary-subtle");
      });
    }
    addHoverEffect();

    // Lägg till hover-effekter för knappararna redigera och Radera
    const addHoverEffects = (btn) => {
      btn.addEventListener("mouseenter", () =>
        btn.classList.replace("opacity-75", "opacity-100")
      );
      btn.addEventListener("mouseleave", () =>
        btn.classList.replace("opacity-100", "opacity-75")
      );
    };

    addHoverEffects(editBtn);
    addHoverEffects(deleteBtn);

    // Klick på hela varan som togglar status till avklarad eller oavklarad
    itemElement.addEventListener("click", (e) => {
      if (!e.target.closest(".action-buttons")) {
        toggleItemStatus();
      }
    });

    // Klick på statusikonen
    statusIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleItemStatus();
    });

    // Hantera raderingsknapp
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      shoppingItems = shoppingItems.filter((i) => i.id !== item.id);
      itemElement.remove();
      if (shoppingItems.length === 0) {
        emptyShoppingList.style.display = "block";
      }
      updateCounts(); // Uppdatera antalet varor
    });

    // Hantera redigeringsknapp
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      editShoppingItem(item.id);
      console.log("Redigera vara:", item.id);
    });

    return itemElement;
  }

  function editShoppingItem(id) {
    const item = shoppingItems.find((i) => i.id === id);
    if (!item) return;

    const itemElement = document.querySelector(`[data-id="${id}"]`);
    if (itemElement.querySelector("form")) return;

    const textElement = itemElement.querySelector("span");
    const currentText = item.text;

    const form = document.createElement("form");
    form.className = "d-flex align-items-center flex-grow-1";
    form.innerHTML = `
        <input type="text" class="form-control form-control-sm me-2" value="${currentText}">
        <button type="submit" class="btn btn-sm text-success mt-2">
            <i class="fas fa-check"></i>
        </button>
        <button type="button" class="btn btn-sm text-danger cancel-edit mt-2">
            <i class="fas fa-times"></i>
        </button>
    `;

    textElement.style.display = "none";
    textElement.parentNode.insertBefore(form, textElement.nextSibling);

    const input = form.querySelector("input");
    input.focus();
    input.select();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const newText = input.value.trim();
      if (newText) {
        item.text = newText;
        textElement.textContent = newText;
      }
      textElement.style.display = "";
      form.remove();
      updateCounts(); // Uppdatera antalet varor
    });

    form.querySelector(".cancel-edit").addEventListener("click", function (e) {
      e.preventDefault();
      textElement.style.display = "";
      form.remove();
    });
  }

  // Funktion som uppdaterar copyright-year
  function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    copyrightYear.textContent = currentYear;
  }

  // Funktion som aktiverar tooltip för dumpster-fire ikonen
  function activateToolTipDumpsterFireICon() {
    const dumpsterIconFire = clearCompletedBtn.querySelector("i");
    new bootstrap.Tooltip(dumpsterIconFire);
  }

  // Funktion som aktiverar hover-effektet för dumpster-fire ikonen
  function hoverEffectDumspterIconFire() {
    clearCompletedBtn.addEventListener("mouseenter", () => {
      clearCompletedBtn.classList.replace("opacity-75", "opacity-100");
    });
    clearCompletedBtn.addEventListener("mouseleave", () => {
      clearCompletedBtn.classList.replace("opacity-100", "opacity-75");
    });
  }
  // Funktion som uppdaterar antalet varor och avslutade varor
  function updateCounts() {
    const totalCount = shoppingItems.length;
    const completedCount = shoppingItems.filter(
      (item) => item.completed
    ).length;

    document.getElementById("item-count").textContent = `${totalCount} ${
      totalCount < 2 ? "vara" : "varor"
    }`;
    document.getElementById("completed-count").textContent = completedCount;

    // Visa dumpster-fire ikonen om det finns avklarade varor och tillagda varor
    clearCompletedBtn.style.visibility =
      completedCount + totalCount > 0 ? "visible" : "hidden";

    // Lägger till klassen text-success om completedCount är större än 0 på Footer-check-icon
    if (completedCount > 0) {
      footerCheckIcon.classList.add("text-success");
    } else {
      footerCheckIcon.classList.remove("text-success");
    }
  }
});
