/**
 * Created by JS on 25/12/2016.
 */
'use strict';

const open = require('amqplib').connect(process.env.AMQP);

module.exports = open;