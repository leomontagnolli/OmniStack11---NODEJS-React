const connection = require('../database/connections');


module.exports = {
  async index (req,res) {
    const { pag = 1} = req.query;


    //contagem de todos o casos para front end
    const [count] = await connection('incidents').count();

    const casos = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((pag -1 )* 5)
    .select(['incidents.*'
    , 'ongs.name'
    , 'ongs.email'
    , 'ongs.whatsapp'
    , 'ongs.city'
    , 'ongs.uf']);

    res.header('X-Total-Count', count['count(*)']);

    return res.json(casos);
  },



  async create (req,res) {
    const {title, description, value} =  req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return res.json({ id });
  },

  async delete (req,res) {
    const {id} = req.params;
    const ong_id = req.headers.authorization;

    const casos = await connection('incidents')
    .where('id', id)
    .select('ong_id')
    .first();


    if(casos.ong_id != ong_id) {
      return res.status(401).json({ error: 'Operação não permitida' });
    }

    await connection('incidents').where('id',id).delete();

    return res.status(204).send();

  }


}