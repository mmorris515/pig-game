# Two-dice Pig web application

Check out the [Demo](https://stupefied-colden-eca4ca.netlify.app/ 'Demo Link') on Netlify.

## Overview

This project is a simple web application featuring the classic dice game, [Pig](<https://en.wikipedia.org/wiki/Pig_(dice_game)> 'Pig'), specifically the version known as 'Two-dice Pig.' I used a template from a vanilla javascript tutorial by [Jonas Schmedtmann](https://codingheroes.io/ 'coding heroes') as part of his Udemy course [The Complete JavaScript Course 2020: From Zero to Expert!](https://www.udemy.com/course/the-complete-javascript-course/ 'The Complete Javascript Course') I absolutely recommend his course for anyone seeking to learn Javascript for the first time or use to brush up their skills.

The idea for this project was to practice building an app in React, migrating from Vanilla JS, and fine-tuning UI features. I added some UI features like status message updates, a 'wrong move' icon, and some enable-disable functionality on the buttons and input form to improve feedback and overall UX.

Some of the code patterns I used are dated as it was my first React app &ndash; I used class components which I learned have fallen out of style to functional components. I also used setState for state management, where I likely would have saved some lines of code with Redux or another state system.

## Skills used

- HTML
- CSS
- Git
- Javascript
- React
- State management
- UI/UX
- Code migration
- Testing & Debugging

## Challenges

As this was my first in depth React project, I faced a few challenges along the way, such as:

- **State management**: controlling state centrally in the App component and lifting state up from child components
- **Form input**: incorporating form input into the app functionality and controlling centrally from the App component, including UI functionality like freezing and un-freezing the form based on the app state.
- **Props**: passing props from parent to child and implementing code in appropriate places within the app.
- **App design**: controlling UI/UX in the visual layer of the App and managing data flow to ensure logical consistency in the game fuctionality.
- **Naming conventions**: managing variable, function, and object names, between multiple layers of the app.
- **Netlify deploy**: fixing icons and font styles which broke when deployed to Netlify.

## Takeaway

Overall it was a lot of fun to put my web development, UI/UX, Javascript, and React skills into practice! I'm sure there are plenty of improvements I could make, and newer features of React I could have used (like Hooks and Redux) &mdash; and I may still look to implement those in this project at some point &mdash; but it was a valuable experience to start with the base functionality of React.
