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
    let queryText = `SELECT * from "item";`;
    //req.user.id is the id of the logged in user!
    pool.query(queryText)
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
router.post('/', rejectUnauthenticated, (req, res) => {
    //this is the queryText to insert into our database
    let queryText = `INSERT INTO "item" ("description", "image_url", "user_id") VALUES ($1, $2, $3);`;
    pool.query(queryText, [req.body.description, req.body.image_url, req.user.id])
        .then(result => {
            res.sendStatus(200)
        })
        .catch(error => {
            res.sendStatus(500)
        })

});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('user:', req.user);
    
    let queryCheck = `SELECT * FROM "item" WHERE "id" = $1;`;
    pool.query(queryCheck, [req.params.id])
        .then(result => {
            console.log('queryCheck response:', result.rows[0].user_id, req.user.id);
            if (result.rows[0].user_id === req.user.id) {
                
                let queryText = `DELETE FROM "item" WHERE "id" = $1 AND "user_id" = $2;`;
                pool.query(queryText, [req.params.id, req.user.id])
                    .then(result => {
                        res.sendStatus(200)
                    })
                    .catch(error => {
                        res.sendStatus(500)
                    })
            } else {
                console.log('queryCheck after else block:', result.rows, req.user.id);
                
                res.sendStatus(403);
            }
        })
        .catch(error => {
            console.log('error in check:', error);
            res.sendStatus(500);
        })
    
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