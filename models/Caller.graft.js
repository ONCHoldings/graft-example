module.exports = Graft.BaseModel.extend({
    urlRoot: '/api/Caller',
    defaults: {
        conference: 'default',
        status: 'offline'
    }
});
