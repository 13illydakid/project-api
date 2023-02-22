// const express = require('express');
// const router = express.Router();

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
// const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');

// const { check } = require('express-validator');

// const {
//     handleValidationErrors,
//     validateSpot,
//     validateReview,
//     validateBooking,
//     validateSpotImage,
//     validateQuery
// } = require('../../utils/validation');
// const { ifSpotExists, ifUsersSpot, convertDate } = require('../../utils/error-handlers')

// const sequelize = require('sequelize');
// const { Op } = require('sequelize');


// // Get all spots
// router.get('/', validateQuery, async (req, res, next) => {

//     let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query

//     page = Number(page)
//     size = Number(size);

//     if (!page) page = 1
//     if (!size) size = 20
//     if (page > 10) page = 10;
//     if (size > 20) size = 20;

//     let pagination = {}
//     if (parseInt(page) >= 1 && parseInt(size) >= 1) {
//         pagination.limit = size
//         pagination.offset = size * (page - 1)
//     }

//     const query = {
//         where: {},
//         include: [
//             {
//                 model: Review,
//                 attributes: ['stars']
//             },
//             {
//                 model: SpotImage,
//                 attributes: ['url', 'preview']
//             }
//         ],
//         ...pagination,
//     };

//     // Latitude query

//     if (maxLat && !minLat) {
//         query.where.lat = {
//             [Op.lte]: maxLat
//         }
//     };

//     if (!maxLat && minLat) {
//         query.where.lat = {
//             [Op.gte]: minLat
//         }
//     };

//     if (maxLat && minLat) {
//         query.where.lat = {
//             [Op.and]: {
//                 [Op.lte]: maxLat,
//                 [Op.gte]: minLat
//             }
//         }
//     };

//     // Longitude Query

//     if (maxLng && !minLng) {
//         query.where.lng = {
//             [Op.lte]: maxLng
//         }
//     };

//     if (!maxLng && minLng) {
//         query.where.lng = {
//             [Op.gte]: minLng
//         }
//     };

//     if (maxLng && minLng) {
//         query.where.lng = {
//             [Op.and]: {
//                 [Op.lte]: maxLng,
//                 [Op.gte]: minLng
//             }
//         }
//     };

//     // Price Query

//     if (maxPrice && !minPrice) {
//         query.where.price = {
//             [Op.lte]: maxPrice
//         }
//     };

//     if (!maxPrice && minPrice) {
//         query.where.price = {
//             [Op.gte]: minPrice
//         }
//     };

//     if (maxPrice && minPrice) {
//         query.where.price = {
//             [Op.and]: {
//                 [Op.lte]: maxPrice,
//                 [Op.gte]: minPrice
//             }
//         }
//     };

//     let spots = await Spot.findAll(query);

//     let spotsArr = [];

//     spots.forEach(spot => {
//         let eachSpot = spot.toJSON();

//         let count = spot.Reviews.length;
//         let sum = 0;
//         spot.Reviews.forEach((review) => sum += review.stars)
//         let avg = sum / count;
//         if (!avg) {
//             avg = "No current ratings"
//         };

//         eachSpot.avgRating = avg;

//         if (eachSpot.SpotImages.length > 0) {
//             for (let i = 0; i < eachSpot.SpotImages.length; i++) {
//                 if (eachSpot.SpotImages[i].preview === true) {
//                     eachSpot.previewImage = eachSpot.SpotImages[i].url;
//                 }
//             }
//         }

//         if (!eachSpot.previewImage) {
//             eachSpot.previewImage = "No preview image available";
//         }

//         delete eachSpot.Reviews;
//         delete eachSpot.SpotImages
//         spotsArr.push(eachSpot);
//     })

//     if (spotsArr.length === 0) {
//         res.json("Sorry, no current spots")
//     }


//     res.json({
//         Spots: spotsArr,
//         page: page,
//         size: size
//     });
// })

// // Get all spots owned by Current User
// router.get('/current', requireAuth, async (req, res, next) => {
//     let user = req.user;

//     let spots = await user.getSpots({
//         include: [
//             {
//                 model: Review,
//                 attributes: ['stars']
//             },
//             {
//                 model: SpotImage,
//                 attributes: ['url', 'preview']
//             }
//         ]
//     })

//     let ownedSpots = [];

//     spots.forEach(spot => {
//         let eachSpot = spot.toJSON();

//         let count = spot.Reviews.length;
//         let sum = 0;
//         spot.Reviews.forEach((review) => sum += review.stars)
//         let avg = sum / count;
//         if (!avg) {
//             avg = "No current ratings"
//         };

//         eachSpot.avgRating = avg;

//         if (eachSpot.SpotImages.length > 0) {
//             for (let i = 0; i < eachSpot.SpotImages.length; i++) {
//                 if (eachSpot.SpotImages[i].preview === true) {
//                     eachSpot.previewImage = eachSpot.SpotImages[i].url;
//                 }
//             }
//         }

//         if (!eachSpot.previewImage) {
//             eachSpot.previewImage = "No preview image available";
//         }

//         if (!eachSpot.Reviews.length > 0) {
//             eachSpot.Reviews = "No current reviews"
//         }

//         if (!eachSpot.SpotImages.length > 0) {
//             eachSpot.SpotImages = "No current SpotImages"
//         }

//         delete eachSpot.SpotImages;
//         delete eachSpot.Reviews;
//         ownedSpots.push(eachSpot);
//     })


//     if (ownedSpots.length === 0) {
//         res.json("Sorry, you don't own any spots")
//     }

//     res.json({
//         Spots: ownedSpots
//     })
// })


// // Get spot by spotId
// router.get('/:spotId', ifSpotExists, async (req, res, next) => {
//     let { spotId } = req.params;

//     let spot = await Spot.findByPk(spotId);

//     spot = spot.toJSON();

//     let count = await Review.count({
//         where: {
//             spotId: spotId
//         }
//     })
//     spot.numReviews = count;

//     let sum = await Review.sum('stars', {
//         where: {
//             spotId: spotId
//         }
//     })

//     if (sum / count) {
//         spot.avgStarRating = sum / count;
//     } else {
//         spot.avgStarRating = "No current ratings";
//     }

//     let spotImages = await SpotImage.findAll({
//         where: {
//             spotId: spotId
//         },
//         attributes: ['id', 'url', 'preview']
//     })

//     if (spotImages.length > 0) {
//         spot.SpotImages = spotImages;
//     } else {
//         spot.SpotImages = "No images listed"
//     }


//     spot.Owner = await User.findByPk(spot.ownerId, {
//         attributes: ['id', 'firstName', 'lastName']
//     })

//     return res.json(spot)
// })


// /// Create a spot
// router.post('/', requireAuth, validateSpot, async (req, res, next) => {
//     let user = req.user;

//     const { address, city, state, country, lat, lng, name, description, price } = req.body;

//     let newSpot = await Spot.create({
//         ownerId: user.id,
//         address,
//         city,
//         state,
//         country,
//         lat,
//         lng,
//         name,
//         description,
//         price
//     })

//     res.status = 201;
//     return res.json(newSpot)
// })

// /// Add spotimage to spotId
// router.post('/:spotId/images', requireAuth, ifSpotExists, ifUsersSpot, validateSpotImage, async (req, res, next) => {
//     let { spotId } = req.params;
//     let { url, preview } = req.body;

//     const user = req.user;

//     const spot = await Spot.findByPk(spotId);

//     let spotImage = await spot.createSpotImage({
//         url: url,
//         preview: preview
//     })

//     res.json({
//         id: spotImage.id,
//         url: spotImage.url,
//         preview: spotImage.preview
//     });
// })

// /// Edit a Spot
// router.put('/:spotId', requireAuth, ifSpotExists, ifUsersSpot, validateSpot, async (req, res, next) => {

//     const { spotId } = req.params;
//     const { address, city, state, country, lat, lng, name, description, price } = req.body;

//     const spot = await Spot.findByPk(spotId);
//     const user = req.user;

//     spot.address = address;
//     spot.city = city;
//     spot.state = state;
//     spot.country = country;
//     spot.lat = lat;
//     spot.lng = lng;
//     spot.name = name;
//     spot.description = description;
//     spot.price = price;

//     await spot.save()

//     res.json(spot);
// })

// /// Delete a spot
// router.delete('/:spotId', requireAuth, ifSpotExists, ifUsersSpot, async (req, res, next) => {
//     const { spotId } = req.params;

//     const spot = await Spot.findByPk(spotId);
//     const user = req.user;

//     spot.destroy();
//     res.json({
//         message: "Successfully deleted",
//         statusCode: 200
//     })
// })


// /// Get all Reviews by a Spot's id
// router.get('/:spotId/reviews', ifSpotExists, async (req, res, next) => {
//     const { spotId } = req.params;

//     const spot = await Spot.findByPk(spotId);

//     const reviews = await spot.getReviews({
//         include: [
//             {
//                 model: User,
//                 attributes: ['id', 'firstName', 'lastName']
//             },
//             {
//                 model: ReviewImage,
//                 attributes: ['id', 'url']
//             }
//         ]
//     });

//     let reviewsArr = [];
//     reviews.forEach(review => {
//         let eachReview = review.toJSON();

//         if (!eachReview.ReviewImages.length > 0) {
//             eachReview.ReviewImages = "No current review images available"
//         }

//         reviewsArr.push(eachReview);
//     })

//     if (!reviewsArr.length) {
//         return res.json("No reviews for this spot")
//     }


//     res.json({
//         Reviews: reviewsArr
//     });
// })

// // Create a Review for a spot based on the Spot's id
// router.post('/:spotId/reviews', requireAuth, ifSpotExists, validateReview, async (req, res, next) => {
//     const { spotId } = req.params;
//     const { review, stars } = req.body

//     const user = req.user;
//     const spot = await Spot.findByPk(spotId);


//     let existingReview = await Review.findOne({
//         where: {
//             spotId: spotId,
//             userId: user.id
//         }
//     })

//     const err = {};
//     /// If Review exists
//     if (existingReview) {
//         err.title = "Review from the current user already exists for the Spot";
//         err.status = 403;
//         err.message = "User already has a review for this spot";
//         return next(err)
//     }

//     // If Spot belongs to current owner
//     if (spot.ownerId === user.id) {
//         err.title = "User cannot leave review for own spot";
//         err.status = 403;
//         err.message = "This spot is owned by the current user";
//         return next(err)
//     }


//     const newReview = await spot.createReview({
//         userId: user.id,
//         review: review,
//         stars: stars
//     })

//     res.status = 201;
//     res.json(newReview)
// })

// // Get all Bookings for a Spot based on the Spot's id
// router.get('/:spotId/bookings', requireAuth, ifSpotExists, async (req, res, next) => {
//     const { spotId } = req.params;
//     const user = req.user;

//     const spot = await Spot.findByPk(spotId);

//     let bookings = await spot.getBookings({
//         include: {
//             model: User,
//             attributes: ["id", "firstName", "lastName"]
//         }
//     });

//     if (!bookings.length > 0) {
//         return res.json({
//             message: "No bookings for current spot"
//         })
//     }

//     const bookingsArr = [];
//     bookings.forEach(booking => {
//         booking = booking.toJSON();
//         if (user.id !== spot.ownerId) {
//             let eachBooking = {
//                 spotId: booking.spotId,
//                 startDate: booking.startDate,
//                 endDate: booking.endDate
//             };
//             bookingsArr.push(eachBooking);
//         } else {
//             let eachBooking = {
//                 User: booking.User,
//                 spotId: booking.spotId,
//                 userId: booking.userId,
//                 startDate: booking.startDate,
//                 endDate: booking.endDate,
//                 createdAt: booking.createdAt,
//                 updatedAt: booking.updatedAt
//             };
//             bookingsArr.push(eachBooking);
//         }
//     })

//     res.json({
//         Bookings: bookingsArr
//     })
// })

// /// Create a Booking
// router.post('/:spotId/bookings', requireAuth, ifSpotExists, validateBooking, async (req, res, next) => {
//     const { spotId } = req.params;
//     const user = req.user;
//     let { startDate, endDate } = req.body;
//     startDate = convertDate(startDate);
//     endDate = convertDate(endDate);


//     const spot = await Spot.findByPk(spotId);

//     const err = {}

//     if (startDate <= new Date()) {
//         err.title = "Can't make a booking in the past";
//         err.statusCode = 403;
//         err.message = "Start date cannot be before today";
//         return next(err)
//     }

//     if (endDate <= startDate) {
//         err.title = "Validation error";
//         err.statusCode = 400;
//         err.message = "End date cannot be on or before start Date";
//         return next(err);
//     };

//     /// Owner can't make booking on own spot
//     if (user.id === spot.ownerId) {
//         err.title = "Owner can't make booking for owned spot";
//         err.status = 403;
//         err.message = "Current user owns this spot";
//         return next(err);
//     };

//     const bookings = await spot.getBookings();

//     bookings.forEach(booking => {
//         booking = booking.toJSON();
//         err.title = "Booking Conflict";
//         err.status = 403;
//         err.message = "Sorry, this spot is already booked for the specified dates";

//         bookedStartDate = convertDate(booking.startDate);
//         bookedEndDate = convertDate(booking.endDate);

//         if ((bookedStartDate <= startDate) && bookedEndDate >= startDate) {
//             err.errors = [
//                 { startDate: "Start date conflicts with an existing booking" }
//             ]
//             return next(err);
//         } else if (((bookedStartDate <= endDate) && (endDate <= bookedEndDate))) {
//             err.errors = [
//                 { endDate: "End date conflicts with an existing booking" }
//             ]
//             return next(err);
//         } else if ((bookedStartDate >= startDate) && (bookedEndDate <= endDate)) {
//             err.errors = [
//                 { startDate: "Start date conflicts with an existing booking" },
//                 { endDate: "End date conflicts with an existing booking" }
//             ]
//             return next(err);
//         }
//     });

//     if (!err.errors) {
//         let newBooking = await spot.createBooking({
//             userId: user.id,
//             startDate: startDate,
//             endDate: endDate
//         })
//         return res.json(newBooking)
//     };
// });


// module.exports = router;

const express = require('express')
const router = express.Router();
const Sequelize = require("sequelize")
const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');

//Verify authorization
const checkSpotAuthorization = async (req,res,next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const spotJSON = spot.toJSON()
    if (spotJSON.ownerId !== req.user.id) {
        const error = new Error("Forbidden");
        error.status = 403;
        return next(error);
    }
    next()
}

//Check if spot exists
const checkSpot = async (req,res,next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot) {
        const error = new Error("Spot couldn't be found");
        error.status = 404;
        return next(error)
    }
    next()
}

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, checkSpot, async (req,res,next) => {
    //verify req.body is correct
    const { startDate, endDate } = req.body;

    const requestedStartDate = (new Date(startDate)).getTime()
    const requestedEndDate = (new Date(endDate)).getTime()
    if (requestedStartDate >= requestedEndDate) {
        const error = new Error("Validation error")
        error.errors = { "endDate": "endDate cannot be on or before startDate" }
        error.status = 400;
        return next(error)
    }

    //verify there isnt a booking conflict
    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
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
        if(requestedStartDate < bookingStartDate && requestedEndDate > bookingEndDate){
            errors.endDate = "End date conflicts with an existing booking"
            errors.startDate = "Start date conflicts with an existing booking"
        }
    }
    //Sends errors if there is a booking conflict
    if (Object.keys(errors).length) {
        const error = new Error("Sorry, this spot is already booked for the specified dates");
        error.status = 403;
        error.errors = errors;
        return next(error)
    }

    //creates booking
    let newBooking = await Booking.build({
        ...req.body,
        spotId: req.params.spotId,
        userId: req.user.id
    })
    await newBooking.save()

    const verifyBooking = await Booking.findByPk(newBooking.toJSON().id)
    //sends the response body
    res.status(200).json(verifyBooking)

})

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, checkSpot, async (req,res,next) => {
    const { review, stars } = req.body;
    const errors = {};
    if (!review) errors.review = "Review text is required";
    if (!stars || !Number.isInteger(stars) || !(stars >= 1 && stars <= 5)) errors.stars = "Stars must be an integer from 1 to 5";
    if (Object.keys(errors).length) {
        const error = new Error("Validation Error");
        error.status = 400;
        error.errors = errors;
        return next(error);
    }

    const newReview = await Review.build({
        spotId: req.params.spotId,
        userId: req.user.id,
        review: review,
        stars: stars
    });
    await newReview.save()
    const newReviewJSON = newReview.toJSON()

    const verifyReview = await Review.findByPk(newReviewJSON.id);
    res.status(201).json(verifyReview);
})

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, checkSpot, checkSpotAuthorization, async (req,res,next) => {
    const { url, preview } = req.body;

    const spotImages = await SpotImage.findAll({
        where: {
            spotId: req.params.spotId
        }
    })

    //Makes preview false for other images.
    if (preview === true) {
        for (let image of spotImages) {
            const imageJSON = image.toJSON()
            if (imageJSON.preview === true) {
                image.set({ preview: false })
                await image.save()
            }
        }
    }

    const newImage = {
        url: url,
        preview: preview,
        spotId: req.params.spotId
    };

    await SpotImage.create(newImage);
    const verifyImage = await SpotImage.findByPk(req.user.id, {
        attributes: ["id", "url", "preview"]
    });
    res.status(200).json(verifyImage);
})

//Create a Spot
router.post('/', requireAuth,  async (req,res,next) =>{
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = {
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    }
    const errors = {}
    if (!spot.address) errors.address = "Street address is required";
    if (!spot.city) errors.city = "City is required";
    if (!spot.state) errors.state = "State is required";
    if (!spot.country) errors.country = "Country is required";
    if (!spot.lat) errors.lat = "Latitude is not valid";
    if (!spot.lng) errors.lng = "Longitude is not valid";
    if (!spot.name || spot.name.length >= 50) errors.name = "Name must be less than 50 characters";
    if (!spot.description) errors.description = "Description is required";
    if (!spot.price) errors.price = "Price per day is required";
    if (Object.keys(errors).length) {
        const error = new Error("Validation Error")
        error.status = 400
        error.errors = errors
        return next(error)
    }
    spot.ownerId = req.user.id;
    await Spot.create(spot)

    const verifySpot = await Spot.findOne({
        where: {
            address: spot.address
        }
    })

    res.status(201).json(verifySpot)
})

//Edit a spot
router.put('/:spotId', requireAuth, checkSpot, checkSpotAuthorization, async(req,res,next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.findByPk(req.params.spotId)

    const errors = {}
    if (!address) errors.address = "Street address is required";
    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (!country) errors.country = "Country is required";
    if (!lat) errors.lat = "Latitude is not valid";
    if (!lng) errors.lng = "Longitude is not valid";
    if (!name || name.length >= 50) errors.name = "Name must be less than 50 characters";
    if (!description) errors.description = "Description is required";
    if (!price) errors.price = "Price per day is required";

    if(Object.keys(errors).length) {
        const error = new Error("Validation Error")
        error.errors = errors
        error.status = 400;
        return next(error)
    }

    spot.set({
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    })

    await spot.save()

    const verifySpot = await Spot.findByPk(req.params.spotId)
    if (!verifySpot) {
        const error = new Error("Validation Error")
        error.errors = errors
        error.status = 400
        return next(error)
    }

    res.status(200).json(verifySpot)
})

//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, checkSpot, async (req,res,next) => {
    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        attributes: ["id", "spotId", "userId", "startDate", "endDate", "createdAt", "updatedAt"]
    })
    const bookings2 = [];
    for (let booking of bookings) {
        let bookingJSON = booking.toJSON()
        if (booking.userId === req.user.id) {
            bookingJSON = {
                spotId: bookingJSON.spotId,
                startDate: bookingJSON.startDate,
                endDate: bookingJSON.endDate
            }

        } else {
            const user = await User.findByPk(bookingJSON.userId, {
                attributes: ["id", "firstName", "lastName"]
            });
            bookingJSON.User = user;
        }
        bookings2.push(bookingJSON)
    }

    res.status(200).json({ Bookings: bookings2 })
})

//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', checkSpot, async (req,res,next) => {
    const spotId = req.params.spotId;

    const reviews = await Review.findAll({
        where: {
            spotId: spotId
        }
    });

    const reviews2 = []
    for (let review of reviews) {
        const reviewJSON = review.toJSON();
        const user = await User.findByPk(reviewJSON.userId, {
            attributes: ["id", "firstName", "lastName"]
        })
        reviewJSON.User = user

        const reviewImages = await ReviewImage.findAll({
            where: {
                reviewId: reviewJSON.id
            },
            attributes: ["id", "url"]
        });
        reviewJSON.ReviewImages = reviewImages;
        reviews2.push(reviewJSON)
    }

    res.status(200).json({ Reviews: reviews2 })
})


//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req,res,next) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id,
        },
    });

    const spotsV1 = [];

    for (let spot of spots) {
        let spotJSON= spot.toJSON();

        //average rating
        let reviews = await Review.findAll({
            where: {
                spotId: spotJSON.id,
            },
            attributes: [[Sequelize.fn('AVG',Sequelize.col('stars')),'avgRating']]
        })
        spotJSON.avgRating = reviews[0].toJSON().avgRating || 0;
        //preview image
        const image = await SpotImage.findOne({
            where: {
                spotId: spotJSON.id,
                preview: true
            },
        });
        if(image) {
            spotJSON.previewImage = image.toJSON().url
        }
        spotsV1.push(spotJSON);

    }


    res.status(200).json({ Spots: spotsV1 });

})

//Get details of a Spot from an id
router.get('/:spotId', checkSpot, async (req,res,next) => {
    const spotId = req.params.spotId;
    let spot = await Spot.findByPk(spotId, {
        include: {
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        }
    })
    spotJSON = spot.toJSON()

    //Number of reviews
    spotJSON.numReviews = await Review.count({
        where: {
            spotId: spotJSON.id
        }
    })

    //Average review rating
    let reviews = await Review.findAll({
        where: {
            spotId: spotJSON.id,
        },
        attributes: [[Sequelize.fn('AVG',Sequelize.col('stars')),'avgRating']]
    })
    reviews = reviews[0].toJSON();
    spotJSON.avgRating = reviews.avgRating || 0;

    //Owner information
    const owner = await User.findByPk(spotJSON.ownerId, {
        attributes: ['id', 'firstName', 'lastName']
    });
    const ownerJSON = owner.toJSON();
    spotJSON.Owner = ownerJSON;

    res.status(200).json(spotJSON);
})

//Get all spots
router.get('/', async (req,res,next) => {
    const spots = await Spot.findAll();
    const spotsV1 = [];

    for (let spot of spots) {
        let spotToJSON= spot.toJSON();
        let reviews = await Review.findAll({
            where: {
                spotId: spotToJSON.id,
            },
            attributes: [[Sequelize.fn('AVG',Sequelize.col('stars')),'avgRating']]
        })
        reviews = reviews[0].toJSON();
        spotToJSON.avgRating = reviews.avgRating || 0;

        let image = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true,
            }
        })
        if (image) {
            image = image.toJSON()
            spotToJSON.previewImage = image.url
        }
        spotsV1.push(spotToJSON);
    }

    const page = req.query.page === undefined ? 1 : parseInt(req.query.page);
    const size = req.query.size === undefined ? 20 : parseInt(req.query.size);
    let pagination = {}

    if (page > 10) page = 10;
    if (size > 20) size = 20;

    const errors = {}
    if (page < 1) errors.page = "Page must be greater than or equal to 1";
    if (size < 1) errors.size = "Page must be greater than or equal to 1";
    if (Object.keys(errors).length) {
        const error = new Error("Validation Error");
        errors.status(400);
        error.errors = errors;
        return next(error);
    }

    pagination.limit = size
    pagination.offset = size * (page - 1)



    return res.status(200).json({
        Spots: spotsV1,
        ...pagination
    });
})

//Delete a spot
router.delete('/:spotId', requireAuth, checkSpot, checkSpotAuthorization, async (req,res,next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    await spot.destroy()
    res.status(200).json("Successfully deleted")
})

module.exports = router;
