[README-Modern-Style.md](https://github.com/user-attachments/files/35473223/README-Modern-Style.md)
::: {align="center"}
# ✦ Dynamic Image Slider Pro

### A 3D glass-inspired card browsing experience built for the modern web.

**Explore · Filter · Customize · Interact**

[![HTML5](https://img.shields.io/badge/HTML5-Structure-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Design-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-Interactions-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111111)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Swiper](https://img.shields.io/badge/Swiper-11-6332F6?style=for-the-badge)](https://swiperjs.com/)

[View
Repository](https://github.com/PARAMKUSAMGOPISAISHANKAR/Create-Dynamic-Image-Slider)
· [Report an
Issue](https://github.com/PARAMKUSAMGOPISAISHANKAR/Create-Dynamic-Image-Slider/issues)
:::

------------------------------------------------------------------------

## ◈ The Experience

**Dynamic Image Slider Pro** is a browser-based interactive card slider.
It combines a glassmorphism-inspired interface with Swiper 11
transitions and JavaScript-powered card interactions.

The project is designed to make browsing visual content more engaging:
move through animated slides, discover cards with search and filters,
personalize the appearance, and manage card content from the interface.

## ✨ Highlights

  -----------------------------------------------------------------------
  Experience                          What you can do
  ----------------------------------- -----------------------------------
  **3D Slider Effects**               Switch between Coverflow, Creative,
                                      Depth, Zoom & Tilt, Card Stack,
                                      Flip, Cube, Fade, and Slide
                                      transitions.

  **Slider Controls**                 Navigate slides, use autoplay,
                                      restart the slider, change speed,
                                      and enter fullscreen.

  **Discover Cards**                  Search by title, description,
                                      category, or tag; filter by
                                      category or favorites.

  **Card Actions**                    Open card details, preview images,
                                      add cards, edit cards, and delete
                                      cards.

  **Personalization**                 Choose Midnight Glass, Purple
                                      Galaxy, Ocean Blue, or Minimal
                                      Light themes.

  **Quick Access**                    Browse featured cards and recently
                                      viewed cards.

  **Visual Preferences**              Toggle 3D tilt and visual effects;
                                      configure autoplay and
                                      pause-on-hover behavior.
  -----------------------------------------------------------------------

## 🧭 Interface at a Glance

-   **Hero area** --- introductory heading and live
    card/favorites/visible counters.
-   **Search and filters** --- search field, favorites filter, category
    filters, theme selector, and Add Card action.
-   **Slider workspace** --- transition selector, speed selector,
    autoplay controls, fullscreen, slide counter, progress bar,
    navigation, pagination, and thumbnails.
-   **Highlights** --- Featured Cards and Recently Viewed sections.
-   **Dialogs** --- card details, add/edit form, settings, delete
    confirmation, and image lightbox.

## 🧰 Built With

  -----------------------------------------------------------------------
  Tool                                Role in this project
  ----------------------------------- -----------------------------------
  **HTML5**                           Page structure, forms, dialogs, and
                                      accessible controls

  **CSS3**                            Glassmorphism styling, themes,
                                      responsive layout, and animations

  **Vanilla JavaScript**              Card interactions, filtering,
                                      favorites, settings, and
                                      application initialization

  **Swiper 11**                       Slider engine, navigation,
                                      autoplay, and transition effects

  **Google Fonts**                    Poppins typography

  **jsDelivr CDN**                    Loads the Swiper 11 stylesheet and
                                      JavaScript bundle
  -----------------------------------------------------------------------

> Swiper 11 and Google Fonts are loaded from external services. An
> internet connection is required for these external resources.

## 🗂️ Project Structure

``` text
Create-Dynamic-Image-Slider/
│
├── card-slider/
│
├── css/
│   ├── glassmorphism.css
│   ├── animations.css
│   └── responsive.css
│
├── js/
│   ├── storage.js
│   ├── card-data.js
│   ├── themes.js
│   ├── favorites.js
│   ├── modal.js
│   ├── card-manager.js
│   └── slider-controls.js
│
├── .idea/
├── .vscode/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### How the application is assembled

The root `index.html` loads the Swiper 11 library, the CSS files, and
the JavaScript modules. The application modules are included in this
order:

1.  `storage.js`
2.  `card-data.js`
3.  `themes.js`
4.  `favorites.js`
5.  `modal.js`
6.  `card-manager.js`
7.  `slider-controls.js`
8.  `script.js`

Keep these files and their relative paths intact when running or
deploying the project.

## 🚀 Run It Locally

No package manager, build command, or backend setup is required for this
static front-end project.

### Option A --- Open in a browser

1.  Download the repository or open your local project folder.
2.  Locate `index.html`.
3.  Open it in a modern browser.

### Option B --- Visual Studio Code + Live Server

1.  Open the project folder in Visual Studio Code.
2.  Install the **Live Server** extension if needed.
3.  Right-click `index.html`.
4.  Choose **Open with Live Server**.

## 🎮 Explore the Controls

  Control           Purpose
  ----------------- --------------------------------------------
  Previous / Next   Move between slides
  Play / Pause      Control automatic slide movement
  Restart           Return the slider to its starting position
  Fullscreen        Expand the slider experience
  Effect            Select a 3D or 2D transition
  Speed             Choose Slow, Normal, or Fast autoplay
  3D Tilt           Toggle pointer-based card tilt
  Effects           Toggle glass and motion effects
  Theme             Switch the interface appearance
  Favorites Only    Show favorited cards
  Add Card          Open the card creation form
  Settings          Open slider and appearance preferences

### Keyboard shortcuts

  Key       Action
  --------- ---------------------------------
  `←`       Previous slide
  `→`       Next slide
  `Space`   Play / Pause autoplay
  `Esc`     Close an open dialog or overlay

## 💾 Browser Data

The project includes a storage module and uses browser-side storage for
supported application data and preferences. Data saved in one browser is
not automatically synchronized with another browser or device.

If you clear the browser's site data, locally stored application
information may be removed.

## 🌐 Deploy with GitHub Pages

This project is a static website and can be published with GitHub Pages.

1.  Open the repository on GitHub.
2.  Select **Settings**.
3.  Open **Pages** from the sidebar.
4.  Under **Build and deployment**, choose **Deploy from a branch**.
5.  Select the `main` branch and `/ (root)` folder.
6.  Save and wait for the deployment to finish.

Make sure `index.html`, `style.css`, `script.js`, `css/`, and `js/`
remain in their expected locations. The app's external CDN resources
must remain accessible to the browser.

## 🛠️ Customize the Project

  Want to change...                     Start here
  ------------------------------------- -------------------------
  Page content and interface elements   `index.html`
  Main styling                          `style.css`
  Glassmorphism styling                 `css/glassmorphism.css`
  Motion and animation styling          `css/animations.css`
  Responsive behavior                   `css/responsive.css`
  Card dataset                          `js/card-data.js`
  Browser storage behavior              `js/storage.js`
  Theme behavior                        `js/themes.js`
  Favorites behavior                    `js/favorites.js`
  Dialog and modal behavior             `js/modal.js`
  Card creation and management          `js/card-manager.js`
  Slider configuration and controls     `js/slider-controls.js`
  Application startup                   `script.js`

After moving or renaming any referenced file, update its path in
`index.html` as well.

## 📌 Project Notes

-   The card form accepts an image URL, title, category, description,
    and optional comma-separated tags.
-   The interface includes an image fallback for card images that fail
    to load.
-   Some visual assets are loaded from external image URLs.
-   This is a front-end project; this repository documentation does not
    describe a server-side API or cloud account system.

## 🤝 Contributing

Suggestions and improvements are welcome.

1.  Fork the repository.
2.  Create a branch for your change.
3.  Make and test your updates.
4.  Submit a pull request describing what changed.

For bugs or feature suggestions, [open an
issue](https://github.com/PARAMKUSAMGOPISAISHANKAR/Create-Dynamic-Image-Slider/issues).

## 📄 License

No license file is currently specified in the repository. Add a
`LICENSE` file if you want to define permissions for reuse and
distribution.

------------------------------------------------------------------------

::: {align="center"}
**Made with HTML · CSS · JavaScript · Swiper 11**

[⬆ Back to top](#-dynamic-image-slider-pro)
:::
