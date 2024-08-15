import joi from "@hapi/joi";

const idSchema = joi.number().required();
const tweetContentSchema = joi.string().max(280).required();


const tweetIdShema = {
    tweetId: idSchema
}

const createTweetShema = {
    userID: idSchema,
    content: tweetContentSchema
}

const updateTweetsShema = {
    content: tweetContentSchema
}

module.exports = {
    tweetIdShema,
    createTweetShema,
    updateTweetsShema
}