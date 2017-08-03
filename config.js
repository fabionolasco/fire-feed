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
    }
};
