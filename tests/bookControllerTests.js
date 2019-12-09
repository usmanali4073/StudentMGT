const shoudl = require('should');
const sinon = require('sinon')
const bookController = require('../controllers/bookController');


describe('Book Controller Test', function() {

    describe('post', function() {
        it('should not allow empty title on post', function() {
            const book = function(book) {
                this.save = () => {}
            }

            const req = {
                body: {
                    author: 'john'
                }
            };

            const res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy(),
            }



            const controller = bookController(book);

            controller.post(req, res);

            res.status.calledWith(400).should.equal(true, `bad status ${res.status.args[0][0]}`)
            res.send.calledWith(`Title is required`).should.equal(true)
        });
    });
});