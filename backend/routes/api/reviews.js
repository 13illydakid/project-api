const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');

const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

// const { requireAuth } = require('../../utils/auth');
const review = require('../../db/models/review');

const validateReviews = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

//Get all reviews of a current user
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const reviews = await Review.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            },
            {
                model: Spot,
                attributes: {
                    exclude: [
                        'createdAt',
                        'updatedAt',
                        'description'
                    ]
                },
                include: [{ model: SpotImage, attributes: ['url', 'preview'] }]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });
    const reviewArray = [];
    for (let review of reviews) {
        let string = review.toJSON();
        reviewArray.push(string);
    }
    // for(let elem of reviewArray){
    reviewArray.forEach((sentence) => {
        sentence.Spot.SpotImages.forEach((photo) => {
            if (photo.preview === true) {
                sentence.Spot.previewImage = photo.url;
            }
            if(!sentence.Spot.previewImage){
                sentence.Spot.previewImage = 'Preview image is unavailble';
            }
        });
        delete sentence.Spot.SpotImages;
    });
    return res.json({
        Reviews: reviewArray
    });
});


//Add an image to a Review based on the Review's id
router.post("/:reviewId/images", requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const url = req.body.url;
    const yesUser = req.user;

    const review = await Review.findByPk(reviewId);
    const reviewImages = await ReviewImage.findAll({
        where: {
            reviewId: reviewId
        }
    });

    if (!review) {
        res.statusCode = 404;
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    if (yesUser.id !== review.userId) {
        res.statusCode = 403;
        return res.json({
            message: "Forbidden",
            statusCode: 403
        });
    }

    if(reviewImages.length > 10){
        res.status(403);
        return res.json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        });
    }

    const newImage = await ReviewImage.create({
        reviewId,
        url
    });
    res.status(200);
    res.json({
        id: newImage.id,
        url: newImage.url
    });
});

// Editing a review
router.put('/:reviewId', [requireAuth, validateReviews], async (req, res) => {
    const reviewId = req.params.reviewId;
    const { star, review } = req.body;

    const selectReview = await Review.findByPk(reviewId);

    const currentUser = req.user;

    if (!selectReview) {
        res.status(404);
        return res.json({
            message:  "Review couldn't be found",
            statusCode: 404
        });
    }

    if (currentUser.id !== selectReview.userId) {
        res.status(403);
            return res.json({
                message: "Forbidden",
                statusCode: 403
            });
    }

    await selectReview.update({
        star,
        review
    });

    return res.json(selectReview);
});

//Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const selectUser = req.user;
    const reviewId = req.params.reviewId;

    const selectReview = await Review.findByPk(reviewId);

    if (!selectReview) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    }
    if (selectUser.id !== selectReview.userId) {
        res.status(403);
            return res.json({
                message: "Forbidden",
                statusCode: 403
            });
    }
    await selectReview.destroy();
    res.status(200);
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});


module.exports = router;
