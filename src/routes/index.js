const express = require('express')
const router = express.Router();


const healthController = require('../controllers/healthController')


// respond with "hello studybuddy" when a GET request is made to the homepage
router.get('/', (req, res) => {
  res.send("Hello nigro")
})


router.get('/health', healthController.getHealth);


module.exports = router


