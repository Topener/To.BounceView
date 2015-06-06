# To.BounceView
To.BounceView is a bouncing view widget for Titanium. It basically is a `View` wrapper with a resize method that animates vertically only.

TODO:

- add horizontal scaling support (and also combinations)
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

By default the speed of the animation is 250ms. That means the total animation will last 500ms. This can be adjusted in the 2nd parameter in the resize function. 50ms would be a good amount for a button press for example

```js
// resize to 300
$.bouncyView.resize(300, 50);
```

When resizing to a size it already is, it will shrink 90% and then go back to 100% again.