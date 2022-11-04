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
        let listenMock = jest.fn((x, f) => {
            expect(x).toBe(4000);
            f(); return app;
        })
        const app = {
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


describe("integeration testing", () => {
    jest.resetModules();
    const axios = require("axios");

    const getUrl = (route = "") => {
        return `http://localhost:3000/customer${route}`
    };

    it("should insert", async () => {
        // you have to manually Run the Server 
        const addres = await axios.post(getUrl(""), {
            name: "mahmoud", email: "zaky",
        })
        const getres = await axios.get(getUrl("/" + addres.data.customer_id))
        expect(getres.data.data.name).toBe("mahmoud");
        expect(getres.data.data.email).toBe("zaky");
    })

    it("should update", async()=>{ 
        //YOU Should Run serVerMaully 
        const addres = (await axios.post(getUrl(""), {
            name: "ahmed", email: "moh",
        })).data
        console.log(addres.customer_id)

        const updres = (await axios.put(getUrl("/"+addres.customer_id),{
            name: "heba",
        }))
        const getres = await axios.get(getUrl("/" + addres.customer_id))

        expect(getres.data.data.name).toBe("heba");
        expect(getres.data.data.email).toBe("moh");        

    })
    it("should Delte", async()=>{
        const addres = (await axios.post(getUrl(""), {
            name: "ahmed", email: "moh",
        })).data
        console.log(addres.customer_id)
        const dltres = await axios.delete(getUrl("/" + addres.customer_id))
        expect(dltres.data.deletedDocCount).toBe(1);
    })
})