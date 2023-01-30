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

const validateSignup = [
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
