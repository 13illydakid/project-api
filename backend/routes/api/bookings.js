const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');

const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

//Get all of the Current User's Booking
router.get('/current', requireAuth, async(req, res) => {
    const currentUserId = req.user.id;
    const bookings = await Booking.findAll({
        where: { userId: currentUserId },
        include: [
            {
                model: Spot,
                include: [{
                    model: SpotImage
                }],
                attributes: {
                    excludes: ['description', 'createdAt', 'updatedAt']
                },
            }
        ],
    });
    const userAllBookings = [];
    const arrayBookings = [];
    for(let booking of bookings){
        let bookingStr = booking.toJSON();
        userAllBookings.push(bookingStr);
    }
    for(let booking of userAllBookings){
        // const previewImage = booking.Spot.SpotImages;
        for(let image of booking.Spot.SpotImages){
            if(image.preview){
                booking.Spot.previewImage = image.url;
            } else{
                booking.Spot.previewImage = 'Preview image not available';
            }
        }
        arrayBookings.push(booking);
    }
    return res.json({ Bookings: arrayBookings });
});
//edit a booking
router.put('/:bookingId', requireAuth, async(req, res) => {
    const { startDate, endDate } = req.body;

    const selectBooking = await Booking.findOne({
        where: {
            id: bookingId,
        }
    });
    if(!selectBooking){
        res.status(404);
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404,
        });
    }
})
