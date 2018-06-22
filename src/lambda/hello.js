/*
var condoType = require("./condotype"); 
var singleFamilyType = require("./singlefamilytype");
var commercialType = require("./commercialtype");
var multiFamilyType = require("./multifamilytype");
var rentalType = require("./rentaltype");
var splitListing = require("./splitListing");
*/

/*
var setNeighborhoodAndCode = require("./allneighborhoods");

// module.exports = function(context, cb) {
MongoClient.connect(dbUrl, function(err, client) {
    // onDBConnectFillRosters(client, "listings", agentsUrl, "agents");
    // onDBConnectFillRosters(client, "listings", officesUrl,"offices");
    
//     onDBConnect(client, "listings", condoUrl, "CC", "viewListingsFeature");
//   onDBConnect(client, "listings", rentalsUrl, "RN", "viewListingsFeature"); 
//    onDBConnect(client, "listings", multiFamilyUrl, "MF", "viewListingsFeature");
//    onDBConnect(client, "listings", commercialUrl, "CI", "viewListingsFeature");
    onDBConnect(client, "listings", singleFamilyUrl, "SF", "viewListingsFeature");

});

var searchItems = [];
var listings = [];

function onDBConnect(connectedDBClient, databaseName, idxUrl, listingType) {
  rp(idxUrl).then(function (response) {
        var db = connectedDBClient.db(databaseName); var allListings = response.split( "\r\n" + listingType);
    	for(var i = 1; i < allListings.length; i++){  var listing = {}; generateListing(allListings[i], listing, listingType); if(isNaN(listing.PHOTO_COUNT)) {  continue; }  listing["PROP_TYPE"] = listingType; 
            listing._id = shortid.generate();

            listing["LIST_PRICE"] = parseInt(listing["LIST_PRICE"]); 
            var date = new Date();
            listing["DATE_ADDED"] = date.toISOString();  
    	// var searchDocument = [{
    	// 	"displayText": listing.STREET_NO + " " + listing.STREET_NAME + "," + listing.ZIP_CODE,
    	// 	"searchText" : listing.LIST_NO + " - " + listing.STREET_NAME + " - " + listing.ZIP_CODE,
    	// 	"mlsID" : listing.LIST_NO,
    	// 	"listing": listing
    	// }];

    	listing.mlsID = listing.LIST_NO;
    	searchItems.push(listing);
        if(listing["code"] === undefined) {

            // here i need to return multiple listings
            // if they are

            listing = setNeighborhoodAndCode(listing);

            if(listing.length > 1) {
                //for (var i = 0; i < listings.length; i++) {
                //    listings[i]
                //}
            }

        } else {
            
        }

        if(parseInt(listing.UNIT_NO).length) {
            listing.displayText = listing.STREET_NO + " " + listing.STREET_NAME + " #" + listing.UNIT_NO + " ," + listing.neighborhood + ", MA" + " " + ", " + listing.ZIP_CODE;
            listing.searchText = listing.STREET_NO + " " + listing.STREET_NAME + " #" + listing.UNIT_NO + " ," + listing.neighborhood + ", MA" + " " + ", " + listing.ZIP_CODE + " " + listing.LIST_NO;
        } else { 
            listing.displayText = listing.STREET_NO + " " + listing.STREET_NAME + ", " + listing.neighborhood + ", MA" + " " + ", " + listing.ZIP_CODE;
            listing.searchText = listing.STREET_NO + " " + listing.STREET_NAME +  ", " + listing.neighborhood + ", MA" + " " + ", " + listing.ZIP_CODE + " " + listing.LIST_NO;
        }

        listings.push(listing);
	} // end for
	
    db.collection("search").insertMany( searchItems , { ordered: false, keepGoing:true, continueOnError: true },function(err, res) { if (err) { console.log("err"); return; } console.log("Number of documents inserted: " + res.insertedCount); })
    db.collection("listings").insertMany( listings , { ordered: false, keepGoing:true, continueOnError: true },function(err, res) { if (err) { console.log(err); console.log("err"); return; } console.log("Number of documents inserted: " + res.insertedCount); })

	// to do - zipcode processor when using 
	// if(newtonListings.length !== 0) {
    //   db.collection("listings").insertMany( newtonListings, { keepGoing:true, continueOnError: true } ,function(err, res) { if (err) { console.log(err) } console.log("Number of documents inserted: " + res.insertedCount); })
  	// }
  });
}
// }


*/







exports.handler = function(event, context, callback) {
	var rp = require('request-promise'); 
	const MongoClient = require('mongodb').MongoClient;
	var shortid = require('shortid');

	const dbUrl = 'mongodb://jantelo:Falcons1!@ds241019.mlab.com:41019/listings';

	const condoUrl = "https://idx.mlspin.com/idx.asp?user=2K7zB9ytn1MtTtnNFeBt5297rZtjfWdyYmLtNzYDztDh2AeuPUDK1AD2HrZhDFoEmsPD4c7vZ5PTD2xIPTOLAf5PqO0oTDxayND&proptype=CC";
	const singleFamilyUrl = "https://idx.mlspin.com/idx.asp?user=2K7zB9ytn1MtTtnNFeBt5297rZtjfWdyYmLtNzYDztDh2AeuPUDK1AD2HrZhDFoEmsPD4c7vZ5PTD2xIPTOLAf5PqO0oTDxayND&proptype=SF";
	const multiFamilyUrl = "https://idx.mlspin.com/idx.asp?user=2K7zB9ytn1MtTtnNFeBt5297rZtjfWdyYmLtNzYDztDh2AeuPUDK1AD2HrZhDFoEmsPD4c7vZ5PTD2xIPTOLAf5PqO0oTDxayND&proptype=MF";
	const rentalsUrl = "https://idx.mlspin.com/idx.asp?user=2K7zB9ytn1MtTtnNFeBt5297rZtjfWdyYmLtNzYDztDh2AeuPUDK1AD2HrZhDFoEmsPD4c7vZ5PTD2xIPTOLAf5PqO0oTDxayND&proptype=RN";
	const commercialUrl = "https://idx.mlspin.com/idx.asp?user=2K7zB9ytn1MtTtnNFeBt5297rZtjfWdyYmLtNzYDztDh2AeuPUDK1AD2HrZhDFoEmsPD4c7vZ5PTD2xIPTOLAf5PqO0oTDxayND&proptype=CI";


	MongoClient.connect(dbUrl, function(err, client) {
	    if(err) {
	    	callback(null, {
	    	  statusCode: 200,
	    	  body: "Failed DB connection"
	    	});
	    }

	    callback(null, {
	      statusCode: 200,
	      body: "Hey, World"
	    });
	});

	function generateListing(line, listing, listingType) {  var breakpointIndicies = generateBreakpointIndicies(line); var prev = 0; for(var i = 0; i < breakpointIndicies.length; i++) { var start = prev; var end = breakpointIndicies[i]; prev = breakpointIndicies[i]; if(listingType === "CI") { splitListing(commercialType[i], line.slice(start, prev), listing);  } if(listingType === "CC") { splitListing(condoType[i], line.slice(start, prev), listing);  } if(listingType === "RN") { splitListing(rentalType[i], line.slice(start, prev), listing); } if(listingType === "SF") { splitListing(singleFamilyType[i], line.slice(start, prev), listing); } if(listingType === "MF") { splitListing(multiFamilyType[i], line.slice(start, prev), listing);  } } return listing; }
	function generateBreakpointIndicies(line) { var indices = []; var array = line; var element = '|'; var idx = array.indexOf(element); while (idx != -1) { indices.push(idx); idx = array.indexOf(element, idx + 1); } return indices; }
	function indexOf(array, item) { for (var i = 0; i < array.length; i++) { if (array[i].toString() === item.toString()) { return i; }  } return -1; }
};
