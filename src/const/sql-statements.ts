enum SqlStatements {

    CREATE_USER_TABLE = `CREATE TABLE IF NOT EXISTS users(
    userId INT AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL ,
    email VARCHAR(255) NOT NULL ,
    passwordHash VARCHAR(255) NOT NULL,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    bio TEXT,
    location VARCHAR(255),
    PRIMARY KEY (userId),
    CONSTRAINT uc_username_email UNIQUE(username, email)
    )`,
    CREATE_TWEETS_TABLE = `CREATE TABLE IF NOT EXISTS tweets(
        tweetId INT AUTO_INCREMENT,
        userID INT,
        content VARCHAR(255) UNIQUE,
        creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (tweetId)
    )`,
    INSERT_USERS = ` INSERT INTO users(username, email, passwordHash, bio, location)
                            VALUES
                            ('luisDoe','luisDoe@example.com','hashedpassword1', 'I love coding', 'New York'),
                            ('juanDoe','JuanDoe@example.com','hashedpassword1', 'I love databases', 'San Francisco')
                            ON DUPLICATE KEY UPDATE
                                username = VALUES(username),
                                email = VALUES(email),
                                passwordHash = VALUES(passwordHash),
                                bio = VALUES(bio),
                                location = VALUES(location);`,

    QUERY_USERS = ` SELECT * FROM users`,

    INSERT_TWEETS = ` INSERT INTO tweets(userID, content)
    VALUES
    (1,'This is my firts tweet!'),
    (1,'I love coding!'),
    (1,'Node.js is awesome!'),
    (1,'Just finished my OpenAi project!'),
    (1,'Hello Twitter!'),
    (2,'This es jane, seconds tweet!'),
    (2,'I love database!'),
    (2,'MySQL is great!'),
    (2,'Just finishec a database design project!')`,
    QUERY_TWEETS = ` SELECT * FROM tweets`,

}

export default SqlStatements;