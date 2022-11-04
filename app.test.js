describe("functionalinteraction testing", () => {
    const env = process.env;
    beforeAll(() => {

        process.env = {
            PORT: 4000,
            DB_URI: "hello",
        }

    })
    afterAll(() => {
        process.env = env
    })


    test("main Functionalinteraction with the main method", () => {
        jest.resetModules();
        ///Mocking the Express Module
        let listenMock = jest.fn((x,f)=>{
            expect(x).toBe(4000);
            f();return app})
        const app ={
            use: jest.fn(() => app),
            listen: listenMock,
        }
        const expressMock = {
            call: () => app,
            json: jest.fn(),
            urlencoded: jest.fn(),
        }
        jest.doMock("express", () => expressMock);

        //Mocking mongoose
        jest.doMock("mongoose", () => ({
            connect: jest.fn(x => {
                expect(x).toBe("hello");
            })
        }))
        //mocking Schema modules
        jest.doMock("./routes/customer", () => ({}))
        require("./app");
    })
})