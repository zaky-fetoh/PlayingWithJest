describe("cllection operation",()=>{
    const mongoose = require("mongoose")
    DB_URI = "mongodb://localhost:27017/testDB";
    let custModel = null;
    beforeAll(async()=>{
        await mongoose.connect(DB_URI); 
       custModel = require("./customer")
    });
    afterAll(async()=>{
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it("should insert",async()=>{
        const docum = {
            name:"mahmou", 
            email:"mah@mail.com", 
        };
        const ins = await custModel.create(docum);
        console.log(ins._doc)
        expect(ins.name).toBe(docum.name);
        expect(ins.email).toBe(docum.email);
    })
})