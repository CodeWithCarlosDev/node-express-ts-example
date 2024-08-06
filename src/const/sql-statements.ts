enum SqlStatements {

    CREATE_USER_TABLE = `CREATE TABLE users(
    userId INT AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    bio TEXT,
    location VARCHAR(255),
    PRIMARY KEY (userId)
    )`,
    CREATE_TWEETS_TABLE = `CREATE TABLE tweets(
        tweetId INT AUTO_INCREMENT,
        userID INT,
        content VARCHAR(255),
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

    QUERY_USERS = ` SELECT * FROM users`
}

export default SqlStatements;