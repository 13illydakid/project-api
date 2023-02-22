// const express = require('express');
// const router = express.Router();

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
// const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');

// const { check } = require('express-validator');
// const { handleValidationErrors, validateBooking } = require('../../utils/validation');
// const sequelize = require('sequelize');

// const { convertDate, ifBookingExists } = require('../../utils/error-handlers')


// // Get bookings for current user
// router.get("/current", requireAuth, async (req, res, next) => {
//     const user = req.user;

//     const bookings = await user.getBookings({
//         include: [{
//             model: Spot,
//             attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
//             include: [{
//                 model: SpotImage,
//                 attributes: ['url']
//             }]
//         }]
//     });

//     if (!bookings.length > 0) {
//         return res.json({
//             message: "No bookings for current spot"
//         })
//     }

//     const bookingsArr = [];
//     bookings.forEach(booking => {
//         booking = booking.toJSON();
//         if (booking.Spot.SpotImages.length > 0) {
//             for (let i = 0; i < booking.Spot.SpotImages.length; i++) {
//                 if (booking.Spot.SpotImages[i].preview === true) {
//                     booking.Spot.previewImage = booking.Spot.SpotImages[i].url;
//                 }
//             }
//         }

//         if (!booking.Spot.previewImage) {
//             booking.Spot.previewImage = "No preview image available";
//         }

//         delete booking.Spot.SpotImages;
//         const eachBooking = {
//             id: booking.id,
//             spotId: booking.spotId,
//             Spot: booking.Spot,
//             userId: booking.userId,
//             startDate: booking.startDate,
//             endDate: booking.endDate,
//             createdAt: booking.createdAt,
//             updatedAt: booking.updatedAt
//         }
//         bookingsArr.push(eachBooking);
//     })

//     res.json({
//         Bookings: bookingsArr
//     })
// })

// // Edit a Booking
// router.put('/:bookingId', requireAuth, ifBookingExists, validateBooking, async (req, res, next) => {
//     const { bookingId } = req.params;
//     const user = req.user;
//     let { startDate, endDate } = req.body;
//     startDate = convertDate(startDate);
//     endDate = convertDate(endDate);

//     let bookingToEdit = await Booking.findByPk(bookingId);

//     let err = {};
//     if (startDate <= new Date()) {
//         err.title = "Can't start a booking in the past";
//         err.status = 403;
//         err.message = "Start date cannot be before today"
//         return next(err)
//     }

//     bookingStartDate = convertDate(bookingToEdit.startDate);
//     bookingEndDate = convertDate(bookingToEdit.endDate);
//     const spotId = bookingToEdit.spotId;

//     if (bookingEndDate < new Date()) {
//         err.title = "Can't edit a booking that's past the end date";
//         err.status = 403;
//         err.message = "Past bookings can't be modified";
//         return next(err);
//     };

//     if (endDate <= startDate) {
//         err.title = "Validation error";
//         err.statusCode = 400;
//         err.message = "endDate cannot be on or before startDate";
//         return next(err);
//     };

//     /// If booking belongs to current user
//     if (user.id !== bookingToEdit.userId) {
//         err.title = "Authorization error";
//         err.status = 403;
//         err.message = "Booking doesn't belong to current user";
//         return next(err);
//     }

//     const spot = await Spot.findByPk(spotId);

//     const bookings = await spot.getBookings();

//     bookings.forEach(booking => {
//         if (booking.id !== bookingToEdit.id) {


//             booking = booking.toJSON();
//             err.title = "Booking Conflict";
//             err.status = 403;
//             err.message = "Sorry, this spot is already booked for the specified dates";

//             bookedStartDate = convertDate(booking.startDate);
//             bookedEndDate = convertDate(booking.endDate);

//             if ((bookedStartDate <= startDate) && bookedEndDate >= startDate) {
//                 err.errors = [
//                     { startDate: "Start date conflicts with an existing booking" }
//                 ]
//                 return next(err);
//             } else if (((bookedStartDate <= endDate) && (endDate <= bookedEndDate))) {
//                 err.errors = [
//                     { endDate: "End date conflicts with an existing booking" }
//                 ]
//                 return next(err);
//             } else if ((bookedStartDate >= startDate) && (bookedEndDate <= endDate)) {
//                 err.errors = [
//                     { startDate: "Start date conflicts with an existing booking" },
//                     { endDate: "End date conflicts with an existing booking" }
//                 ]
//                 return next(err);
//             }
//         }

//     });

//     if (!err.errors) {
//         bookingToEdit.startDate = startDate;
//         bookingToEdit.endDate = endDate;
//         bookingToEdit.save();
//         res.json(bookingToEdit)
//     }
// })

// // Delete a Booking
// router.delete('/:bookingId', requireAuth, ifBookingExists, async (req, res, next) => {
//     const { bookingId } = req.params;
//     const user = req.user;

//     let booking = await Booking.findByPk(bookingId);

//     let spot = await booking.getSpot();

//     let err = {};
//     // If booking doesn't belong to user or spot owner
//     if (user.id !== booking.userId && user.id !== spot.ownerId) {
//         err.title = "Authorization error";
//         err.status = 403;
//         err.message = "Booking doesn't belong to current user";
//         return next(err);
//     }

//     const startDate = convertDate(booking.startDate);

//     if (startDate <= new Date()) {
//         err.title = "Bookings that have been started or completed can't be deleted";
//         err.status = 403;
//         err.message = "Bookings that have been started or completed can't be deleted";
//         return next(err)
//     };

//     booking.destroy();
//     return res.json({
//         "message": "Successfully deleted",
//         "statusCode": 200
//     })
// })



// module.exports = router;


const express = require('express')
const router = express.Router();
const Sequelize = require("sequelize")
const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');
const { Op } = require("sequelize");

//Verify authorization
const checkBookingAuthorization = async (req,res,next) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    const bookingJSON = booking.toJSON()
    if (bookingJSON.userId !== req.user.id) {
        const error = new Error("Forbidden");
        error.status = 403;
        return next(error);
    }
    next()
}

//Check if booking exists
const checkBooking = async (req,res,next) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    if(!booking) {
        const error = new Error("Booking couldn't be found");
        error.status = 404;
        return next(error)
    }
    next()
}

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req,res,next) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        attributes: ["id", "spotId", "userId", "startDate", "endDate", "createdAt", "updatedAt"]
    });

    const bookings1 = [];
    for (let booking of bookings) {
        const bookingJSON = booking.toJSON()
        const spot = await Spot.scope('omitTimes').findByPk(bookingJSON.spotId);
        spotJSON = spot.toJSON()
        const preview = await SpotImage.findOne({
            where: {
                spotId: spotJSON.id
            }
        })
        spotJSON.previewImage = preview.toJSON().url;
        bookingJSON.Spot = spotJSON;
        bookings1.push(bookingJSON);
    }

    res.status(200).json({ Bookings: bookings1 });
})

//Edit a Booking
router.put('/:bookingId', requireAuth, checkBooking, checkBookingAuthorization, async (req,res,next) => {
    //verify if booking exists
    const booking = await Booking.findByPk(req.params.bookingId)
    const bookingJSON = booking.toJSON()

    const { startDate, endDate } = req.body;

    const requestedStartDate = new Date(startDate).getTime();
    const requestedEndDate = new Date(endDate).getTime();
    //verify if startdate is before enddate in req body
    if (requestedStartDate >= requestedEndDate) {
        const error = new Error("Validation error")
        error.errors = { "endDate": "endDate cannot be on or before startDate" }
        error.status = 400;
        return next(error)
    };

    //verify if booking is in the past, past bookings cant be modified
    if (new Date().getTime() >= requestedEndDate || new Date().getTime() >= requestedStartDate) {
        const error = new Error("Past bookings can't be modified");
        error.status = 403;
        return next(error);
    };

    //verify there isnt a booking conflict
    const bookings = await Booking.findAll({
        where: {
            spotId: booking.toJSON().spotId,
            id: {
                [Op.ne]: req.params.bookingId
            }
        }
    })

    const errors = {}
    for (let booking of bookings) {
        const bookingJSON = booking.toJSON();
        //booking records start and end dates are parsed below
        const bookingStartDate = bookingJSON.startDate.getTime()
        const bookingEndDate = bookingJSON.endDate.getTime()
        //verifying if there is a conflict with dates below
        if (requestedStartDate >= bookingStartDate && requestedStartDate < bookingEndDate) errors.startDate = "Start date conflicts with an existing booking";
        if (requestedEndDate <= bookingEndDate && requestedEndDate > bookingStartDate) errors.endDate = "End date conflicts with an existing booking";
        if(requestedStartDate <= bookingStartDate && requestedEndDate >= bookingEndDate){
            errors.endDate = "End date conflicts with an existing booking"
            errors.startDate = "Start date conflicts with an existing booking"
        }
    }
    //Sends errors if there is a booking conflict
    if (Object.keys(errors).length) {
        const error = new Error("Sorry, this spot is already booked for the specified dates");
        error.status = 403;
        error.errors = errors;
        return next(error);
    }

    //edits and saves booking
    booking.set({
        startDate: new Date(startDate),
        endDate: new Date(endDate)
    });
    await booking.save();

    //verifys booking is in the database
    const verifyBooking = await Booking.findByPk(bookingJSON.id)
    //sends the response body
    res.status(200).json(verifyBooking)
})

//Delete a Booking
router.delete("/:bookingId", requireAuth, checkBooking, checkBookingAuthorization, async(req,res,next) => {
    const booking = await Booking.findByPk(req.params.bookingId);

    const { startDate, endDate } = booking;
    const currentDate = new Date().getTime();
    if (currentDate <= endDate || currentDate >= startDate) {
        const error = new Error("Bookings that have been started can't be deleted");
        error.status = 403;
        return next(error);
    }

    await booking.destroy();
    res.status(200).json("Successfully deleted")
})

module.exports = router;
