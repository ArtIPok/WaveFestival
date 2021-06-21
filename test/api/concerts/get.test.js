const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');
const Seat = require('../../../models/seat.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testConcertOne = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg' });
    await testConcertOne.save();

    const testConcertTwo = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'Rebekah Parker', genre: 'R&B', price: 25, day: 1, image: '/img/uploads/2f342s4fsdg.jpg' });
    await testConcertTwo.save();

    const testSeatOne = new Seat({ _id: '', day: 1, seat: 3, client: 'Amanda Doe', email: 'amandadoe@example.com' });
    await testSeatOne.save();
  });

  after(async () => {
    await Concert.deleteMany();
    await Seat.deleteMany();
  })

  it('should show param "tickets" left', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.body).to.be.an('array');
    for(concert of res.body) {
      expect(concert.tickets).to.be.a('number');
      expect(concert.tickets).to.be.equal(47);
    }
  });
});