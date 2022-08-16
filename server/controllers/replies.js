const Reply = require("../models/reply");
const Ticket = require("../models/ticket");

const create = (body) => {
    let reply = Reply.create(body)
    let ticket = Ticket.findByIdAndUpdate(body.ticketId, { updatedAt: Date.now() }, { new: true })
    return reply, ticket;
};

const findAllById = (id) => {
    return Reply.find({ ticketId: id }).populate("ticketId").populate("userId");
};


module.exports = {
    create,
    findAllById
};
