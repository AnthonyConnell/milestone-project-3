const Review = require("../models/review.js");
const router = require("express").Router();

//new review
router.post("/newreview", async (req, res) => {
    try {
        //create new review
        const newReview = new Review({
            user: req.body.user,
            content: req.body.content,
            stars: req.body.stars
        })

        //save review
        const review = await newReview.save();
        
        //send response
        res.status(200).json(review._id);

    } catch (err) {
        res.status(500).json(err);
    }
});

//access review
router.get("/review", async (req, res) => {
    try {
      //find review
      const review = await Review.findOne({review: req.body.review});
      !review && res.status(400).json("No Review Found");
    
      //send response
      res.status(200).json({_id: review._id, review: review});
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router