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