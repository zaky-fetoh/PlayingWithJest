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
        ok: !Boolean(emsg), 
        message: emsg? emsg: "customer added", 
        customer_id: emsg? undefined: doc._id,
    });
};

// PUT /customer/custId
exports.updateCustomer = async(req, res, next)=>{
    let emsg = undefined;
    const body = req.body; 
    const custId = req.params.custId; 
    const imDoc = await custModel.findOne({
        _id: custId,},{__v:0});
    body._id = undefined; 
    Object.assign(imDoc, body); 
    try{ await imDoc.save();}
    catch(e){emsg = e.message;}
    res.status(emsg? 500: 200).json({
        ok: Boolean(emsg), 
        message: emsg? emsg:"document updated", 
        doc: emsg? undefined: imDoc._doc,
    });
}

// DELETE /customer/custId
exports.deleteCustomer = async(req, res, next)=>{
    const custId = req.params.custId; 
    const dltcount = (await custModel.delete({
        _id: custId,})).deletedCount;
    res.status(200).json({
        deletedDocCount:dltcount,
        ok: true, 
    });
};