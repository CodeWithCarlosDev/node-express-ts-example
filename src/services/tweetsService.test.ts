import { getTweets } from "../repositories/tweetsRepository";
import { getTweetsService } from "./tweetsService";
/*
jest.mock("../repositories/tweetsRepository", () => (
    {
        getTweets: jest.fn().mockResolvedValue(
            [
                {
                    tweetId: 1,
                    userID: 1,
                    content: "Mi mensaje 1"
                }, {
                    tweetId: 2,
                    userID: 2,
                    content: "Mi mensaje 2"
                }
            ]
        )
    }
))
*/

jest.mock("../repositories/tweetsRepository", () => (
    {
        getTweets: jest.fn(() => (
            [
                {
                    tweetId: 1,
                    userID: 1,
                    content: "Mi mensaje 1"
                }, {
                    tweetId: 2,
                    userID: 2,
                    content: "Mi mensaje 2"
                }
            ]
        ))
    }
))

describe("[routes/tweetsRouter.test]", () => {
    it("Deberia obtener todos los tweets", async () => {
        // arrange
        const expected = [
            {
                tweetId: 1,
                userID: 1,
                content: "Mi mensaje 1"
            }, {
                tweetId: 2,
                userID: 2,
                content: "Mi mensaje 2"
            }
        ];
        // act
        const result = await getTweetsService();
        // assert
        expect(result).toEqual(expected);

    });
    it("Deberia llamar al respositorio el metodo getTwees", async () => {
        //arrange
        // act
        await getTweetsService();
        // assert
        expect(getTweets).toHaveBeenCalled();
    });
})