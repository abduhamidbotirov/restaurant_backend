import bossSchema from '../schemas/boss.schema.js';
import Restaurant from '../schemas/restuarant.schema.js';
import {
    JWT
} from '../utils/jwt.js';

class RestaurantController {
    // Create a new restaurant
    async create(req, res) {
        const restaurant = new Restaurant(req.body);
        try {
            await bossSchema.findByIdAndUpdate("644bf1d933bf77f600a944ff", {
                $push: {
                    restaurant: restaurant._id
                }
            })
            await restaurant.save();
            res.status(201).send(restaurant);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // Get all restaurants
    async findAll(req, res) {
        try {
            const restaurants = await Restaurant.find();
            res.send(restaurants);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    // Get a single restaurant by ID
    async findOne(req, res) {
        try {
            const restaurant = await Restaurant.findById(req.params.id).
            populate('resource').populate("workers").populate("users").populate('foods').
            populate('zakaz').populate('contactUs').populate('hero').populate('choose').
            populate('photos').populate('events').populate('space');
            if (!restaurant) {
                return res.status(404).send();
            }
            res.send(restaurant);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // Update a restaurant by ID
    async update(req, res) {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['rest_name', 'rest_year', 'description', 'contact', 'rest_img'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));
        if (!isValidOperation) {
            return res.status(400).send({
                error: 'Invalid updates!'
            });
        }

        try {
            const restaurant = await Restaurant.findByIdAndUpdate(
                req.params.id,
                req.body, {
                    new: true
                }
            );
            if (!restaurant) {
                return res.status(404).send();
            }
            res.send({
                data: restaurant,
                success: "ok",
            });
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // Delete a restaurant by ID
    async delete(req, res) {
        try {
            const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
            if (!restaurant) {
                return res.status(404).send();
            }
            res.send(restaurant);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default RestaurantController;