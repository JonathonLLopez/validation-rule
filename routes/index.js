const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    "message": "My Rule-Validation API",
    "status": "success",
    "data": {
      "name": "Jonathon Lopez",
      "github": "@JonathonLLopez",
      "email": "jonathonllopez@gmail.com",
      "mobile": "2543343682",
      "twitter": "@jonathonllopez"
    }
  });
});

router.post('/validation-rule', (req, res) => {
  if(!req.body.rule) {
    return res.json({
      "message": "rule is required.",
      "status": "error",
      "data": null
    })
  }

  if(typeof req.body.rule !== 'object') {
    return res.json({
      "message": "rule should be an object.",
      "status": "error",
      "data": null
    })
  }

  // if(typeof req.body.data[prop1] !== 'string')  {
  //   return res.status(400).json({
  //     "message": `${req.body.rule.field} should be a string.`,
  //     "status": "error",
  //     "data": null
  //   })
  // }

  // if(!Array.isArray(req.body.data[prop1]))  {
  //   return res.status(400).json({
  //     "message": `${req.body.rule.field} should be an array.`,
  //     "status": "error",
  //     "data": null
  //   })
  // }

  
  const reqFieldInData = req.body.rule.field;
  const prop = req.body.rule.field.split('.')
  const prop1 = prop[0] || prop;
  const prop2 = prop[1]
  
  if(req.body.data[prop1].hasOwnProperty(prop2) && req.body.rule.field === `${prop1}.${prop2}`) {
    if(req.body.rule.condition === 'eq' && req.body.data[prop1][prop2] === req.body.rule.condition_value) {
      if(!JSON.parse(req.body.data[prop1][prop2])) {
        return res.status(400).json({
          "message": "Invalid JSON payload passed.",
          "status": "error",
          "data": null
        })
      } 
      return res.status(200).json({
        "message": `field ${reqFieldInData} successfully validated.`,
        "status": "success",
        "data": {
          "validation": {
            "error": false,
            "field": `${req.body.rule.field}`,
            "field_value": `${req.body.data[prop1][prop2]}`,
            "condition": `${req.body.rule.condition}`,
            "condition_value": `${req.body.rule.condition_value}`
          },
        }
      })
    } else if(req.body.rule.condition === 'neq' && req.body.data[prop1][prop2] !== req.body.rule.condition_value) {
      if(!JSON.parse(req.body.data[prop1][prop2])) {
        return res.status(400).json({
          "message": "Invalid JSON payload passed.",
          "status": "error",
          "data": null
        })
      } 
      return res.status(200).json({
        "message": `field ${reqFieldInData} successfully validated.`,
        "status": "success",
        "data": {
          "validation": {
            "error": false,
            "field": `${req.body.rule.field}`,
            "field_value": `${req.body.data[prop1][prop2]}`,
            "condition": `${req.body.rule.condition}`,
            "condition_value": `${req.body.rule.condition_value}`
          },
        }
      })
    } else if(req.body.rule.condition === 'gt' && req.body.data[prop1][prop2] > req.body.rule.condition_value) {
      if(!JSON.parse(req.body.data[prop1][prop2])) {
        return res.status(400).json({
          "message": "Invalid JSON payload passed.",
          "status": "error",
          "data": null
        })
      } 
      return res.status(200).json({
        "message": `field ${reqFieldInData} successfully validated.`,
        "status": "success",
        "data": {
          "validation": {
            "error": false,
            "field": `${req.body.rule.field}`,
            "field_value": `${req.body.data[prop1][prop2]}`,
            "condition": `${req.body.rule.condition}`,
            "condition_value": `${req.body.rule.condition_value}`
          },
        }
      })
    } else if(req.body.rule.condition === 'gte' && req.body.data[prop1][prop2] >= req.body.rule.condition_value) {
      if(!JSON.parse(req.body.data[prop1])[prop2]) {
        return res.status(400).json({
          "message": "Invalid JSON payload passed.",
          "status": "error",
          "data": null
        })
      } 
      return res.status(200).json({
        "message": `field ${reqFieldInData} successfully validated.`,
        "status": "success",
        "data": {
          "validation": {
            "error": false,
            "field": `${req.body.rule.field}`,
            "field_value": `${req.body.data[prop1][prop2]}`,
            "condition": `${req.body.rule.condition}`,
            "condition_value": `${req.body.rule.condition_value}`
          },
        }
      })
    } else if(req.body.rule.condition === 'contains' && req.body.data[prop1].hasOwnProperty(req.body.rule.condition_value)) {
      if(!JSON.parse(req.body.data[prop1])[prop2]) {
        return res.status(400).json({
          "message": "Invalid JSON payload passed.",
          "status": "error",
          "data": null
        })
      } 
      return res.status(200).json({
        "message": `field ${reqFieldInData} successfully validated.`,
        "status": "success",
        "data": {
          "validation": {
            "error": false,
            "field": `${req.body.rule.field}`,
            "field_value": `${req.body.data[prop1][prop2]}`,
            "condition": `${req.body.rule.condition}`,
            "condition_value": `${req.body.rule.condition_value}`
          },
        }
      })
    } else {
      return res.status(400).json({
        "message": `field ${req.body.rule.field} failed validation.`,
        "status": "error",
        "data": {
          "validation": {
            "error": true,
            "field": `${req.body.rule.field}`,
            "field_value": `${req.body.data[prop1]}`,
            "condition": `${req.body.rule.condition}`,
            "condition_value": `${req.body.rule.condition_value}`
          },
        }
      })
    }
  } else if(req.body.data.hasOwnProperty(prop1) && !prop2) {
    if(req.body.rule.condition === 'eq' && req.body.data[prop1] === req.body.rule.condition_value) {
      if(!JSON.parse(req.body.data[prop1])) {
        return res.status(400).json({
          "message": "Invalid JSON payload passed.",
          "status": "error",
          "data": null
        })
      } 
      return res.status(200).json({
        "message": `field ${reqFieldInData} successfully validated.`,
        "status": "success",
        "data": {
          "validation": {
            "error": false,
            "field": `${req.body.rule.field}`,
            "field_value": `${req.body.data[prop1]}`,
            "condition": `${req.body.rule.condition}`,
            "condition_value": `${req.body.rule.condition_value}`
          },
        }
      })
    } else if(req.body.rule.condition === 'neq' && req.body.data[prop1] !== req.body.rule.condition_value) {
      if(!JSON.parse(req.body.data[prop1])) {
        return res.status(400).json({
          "message": "Invalid JSON payload passed.",
          "status": "error",
          "data": null
        })
      } 
      return res.status(200).json({
        "message": `field ${reqFieldInData} successfully validated.`,
        "status": "success",
        "data": {
          "validation": {
            "error": false,
            "field": `${req.body.rule.field}`,
            "field_value": `${req.body.data[prop1]}`,
            "condition": `${req.body.rule.condition}`,
            "condition_value": `${req.body.rule.condition_value}`
          },
        }
      })
    } else if(req.body.rule.condition === 'gt' && req.body.data[prop1] > req.body.rule.condition_value) {
      if(!JSON.parse(req.body.data[prop1])) {
        return res.status(400).json({
          "message": "Invalid JSON payload passed.",
          "status": "error",
          "data": null
        })
      } 
      return res.status(200).json({
        "message": `field ${reqFieldInData} successfully validated.`,
        "status": "success",
        "data": {
          "validation": {
            "error": false,
            "field": `${req.body.rule.field}`,
            "field_value": `${req.body.data[prop1]}`,
            "condition": `${req.body.rule.condition}`,
            "condition_value": `${req.body.rule.condition_value}`
          },
        }
      })
    } else if(req.body.rule.condition === 'gte' && req.body.data[prop1] >= req.body.rule.condition_value) {
      if(!JSON.parse(req.body.data[prop1])) {
        return res.status(400).json({
          "message": "Invalid JSON payload passed.",
          "status": "error",
          "data": null
        })
      } 
      return res.status(200).json({
        "message": `field ${reqFieldInData} successfully validated.`,
        "status": "success",
        "data": {
          "validation": {
            "error": false,
            "field": `${req.body.rule.field}`,
            "field_value": `${req.body.data[prop1]}`,
            "condition": `${req.body.rule.condition}`,
            "condition_value": `${req.body.rule.condition_value}`
          },
        }
      })
    } else if(req.body.rule.condition === 'contains' && req.body.data.hasOwnProperty(req.body.rule.condition_value)) {
      console.log('contains test')
      if(!JSON.parse(req.body.data[prop1])) {
        return res.status(400).json({
          "message": "Invalid JSON payload passed.",
          "status": "error",
          "data": null
        })
      } 
      return res.status(200).json({
        "message": `field ${reqFieldInData} successfully validated.`,
        "status": "success",
        "data": {
          "validation": {
            "error": false,
            "field": `${req.body.rule.field}`,
            "field_value": `${req.body.data[prop1]}`,
            "condition": `${req.body.rule.condition}`,
            "condition_value": `${req.body.rule.condition_value}`
          },
        }
      })
    } else {
      return res.status(400).json({
        "message": `field ${req.body.rule.field} failed validation.`,
        "status": "error",
        "data": {
          "validation": {
            "error": true,
            "field": `${req.body.rule.field}`,
            "field_value": `${req.body.data[prop1]}`,
            "condition": `${req.body.rule.condition}`,
            "condition_value": `${req.body.rule.condition_value}`
          },
        }
      })
    }
  }
});

module.exports = router;