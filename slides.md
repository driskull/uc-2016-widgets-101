<!-- .slide: data-background="./reveal.js/img/title.png" -->

<!-- Presenter: Matt -->
# Widgets 101: Customizing and Creating Widgets with the ArcGIS API for JavaScript

### JC Franco – [@arfncode](https://twitter.com/arfncode)
### Matt Driscoll – [@driskull](https://twitter.com/driskull)

---

# Welcome

![ohai](./images/ohai.gif)

---

# Agenda

**Short URL: [bit.ly/widgets101](http://bit.ly/widgets101)**

- About widgets
- Widget components
- Building a widget
  - 3.x
  - 4.x
- Tips & best practices
- Resources
- Q & A

---

# Widgets

- What?
  - Encapsulated
  - Cohesive
  - Single-purpose pieces of functionality 
  - User interface
- Why?
  - Reusable
  - Interchangeable
  - Modular
- How?
 - Different frameworks are available
 - Focusing on Dijit

---

# Dojo toolkit

- Foundation of ArcGIS JavaScript API
- AMD support
- Class-based inheritance
- Internationalization

![Dojo Toolkit!](images/dojo-toolkit.png)

---

# Dojo Dijit

- Dojo’s UI Library
- Separate namespace (dijit)
- Requires Dojo Core and Dojo Base
- Themes

![Dojo Toolkit!](images/dojo-toolkit.png)

---

# Asynchronous Module Definition (AMD)

- Asynchronous loading
- Web-based solution
- Lazy loading
- Fewer globals
- Dependency handling

---

# AMD example

- `define`
  ```js
  // moduleA.js
  define(["moduleB"], function (moduleB) {
    // module API
    return {
      _data: 100,
      calculate: function () {
        moduleB.calculate(this._data);
      }
    };
  });
  ```
- `require`
  ```js
  // main.js
  require(["moduleA"], function (moduleA) {
    moduleA.calculate();
  });
  ```

---

<!-- Presenter: JC -->
# Building blocks

![blocks](./images/blocks.gif)

---

# `dijit/_WidgetBase`

what you get

- Lifecycle
  - `constructor`
  - `postMixInProperties`
  - `buildRendering`
  - `postCreate`
  - `startup`
  - `destroy`
- Events
- Getters/Setters
- Property watching

---

# Simple widget example

```js
/* ./MyWidget.js */
define([
  "dijit/_WidgetBase",
  // ...
], 
function(
  _WidgetBase,
  // ...
) {

  return  _WidgetBase.createSubclass({

    // widget magic here! °˖✧◝(⁰▿⁰)◜✧˖°

  });

});
```

[Simple widget](./demo/preamble/dijit-lifecycle.html)

---

# Code organization

Keep code modular and organized

---

# Code organization: HTML

- Extract HTML to separate file
- Mix in `dijit/_TemplatedMixin`
  - Renders HTML based on a template string
  - Create DOM node attachments

---

# Code organization: CSS

- Extract widget-specific styles to separate stylesheet
- @import widget stylesheet wherever applicable

---

# Example: before

```js
/* ./MyWidget.js */
define([
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dojo/text!./templates/MyWidget.html"
],
function (
  _WidgetBase, _TemplatedMixin,
  template
) {

  return _WidgetBase.createSubclass([_TemplatedMixin], {

    templateString: "<div style='background-color: chartreuse;'>" +
                      "<label style='font-weight: bolder;'>:)</label>" +
                    "</div>";
  });

});
```

---

# Example: after

```html
<!-- ./templates/MyWidget.html -->
<div class="my-widget">
  <label class="my-widget__text">°˖✧◝(⁰▿⁰)◜✧˖°</label>
</div>
```

```css
/* ./css/MyWidget.css */
.my-widget {
  background-color: chartreuse
}
.my-widget__text {
  font-size: 1.5em;
}
```

```js
/* ./MyWidget.js */
define([
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dojo/text!./templates/MyWidget.html"
],
function (
  _WidgetBase, _TemplatedMixin,
  template
) {
  return _WidgetBase.createSubclass([_TemplatedMixin], {
    templateString: template
  });
});
```

---

# CSS

Use classes

```html
<style>
  .my-widget {
    background-color: chartreuse;
  }
</style>

<div class="my-widget">...</div>
```

and avoid inline styles

```html
<div style="background-color: chartreuse">...</div>
```

---

# Accessibility (a11y)

- Enable your application to be used by everyone
- Use semantic markup
- ARIA roles
- Consider other input devices besides the mouse
  - Keyboard
  - Touch
  - Screen reader

---

# Internationalization (i18n)

- Keep text separate from application logic
- Support multiple languages
- Helps ease translation

```javascript
define({
  root: ({
    "button": "Home",
    "title": "Default extent"
  }),
  "ar": 1,
  ...
  "zh-cn": 1
});
```

---

# DOM manipulation

Here to help...

- `dojo/dom`
- `dojo/dom-attr`
- `dojo/dom-class`
- `dojo/dom-construct`
- `dojo/dom-style` (used sparingly)

---

<!-- Presenter: Matt -->

# WikiWidget (requirements)

* Use Wikipedia API to geosearch for entries
* Display results in a list
* List items should center on the map and display a popup
* The popup should have a link for more info (wiki page) 

---

# Demo WikiWidget

[Finished 3x widget](http://driskull.github.io/uc-2016-widgets-101/finished/3x/)

---

# Building WikiWidget

![programming!](./images/programming.gif)

---

# Building WikiWidget the 3x way

[Steps](https://github.com/driskull/uc-2016-widgets-101/blob/gh-pages/steps/3x.md)

---

# That's all for 3.x

![Done with 3.x!](./images/done-with-3.x.gif)

---

<!-- Presenter: JC -->
# 4.x Widgets

- Widget Pattern
  - View – the face
  - ViewModel – the brain

---

# View

- Uses ViewModel APIs to render the UI
- View-specific logic resides here 

---

# ViewModel

- Core logic of widget resides here
- Provides necessary APIs for the view to do it's thing
- No DOM/UI concerns (think data)

---

# Benefits

- Reusable
- Testable core widget
  - logic without UI concerns
- Separates concerns
- Framework compatibility

---

# Building WikiWidget the 4x way

[Steps](https://github.com/driskull/uc-2016-widgets-101/blob/gh-pages/steps/4x.md)

---

# ViewModel + framework integration

- [Angular 2](https://github.com/odoe/esrijs4-vm-angular2) – [demo](http://odoe.github.io/esrijs4-vm-angular2/)
- [React](https://github.com/odoe/esrijs4-vm-react) – [demo](http://odoe.github.io/esrijs4-vm-react/)
- [Elm](https://github.com/odoe/esrijs4-vm-elm) – [demo](http://odoe.github.io/esrijs4-vm-elm/dist/)
- [Ember](https://github.com/odoe/esrijs4-vm-ember)

---

# ViewModel doc

*



---

# Tips & best practices

![tricks](./images/best-practices.gif)

---

# Use a styleguide
  - helps keep your code organized
  - defines rules for consistent code
    - naming conventions
    - whitespace
    - common patterns
    - etc...

---

# Use the source, Luke.

Use GitHub to browse code and learn more about existing projects.

- [dojo](https://github.com/dojo/dojo)
- [dijit](https://github.com/dojo/dijit)
- [dojox](https://github.com/dojo/dojox)
- etc...

---

# Linting

Highlight issues in your code based on predefined rules.

- [JSLint](http://jslint.com/)
- [JSHint](http://jshint.com/)
- [ESLint](http://eslint.org/)

---

# Formatting

Format your code based on predefined rules.

  - [ESLint](http://eslint.org/)
  - [JS Beautifier](http://jsbeautifier.org/)

---

# Task runners

Automate all the things.

- [Grunt](http://gruntjs.com/)
- [Gulp](http://gulpjs.com/)

---

# Testing

<!-- how do you catch bugs if you have no tests? -->
<!-- takes time, but it's an investment -->
Automated testing helps you catch regressions as you move forward.

- [Intern](theintern.github.io)
- [Jasmine](http://jasmine.github.io/)
- [QUnit](https://qunitjs.com/)
- [Karma](https://karma-runner.github.io/0.13/index.html)

---

# Preprocessors

- Benefits
  - Variables
  - Mixins
  - @import & @extend
- Allow us to
  - Restyle
  - Theme
  - Write less code
- Flavors
  - [Sass](http://sass-lang.com)
  - [Stylus](http://stylus-lang.com/)
  - [Less](http://lesscss.org/)
- Demo

---

# Mind specificity

```html
<style>
  #red { background-color: red; }  /* ID */

  .blue { background-color: blue; }  /* class */
  .green { background-color: green; }  /* class */

  .blue.green { background-color: yellow; }  /* 2 classes */
</style>

<div id="red"
    class="square green blue"
    style="background-color: orange"></div>
```

* [Result](http://jsbin.com/kuqunasula/edit?html,output)
* [Specificity calculator](http://specificity.keegan.st/)

---

# CSS methodologies

- Establish guidelines/rules for maintainable CSS
  - CSS & HTML best practices
  - Naming conventions
  - Ordering/grouping of CSS rules
- No silver bullet - choose what's best for your project/team
- Flavors
  - [Block-Element-Modifier (BEM)](http://getbem.com/)
  - [Scalable and Modular Architecture for CSS (SMACSS)](https://smacss.com/)
  - [Object Oriented CSS (OOCSS)](https://github.com/stubbornella/oocss/wiki)
  - [SUIT CSS](http://suitcss.github.io/)
  - [Atomic OOBEMITSCSS](http://www.sitepoint.com/atomic-oobemitscss/)

---

### Example: Block Element Modifier (BEM)

- Uses delimiters to separate block, element, modifiers
- Provides semantics (albeit verbose)
- Keeps specificity low
- Scopes styles to blocks

```css
/* block */
.example-widget {}

/* block__element */
.example-widget__input {}
.example-widget__submit {}

/* block--modifier */
.example-widget--loading {}

/* block__element--modifier */
.example-widget__submit--disabled {}
```

---

# Calcite dijit theme (3.x)

[![calcite-theme](./images/calcite-theme.png)](./extras/3x/calcite/)

---

# Using calcite

```html
<link rel="stylesheet" href="<jsapi>/esri/themes/calcite/dijit/calcite.css">
<link rel="stylesheet" href="<jsapi>/esri/themes/calcite/esri/esri.css">
...
<body class="calcite">
```

---

# Calcite supported widgets

|||||
|:-:|-|-|:-:|
| BasemapGallery ||| LocateButton |
| BasemapToggle ||| Measurement |
| Bookmarks ||| OverviewMap |
| Directions ||| Popup |
| HomeButton ||| Print |
| LayerSwipe ||| ScaleBar |
| Legend ||| Search |

---

<!-- Presenter: Matt -->
## Suggested sessions

- Wednesday

  - [Operations Dashboard: Extending with Custom Widgets](https://uc.schedule.esri.com/#schedule/56fb2e824be5ddcd24000aa8/56fb2e834be5ddcd24000aa9)

- Thursday

  - [Web AppBuilder for ArcGIS: Customizing and Extending](https://uc.schedule.esri.com/#schedule/56fb32e24be5ddcd24001064/56fb32e34be5ddcd24001065)
  - [Web AppBuilder for ArcGIS: Build your First Widget in 15 mins](https://uc.schedule.esri.com/#schedule/56fb2d884be5ddcd240007f1/56fb2d894be5ddcd240007f4)
  - [Extending the Operations Dashboard for ArcGIS](https://uc.schedule.esri.com/#schedule/56fb2ffe4be5ddcd24000d04/56fb2ffe4be5ddcd24000d05)

  - [ArcGIS API 4.0 for JavaScript: Patterns and Best Practices
](https://uc.schedule.esri.com/#schedule/56fb32d74be5ddcd24001058/56fb32d84be5ddcd24001059)

---

## Additional resources

- [ArcGIS API for JavaScript 4.0 SDK](https://developers.arcgis.com/javascript/)
- [Styling (4.0)](https://developers.arcgis.com/javascript/latest/guide/styling/index.html)

---

# Please take our survey

## Your feedback allows us to help maintain high standards and to help presenters

![Rate us](./images/rate-us.png)

---

# Get The Code

## [bit.ly/widgets101](http://bit.ly/widgets101)

---

# Q & A

Questions?

---

![Thanks](./images/thanks.gif)

---

# Bonus: Haiku

<!-- work in progress -->

```text
user conference—
attended widget session
satisfaction now
```

---

<!-- .slide: data-background="./reveal.js/img/end.png" -->
