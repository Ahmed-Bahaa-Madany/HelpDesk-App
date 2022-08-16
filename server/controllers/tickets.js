const Ticket = require("../models/ticket");

const findOne = (id) => {
    return Ticket.findById(id);
};

const find = () => {
    return Ticket.find().populate("userId").sort({ createdAt: -1 });
};

const create = (body) => {
    return Ticket.create(body);
};

const editOne = (id, body) => {
    return Ticket.findByIdAndUpdate(id.id, body, { new: true });
};

const findAllByIdUser = (id) => {
    return Ticket.find({ userId: id }).populate("userId").sort({ createdAt: -1 });
};

const count = () => {
    return Ticket.aggregate([{ $group: { _id: 1, count: { $sum: 1 } } }]);
}

module.exports = {
    create,
    findOne,
    editOne,
    findAllByIdUser,
    find,
    count
};
