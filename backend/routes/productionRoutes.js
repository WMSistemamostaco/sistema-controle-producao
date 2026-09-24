const express = require("express");

const {
    getAllProductions,
    getProductionById,
    createProduction,
    updateProduction,
    deleteProduction
} = require("../controllers/productionController");

const router =
    express.Router();


router.get(
    "/",
    getAllProductions
);


router.get(
    "/:id",
    getProductionById
);


router.post(
    "/",
    createProduction
);


router.put(
    "/:id",
    updateProduction
);


router.delete(
    "/:id",
    deleteProduction
);


module.exports = router;
