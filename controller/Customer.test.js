
describe("testing Contrller middleware", () => {
    beforeEach(() => {
        jest.resetModules();
    });

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