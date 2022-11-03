
describe("testing addCustomer middleware", () => {
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

describe("testing update meddleware functionalBehaviour",()=>{
    test("normal behaviour for update",()=>{
        jest.resetModules();
        jest.doMock("../model/customer",()=>({
            findOne: jest.fn(async(filter)=>{
                expect(filter._id).toBe("hello");
                let out =  {
                    save: jest.fn(async()=>{return out}),
                };
                out._doc = out; 
                return out
            })
        }))
        const reqMock = {
            body:{ 
                name:"ahmed",
            },
            params:{
                custId: "hello", 
            },
        };
        const resMock = {
            status:jest.fn((s)=>{
                expect(s).toBe(200);
                return resMock
            }),
            json:jest.fn((obj)=>{
                expect(obj.ok).toBe(true);
                expect(obj.doc.name).toBe("ahmed");
            })
        };
        require("./customer").updateCustomer(reqMock, resMock);
    });
    
    it("should respond with Error",()=>{
        jest.resetModules(); 
        const mmocks ={
            findOne:jest.fn(async(x)=>{
                throw new Error("Some Error");
            }),

        };
        jest.doMock("../model/customer",()=>mmocks);
        const reqMock = {
            body:{ 
                name:"ahmed",
            },
            params:{
                custId: "hello", 
            },
        };
        const resMock = {
            status:jest.fn((s)=>{
                expect(s).toBe(500);
                return resMock
            }),
            json:jest.fn((obj)=>{
                expect(obj.ok).toBe(false);
                expect(obj.message).toBe("Some Error");
            })
        };
        require("./customer").updateCustomer(reqMock, resMock);
        expect(mmocks.findOne).toHaveBeenCalled();
    })
})