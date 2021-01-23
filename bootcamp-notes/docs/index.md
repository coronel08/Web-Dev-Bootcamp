# Welcome to MkDocs
For full documentation visit [mkdocs.org](https://www.mkdocs.org).


## Commands
* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.


## Table of Contents
* [HTML](#html)
    * [Semantic Elements](#semantic-elements)
    * [Button](#button)
* [CSS](#css)
    * [Styling](#styling)
        * [Measurements](#measurements)
    * [Selectors](#selectors)
    * [Pseudo Classes](#pseudo-classes)
    * [Pseudo Elements](#pseudo-elements)
    * [Position](#position)
    * [Transition](#transition)
    * [Transform](#transform)

## HTML
Can use [Emmet shortcuts](https://docs.emmet.io/cheat-sheet/) for html


### Semantic Elements
Use more specified elements rather than Divs, not included the ** tables element **

[MDN Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms)<br> also has table elements here
[Input types MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) such as radio, checkbox, date, email etc. As well as attributes like value, name, placeholder, required etc
Dropdown using [Select MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select)
```
<main> for major components that go on every page navbar header etc
<nav>
<header>
<aside> something like a navbar,  call out, or photo

<section> creates large sections
<article> used for like a blog post
<form action=""> google for form elements
    <input type="" placeholder=""> goes in form, usually use with <label>
<footer>
<summary>
<details>
```
<br><br>

#### Form Example
Use a form to search google results
```
<form action="https://www.google.com/search">
    <input type="text" name="q">
    <buton>Search Google</button>
</form>
```
<br>

#### Button 
Buttons inside form default "type="submit"" change to "type="button"" or something else to change behavior
<br><br><br>

## CSS
Can add CSS inline (not preffered), style element (add style div in head of document), add stylesheet (by using code below)
```
<link rel="stylesheet" href="__.css"> 
```

[CSS properties MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference)


Can also create custom properties/variables


[Extended CSS properties list MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
<br><br><br>

### Styling
[Text styling](https://www.w3schools.in/css3/text/)


[Text decoration](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) shorthand for underline or color


[Styling Color Names](https://htmlcolorcodes.com/color-names/)


[Color Pallete Ideas ](https://coolors.co/palettes/trending)


[Border styling MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/border)
<br><br>

#### Measurements
Need to merge with other doc on measurements
* em (parents size, changes if nested in a loop/list)
* rem (gets size from root of document)
* auto

<br><br>

### Selectors
Order of selectors specificity, the more specific css will override the lower ones.
* ID (Most specific)
* Class
* Element

Universal Selector, select everything
```
* {
    color:pink;
}
```
Select all elements like h1, h2 or nav
```
h1,h2 {
    color:purple;
}
```
Select every 2nd text input, red border. Uses an [attribute selector MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors) to sellect all input elements with a type=text
```
input[type="text]:nth-of-type(2n){
    border:2px solid:red;
}
```
Select a class
```
.test{
    background-color:blue;
}
```
Select an ID/Label
```
#test{
    background-color:black;
}
```
Descendant selector, select an anchor tag in a .class
```
.class a{
    color:white;
}
```
Adjacent Selector, example selects every button that comes after a button on the same level
```
h2 + button {
    font-size:40px
}
```
Direct Child Selector, example selects only the anchors within the footer element
```
footer > a {
    color:purple;
}

or footer.class{
    color:purple;
}
```
<br><br>

### Pseudo Classes 
Section7 vid 76, goes into selecting nth of element. [Full MDN list](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)

* :active
* :checked
* :first
* :first-child
* :hover
* :not()
* :nth-child()
* :nth-of-type() 
Example highlight a button inside a post class on hover
```
.post button:hover{
    background:color: red;
}
```

Nth of example
```
.post:nth-of-type(2n){
    color:black;
}
```
<br><br>

### Pseudo Elements
Keyword added to a selector
* ::after
* ::before
* ::first-letter
* ::first-line
* ::selection

<br><br>

### Position
[Poition MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/position) Ch9 video 94.  
* static
* relative (can change top and sides from where it would be regularly)
* absolute (removed from flow, can get position from closest ancestor, if no ancestor then the initial containing block. Try by making parent relative )
* fixed (always present)
<br><br>

### Transition
Transition format for changing speed of transitions. Works well on hover or active. Look into timing functions for ease in animations etc   
{
    Transition: (property name) (duration) (timing function) (delay)
}
<br><br>

### Transform
[MDN transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) for rotate, scale, move/translate etc