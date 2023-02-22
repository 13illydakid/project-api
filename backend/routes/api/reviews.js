// const express = require('express');
// const router = express.Router();

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
// const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');

// const { check } = require('express-validator');
// const { handleValidationErrors, validateReview, validateReviewImage } = require('../../utils/validation');
// const sequelize = require('sequelize');

// const { ifReviewExists, ifUsersReview } = require('../../utils/error-handlers')


// // Get reviews of current user
// router.get('/current', requireAuth, async (req, res, next) => {
//     const userId = req.user.id;

//     const reviews = await Review.findAll({
//         where: {
//             userId: userId
//         },
//         include: [
//             {
//                 model: User,
//                 attributes: ['id', 'firstName', 'lastName']
//             },
//             {
//                 model: Spot,
//                 attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
//                 include: [{
//                     model: SpotImage,
//                     attributes: ['url', 'preview']
//                 }]
//             },
//             {
//                 model: ReviewImage,
//                 attributes: ['id', 'url']
//             }
//         ]
//     });

//     if (!reviews) {
//         return res.json("No reviews for current user")
//     }

//     let reviewArr = [];
//     reviews.forEach(review => {
//         let eachReview = review.toJSON();
//         if (eachReview.Spot.SpotImages.length > 0) {
//             for (let i = 0; i < eachReview.Spot.SpotImages.length; i++) {
//                 if (eachReview.Spot.SpotImages[i].preview === true) {
//                     eachReview.Spot.previewImage = eachReview.Spot.SpotImages[i].url;
//                 }
//             }
//         }

//         if (!eachReview.Spot.previewImage) {
//             eachReview.Spot.previewImage = "No preview image available";
//         }

//         if (!eachReview.ReviewImages.length > 0) {
//             eachReview.ReviewImages = "No current review images available"
//         }

//         delete eachReview.Spot.SpotImages
//         reviewArr.push(eachReview);
//     });

//     res.json({
//         Reviews: reviewArr
//     });
// });


// // Add an Image to a Review based on the Review's id
// router.post("/:reviewId/images", requireAuth, ifReviewExists, ifUsersReview, validateReviewImage, async (req, res, next) => {
//     const { reviewId } = req.params;
//     const { url } = req.body;
//     const user = req.user

//     const review = await Review.findByPk(reviewId)

//     let allReviewImages = await review.getReviewImages()

//     const err = {}
//     if (allReviewImages.length >= 10) {
//         err.title = "Cannot add any more images because there is a maximum of 10 images per resource";
//         err.message = "Maximum number of images for this resource was reached";
//         err.status = 403;
//         return next(err);
//     };

//     const newReviewImage = await review.createReviewImage({
//         url: url
//     });

//     res.json({
//         id: newReviewImage.id,
//         url: newReviewImage.url
//     });
// });


// /// Edit a Review
// router.put('/:reviewId', requireAuth, validateReview, ifReviewExists, ifUsersReview, async (req, res, next) => {
//     const { reviewId } = req.params;
//     const { review, stars } = req.body;
//     const user = req.user;

//     let editReview = await Review.findByPk(reviewId);

//     editReview.review = review;
//     editReview.stars = stars;

//     await editReview.save();

//     return res.json(editReview);
// });

// /// Delete a review
// router.delete('/:reviewId', requireAuth, ifReviewExists, ifUsersReview, async (req, res, next) => {
//     const { reviewId } = req.params;
//     const user = req.user;

//     let review = await Review.findByPk(reviewId);

//     review.destroy();

//     return res.json({
//         "message": "Successfully deleted",
//         "statusCode": 200
//     });
// });



// module.exports = router;


const express = require('express')
const router = express.Router();
const Sequelize = require("sequelize")
const { requireAuth } = require('../../utils/auth');
const { User, Review, ReviewImage, Spot, SpotImage } = require('../../db/models');

//Verify authorization
const checkReviewAuthorization = async (req,res,next) => {
    const review = await Review.findByPk(req.params.reviewId)
    const reviewJSON = review.toJSON()
    if (reviewJSON.userId !== req.user.id) {
        const error = new Error("Forbidden");
        error.status = 403;
        return next(error);
    }
    next()
}

//Check if review exists
const checkReview = async (req,res,next) => {
    const review = await Review.findByPk(req.params.reviewId)
    if(!review) {
        const error = new Error("Review couldn't be found");
        error.status = 404;
        return next(error)
    }
    next()
}

//Edit a Review
router.put('/:reviewId', requireAuth, checkReview, checkReviewAuthorization, async (req,res,next) => {
    const { review, stars } = req.body;
    const errors = {};

    //Verifies if input field is correct
    if (!review) errors.review = "Review text is required";
    if (!stars) errors.stars = "Stars must be an integer from 1 to 5";
    if (Object.keys(errors).length) {
        const error = new Error("Validation error");
        error.status = 400;
        error.errors = errors;
        return next(error)
    }

    const spotReview = await Review.findByPk(req.params.reviewId);

    //Builds the review and saves it
    const newReview = spotReview.set({
        review: review,
        stars: stars
    });
    await newReview.save()

    const verifyReview = await Review.findByPk(newReview.id);
    res.status(200).json(verifyReview)
})

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, checkReview, checkReviewAuthorization, async (req,res,next) => {
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);

    const reviewJSON = review.toJSON();
    //verify number of images
    const numberOfImages = await ReviewImage.count({
        where: {
            reviewId: reviewJSON.id
        }
    })

    if (numberOfImages >= 10) {
        const error = new Error("Maximum number of images for this resource was reached");
        error.status = 403;
        return next(error);
    }

    const image = await ReviewImage.build({
        reviewId: reviewJSON.id,
        ...req.body
    })
    await image.save();

    const verifyImage = await ReviewImage.findByPk(image.toJSON().id)

    res.status(200).json(verifyImage)
})


//Get all Reviews of the Current User
router.get('/current', requireAuth, async (req,res,next) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        }
    })
    const user = await User.findByPk(req.user.id, { attributes: ["id", "firstName", "lastName"]});
    const userJSON = user.toJSON();

    const reviews2 = []
    for (let review of reviews) {
        const reviewJSON = review.toJSON()
        reviewJSON.User = userJSON

        const spot = await Spot.scope('omitTimes').findByPk(reviewJSON.spotId)

        const previewImage = await SpotImage.findOne({
            where: {
                spotId: spot.toJSON().id,
                preview: true
            }
        })
        const spotJSON = spot.toJSON()
        spotJSON.previewImage = previewImage.toJSON().url
        reviewJSON.Spot = spotJSON;

        const images = await ReviewImage.findAll({
            where: {
                reviewId: reviewJSON.id,
            },
            attributes: ["id", "url"]
        });
        reviewJSON.ReviewImages = images;
        reviews2.push(reviewJSON);
    }
    res.status(200).json({ Reviews: reviews2 })

})

//Delete a Review
router.delete('/:reviewId', requireAuth, checkReview, checkReviewAuthorization, async (req,res,next) => {
    const spotReview = await Review.findByPk(req.params.reviewId);

    //deletes the review
    await spotReview.destroy();
    res.status(200).json("Successfully deleted")
})



module.exports = router;
