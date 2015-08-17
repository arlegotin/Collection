# Collection
Simplifies work with sets of DOM-elements.

###Creating

```javascript
//creating an instance
var collection = new Collection( {
  constructor: function( element ) {
    //process element
  },
  desctructor: function( element ) {
    //process element
  }
} );
```

###Methods

##### `add`

Add DOM-element to collection, if it's not in collection. Returns "true" if element is added
```javascript
collection.add( element );
```

##### `remove`

Remove DOM-element from collection, if it's in collection. Returns "true" if element is removed
```javascript
collection.remove( element );
```

##### `has`

Check if collection has this DOM-element
```javascript
collection.has( element );
```

##### `merge`

Add elements to collection by selector
```javascript
collection.merge( selector );
```

##### `scatter`

Removes elements from collection by selector
```javascript
collection.scatter( selector );
```

##### `clear`

Removes all elements from collection
```javascript
collection.clear();
```

