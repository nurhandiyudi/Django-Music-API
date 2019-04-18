var express = require('express');
var router = express.Router();

/*init backendless*/
var Backendless = require('backendless');
var APP_ID = '84904B71-B5F3-4324-AF35-AD1343B0F96E'; 
var API_KEY = '53FA7DCE-2E67-25D9-FFA7-6F90B7153E00';
//var APP_ID = '0C86C594-F05A-65BD-FF87-235CF9B43B00'
//var API_KEY = '53FA7DCE-2E67-25D9-FFA7-6F90B7153E00';
Backendless.initApp(APP_ID, API_KEY);

/* POST create order many. */
router.post('/order/price/check', function(req, res, next) {
  var status = "Failed"
  var price = null
  if(req.body.distance < 6){
    var status = "Success"
    var price = 10000
  } else if(req.body.distance > 5){
    var remDistance = req.body.distance - 5
    var status = "Success"
    var price = 10000 + (1000 * remDistance)
  } else {
    var status = "Failed"
    var price = null
  }
  res.send({
    "status" : status,
    "result" : {
      "price" : price
    },
    "request" : req.data
  })
});

/* POST create order many. */
router.post('/order/create', async function(req, res, next) {
   Backendless.Data.of( "triplogistic_orders" ).Create( order )
     .then( function( result ) {
       res.send( "Objects have been saved" );
     })
     .catch( function( error ) {
      res.send( "Server reported an error " + error );
     })
});

/* POST list order. */
router.get('/order/list', async function(req, res, next) {
  var test = await Backendless.Data.of("triplogistic_orders").findById( 
    {
      objectId:"EB8BE2DF-BCC6-32DC-FF13-01A074487E00",
      } 
   );
   res.send(test.owner.phone_number)
});

/* DELETE remove order many. */
router.delete('/order/remove', async function(req, res, next) {
  await Backendless.Data.describe("Users")
    .then( response => res.send("sukses"))
    .catch( error => res.send("error"));
});

module.exports = router;
