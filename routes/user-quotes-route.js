const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const fileUploader = require("../config/file-upload.js");
const User = require("../models/user-model");
const Furniture = require("../models/furniture-model");
const Quote = require("../models/quote-model");

    router.get("/collaboration", (req, res, next)=>{
        console.log(Furniture.findOne({isActive :{$eq: false} }));

        Furniture.find({isActive :{$eq: false} })
            .sort({ createdAt: -1})
            .then(queryResult => {
                res.locals.furnitureArray = queryResult;
                res.render("auth-views/user-crafter-concepts-list.hbs");
            })

            .catch(err => next(err));
    });

    router.get("/furnitures/:furnitureId/quote", (req, res, next) => {
        const { furnitureId } = req.params;
    
        Quote.findOne({furniture:furnitureId, crafter: req.user._id})
            .then(quoteDoc=>{
                res.locals.quote = quoteDoc ;

                Furniture.findById(furnitureId)
                    .then(queryResult => {
                        res.locals.furnitureItem = queryResult;
                        res.locals.isShopping = true;
                        res.render("auth-views/user-crafter-like.hbs");
                    })
            
                    .catch(err => next(err));
            })
            .catch(err=> next(err))
    });

    router.get("/collaboration/:furnitureItemId/check",(req, res, next)=>{
        const { furnitureItemId } = req.params;

        Quote
        .create({furniture:furnitureItemId, crafter: req.user._id})

        .catch(err => next(err))
        .then(()=>res.redirect("/collaboration"))


    })

    router.get("/collaboration/:quoteId/delete", (req, res, next)=>{
        const { quoteId } = req.params;

        Quote.findByIdAndRemove(quoteId)
        .catch(err => next(err))
        .then(()=>res.redirect("/collaboration"))
    })

    module.exports = router;