import express from "express";
import RestController from '../controllers/rest.controller';

const controller = new RestController();
const router = express.Router();

router.get("/", controller.uploadImage.bind(controller));
router.get("/another_example", controller.anotherMethod);

module.exports = router;