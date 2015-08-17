( function( window, undefined ) {
    var Collection = function( parameters ) {
        this.items = [];
        this.items_length = 0;
    
        this.setConstructor( parameters.constructor );
        this.setDestructor( parameters.destructor );
    };
    
    Collection.prototype.setConstructor = function( fn ) {
        this.constructor = fn || function() {};
        
        return this;
    };
    
    Collection.prototype.setDestructor = function( fn ) {
        this.destructor = fn || function() {};
        
        return this;
    };
    
    Collection.prototype.getLength = function() {
        return this.items_length;
    };
    
    Collection.prototype.each = function( iterator ) {
        var i,
            item;
        
        for ( i = 0; i < this.items_length; i++ ) {
            item = this.items[ i ];
        
            if ( iterator( item.element, item.data, i, this.items_length ) === false ) {
                break;
            }
        }
        
        return this;
    };
    
    Collection.prototype.index = function( element ) {
        var index = -1;
    
        this.each( function( current_element, data, i ) {
            if ( current_element === element ) {
                index = i;
                return false;
            }
        } );
        
        return index;
    };
    
    Collection.prototype.has = function( element ) {
        return this.index( element ) > -1;
    };
    
    Collection.prototype.add = function( element ) {
        var that = this;
    
        if ( this.has( element ) === false ) {
            this.items[ this.items_length++ ] = {
                element: element,
                data: that.constructor( element )
            };
        
            return true;
        } else {
            return false;
        }
    };
    
    Collection.prototype.remove = function( element ) {
        var index = this.index( element ),
            item;
    
        if ( index > -1 ) {
            item = this.items[ index ];
            
            this.destructor( item.element, item.data );
            
            this.items.splice( index, 1 );
            this.items_length--;
        
            return true;
        } else {
            return false;
        }
    };
    
    Collection.prototype.processFew = function( action_name, elements ) {
        var length = elements.length,
            i;
            
        for ( i = 0; i < length; i++ ) {
            this[ action_name ]( elements[ i ] );
        }
        
        return this;
    };
    
    Collection.prototype.addFew = function( elements ) {
        return this.processFew( 'add', elements );
    };
    
    Collection.prototype.removeFew = function( elements ) {
        return this.processFew( 'remove', elements );
    };
    
    Collection.prototype.merge = function( selector ) {
        return this.addFew( document.querySelectorAll( selector ) );
    };
    
    Collection.prototype.scatter = function( selector ) {
        return this.removeFew( document.querySelectorAll( selector ) );
    };
    
    Collection.prototype.clear = function() {
        return this.removeFew( this.items );
    };
    
    Collection.prototype.filter = function( filter ) {
        var that = this;
    
        this.each( function( element, data, i, length ) {
            if ( filter( element, data, i, length ) !== true ) {
                that.remove( item.element );
            }
        } );
    };
    
    window.Collection = window.Collection || Collection;
} )( window );