const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.querySelector(".meals");
(resultHeading = document.getElementById("result-heading")),
  (single_mealEl = document.getElementById("single-meal")),
  (flex = document.querySelector("div .flex"));

//! Functions

async function getMealData(mealName) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  const data = await res.json();
  console.log(data);
  resultHeading.innerHTML = `<h2>Search results for '${mealName}':</h2>`;

  if (data.meals === null) {
    resultHeading.innerHTML = `<p>Aradiginiz yemek bulunamadi</p>`;
  } else {
    mealsEl.innerHTML = data.meals
      .map(
        meal => `
    <div class="meal">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="meal-info" data-mealID="${meal.idMeal}">
        <h3>${meal.strMeal}</h3>
      </div>
    </div>
  `
      )
      .join("");
  }

  return data;
}

//? Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  const term = search.value;
  console.log(term);

  if (term.trim()) {
    getMealData(term);
  } else {
    const html = `
    <div class="uyari"> Lutfen aranacak kelime girin! </div>
  `;

    flex.insertAdjacentHTML("afterend", html);

    setTimeout(() => document.querySelector(".uyari").remove(), 2000);
  }

  submit.reset();
}

//! Event Listeners
submit.addEventListener("submit", searchMeal);
