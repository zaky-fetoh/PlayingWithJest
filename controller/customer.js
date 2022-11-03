const custModel = require("../model/customer");

// GET /customer
exports.addCustomer = async (req, res, next) => {
    const body = req.body;
    let emsg = undefined ;
    let  doc = undefined;
    try {
        doc = await custModel.create(body)
    } catch (e) {
        emsg = e.message;
    }
    res.status(emsg? 500: 200).json({
        ok: Boolean(emsg), 
        message: emsg? emsg: "customer added", 
        customer_id: emsg? undefined: doc._id
    });
};

