const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');

const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
