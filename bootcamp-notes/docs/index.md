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
<br><br>


#### Button 
Buttons inside form default "type="submit"" change to "type="button"" or something else to change behavior