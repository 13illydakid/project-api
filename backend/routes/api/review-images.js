const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const sequelize = require('sequelize')
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

//Delete an Image for a Review
router.delete('/:imageId', requireAuth, async(req, res, next)=>{
    const user = req.user;
    const imageId = req.params.imageId;
    const selectImage = await ReviewImage.findByPk(imageId);

    const err = {};
    if (!selectImage) {
        err.title = "Couldn't find a Review Image with the specified id";
        err.status = 404;
        err.message = "Review Image couldn't be found"
        return next(err)
    };

    const review = await selectImage.getReview();
    /// If review belongs to user
    if (user.id !== review.userId) {
        err.title = "Authorization error";
        err.status = 403;
        err.message = "Cannot delete image from review not left by user"
        return next(err)
    };

    selectImage.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
});



module.exports = router;
