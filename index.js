class URLSearchParams {

    constructor( paramValue ) {
        // url可以为字符串，数据，对象
        let type = typeof paramValue;
        this.params = {};
        this.paramValue = paramValue;
        if ( type === 'string') {
            this.params = this._parseStringParams( paramValue );
        } else if ( Array.isArray( paramValue ) ) {
            this.params = this._parseArrayObject( paramValue );
        } else if ( type === 'object' ) {
            this.params = this._parseObjectParams( paramValue );
        }
    }

    _parseStringParams ( paramValue ) {
        let index = paramValue.indexOf( '?' );
        index > -1 && ( paramValue = paramValue.substr( index + 1 ) );
        paramValue = paramValue.replace(/^\?|\?$/g, '');
        let parts = paramValue.split( '&' );
        let params = {}
        parts.map( ( part ) => {
            let temp = part.split( '=' );
            params = this._setItem( temp[ 0], temp[ 1 ] || '', params );
        } )
        return params;
    }

    _parseArrayParams( paramValue ) {
        let params = {};
        paramValue.map( ( [ key, value ] ) => {
            params = this._setItem( key, value, params );
        } )
        return params;
    }

    _parseObjectParams( paramValue ) {
        let params = {};
        Object.entries( paramValue ).map( ( [ key, value ] ) => {
            params = this._setItem( key, value, params );
        } )
        return params;
    }

    _setItem( key, value, params ) {
        if ( params[ key ] === undefined ) {
            params[ key ] = [];
        }
        // value只能是数字或者字符串
        let type = typeof value;
        if ( type != 'number' && type != 'string' ) {
            value = '';
        }
        params[ key ].push( encodeURI( '' + value ) );
        return params;
    }

    toString () {
        //返回实例字符串形式
        let strParts = [];
        Object.entries( this.params ).map( ( [ key, values ] ) => {
            values.map( ( value ) => {
                strParts.push( `${key}=${value}` );
            } )
        } )
        return strParts.join( '&' );
    }

    append ( key, value ) {
        this._setItem( key, value, this.params );
    }

    delete ( key ) {
        if ( this.params[ key ] !== undefined ) {
            delete this.params[ key ];
        }
    }

    has ( key ) {
        return this.params[ key ] !== undefined;
    }

    set ( key, value ) {
        this.delete( key )
        this._setItem( key, value, this.params );
    }

    get ( key ) {
        let value = this.params[ key ];
        if ( value === undefined ) {
            return null;
        }
        return value[ 0 ];
    }

    getAll ( key ) {
        let value = this.params[ key ];
        return value ? value : [];
    }

    sort () {
        let arrayValue = Object.entries( this.params ).sort( ( value1, value2 ) => {
            if ( value1[ 0 ] == value2[ 0 ] ) {
                return 0;
            }
            return value1[ 0 ] > value2[ 0 ] ? 1 : -1;
        } )
        let params = {};
        arrayValue.map( ( [ key, value ] ) => {
            params[ key ] = value;
        } )
        this.params = params;
    }

    [ Symbol.iterator ] () {
        return this._makeIterator();
    }

    _makeIterator ( type = 'entries' ) {
        let params = this.params;
        return (function * () {  
            for ( let key in params ) {
                if ( type === 'key' ) {
                    yield key;
                } else {
                    for ( let value of params[ key ] ) {
                        if ( type === 'value' ) {
                            yield value;
                        } else {
                            yield [ key, value ];
                        }
                    }
                }
            }
        })();
    }

    keys () {
        return this._makeIterator( 'key' );
    }

    values () {
        return this._makeIterator( 'value' );
    }

    entries () {
        return this._makeIterator( 'entries' );
    }

    forEach ( callback ) {

    }
}

( function ( global ) {
    typeof exports === 'object' && typeof module !== 'undefined' ? ( module.exports = URLSearchParams ) : global.URLSearchParams = URLSearchParams;
} )( this );