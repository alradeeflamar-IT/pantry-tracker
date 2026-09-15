let items = [];

const itemsList = document.getElementById("items-list");
const form = document.getElementById("item-form");
const itemName = document.getElementById("item-name");
const itemCategory = document.getElementById("item-category");
const itemExpiry = document.getElementById("item-expiry");
const expiringSoonEl = document.getElementById("expiring-soon");
const showFormBtn = document.getElementById("show-form-btn");
const cancelBtn = document.getElementById("cancel-btn");

const totalItemsEl = document.getElementById("total-items");
const totalCategoriesEl = document.getElementById("total-categories");

showFormBtn.addEventListener("click", function() {
  form.classList.remove("hidden");
});

cancelBtn.addEventListener("click", function() {
  form.classList.add("hidden");
});

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = itemName.value;
  const category = itemCategory.value;
  const expiry = itemExpiry.value;

  const item = {
    id: Date.now(),
    name: name,
    category: category,
    expiry: expiry
  };

  items.push(item);

  displayItems();
  updateOverview();
  form.reset();
  form.classList.add("hidden");
});

function displayItems() {
  itemsList.innerHTML = "";

  items.forEach(function(item) {
    const itemElement = document.createElement("div");
    itemElement.classList.add("item-card");

    itemElement.innerHTML = `
      <h3>${item.name}</h3> 
      <p class="category">${item.category}</p> 
      <p class="expiry">Expires: ${item.expiry}</p>
      <button onclick="deleteItem(${item.id})" class="delete-btn">Delete</button>
    `;

    itemsList.appendChild(itemElement);
  });
}

function deleteItem(id) {
  items = items.filter(function(item) {
    return item.id !== id;
  });
  displayItems();
  updateOverview();
}

function updateOverview() {
  totalItemsEl.textContent = items.length;

  const categories = items.map(item => item.category.toLowerCase());
  const uniqueCategories = new Set(categories);
  totalCategoriesEl.textContent = uniqueCategories.size;

  // حساب العناصر التي تنتهي خلال 7 أيام من اليوم
  const today = new Date();
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(today.getDate() + 7);

  const expiringCount = items.filter(item => {
    const itemDate = new Date(item.expiry);
    return itemDate >= today && itemDate <= sevenDaysFromNow;
  }).length;

  expiringSoonEl.textContent = expiringCount;
}
