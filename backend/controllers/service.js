const Service = require("../models/serviceSchema");

//create new service
const createService = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const service = new Service({ name, description, price });
    await service.save();

    res.status(201).json({ sucess: true, message: "Service Created", service });
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
};

//get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res
      .status(201)
      .json({ sucess: true, message: "Services retuned", services });
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
};

//update service
const updateService = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const service = await Service.findByIdAndUpdate(id, updateData);

    res
      .status(201)
      .json({ sucess: true, message: "Services Updated", service });
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
};

//delete service
const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    await Service.findByIdAndDelete(id);

    res
      .status(201)
      .json({ sucess: true, message: "Services Deleted", service });
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
};

module.exports = { createService, getAllServices, updateService, deleteService };
