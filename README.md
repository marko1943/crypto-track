# Crypto Track App

___
#### Built with React js

##### Relevant folders:
 - **config** - Contains webpack config for building the app. Currently used file is `webpack.config.dev.js` since we're on development.
  - **src** - Contains all the code inside of folders:
    - **components** - Components used inside of pages/containers. Since this is a small project it's enough to have single folder for this.
    - **constants** - Contains `API_URL` constant that is used to for services.
    - **pages** - This are the main pages/containers. Contains *HomePage* and *DetailsPage*
    - **services** - contains code that calls web services to grab data from API
 
### How to run:
- clone the repo, `git clone https://github.com/marko1943/crypto-track`
- cd into crypto-track folder, `cd crypto-track`
- run `npm install`
- run `npm start` (or `yarn start`)

##### Tested and built with node.js version 8.11.3
___
##### Note:
To properly run the app on localhost you will need to enable CORS.