module.exports = function(req) {
    let proto = req.connection.encrypted || process.env.SSL === 'true';
    return proto.split(/\s*,\s*/)[0];
};
