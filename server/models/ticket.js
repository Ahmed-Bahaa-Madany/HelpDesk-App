const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
    {
        ticketId: {
            type: mongoose.Types.ObjectId,
            auto: true,
            required: true,
            index: true
        },
        title: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    { timestamps: true }
);


const ticketModel = mongoose.model("Ticket", ticketSchema);
module.exports = ticketModel;
