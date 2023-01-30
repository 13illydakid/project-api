


const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { validateUrl } = require('../../utils/validation');
const { Spot, SpotImage, Review, ReviewImage } = require('../../db/models');
