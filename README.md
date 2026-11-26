Dynamic Image Slider Pro
An interactive, responsive image-card slider built with HTML5, CSS3,
and vanilla JavaScript. The interface combines a 3D glassmorphism
design with Swiper 11 to provide animated card navigation, search and
category filtering, favorites, card management, and customizable themes.
Project Overview
The application presents a collection of technology-focused cards in an
interactive slider. Users can browse cards, search by title or
description, filter by category, save favorites, inspect card details,
and create or edit their own cards.
The main interface is titled Dynamic Image Slider Pro --- Advanced 3D
Experience and uses an iOS-inspired glass visual style.
Features
Interactive slider
Swiper 11-powered card carousel.
Multiple transition effects, including 3D Coverflow, Creative 3D,
Depth Perspective, Zoom & Tilt, Card Stack, Flip, Cube, Fade, and
Smooth Slide.
Previous/next navigation, pagination, and clickable slide
thumbnails.
Autoplay with play/pause, restart, and selectable speed.
Autoplay progress bar and current-slide counter.
Fullscreen mode and keyboard navigation.
Optional pointer-based 3D card tilt and visual-effects toggle.
Browse and discover cards
Search cards by title, description, category, or tags.
Filter cards by category.
Show favorites only or clear filters.
Featured cards and recently viewed cards.
Card detail view with image, description, category, and tags.
Image lightbox for an enlarged view.
Personalization and card management
Favorite and unfavorite cards.
Add new cards and edit or delete existing cards.
Share a card using the available share action.
Four visual themes: Midnight Glass, Purple Galaxy, Ocean Blue, and
Minimal Light.
Settings panel for slider and appearance preferences.
Browser local storage is used to retain supported user data and
preferences between visits.
Responsive interface and accessibility
Responsive layout for desktop, tablet, and mobile screens.
Mobile navigation menu.
Semantic page sections, accessible labels, and visible keyboard
focus styles.
Reduced-effects option in the slider controls.
Technology Stack
---
Technology                          Purpose
---
HTML5                               Page structure, controls, dialogs,
and content regions
CSS3                                Responsive layout, glassmorphism
styling, themes, and animations
Vanilla JavaScript                  Card data, filtering, storage,
favorites, modals, and application
behavior
Swiper 11  Slider engine, navigation,
autoplay, and transition effects
Google Fonts --- Poppins            Typography
Unsplash image URLs                 Images used by the card dataset
Swiper 11 is loaded from jsDelivr, and Poppins is loaded from Google
Fonts. An internet connection is therefore needed for those externally
hosted resources and remote card images.
Repository Structure
The repository's main application files are organized as follows:
``` text
Create-Dynamic-Image-Slider/
├── .idea/
├── .vscode/
├── card-slider/
├── css/
│   ├── glassmorphism.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── storage.js
│   ├── card-data.js
│   ├── themes.js
│   ├── favorites.js
│   ├── modal.js
│   ├── card-manager.js
│   └── slider-controls.js
├── index.html
├── style.css
├── script.js
└── README.md
```
`index.html` loads the CSS files, Swiper 11, and the JavaScript modules
in dependency order. `script.js` initializes the theme manager, slider
controls, modal manager, card manager, and navigation.
> The `card-slider/`, `.idea/`, and `.vscode/` directories are present
> in the repository. The application entry point and its referenced
> runtime assets are the root `index.html`, `style.css`, `css/`, `js/`,
> and `script.js` files.
Run Locally
This is a static front-end project; no backend server, database, package
installation, or build step is required.
Option 1: Open the HTML file
Download or open the repository on your computer.
Open the project folder.
Open `index.html` in a modern web browser.
Option 2: Use Visual Studio Code Live Server
Open the project folder in Visual Studio Code.
Install the Live Server extension if it is not already
installed.
Right-click `index.html`.
Select Open with Live Server.
Using a local development server is recommended while editing the
project.
How to Use
Open the application in your browser.
Browse the cards using the slider arrows, pagination, or thumbnails.
Use the search field or category buttons to find specific cards.
Select Favorites Only to display saved favorites.
Select View Details on a card to open its detail view.
Use Add Card to create a card; use the edit and delete actions
to manage cards.
Change the visual theme from the Theme selector.
Use the slider controls to change the transition effect, autoplay
speed, fullscreen mode, and visual effects.
Keyboard Shortcuts
The interface displays these shortcuts in its footer:
Key           Action
---
Left Arrow    Navigate to the previous slide
Right Arrow   Navigate to the next slide
Space         Play or pause autoplay
Escape        Close an open dialog or overlay
Data and Browser Storage
The application uses browser local storage for supported card data,
favorites, recently viewed items, and settings. This means saved changes
are associated with the browser and device where they were made; they
are not automatically synchronized between different browsers or users.
Clearing the browser's site data may remove locally saved application
data. The initial card dataset is provided by the project's JavaScript
data module.
Deployment
Because the project is static, it can be hosted on any static web
hosting service.
GitHub Pages
Open the repository on GitHub.
Go to Settings → Pages.
Under Build and deployment, choose Deploy from a branch.
Select the `main` branch and the `/ (root)` folder.
Save the settings and wait for GitHub Pages to publish the site.
The published page uses `index.html` as its entry point. Keep the
referenced `css/` and `js/` folders in the same relative locations when
updating or deploying the project.
Customization
Card content and categories: Update the card dataset in
`js/card-data.js`.
Card behavior and filtering: Review `js/card-manager.js`.
Slider effects and autoplay: Review `js/slider-controls.js`.
Theme behavior: Review `js/themes.js` and the styles in
`css/glassmorphism.css` and `style.css`.
Animations and responsive rules: Review `css/animations.css` and
`css/responsive.css`.
Page structure and controls: Update `index.html`.
When changing file names or folder locations, also update the
corresponding stylesheet and script references in `index.html`.
Notes
Card images are loaded from remote Unsplash URLs in the dataset. A
built-in SVG fallback is used when a card image cannot be loaded.
Swiper 11 and Poppins are loaded from external CDNs/services.
This repository contains a client-side demonstration; it does not
include a server-side API or account-based cloud synchronization.
License
No license information is specified here. Add a `LICENSE` file if you
intend to publish the project with explicit reuse permissions.
