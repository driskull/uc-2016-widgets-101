# Specificity

System that assigns scores to CSS style rules.

Rules with the highest specificity get applied.

# Example: what color will get applied?

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

[Result](http://jsbin.com/kuqunasula/edit?html,output)

# Resources

* [CSS Specificity Wars](https://stuffandnonsense.co.uk/archives/css_specificity_wars.html)
* [Specificity calculator](http://specificity.keegan.st/)
