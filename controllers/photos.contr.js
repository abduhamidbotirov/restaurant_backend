import hero from "../schemas/photos.schema.js";
import Restaurant from './../schemas/restuarant.schema.js';
import path from "path"
import fs from "fs"

function pathJoin(filename) {
    const newPath = filename.split(' ').join('-');
    return path.normalize(newPath);
}

function isFile(filePath) {
    try {
        return fs.statSync(filePath).isFile()
    } catch (error) {
        return false
    }
}
class HeroController {
    // Create new food item
    static async createFoodItem(req, res) {
        try {
            let {
                res_id,
            } = req.body;
            let {
                file
            } = req.files;
            if (file.truncated) throw new Error('you must send max 50 mb file');
            let types = file.name.split('.')
            let typeImg = types[types.length - 1]
            const random = Math.floor(Math.random() * 9000 + 1000)
            let userUploadusername = pathJoin(res_id + random + '.' + typeImg)
            await file.mv(
                path.join(
                    process.cwd(),
                    'public',
                    'imgs',
                    userUploadusername
                )
            )
            req.body.imgLink = userUploadusername;
            const foodItem = new hero({
                imgLink: userUploadusername,
                res_id,
            });
            await Restaurant.findByIdAndUpdate(req.body.res_id, {
                $push: {
                    photos: foodItem._id
                }
            })
            await foodItem.save();
            res.status(201).json(foodItem);
        } catch (err) {
            console.log('err :', err);
            res.status(400).json({
                message: err.message
            });
        }
    }

    // Get all food items
    static async getAllFoodItems(req, res) {
        try {
            const foodItems = await hero.find();
            res.json(foodItems);
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    // Get single food item by id
    static async getFoodItemById(req, res) {
        try {
            const foodItem = await hero.findById(req.params.id);
            if (!foodItem) {
                return res.status(404).json({
                    message: 'Food item not found'
                });
            }
            res.json(foodItem);
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }
    // Update a food item by id
    static async updateFoodItemById(req, res) {
        try {
            if (req.body) {
                let {
                    file
                } = req.files;

                if (file.truncated) throw new Error('you must send max 50 mb file')
                let types = file.name.split('.')
                let type = types[types.length - 1]
                const random = Math.floor(Math.random() * 9000 + 1000)
                let userUploadusername = pathJoin(req.body.title + random + '.' + type)

                const foodItem = await hero.findById(req.params.id);


                if (!foodItem) {
                    return res.status(404).json({
                        message: 'Food item not found'
                    });
                }
                req.body.imgLink = userUploadusername
                if (isFile(path.join(process.cwd(), 'public', 'imgs', foodItem.imgLink ? foodItem.imgLink : ""))) {
                    fs.unlinkSync(path.join(process.cwd(), 'public', "imgs", foodItem.imgLink ? foodItem.imgLink : ""))
                }
                foodItem.imgLink = req.body.imgLink || foodItem.imgLink;
                foodItem.res_id = req.body.res_id || foodItem.res_id;
                const updatedFoodItem = await foodItem.save();
                await file.mv(
                    path.join(
                        process.cwd(),
                        'public',
                        'imgs',
                        userUploadusername
                    )
                )
                res.json(updatedFoodItem);
            } else {
                const restaurant = await hero.findByIdAndUpdate(
                    req.params.id,
                    req.body, {
                        new: true
                    }
                );
                if (!restaurant) {
                    return res.status(404).send();
                }
                await restaurant.save();
                res.send({
                    data: restaurant,
                    success: "ok",
                });
            }
        } catch (err) {
            res.status(400).json({
                message: err.message
            });
        }
    }
    // Delete a food item by id
    static async deleteFoodItemById(req, res) {
        try {
            const foodItem = await hero.findById(req.params.id);
            if (!foodItem) {
                return res.status(404).json({
                    message: 'Food item not found'
                });
            }
            if (isFile(path.join(process.cwd(), 'public', 'imgs', foodItem.imgLink ? foodItem.imgLink : ""))) {
                fs.unlinkSync(path.join(process.cwd(), 'public', "imgs", foodItem.imgLink ? foodItem.imgLink : ""))
            }
            await foodItem.deleteOne();
            res.json({
                message: 'Hero item deleted successfully'
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }
}
export default HeroController;