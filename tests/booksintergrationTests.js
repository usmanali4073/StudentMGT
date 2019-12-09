require('should');
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app.js')

const Book = mongoose.model('Book')
const agent = request.agent(app)

process.env.ENV = "Test";

describe('Book Crud Test', () => {
    it('should allow a book to be posted and return read and _it', (done) => {

        //arrange
        const bookPost = { title: "Usman", author: "Usman Ali" }
        agent.post('/api/book')
            .send(bookPost)
            .expect(200)
            .end((err, results) => {
                console.log(results)
                results.body.read.should.not.equal(false)
                results.body.should.have.property('_id')
                done();
            })
    });

    afterEach((done) => {
        Book.deleteMany({}).exec();
        done();
    });
});