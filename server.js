const EXPRESS = require('express');
const FIREBASE = require('firebase');
const FEED = require('./feed.js')
const FS = require("fs");
const PATH = require("path");
const CONFIG = require('./config.js');
const HTTPS = require('https');
const isSsl = process.env.ssl || false

// Start APP
const APP = EXPRESS();
APP.use(require('helmet')());

// Start Firebase
const FIRE = FIREBASE.initializeApp(CONFIG.firebaseAccount);
const REF = {};

// Start Feed Builded
CONFIG.content.forEach((source) => {
    CONFIG.feed.feedLinks.rss = CONFIG.feed.rssBase;
    CONFIG.feed.feedLinks.atom = CONFIG.feed.atomBase;
});
let feed = new FEED(CONFIG.feed);

// SSL
const SSLOPTIONS = {};
if (isSsl && CONFIG.useSsl) {
    SSLOPTIONS.cert = FS.readFileSync(CONFIG.useSsl.cert);
    SSLOPTIONS.key = FS.readFileSync(CONFIG.useSsl.key);
}

// Add Posts to Feed
CONFIG.content.forEach((source) => {
    REF[source.url] = typeof REF[source.url] !== 'undefined' ? REF[source.url] : FIRE.database().ref(source.firebaseSource);
    REF[source.url].orderByKey()
        .limitToLast(source.numberRecords)
        .once('value')
        .then((snapshot) => {
            const data = snapshot.val();
            const keys = Object.keys(data)
            const postsResult = []
            keys.forEach((key) => {
                postsResult.push(data[key])
                addPost(data[key], source.url)
            })
        });
});

// Build URLs
APP.get('/', (req, res) => {
    const filename = PATH.join(process.cwd(), 'index.html')
    FS.readFile(filename, 'binary', function (err, file) {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.write(err + "\n");
            res.end();
            return;
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(file, "binary");
        res.end();
    });
});
APP.get('/rss', (req, res) => {
    res.setHeader('content-type', 'application/xml');
    res.send(feed.rss2());
});
APP.get('/atom', (req, res) => {
    res.setHeader('content-type', 'application/xml');
    res.send(feed.atom1());
});

// Add Posts to Feed Plugin
function addPost(post, sourceUrl) {
    postItem = {
        title: post.title,
        id: CONFIG.feed.link + sourceUrl + '/' + post.slug,
        guid: post.guid + post.slug,
        link: CONFIG.feed.link + sourceUrl + '/' + post.slug,
        description: post.description.substring(0, 300) + '...',
        content: post.content,
        categories: post.keywords.split(','),
        author: [
            {
                name: CONFIG.feed.author.name,
                link: CONFIG.feed.author.link
            }
        ],
        date: new Date(post.pubDate),
        image: CONFIG.feed.imageBase + post.imageName
    };
    // If image is using resolution control, bring it to 1x
    if (postItem.image.indexOf('@0x') > -1) {
        postItem.image = postItem.image.replace('@0x', '@1x');
    }
    feed.addItem(postItem);
}

// Start Listening
APP.listen(CONFIG.port);
console.log('Listening on port ' + CONFIG.port);
if (isSsl && CONFIG.useSsl) {
    HTTPS.createServer(SSLOPTIONS, APP).listen(CONFIG.useSsl.port);
    console.log('Listening SLL on port ' + CONFIG.useSsl.port);
}
