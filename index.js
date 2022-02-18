/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (properties, objectArray) => {
  if (!Array.isArray(properties)) {
    return objectArray;
  }

  const newObjectArray = objectArray.map(item => {
    const temp = { ...item };
    properties.forEach(prop => {
      delete temp[prop]
    })
    return temp;
  })

  return newObjectArray
};

exports.excludeByProperty = (property, objectArray) => {
  const newObjectArray = objectArray.filter(item => !item.hasOwnProperty(property));

  return newObjectArray;
};

exports.sumDeep = (objectArray) => {
  const newObjectArray = objectArray.map(item => {
    let sum = 0;
    if (Array.isArray(item.objects)) {
      item.objects.forEach(valObject => {
        sum += valObject.val;
      })
    };

    return { objects: sum }
  });

  return newObjectArray;
};

exports.applyStatusColor = (colorObject, codeObjectArray) => {
  const codeToColorMap = {};

  Object.keys(colorObject).forEach(color => {
    colorObject[color].forEach(code => {
      codeToColorMap[code] = color;
    })
  })

  return codeObjectArray.filter(item => codeToColorMap[item.status]).map(item => {
    return {
      ...item,
      color: codeToColorMap[item.status]
    }
  })
};


exports.createGreeting = (currFun, ...argsInit) => {
  return (...args) => {
    return currFun.apply(null, argsInit.concat(args));
  }
};
exports.setDefaults = (defaultProperties) => {
  return (object) => {
    return {
      ...defaultProperties,
      ...object
    }
  }
};
exports.fetchUserByNameAndUsersCompany = async (username, services) => {
  let company = null;
  let status = await services.fetchStatus();
  let user = null;

  if (!username) {
    return null;
  }
  const users = await services.fetchUsers();
  user = users.find(user => user.name === username);

  if (user) {
    company = await services.fetchCompanyById(user.companyId);
  }

  return {
    company,
    status,
    user
  }
};
