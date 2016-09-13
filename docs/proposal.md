Ski Free

Background
A remake on the infamous 1990s computer game SkiFree. The user uses the arrow keys to lead the skier down the mountain while trying to avoid trees, rocks, and snowboarders. In the original version of the game, the Abominable Snow Monster appears and starts to chase the skier. Once caught, the skier gets eaten and the game is over.

In my version of the game, the skier will have three lives. Each time he hits an obstacles he loses a life. Game ends when the skier loses all three lives.

Functionality & MVP
With this freeSki game, users will be able to:
1.	Pause and reset the game
2.	Change the direction of skiers movement using the arrow keys
3.	Keeps count of number of lives left

In addition, this project will include:
1.	A directions model (shows at start of game and on pause)
2.	A game over model

Wireframes:
This app will consist of a single screen with game board and nav links to pause and restart the game and links to my GitHub and my LinkedIn. Trees and rocks will be scattered on the game bored with the skier located in the middle of the screen.



Architecture and Technologies:

This project will be implemented with the following technologies:
1.	Vanilla JavaScript for the overall structure and game logic
2.	HTML5 Canvas for DOM manipulation and rendering

In addition
1.	Moving_objects.js – holds all code that involves actions of the objects that move (trees, rocks, snowboarders)
2.	Skier.js, tree.js, rock.js and snowboarder.js will hold all additional object specific methods
3.	game.js – game logic


Implementation Timeline
Day 1-2:  set up and initial bored rendering
-	Set up all files needed for game
-	Write basic game logic to be able to render the board to the screen
-	Create the skier, rock and tree and render them to bored
-	Write code that connects key strokes with which direction the skier is going

Day 3:
-	Write game logic to decrease life on collision
-	Write game logic for snowboarders
Day 4:
-	Style the frontend
-	Use canvas to load images to board

Bonus Features:
-	Create abdominal snow monster
