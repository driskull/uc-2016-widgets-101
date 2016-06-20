# Restyling in 4.x

## Description

This sample shows how widgets in 4.x can be restyled by leveraging Sass.

## Requirements

* [Node & NPM](https://nodejs.org/)
* [Gower](http://bower.io/)
* [Grunt](http://gruntjs.com/)

## Usage

* `cd` to the `restyling` directory
* run `npm install`

  this will set up the source and compile the Sass. Any changes to the Sass files will cause the styles to be recompiled. We can preview our changes using `index.html`.

* open `index.html` in your browser to see the compiled CSS in action.
* modify the main color variables from `src/esri/widgets/_ColorVariables.scss` (see below)
* reload `index.html` to watch the updated CSS

## Color suggestions

**Note**: `_ColorVariables.scss` needs to be updated with the following:

**Blue theme**
```
//  Main Colors Vars
$text_color                 : $Calcite_Highlight_Blue_400;
$background_color           : $Calcite_Highlight_Blue_100;
$anchor_color               : $Calcite_Highlight_Blue_350;
$anchor_hover_color         : $Calcite_Highlight_Blue_400;
$button_text_color          : $Calcite_Highlight_Blue_350;
$button_text_hover_color    : $Calcite_Highlight_Blue_400;
```

**Green theme**
```
//  Main Colors Vars
$text_color                 : $Calcite_Highlight_Green_400;
$background_color           : $Calcite_Highlight_Green_100;
$anchor_color               : $Calcite_Highlight_Green_350;
$anchor_hover_color         : $Calcite_Highlight_Green_400;
$button_text_color          : $Calcite_Highlight_Green_350;
$button_text_hover_color    : $Calcite_Highlight_Green_400;
```
## Resources

* Sass - http://sass-lang.com/
* jsapi-resources (Sass setup) - https://github.com/Esri/jsapi-resources/blob/master/4.x/bower/dojo/SASS.md
