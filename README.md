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

##### `each`

Calls function for every element of collection
```javascript
collection.each( function( element, data, i, length ) {
  //process element
} );
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

##### `filter`

Removes elements for which function returns "false"
```javascript
collection.filter( function( element, data ) {
  //some calculations
} );
```

##### `clear`

Removes all elements from collection
```javascript
collection.clear();
```

###Example

```javascript
//creating an instance
var collection = new Collection( {
  //each element will get attribute "in-collection" and some element data will be stored
  constructor: function( element ) {
    element.setAttribute( 'in-collection', 'true' );
    
    return {
      name: element.tagName,
      width: element.offsetWidth
    };
  },
  //each removed element remove an attribute
  desctructor: function( element ) {
    element.removeAttribute( 'in-collection' );
  }
} );

//add #some element to collection
collection.add( document.getElementById( '#some' ) );

//add also all divs to collection
collection.merge( 'div' );

//remove specific elements from collection
collection.scatter( '.some' );


//display some info about elements of collection
collection.each( function( element, data, i ) {
  console.log( 'Element %d is %s and has width %dpx', i, data.name, data.width );
} );

//remove elements that are wider than 100px from collection
collection.filter( function( element, data ) {
  return data.width <= 100;
} );

//remove all elements from collection
collection.clear();
```

