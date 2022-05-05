module.exports = function(req) {
    let proto = req.connection.encrypted || process.env.SSL === 'true' ? '' : 'https';
    return proto.split(/\s*,\s*/)[0];
};
