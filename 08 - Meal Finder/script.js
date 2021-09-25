const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.querySelector(".meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal"),
  flex = document.querySelector("div .flex");

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

//? Fetch meal by ID

async function getMealById(mealID) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  const data = await res.json();

  console.log(data);

  const meal = data.meals[0];

  addMealToDOM(meal);
}

//? Fetch random meal from API

async function getRandomMeal() {
  clearHtml();
  
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
  const data = await res.json();

  const meal = data.meals[0];

  addMealToDOM(meal);
}

//? Add meal to DOM

function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="single-meal-info">
          ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
          ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
        </div>
        <div class="main">
          <p class="mealbox">${meal.strInstructions}</p>
          <h2>Ingredients</h2>
          <ul>
            ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
          </ul>
        </div>
    </div>
  `;
}

function clearHtml() {
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";
}

//! Event Listeners
submit.addEventListener("submit", searchMeal);

mealsEl.addEventListener("click", e => {
  const mealInfo = e.target.closest(".meal-info");

  if (mealInfo) {
    const mealID = mealInfo.dataset.mealid;
    getMealById(mealID);
  }
});

random.addEventListener("click", getRandomMeal);
