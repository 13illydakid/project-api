const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');

const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

//Delete an Image for a Spot
router.delete('/:imageId', requireAuth, async(req, res, next)=>{
    const imageId = req.params.imageId;
    const selectImage = await SpotImage.findByPk(imageId);

    const currUserId = req.user.id;
    const selectSpot = await Spot.findOne({
        where: {
            id: selectSpot.spotId
        }
    });

    if(!selectImage){
        res.status(404);
        return res.json({
            message: "Spot Image couldn't be found",
            statusCode: 404,
        });
    }
    if(currUserId !== selectSpot.Review.userId){
        res.status(403);
        return res.json({
            message: "Forbidden",
            statusCode: 403,
            errors: [
                "You are not authorized for this task"
            ]
        });
    } else{
        await selectImage.destroy();
        res.status(200);
        return res.json({
            message: 'Successfully deleted',
            statusCode: 200
        });
    }
});

module.exports = router;
