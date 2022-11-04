const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    _id:{ type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId, 
    },
    name:{
        type: mongoose.Schema.Types.String, 
        required: true, 
    }, 
    email:{
        type: mongoose.Schema.Types.String,
        required: true,
    }
});

CustomerSchema.pre("save",function(next){
    next();
})


module.exports = mongoose.model("customer",CustomerSchema);