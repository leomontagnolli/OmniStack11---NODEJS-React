const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connections');


describe('ong', ()=> {
beforeEach(async ()=> {
 await connection.migrate.latest();

});



  it('should be able to create a new ONG', async ()=> {
    const response = await request(app)
    .post('/ongs')
    .send({
    name : "Ong de teste",
  	email : "leomontagno@tes.com",
  	whatsapp : "11952330188",
  	city : "Franco do arrocha",
  	uf: "sp"
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);

    
afterAll(async ()=>{
  await connection.destroy();
});
    
  });
})