import express from "express";
import RestController from '../controllers/rest.controller';
const router = express.Router();

router.get("/", RestController.generateImage);

module.exports = router;