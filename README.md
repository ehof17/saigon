### This is going to be a re do of a vietnamese restaraunt I like

#### Things I want to add to front end
- Revamp order system and reorganize
- Search for items
- Rank things on spice?
- Maybe have a flame icon for spicy, tree for vegan, and dumbbell for low calorie?
- Being able to build a plate instead of ordering rice and food
- rewards system
- admin pages (stats, item availability, )

#### Things I want to add to back end
- Want the admin to be able to put when items are curently unavailable
- So in db can categorize different items
- So if there are any current orders with items the admin puts as unavailable they can contact them
- A way for an admin to look at analytics
- Admin can change prices
- Admin can choose monthly specials


#### Initial ideas for implementation
- Table BaseItems
 > chicken, white rice, fried rice, garlic noodle

- Table Entrees
> plate, pho, bun bo, salad, sandwich

- entrees have a price should the baseitem itself have a price

- entree and base item could have price so if someone orders double chicken 
- could have a base price and an extra price

- baseitems have an 'availability' column and it determines the availability of the dish that it is in

- admins can add menu items using base items or add a meat to be used in the entrees


https://softwareengineering.stackexchange.com/questions/453121/designing-a-flexible-and-comprehensive-restaurant-menu-database-schema

## 🧩 Item Variation Groups Table

These define the groups of variations that can be applied to menu items (e.g., noodle types, soup sizes, addons).

| ID (PK) | Account ID | Name                 | Description                  | Min Selection | Max Selection |
|---------|------------|----------------------|------------------------------|----------------|----------------|
| 1       | 1          | Soup Noodle Options  | Options for your noodles     | 0              | 1              |
| 2       | 1          | Soup Addons          | Popular addons for our soups | 0              | 2              |
| 3       | 1          | Soup Sizes           | Sizes for our soups          | 1              | 1              |

---

## 🧂 Variation Group Items Table

These are the specific variation options within each group.

| ID (PK) | Variation Group | Name                     | Description      | Price Adjustment |
|---------|------------------|--------------------------|------------------|------------------|
| 1       | 1                | No noodles               |                  | -1.00            |
| 2       | 1                | Sub gluten free noodles  |                  | 3.00             |
| 3       | 2                | Wonton                   | Spicy wonton     | 3.00             |
| 4       | 2                | Meatballs                | Spicy meatball   | 4.00             |
| 5       | 3                | Standard                 | 10 oz            | 0.00             |
| 6       | 3                | Large                    | 12 oz            | 3.00             |
| 7       | 3                | X-Large                  | 15 oz            | 5.00             |

---

## 🍜 Menu Item Variation Groups Table

This table connects variation groups to specific menu items — enabling reusability across items (e.g., all soups can share the same size group).

| ID (PK) | Menu Item ID | Variation Group ID |
|---------|---------------|--------------------|
| 1       | 1             | 1                  |
| 2       | 1             | 2                  |
| 3       | 1             | 3                  |
"""