import moment from 'moment';
import db from '../models/db';
import isEmpty from '../helper/isEmpty';

/**
 * @description This class handles user requests
 * @class Bus
 */

const Bus = {
  /**
     * Create A User
     * @param {object} req
     * @param {object} res
     * @returns {object} Bus object
     */
  async create(req, res) {
    const {
      numberPlate,
      manufacturer,
      model,
      year,
      capacity,
    } = req.body;

    if (isEmpty(numberPlate) || isEmpty(capacity)) {
      req.status = 400;
      return res.status(400).send({
        success: 'false',
        message: 'both number_plate and capacity are required',
      });
    }
    const createQuery = `INSERT INTO
      buses(number_plate, manufacturer, model, year, status, capacity, created_at)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      req.body.numberPlate,
      req.body.manufacturer,
      req.body.model,
      req.body.year,
      req.body.capacity,
      'Available',
      moment(new Date()),
    ];
    try {
      const {
        rows,
      } = await db.query(createQuery, values);
      return res.status(201).send({
        status: 201,
        data: [{
          id: rows[0].id,
          numberPlate: rows[0].numberPlate,
          manufacturer: rows[0].manufacturer,
          model: rows[0].model,
          year: rows[0].year,
          capacity: rows[0].capacity,
        }],
        message: 'Bus registered successfully',
      });
    } catch (error) {
      return res.status(400).send({
        message: 'bus registration failed',
        status: 400,
      });
    }
  },
};


export default Bus;
