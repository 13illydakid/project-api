const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const sequelize = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

//Delete an Image for a Spot
router.delete('/:imageId', requireAuth, async(req, res, next)=>{
    const imageId = req.params.imageId;
    const selectImage = await SpotImage.findByPk(imageId);

    const user = req.user;

    const err = {};
    if (!selectImage) {
        err.title = "Couldn't find a Spot Image with the specified id";
        err.status = 404;
        err.message = "Spot Image couldn't be found"
        return next(err)
    };

    const spot = await selectImage.getSpot();

    /// spot belongs to user
    if (selectImage.id !== spot.ownerId) {
        err.title = "Authorization error";
        err.status = 403;
        err.message = "Cannot delete image from spot not owned by user"
        return next(err)
    };

    selectImage.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})


module.exports = router;
