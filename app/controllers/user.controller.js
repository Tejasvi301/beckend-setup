const db = require("../models");
const Api = db.api;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Fname) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a api
  const api = new Api({
    Fname: req.body.Fname,
    Lname: req.body.Lname,
    Tiltleb: req.body.Tiltle,
     Tiltlea: req.body.TiltleA,
    contact: req.body.contact,
    email: req.body.email,
    dob: req.body.dob,
    Nationality: req.body.Nationality,
    Street_num:req.body.Street_num,
    city:req.body.city,
    postal:req.body.postal,
    country: req.body.country,
    web:req.body.web

   });

  // Save api in the database
  api
    .save(api)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the api."
      });
    });
};

// Retrieve all api from the database.
exports.findAll = (req, res) => {
  const Fname = req.query.Fname;
  var condition = Fname ? { Fname: { $regex: new RegExp(Fname), $options: "i" } } : {};

  Api.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single api with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Api.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Api with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving api with id=" + id });
    });
};

// Update a api by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Api.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update api with id=${id}. Maybe Api was not found!`
        });
      } else res.send({ message: "Api was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Api with id=" + id
      });
    });
};

// Delete a Api with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Api.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Api with id=${id}. Maybe Api was not found!`
        });
      } else {
        res.send({
          message: "Api was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Api with id=" + id
      });
    });
};

// Delete all Api from the database.
exports.deleteAll = (req, res) => {
  Api.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Api were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Api."
      });
    });
};

// // Find all published Api
// exports.findAllPublished = (req, res) => {
//   Tutorial.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };
