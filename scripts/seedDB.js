const mongoose = require("mongoose");
const db = require("../models");

// This file empties the collection and inserts the data below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/virtualFridge", { useNewUrlParser: true });

const fridgeSeed = {
    family_id: '8675309',
    user_id: '6834',
    items: [
        {
            name: 'banana',
            quantity: 10
        },
        {
            name: 'peanuts',
            quantity: 6,
        },
        {
            name: 'dog food',
            quantity: 1
        }     
    ],
    date: Date.now
}

db.Fridge
    .remove({})
    .then(() => db.Fridge.collection.insert(fridgeSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const familySeed = {
    family_id: '8675309',
    user_id: '6834'
}

db.Family
    .remove({})
    .then(() => db.Family.collection.insert(familySeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const userSeed = {
    name: 'Chris',
    family_id: '8675309',
    fridge_id: '101010',
    image: 'https://www.fillmurray.com/200/300',
    date: Date.now
}

db.User
    .remove({})
    .then(() => db.User.collection.insert(userSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });