const Clarifai = require('Clarifai');

/**
 * My API key from clarifai
*/
const app = new Clarifai.App({
  apiKey: '54b273db3e3e41b1be9652023d84a93e' 
});

/**
 * this section of code handles API calls to Clarifai
 */
const handleApiCall = (req, res) => {
  app.models
  //.predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with API'))
}

/**
 * this section of code increments the number of images 
 * the user (id) has submited to the app.
 * it does this by cheching for the userId(id) in th database(db)
 * and if there is a match, there is an increment done.
 * it then returns the entry by json.
 */

const handleImage = (req, res, db) => {
  const { id } = req.body;
   db('users').where('id', '=', id)
   .increment('entries', 1)
   .returning('entries')
   .then(entries => {
      res.json(entries[0]);
   })
   .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}