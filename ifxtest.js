/**
 * Created by richardwarg on 5/17/2016.
 */
var opts = {
    database: 'ccpoa@ccpoa_dev',
    username: 'informix',
    password: 'vap--or'
};


var Informix = require( 'informix' ).Informix;
var informix = new Informix(opts );
var Ifx = require('informix').Ifx;
var ifx = new Ifx();
var uuid = require ('uuid');
var crypto = require('crypto');
/*
ifx.connect( {
    database : 'ccpoa@ccpoa_dev',
    username : 'informix',
    password : 'vap--or',
    id : uuid.v4()
}, function ( err, connid ) {

    // check for errors
    if (err) {
        return console.log('Failed to connect,', err);
    }

    console.log('Connected with ID:', connid);
    var sql = 'select iname from inst';
    var stmtid = '_' + crypto.createHash('sha256').update(sql).digest('hex');
    console.log(stmtid, sql);
    ifx.prepare(connid, stmtid, sql,  function(err, stmtid){
        if(err) {
            return console.log('Failed to prepare statement', err);
        }
        console.log('Statement prepared with ID: ', stmtid);
        var curid = '_' + uuid.v4().replace( /\-/g, 's' );
        ifx.exec( connid, stmtid, curid, function ( err, curid ) {

            // check for errors
            if ( err ) {
                return console.log( 'Failed to execute statmenet,', err );
            }

            console.log( 'Have a cursor with ID:', curid, ', for statement[', stmtid, ']' );

            // helper to fetch all results
            var i = 0;
            var fetchcb = function ( err, result ) {

                // check for errors
                if ( err ) {
                    return console.log( 'Failed to fetch,', err );
                }

                // a null result means there are no more results to be fetched for this cursor
                if ( result ) {
                    console.log( 'Fetched result[', curid ,'][', ++i, ']', result );
                    ifx.fetch( curid, fetchcb );
                } else {
                    console.log( 'End of results for cursor:', curid );

                    // close cursor
                    ifx.close( curid, function ( err, curid ) {
                        if ( err ) {
                            return console.log( 'Failed to close cursor,', err );
                        }

                        console.log( '[', curid, '] closed' );

                        // free statement
                        ifx.free( connid, stmtid, function ( err , stmtid ) {
                            if ( err ) {
                                return console.log( 'Failed to free statement,', err );
                            }

                            console.log( '[', stmtid ,'] freed' );

                            // disconnect
                            ifx.disconnect( connid, function ( err, connid ) {
                                if ( err ) {
                                    return console.log( 'Failed to disconnect', err );
                                }

                                console.log( '[', connid, '] disconnected' );
                            } );
                        } );
                    } );

                }

            };

            // fetch result
            ifx.fetch( curid, fetchcb );

        } );

    } );

} );
*/

// Error event listener
informix.on( 'error', function ( err ) {
    console.log( '[event:error]', err );
} );

console.log('Informix require passed up to ifg test.');

//var informix = require('informix')(opts);
//var Informix = require('informix').Informix

//console.log('Informix object ', informix);

informix
    .prepare( 'select iname from inst ;' )
    .then( function ( stmt ) {
   //     console.log('statement ', stmt);
        return stmt.exec(  );
    } )
    .then( function ( cursor ) {
        // Fetch all results and close cursor
        return cursor.fetchAll( { close : true } );
    } )
    .then( function ( results ) {
        console.log( '[stmt] results:', results );
    } )
    .catch( function ( err ) {
        console.log( err );
    } );

var inst = 'CDC'
informix
    .prepare( 'select  iunit, iname from inst where iunit like ?;' )
    .then( function ( stmt ) {
        //     console.log('statement ', stmt);
        return stmt.exec( '%'+inst+'%' );
    } )
    .then( function ( cursor ) {
        // Fetch all results and close cursor
        return cursor.fetchAll( { close : true } );
    } )
    .then( function ( results ) {
        console.log( '[stmt] results:', results );
    } )
    .catch( function ( err ) {
        console.log( err );
    } );

/*
 try {
 informix
 .query('select count(*) from inst;')
 .then(function (cursor) {
 // Fetch all results and close cursor

 return cursor.fetchAll({close: true});
 })
 .then(function (results) {
 console.log('[query] results:', results);
 })
 .catch(function (err) {
 console.log('[error] result', err);
 });
 }catch (ex){
 console.log('caught error: ', ex);
 };
*/
console.log('finished informix test');