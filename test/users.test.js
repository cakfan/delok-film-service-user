const request = require('supertest')
const app = require('../app')

describe('Users module', () => {
    describe('GET /users', () => {
        it('should return list of users', async () => {
            await request(app)
                .get('/users')
                .expect('Content-Type', /json/)
                .expect(200)
        })
    })
    describe('GET /users/:id', () => {
        it('should return one user', async () => {
            await request(app)
                .get('/users/cakfan')
                .expect('Content-Type', /json/)
                .expect(200)
        })
        it('should return user not found', async () => {
            await request(app)
                .get('/users/invalid_user_id')
                .expect('Content-Type', /json/)
                .expect(404)
        })
    })
    describe('PUT /users/:id', () => {
        it('should return update user', async () => {
            await request(app)
                .put('/users/cakfan')
                .send({
                    name: 'Taufan Fatahillah',
                    email: 'admin@jabirdev.com',
                    password: 'rahasia1234'
                })
                .expect('Content-Type', /json/)
                .expect(200)
        })
        it('should return bad request', async () => {
            await request(app)
                .put('/users/cakfan')
                .send({})
                .expect('Content-Type', /json/)
                .expect(400)
        })
        it('should return user not found', async () => {
            await request(app)
                .put('/users/invalid_user_id')
                .send({})
                .expect('Content-Type', /json/)
                .expect(400)
        })
    })
    describe('POST /users/register', () => {
        it('should return success', async () => {
            await request(app)
                .post('/users/register')
                .send({
                    name: 'Taufan Fatahillah',
                    username: 'kuykuy4',
                    email: 'kuy4@jabirdev.com',
                    password: 'kuylah12345'
                })
                .expect('Content-Type', /json/)
                .expect(200)
        })
        it('should return conflict request', async () => {
            await request(app)
                .post('/users/register')
                .send({
                    name: 'Taufan Fatahillah',
                    username: 'cakfan',
                    email: 'admin@jabirdev.com',
                    password: 'kuylah12345'
                })
                .expect('Content-Type', /json/)
                .expect(409)
        })
        it('should return bad request', async () => {
            await request(app)
                .post('/users/register')
                .send({})
                .expect('Content-Type', /json/)
                .expect(400)
        })
    })
    describe('POST /users/login', () => {
        it('should return success', async () => {
            await request(app)
                .post('/users/login')
                .send({
                    username: 'cakfan3',
                    password: 'kuylah123456'
                })
                .expect('Content-Type', /json/)
                .expect(200)
        })
        it('should return bad request', async () => {
            await request(app)
                .post('/users/login')
                .send({})
                .expect('Content-Type', /json/)
                .expect(400)
        })
    })
    describe('POST /users/logout', () => {
        it('should return success', async () => {
            await request(app)
                .post('/users/logout')
                .send({
                    uuid: '51385ca0-5bb4-4c71-871f-9c604af5ce8a'
                })
                .expect('Content-Type', /json/)
                .expect(200)
        })
        it('should return bad request', async () => {
            await request(app)
                .post('/users/logout')
                .send({})
                .expect('Content-Type', /json/)
                .expect(400)
        })
    })
})