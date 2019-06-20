/*
 * localForage
 * docs    https://localforage.github.io/localForage/
 * git     https://github.com/localForage/localForage
 */
const _dbName = 'JDICT';
var _db_config = {
    name: _dbName, //db name
    driver: [ localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE ],
    size: 4980736,
    version: 1.0,
    storeName : 'storeName', //tableIns name
};


/*

_db_config.storeName = "items";
var items = localforage.createInstance(_db_config);
items.setItem( "foo1", {"id":123 , "name":"bar" } );
items.setItem( "foo2", {"id":456 , "name":"bar123" } );

_db_config.storeName = "user";
var user = localforage.createInstance(_db_config);
user.setItem( "user1" , "dilbert" );
user.setItem( "user2" , "dilbert u2" );


user.getItem('user1').then(function(value) {
    // This code runs once the value has been loaded
    // from the offline store.
    console.log(value);
}).catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
});


var store = localforage.createInstance({name: "nameHere"});
store.setItem("key", "value");

var otherStore = localforage.createInstance({name: "otherName"});
otherStore.setItem("key", [{a:"aaa"},{b:"bbb"}]);


  localforage.dropInstance().then(function() {
    console.log('Dropped the store of the current instance');
  });

  localforage.dropInstance({
    name: "otherName",
    storeName: "otherStore"
  }).then(function() {
    console.log('Dropped otherStore').
  });

  localforage.dropInstance({
    name: "otherName"
  }).then(function() {
    console.log('Dropped otherName database').
  });

*/

