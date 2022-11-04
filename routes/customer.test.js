
describe("testing routes", () => {
    it("shoudBe called", () => {
        jest.resetModules();
        const Args = "/:custId";
        const expressMock = {
            Router: () => ({
                post: jest.fn(() => expressMock.Router()),
                get: jest.fn(x => {
                    expect(x).toBe(Args);
                    return expressMock.Router();
                }),
                put: jest.fn(x => {
                    expect(x).toBe(Args);
                    return expressMock.Router();
                }),
                delete: jest.fn(x => {
                    expect(x).toBe(Args);
                    return expressMock.Router();
                }),
            })
        };
        jest.doMock("express", () => expressMock)
        require("./customer")
    })

})