import express from "express";
import { body, validationResult } from "express-validator";
import fs from "fs";

const app = express();
const PORT = 9095;

const guests = [];

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", { persons: guests, errors: null });
});

app.post("/add",
    body("personvorname").isLength({ min: 1, max: 50 }),
    body("personnachname").isLength({ min: 1, max: 50 }),
    body('personemail').isEmail(),
    body("personmessage").isLength({ min: 1, max: 100 }),

    (req, res) => {
        // console.log(req.body.personname);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render("index", { persons: guests, errors });
        }

        guests.push({ vorname: req.body.personvorname, nachname: req.body.personnachname, email: req.body.personemail, message: req.body.personmessage });
        console.log(guests);
        res.render("index", { persons: guests, errors: null });
    });


app.listen(PORT, () => {
    console.log("the server is running on port:", PORT);
});