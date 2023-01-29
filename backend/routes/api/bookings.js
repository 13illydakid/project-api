const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');

const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

//Get all of the Current User's Booking
router.get('/current', requireAuth, async (req, res) => {
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
    for (let booking of bookings) {
        let bookingStr = booking.toJSON();
        userAllBookings.push(bookingStr);
    }
    for (let booking of userAllBookings) {
        // const previewImage = booking.Spot.SpotImages;
        for (let image of booking.Spot.SpotImages) {
            if (image.preview) {
                booking.Spot.previewImage = image.url;
            } else {
                booking.Spot.previewImage = 'Preview image not available';
            }
        }
        arrayBookings.push(booking);
    }
    return res.json({ Bookings: arrayBookings });
});
//edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const starting = new Date(startDate);
    const ending = new Date(endDate);

    const { bookingId } = req.params;
    const { user } = req;

    const selectBooking = await Booking.findOne({
        where: {
            id: bookingId
        }
    });
    //Error if Booking is not found
    if (!selectBooking) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404,
        });
    }
    //User does not have the correct authorization
    if (selectBooking.userId !== user.Id) {
        res.status(403);
        return res.json({
            message: "Forbidden",
            statusCode: 403
        });
    }

    // if startDate is after endDate
    if (starting.getTime() >= ending.getTime()) {
        res.status(400);
        return res.json({
            message: 'Validation error',
            statusCode: 400,
            errors: [
                'endDate cannot come before startDate'
            ]
        });
    }
    //Can't edit a booking that's past the end date
    const today = new Date();
    if (today > ending.getTime()) {
        res.statusCode(403);
        return res.json({
            message: "Forbidden",
            statusCode: 403,
            errors: [
                "Past bookings can't be modified"
            ]
        });
    }
    //Booking conflict
    const selectBookingSpotId = selectBooking.spotId;
    const reservations = await Booking.findAll({
        where: {
            selectBookingSpotId,
        }
    });
    for (let reserved of reservations) {
        if ((starting.getTime() === reserved.startDate.getTime()) || ((starting.getTime() > reserved.startDate.getTime()) && (reserved.endDate.getTime() > starting.getTime()))) {
            res.status(403);
            return res.json({
                message: "Sorry, this spotis already booked for the specified dates",
                statusCode: 403,
                errors: [
                    'Start date conflicts with an existing booking'
                ]
            });
        }
        if ((ending.getTime() === reserved.endDate.getTime()) || ((ending.getTime() > reserved.startDate.getTime()) && (reserved.endDate.getTime() > ending.getTime()))) {
            res.status(403);
            return res.json({
                message: "Sorry, this spotis already booked for the specified dates",
                statusCode: 403,
                errors: [
                    'End date conflicts with an existing booking'
                ]
            });
        }
    }
    function confirmChange() {
        selectBooking.update({
            startDate,
            endDate
        });
        res.json(selectBooking);
    }
    confirmChange();
});

//delete a Booking
router.delete('/:bookingId', requireAuth, async(req, res, next)=>{
    const { bookingId } = req.params;
    const { user } = req;
    const selectBooking = await Booking.findOne({
        where: {
            id: bookingId
        }
    });
    if (!selectBooking) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404,
        });
    }
    const today = new Date();
    const starting = new Date(selectBooking.startDate);
    if(starting.getTime() <= today.getTime()){
        res.status(403);
        return res.json({
            message: "Forbidden",
            statusCode: 403,
            errors: [
                "Past bookings can't be modified"
            ]
        });
    }
    const selectSpot = await Spot.findOne({
        where: {
            id: selectBooking.spotId
        }
    });
    if((user.id === selectBooking.userId) && (user.id === selectSpot.ownerId)){
        await selectBooking.destroy();
        res.status(200);
        return res.json({
            message: 'Successfully deleted',
            statusCode: 200
        });
    } else{
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403
        });
    }
});

module.exports = router;
