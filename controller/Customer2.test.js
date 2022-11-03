
describe("testing Contrller middleware", () => {

    test("addCustomer function Error Behaviour", () => {

        custModelMock = jest.doMock("../model/customer", () => ({
            create: jest.fn(async () => {
                throw new Error("Some Error massage");
            }),
        }));
        const reqMock = {
            body: { name: "DAs", },
        };
        const resMock = {
            status: jest.fn((x) => {
                expect(x).toBe(500)
                return resMock
            }),
            json: jest.fn((x) => {
                expect(x.message).toBe("Some Error massage");
                expect(x.ok).toBe(false);
                console.log(x.customer_id)
            }),
        }
        const { addCustomer } = require("./customer");
        addCustomer(reqMock, resMock);

    })
})