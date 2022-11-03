
describe("testing Contrller middleware", () => {


    test("addCustomer function Normal behaviours", () => {

        createMock = jest.fn(async () => ({ _id: "helloMock" }));
        custModelMock = jest.doMock("../model/customer", () => ({
            create: createMock,
        }))
        const reqMock = {
            body: { name: "DAs", },
        };
        const resMock = {
            status: jest.fn((x) => {
                expect(x).toBe(200)
                return resMock
            }),
            json: jest.fn((x) => {
                expect(x.customer_id).toBe("helloMock");
                expect(x.ok).toBe(true);
            }),
        }
        const { addCustomer } = require("./customer");
        addCustomer(reqMock, resMock);
    });
})