
describe("testing customer behaviour", () => {
    preMock= jest.fn()
    SchemaConstMock = jest.fn()
    SchemaMock = class{
        constructor(obj){
            SchemaConstMock()
        };
        static Types= {
            ObjectId: jest.fn(),
            String: jest.fn(),
        };
        pre(hook,middl){
            preMock(hook, middl); 
        };
    };
    TypeMock = {
        ObjectId: jest.fn(),
        String: jest.fn(),
    };
    modelMock = jest.fn();
    mongooseMock = jest.doMock("mongoose",()=>({
        Schema:SchemaMock,
        Types: TypeMock,
        model: modelMock,

    }));

    test("testing model",()=>{
        const customer = require("./customer"); 
        expect(modelMock.mock.calls.length).toBe(1);
        expect(preMock.mock.calls.length).toBe(1);
        expect(preMock.mock.calls[0][0]).toBe("save");

    })

})