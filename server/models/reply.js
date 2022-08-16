const mongoose = require("mongoose");

const replySchema = mongoose.Schema(
    {
        ticketId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket',
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        text: {
            type: String,
            required: true,
        },
        attachment: {
            type: Object
        },
    },
    { timestamps: true }
);


const replyModel = mongoose.model("Reply", replySchema);
module.exports = replyModel;
