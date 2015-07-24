# Leak Memory Plugin for jQuery
Leak Memory Plugin for finding memory leak in applications using jQuery, jQuery UI and all jQuery custom plugins.
##types of leaks
  * when using jQuery events
  * when using jQuery.data function(it is used in almost all jQuery plugins to save their settings)

## How to Use?
Include plugin to your HTML code:
```html
<script src="path/to/jquery.js"></script>
<script src="path/to/jquery-leak-memory.js"></script>
<script src="path/to/other-jquery-plugins.js"></script>
<script src="path/to/your-code.js"></script>

//then, when you think that there was a memory leak
$.leakMemory('getLeak'):

```
# License
Copyright &copy; Semen Tselishev<br>
All code licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php)