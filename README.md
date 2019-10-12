# 🐍 Snake game built with Vue

📚 Just for learning purposes.

This is my first project wih Vue, so there will be a lot of code
that can be done more efficiently. Please, feel free to create any
pull request you want 🙂

# Installation
1. Make sure you are using a version of Node >8 and it's corresponding version of NPM. v8.16.2 has specifically been tested to work.
    - A recommendation is to use [NVM](https://github.com/nvm-sh/nvm) to manage your Node versions.
    - (Windows users: Use [this](https://github.com/coreybutler/nvm-windows) version of NVM)
    - After installing nvm, run `nvm install 8` to install the latest 8 version, or `nvm install 8.16.2` to install the specific version.
    - Run `nvm use 8` or `nvm use 8.16.2` to ensure your Node version is the correct version.
2. Run `npm install` to install all of the dependencies.
3. Run `npm run serve` to start the server.
4. Go to http://localhost:8080/ to play your local development copy of the game.

# Road Map

- [x] Add tests for the components
- [ ] Finish the test suite for the current code
- [ ] Add score board with local storage
- [ ] Add button for resetting the game
- [X] Add Webpack, postCSS or whatever it's needed to add Tailwind
- [ ] Add TailwindCSS
- [ ] Center the board properly
- [X] Remove vertical scrolling with overflow
- [X] Add retro sounds when moving, eating and game over
- [X] Speed system needs improvements, it gets impossible to play after 25 points
