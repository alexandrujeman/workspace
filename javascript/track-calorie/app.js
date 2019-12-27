// Storage controller
const StorageController = (function() {
  return {
    storeItem: item => {
      let items;
      // Check if any item in local storage
      if (localStorage.getItem("items") === null) {
        // If no items in local storage create empty array
        items = [];
        // Push new item
        items.push(item);
        // Set local storage
        localStorage.setItem("items", JSON.stringify(items));
      } else {
        // If there is something, pull array from local storage
        items = JSON.parse(localStorage.getItem("items"));
        // Push new item
        items.push(item);
        // Set local storage with new array
        localStorage.setItem("items", JSON.stringify(items));
      }
    },
    getItemsFromStorage: () => {
      let items;
      if (localStorage.getItem("items") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("items"));
      }
      return items;
    },
    // Update item in local storage splice
    updateItemStorage: updatedItem => {
      let items = JSON.parse(localStorage.getItem("items"));

      items.forEach((item, index) => {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      // Set local storage with new array
      localStorage.setItem("items", JSON.stringify(items));
    },
    // Delete item in local storage splice
    deleteItemFromStorage: id => {
      let items = JSON.parse(localStorage.getItem("items"));

      items.forEach((item, index) => {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });
      // Set local storage with new array
      localStorage.setItem("items", JSON.stringify(items));
    },
    clearItemsFromStorage: () => {
      localStorage.removeItem("items");
    }
  };
})();

// Item controller
const ItemController = (() => {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data state
  const data = {
    // items: [
    //   { id: 0, name: "Steak Dinner", calories: 1200 },
    //   { id: 1, name: "Cookie", calories: 400 },
    //   { id: 2, name: "Eggs", calories: 350 }
    // ],
    items: StorageController.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  };

  // Public methods
  return {
    getItems: () => {
      return data.items;
    },
    addItem: function(name, calories) {
      let ID;
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      // Calories number
      calories = parseInt(calories);
      // Create new item
      newItem = new Item(ID, name, calories);
      // Push new item to data state
      data.items.push(newItem);

      return newItem;
    },
    // Delete item
    deleteItem: id => {
      const ids = data.items.map(function(item) {
        return item.id;
      });
      // Get index
      const index = ids.indexOf(id);
      // Remove item
      data.items.splice(index, 1);
    },
    // Clear all items
    clearAllItems: () => {
      data.items = [];
    },
    // Update item
    updateItem: (name, calories) => {
      calories = parseInt(calories);
      let found = null;
      data.items.forEach(item => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    // Get item by id
    getItemByID: id => {
      let found = null;
      // Loop through items
      data.items.forEach(item => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    setCurrentItem: item => {
      data.currentItem = item;
    },
    getCurrentItem: () => {
      return data.currentItem;
    },
    getTotalCalories: () => {
      // Calculate total calories from all items in data state
      let total = 0;
      data.items.forEach(item => {
        total += item.calories;
      });
      // Set total calories in data state
      return (data.totalCalories = total);
    },
    logData: () => {
      return data;
    }
  };
})();

// UI controller
const UIController = (() => {
  const UISelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearBtn: ".clear-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories"
  };
  // Public methods
  return {
    populateItemList: items => {
      let html = "";

      items.forEach(item => {
        html += `<li class="colletion-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fas fa-pen-square"></i></a>
      </li>`;
      });
      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },
    addListItem: item => {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = "block";
      // Create li element
      const li = document.createElement("li");
      // Add class
      li.className = "collection-item";
      // Add ID
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} calories</em>
      <a href="#" class="secondary-content"><i class="edit-item fas fa-pen-square"></i></a>`;
      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li);
    },
    showTotalCalories: totalCals => {
      document.querySelector(UISelectors.totalCalories).textContent = totalCals;
    },
    // Remove items from UI
    removeItems: () => {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Turn node list into array
      listItems = Array.from(listItems);
      listItems.forEach(item => {
        item.remove();
      });
    },
    // Update UI with new current item
    updateListItem: item => {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Convert node list in to array
      listItems = Array.from(listItems);
      listItems.forEach(listItem => {
        const itemId = listItem.getAttribute("id");
        if (itemId === `item-${item.id}`) {
          document.querySelector(
            `#${itemId}`
          ).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} calories</em>
          <a href="#" class="secondary-content"><i class="edit-item fas fa-pen-square"></i></a>`;
        }
      });
    },
    // Update UI after deleted item
    deleteListItem: id => {
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    },
    // Clear input
    clearInput: () => {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    addItemToForm: () => {
      document.querySelector(UISelectors.itemNameInput).value = ItemController.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemController.getCurrentItem().calories;
      UIController.showEditState();
    },
    hideList() {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    // Clear edit state
    clearEditState: () => {
      UIController.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: () => {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    getSelectors: () => {
      return UISelectors;
    }
  };
})();

// App controller
const App = ((ItemController, StorageController, UIController) => {
  // Load event listeners
  const loadEventListeners = () => {
    // Get UI selectors
    const UISelectors = UIController.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener("click", itemAddSubmit);

    // Disable submit on enter
    document.addEventListener("keypress", e => {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener("click", itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener("click", itemUpdateSubmit);

    // Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener("click", itemDeleteSubmit);

    // Back item event
    document.querySelector(UISelectors.backBtn).addEventListener("click", UIController.clearEditState);

    // Clear item event
    document.querySelector(UISelectors.clearBtn).addEventListener("click", clearAllItemsClick);
  };

  // Add item submit
  const itemAddSubmit = e => {
    // Get form input from UI Controller
    const input = UIController.getItemInput();
    // Check for name and calorie input
    if (input.name !== "" && input.calories !== "") {
      // Add item
      const newItem = ItemController.addItem(input.name, input.calories);
      // Add item to UI list
      UIController.addListItem(newItem);
      // Get total calories
      const totalCalories = ItemController.getTotalCalories();
      // Add total calories to UI
      UIController.showTotalCalories(totalCalories);
      // Store to local storage
      StorageController.storeItem(newItem);
      // Clear inpt fields
      UIController.clearInput();
    }
    e.preventDefault();
  };

  // Update item on click submit
  const itemEditClick = e => {
    // Continue only if icon with class "edit-item" is clicked
    if (e.target.classList.contains("edit-item")) {
      // Get HTML id of parent of parent of icon
      const listId = e.target.parentNode.parentNode.id;
      // Break into an array
      const listIdArr = listId.split("-");
      // Get actual id
      const id = parseInt(listIdArr[1]);
      // Get item
      const itemToEdit = ItemController.getItemByID(id);
      // Set Current item
      ItemController.setCurrentItem(itemToEdit);
      // Add item to form
      UIController.addItemToForm();
    }
    e.preventDefault();
  };

  // Update item submit
  const itemUpdateSubmit = function(e) {
    // Get item input
    const input = UIController.getItemInput();
    // Update item
    const updatedItem = ItemController.updateItem(input.name, input.calories);

    // Update UI
    UIController.updateListItem(updatedItem);

    // Get total calories
    const totalCalories = ItemController.getTotalCalories();
    // Add total calories to UI
    UIController.showTotalCalories(totalCalories);

    // Update local storage
    StorageController.updateItemStorage(updatedItem);

    UIController.clearEditState();

    e.preventDefault();
  };

  // Delete button event
  const itemDeleteSubmit = function(e) {
    // Get current item
    const currentItem = ItemController.getCurrentItem();
    // Delete from data structure
    ItemController.deleteItem(currentItem.id);

    // Delete from UI
    UIController.deleteListItem(currentItem.id);
    // Get total calories
    const totalCalories = ItemController.getTotalCalories();
    // Add total calories to UI
    UIController.showTotalCalories(totalCalories);

    // Delete from local storage
    StorageController.deleteItemFromStorage(currentItem.id);

    UIController.clearEditState();

    e.preventDefault();
  };

  // Clear items event
  const clearAllItemsClick = () => {
    // Delete all items from data structure
    ItemController.clearAllItems();

    // Get total calories
    const totalCalories = ItemController.getTotalCalories();
    // Add total calories to UI
    UIController.showTotalCalories(totalCalories);

    // Remove items from UI
    UIController.removeItems();

    // Clear all items from local stroage
    StorageController.clearItemsFromStorage();
  };

  // Public methods
  return {
    init: () => {
      // Clear initial state
      UIController.clearEditState();
      // Fetch items from data structure
      const items = ItemController.getItems();

      // Check if any items received from data
      if (items.length === 0) {
        UIController.hideList();
      } else {
        // Populate list with items
        UIController.populateItemList(items);
      }

      // Get total calories
      const totalCalories = ItemController.getTotalCalories();
      // Add total calories to UI
      UIController.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemController, StorageController, UIController);

App.init();
