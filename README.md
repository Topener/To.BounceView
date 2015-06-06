# To.BounceView
To.BounceView is a bouncing view widget for Titanium. It basically is a `View` wrapper with a resize method that animates vertically only.

TODO:

- add horizontal scrolling support
- add support for more events

Implementing it is very easy, just add it to the view

```xml
<Widget src="To.BounceView" id=“bouncyView” onClick="clickBottom">
    <Label>Awesome</Label>
</Widget>
```

All properties set in the tss will be applied to the view created, and it also supports all subviews as normal.

Resizing the view (horizontally) is also easy, just call the resize method:

```js
// resize to 300
$.bouncyView.resize(300);
```