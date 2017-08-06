const apiKeyValue = require('./apiKey.js');

module.exports = {
    port: 3322,
    content: [
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
        apiKey: apiKeyValue,
        authDomain: 'fabionolasco-91850.firebaseapp.com',
        databaseURL: 'https://fabionolasco-91850.firebaseio.com',
        projectId: 'fabionolasco-91850',
        storageBucket: 'fabionolasco-91850.appspot.com',
        messagingSenderId: '471822727829'
    },
    feed: {
        title: 'Fabio Nolasco - Front End',
        description: 'This is my personal feed!',
        id: 'https://fabionolasco.com/',
        link: 'https://fabionolasco.com/',
        image: 'https://fabionolasco.com/image.png',
        favicon: 'https://fabionolasco.com/favicon.ico',
        copyright: 'All rights reserved 2013, John Doe',
        updated: new Date(2013, 06, 14), // optional, default = today 
        generator: 'awesome', // optional, default = 'Feed for Node.js' 
        feedLinks: {
            json: 'https://fabionolasco.com/json',
            atom: 'https://fabionolasco.com/atom',
        },
        author: {
            name: 'Fabio Nolasco',
            email: 'gomidefabio' + '@gm' + 'ail.com',
            link: 'https://fabionolasco.com/'
        }
    }
};
