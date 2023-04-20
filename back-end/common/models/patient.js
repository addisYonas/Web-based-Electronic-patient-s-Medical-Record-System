'use strict';
const crypto = require('crypto');
const md5 = require('md5');

const ENCRYPTION_KEY = 'asdfvgbhnjmkloiuyhgytfrgthyujkmn'; // Must be 256 bytes (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

module.exports = Patient => {

  function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  function decrypt(text) {
    let textParts = text.split(':');
    let iv = new Buffer.from(textParts.shift(), 'hex');
    let encryptedText = new Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }

  //Create a patient
  Patient.createPatient = async(accessToken, body) => {
    if (!accessToken || !accessToken.userId) throw Error('Forbidden User', 403);

    if (accessToken.userInfo.userRole.name === 'Student' || accessToken.userInfo.userRole.name === 'Lab Technician')
      throw Error('Unauthorized User', 403);

    let info = encrypt(JSON.stringify(body.info));
    let key = md5(info);

    try {
      const patient = await Patient.create({
        info,
        key,
        age: body.age,
        sex: body.sex,
        createdById: accessToken.userId,
      });

      return patient;
    } catch (err) {
      throw err;
    }
  };

  Patient.remoteMethod('createPatient', {
    description: 'Creates a patient',
    accepts: [
      {
        arg: 'accessToken',
        type: 'object',
        http: ctx => {
          const req = ctx && ctx.req;
          const accessToken = req && req.accessToken;
          return accessToken ? req.accessToken : null;
        },
      },
      {arg: 'body', type: 'object', http: {source: 'body'}},
    ],
    returns: {
      arg: 'patientObject',
      type: 'object',
      root: true,
    },
    http: {verb: 'post', path: '/create-patient'},
  });

  //Find patient by Id
  Patient.findByKey = async key => {
    const patient = await Patient.findOne({
      where: {key},
    });

    let patientInfo = JSON.parse(decrypt(patient.info));

    let finalPatient = {
      id: patient.id,
      age: patient.age,
      sex: patient.sex,
      info: patientInfo,
    };

    if (!patient) throw Error('Unknown patient', 412);

    return finalPatient;
  };
  Patient.remoteMethod('findByKey', {
    description: 'Finds patient by specified key',
    accepts: [{arg: 'key', type: 'string', required: true}],
    returns: {
      type: 'object',
      root: true,
    },
    http: {verb: 'get', path: '/key/:key'},
  });


  // update cv's personal information
  Patient.updatePatient = async (accessToken, key, info, age, sex) => {
    if (!accessToken || !accessToken.userId) throw Error('Forbidden User', 403);

    if (accessToken.userInfo.userRole.name === 'Student' || accessToken.userInfo.userRole.name === 'Lab Technician')
      throw Error('Unauthorized User', 403);

    const patient = await Patient.findOne({
      where: {key},
    });

    if (!patient) throw Error("Unknown patient", 412);

    let encrytedInfo = encrypt(JSON.stringify(info));

    await patient.patchAttributes({
      info: encrytedInfo,
      age,
      sex
    });

    return { status: true };
  };

  Patient.remoteMethod("updatePatient", {
    description: "Updates the patient",
    accepts: [
      {
        arg: "accessToken",
        type: "object",
        http: ctx => {
          const req = ctx && ctx.req;
          const accessToken = req && req.accessToken;
          return accessToken ? req.accessToken : null;
        }
      },
      {arg: "key", type: "string", required: true},
      {arg: "info", type: "object"},
      {arg: "age", type: "number"},
      {arg: "sex", type: "string"},
    ],
    returns: {
      type: "object",
      root: true
    },
    http: { verb: "patch", path: "/update-patient" }
  });

};
