const request = require('supertest')
const app = require('../app')

describe('Refresh token module', () => {
    describe('GET /refresh_token', () => {
        describe('GET /refresh_token', () => {
            it('should return success', async () => {
                await request(app)
                    .get('/refresh_token')
                    .query({
                        refresh_token: 'kuy_token_1'
                    })
                    .expect('Content-Type', /json/)
                    .expect(200)
            })
            it('should return bad request', async () => {
                await request(app)
                    .get('/refresh_token')
                    .query({})
                    .expect('Content-Type', /json/)
                    .expect(400)
            })
        })
        describe('POST /refresh_token', () => {
            it('should return success', async () => {
                await request(app)
                    .post('/refresh_token')
                    .send({
                        refresh_token: 'kuy_token_2',
                        uuid: '51385ca0-5bb4-4c71-871f-9c604af5ce8a'
                    })
                    .expect('Content-Type', /json/)
                    .expect(200)
            })
            it('should return bad request', async () => {
                await request(app)
                    .post('/refresh_token')
                    .query({})
                    .expect('Content-Type', /json/)
                    .expect(400)
            })
        })
    })
})