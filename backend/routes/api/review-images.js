// const express = require('express');
// const router = express.Router();
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
// const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
// const sequelize = require('sequelize')
// const { handleValidationErrors } = require('../../utils/validation');
// const { check } = require('express-validator');

// //Delete an Image for a Review
// router.delete('/:imageId', requireAuth, async(req, res, next)=>{
//     const user = req.user;
//     const imageId = req.params.imageId;
//     const selectImage = await ReviewImage.findByPk(imageId);

//     const err = {};
//     if (!selectImage) {
//         err.title = "Couldn't find a Review Image with the specified id";
//         err.status = 404;
//         err.message = "Review Image couldn't be found"
//         return next(err)
//     };

//     const review = await selectImage.getReview();
//     /// If review belongs to user
//     if (user.id !== review.userId) {
//         err.title = "Authorization error";
//         err.status = 403;
//         err.message = "Cannot delete image from review not left by user"
//         return next(err)
//     };

//     selectImage.destroy();
//     res.json({
//         "message": "Successfully deleted",
//         "statusCode": 200
//     });
// });



// module.exports = router;


const express = require('express')
const router = express.Router();
const Sequelize = require("sequelize")
const { requireAuth } = require('../../utils/auth');
const { ReviewImage, Review } = require('../../db/models');

//Verify authorization
const checkReviewImageAuthorization = async (req,res,next) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId);
    const reviewId = reviewImage.toJSON().reviewId;
    const review = await Review.findByPk(reviewId);
    const reviewJSON = review.toJSON()
    if (reviewJSON.userId !== req.user.id) {
        const error = new Error("Forbidden");
        error.status = 403;
        return next(error);
    }
    next()
}

//Check if review image exists
const checkReviewImage = async (req,res,next) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId)
    if(!reviewImage) {
        const error = new Error("Review Image couldn't be found");
        error.status = 404;
        return next(error)
    }
    next()
}

//Delete a Review Image
router.delete('/:imageId', requireAuth, checkReviewImage, checkReviewImageAuthorization, async (req,res,next) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId);

    await reviewImage.destroy()

    res.status(200).json("Successfully deleted")
})

module.exports = router;
