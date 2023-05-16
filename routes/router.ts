import * as express from "express";
let router = express.Router();

router.get('/', function (req, res) {
    res.send('Wiki home page');
  })
// Export the router
export = router;