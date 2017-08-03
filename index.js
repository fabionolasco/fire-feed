const EXPRESS = require('express');
const FIREBASE = require('firebase');
const APP = EXPRESS();
const CONFIG = require('./config.js');

const FIRE = FIREBASE.initializeApp(CONFIG.firebaseAccount);

const REF = {};

CONFIG.content.forEach((source) => {

    REF[source.url] = typeof REF[source.url] !== 'undefined' ? REF[source.url] : FIRE.database().ref(source.firebaseSource);

    APP.get('/' + source.url, (req, res) => {
        REF[source.url].orderByKey()
            .limitToLast(source.numberRecords)
            .once('value')
            .then((snapshot) => {
                const data = snapshot.val();
                const keys = Object.keys(data)
                const postsResult = []
                keys.forEach((key) => {
                    postsResult.push(data[key])
                })
                const result = {posts: postsResult.slice(0)};
                res.send('<pre>' + JSON.stringify(result, null, 4) + '</pre>');
                // res.send('<pre>' + Object.keys(blog) + '</pre>');
            });
    });

});

APP.get('/', (req, res) => {
    const result = [];
    CONFIG.content.forEach((source) => {
        result.push('<a href="/' + source.url +'">' + source.url + '</a>');
    });
    res.send(result.join(' '));
});

APP.listen(CONFIG.port);