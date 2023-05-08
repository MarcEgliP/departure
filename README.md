# Frontend ÜK 294

## Setup
After you cloned the project you have to navigate inside the project folder and run 

### `npm i`
To start the project you have to navigate to the project  directory and run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


### `npm test`
Runs all available tests in the Project.

### `npm run lint`
Lints the entire project by using the eslint linter.
The rules which get applied are the default ones for react.

## Folder-structure
Our file tree is made by a specific pattern. 
Every component that is visually a subcomponent of another component is placed in folder of it's parent.
For every component we have at least a jsx file. But if it's required a component can have a service file as well as a css file. 