import withErrorStack from "./withErrorStack"

describe("[utils/withErrorStack]", () => {

    it("Mostrando el error con el stack", () => {
        // arrage
        const stack = { typeError: "Error en la linea 31" };
        const error = {
            output: {
                statusCode: 500,
                payload: {
                    error: "Internal Server Error",
                    message: "Este es un error",
                }
            }
        };
        const expected = { ...error, stack };
        // act
        const result = withErrorStack(error, stack, true);
        // assert
        expect(result).toEqual(expected);
    });

    it("Mostrando el error sin el stack", () => {


    });

})