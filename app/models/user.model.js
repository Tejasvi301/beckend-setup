module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      Fname: String,
      Lname:String,
      Titleb: String,
      Titlea: String,
      contact: Number,
      email:    { 
         type: String,     
        Required:  'Email address cannot be left blank.',
        //  validate: [validateEmail, 'Please fill a valid email address'],
         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
         index: {unique: true, dropDups: true}
       },
      dob: { type: Number },
      Nationality: String,
      Street_num:Number,
      city:String,
      postal:Number,
      country: { type: String , required: [true, 'Country cannot be left blank.']},
      web: {
        type: String,     
        Required:  'Web address cannot be left blank.',
        //  validate: [validateEmail, 'Please fill a validweb  address'],
        //  match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid web address'],
        //  index: {unique: true, dropDups: true}
      },
     },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Api = mongoose.model("api", schema);
  return Api;
};
