// Storage controller

// Item controller
const ItemController = (() => {
  // Item Constructor
    const Item = function(id, name, calories) {
      this.id = id;
      this.name = name;
      this.calories = calories;
  }
  
  // Data state
  const data = {
    items: [
      {id: 0, name: 'Steak Dinner', calories: 1200},
      {id: 1, name: 'Cookie', calories: 400},
      {id: 2, name: 'Eggs', calories: 350}
    ],
    currenItem: null,
    totalCalories: 0
  }

  // Public methods
  return {
    getItems: () => {
      return data.items
    },
    addItem: (name, calories) => {
      let ID
      // Create id
      if(data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0
      }
      // Calories number
      calories = parseInt(calories)
      // Create new item
      newItem = new Item(ID, name, calories);
      // Push new item to data state
      data.items.push(newItem)
    },
    logData: () => {
      return data
    }
  }
})()

// UI controller
const UIController = (() => {

  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
  }
  // Public methods
  return {
    populateItemList: (items) => {
      let html = ''

      items.forEach(item => {
        html += `<li class="colletion-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fas fa-pen-square"></i></a>
      </li>`
      })
      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html
    },
    getItemInput: () => {
      return {
        name:  document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    getSelectors: () => {
        return UISelectors
    }
  }
})()

// App controller
const App = ((ItemController, UIController) => {
  // Load event listeners
  const loadEventListeners = () => {
    // Get UI selectors
    const UISelectors = UIController.getSelectors()

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)
  }

  // Add item submit
  const itemAddSubmit = (e) => {
    // Get form input from UI Controller
    const input = UIController.getItemInput()
    // Check for name and calorie input
    if(input.name !== '' && input.calories !== ''){
      // Add item
      const newItem = ItemController.addItem(input.name, input.calories);
    }
    e.preventDefault()
  }

  // Public methods
  return {
    init: () => {
      // Fetch items from data structure
      const items = ItemController.getItems()

        // Populate list with items
        UIController.populateItemList(items);
        // Load event listeners
        loadEventListeners()
      }
  }

})(ItemController, UIController)

App.init()