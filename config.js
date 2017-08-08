const Personal = require('./personal.js');

module.exports = {
    port: 3322,
    useSsl: { // false || object{cert, key, port}
        cert: Personal.cert,
        key: Personal.key,
        port: 3323
    }, 
    content: [
        // The posts of these elements will be combined into one feed
        // For multiple feeds (for now) pelase instanciate multiple version of this script
        {
            url: 'blog',
            firebaseSource: 'blog/posts',
            numberRecords: 3
        },
        {
            url: 'projects',
            firebaseSource: 'projects/posts',
            numberRecords: 3
        }
    ],
    firebaseAccount: {
        apiKey: Personal.firebaseApiKey,
        authDomain: 'fabionolasco-91850.firebaseapp.com',
        databaseURL: 'https://fabionolasco-91850.firebaseio.com',
        projectId: 'fabionolasco-91850',
        storageBucket: 'fabionolasco-91850.appspot.com',
        messagingSenderId: '471822727829'
    },
    feed: {
        title: 'Fabio Nolasco - Frontend Development',
        description: 'News feed from Fabionolasco.com!',
        id: 'https://fabionolasco.com',
        link: 'https://fabionolasco.com/',
        image: 'https://fabionolasco.com/image.png',
        favicon: 'https://fabionolasco.com/favicon.ico',
        copyright: 'All rights reserved ' + new Date().getFullYear() + ', Fabio Nolasco',
        updated: new Date(),
        generator: 'https://github.com/fabionolasco/fire-feed',
        feedLinks: {},
        author: {
            name: 'Fabio Nolasco',
            email: Personal.email,
            link: 'https://fabionolasco.com/'
        }
    }
};
