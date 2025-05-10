document.addEventListener("DOMContentLoaded", () => {
  //Variabler för de element som används i koden
  const shoppingForm = document.getElementById("shopping-form");
  const shopping = document.getElementById("shopping-input");
  const shoppingList = document.getElementById("shopping-list");
  const emptyShoppingList = document.getElementById("empty-shoppinglist");
  const copyrightYear = document.getElementById("copyright-year");
  const footerCheckIcon = document.getElementById("footer-check-icon");
  const clearCompletedBtn = document.getElementById("clear-completed");

  let shoppingItems = [];
  let nextShoppingLisId = 1;

  // Aktivera tooltip för dumpster-fire ikonen
  activateToolTipDumpsterFireICon();

  // Hover-effekt för dumpster-fire ikonen
  hoverEffectDumspterIconFire();

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
});
