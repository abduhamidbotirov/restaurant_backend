import express from "express";
import path from "path";
import "../utils/mongo.js";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
dotenv.config();
import cors from "cors";
import errorMiddleware from "../middleware/errorHandler.js";
import bossRoutes from '../routes/boss.routes.js';
import resturantRoutes from '../routes/restaurant.routes.js';
import resoursceRoutes from '../routes/resource.routes.js';
import usersRoutes from '../routes/users.routes.js';
import workersRoutes from '../routes/workers.routes.js';
import foodRoutes from "../routes/foods.routes.js";
import zakazRoutes from "../routes/zakaz.routes.js"
import contactRoutes from "../routes/contact.routes.js"
import Heroroutes from "../routes/hero.routes.js"
import chooseRoutes from "../routes/choose.routes.js"
import photoRoutes from "../routes/photos.routes.js"
import specialsRoutes from "../routes/specials.routes.js"
import eventsRoutes from "../routes/events.routes.js"
const PORT = process.env.PORT || 3000;
const app = express();
app.use(fileUpload({
    limits: {
        fileSize: 50 * 1024 * 1024
    }
}));
app.use(express.json());
app.use(cors('*'));
app.use(express.static(path.join(process.cwd(), "public")));
// app.engine("html", ejs.renderFile);
// app.set("view engine", "html");
// app.set(".html", path.join(process.cwd(), "views"));
// app.use(bodyParser.json());
// app.use(express.static("./public"));
app.use(express.json());
// User routes
app.use('/api', bossRoutes);
app.use('/api', usersRoutes);
app.use('/api', workersRoutes);
app.use('/api', resturantRoutes);
app.use('/api', resoursceRoutes);
app.use('/api', foodRoutes);
app.use('/api', zakazRoutes);
app.use('/api', contactRoutes);
app.use('/api', Heroroutes);
app.use('/api', chooseRoutes);
app.use('/api', photoRoutes);
app.use('/api', specialsRoutes);
app.use('/api', eventsRoutes);
app.use(errorMiddleware)
// Post routes 
// app.use('/api', postRoutes);

// Comment routes
// app.use('/api', commentRoutes);

app.listen(PORT, () => {
    console.log("Service listening on port " + PORT);
});


// contact: {
//     type: String,
//     required: true,
//     validate: {
//         validator: (value) => {
//             const regex = /^\+998\d{9}$/;
//             return regex.test(value);
//         },
//         message: 'Telefon raqami noto‘g‘ri formatda yuborilgan.'
//     },
//     set: (value) => value.replace(/[^0-9+]/g, '') 
// }


//   password: {
//       type: String,
//       required: true,  
//       validate: {
//           validator: (value) => Joi.string().min(6).required().validate(value).error === null,
//           message: 'Parol kamida 6 belgidan iborat bo‘lishi kerak.'
//       }
//   },


//   email: {
//       type: String,
//       unique: true,
//       validate: {
//           validator: (value) => Joi.string().email().required().validate(value).error === null,
//           message: 'Email maydoni noto‘g‘ri formatda yuborilgan.'
//       },
//   },