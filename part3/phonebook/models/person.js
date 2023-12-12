const {
  connect,
  connection,
  model,
  Schema,
  set,
  default: mongoose,
} = require('mongoose');

set('strictQuery', false);

const url = process.env.MONGODB_URI;
console.log('%c⧭', 'color: #aa00ff', { url });
connect(url)
  .then((res) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const phoneBookSchema = new Schema({
  name: String,
  number: String,
});

phoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.created_by = 'peemtanapat';
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', phoneBookSchema);
