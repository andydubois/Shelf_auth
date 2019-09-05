const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//importing rejecUnauthenticated so we can only see items if a user is logged in
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    //this selects each users specific items
    let queryText = `SELECT * from "item"
                    WHERE "user_id" = $1;`;
    //req.user.id is the id of the logged in user!
    pool.query(queryText, [req.user.id])
        .then(result => {
            console.log('in item GET', result.rows);
            
            res.send(result.rows)
        })
        .catch(error => {
            console.log('error in item GET', error);
            res.sendStatus(500);
        })
});


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {

});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {

});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {

});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;