export const parsePropDefs = (props) => {
  if (props instanceof Array) {
    return props;
  }

  try {
    return Object.keys(props);
  } catch (error) {
    throw new Error(`Unable to parse property definitions: ${error}`);
  }
};

export const getPropValidators = (props) => {
  if (props instanceof Array) {
    return undefined;
  }

  try {
    const result = {};
    const propKeys = Object.keys(props);
    propKeys.forEach((key) => {
      const prop = props[key];
      if (prop.prototype && prop.prototype.constructor) {
        result[key] = {
          type: prop,
        };
      } else {
        const isObjectOrArrayProp = prop.type === Object || prop.type === Array;
        if (
          isObjectOrArrayProp &&
          !!prop.default &&
          !(prop.default instanceof Function)
        ) {
          throw new Error(
            `Property ${key} of type ${prop.type.name} must be returned from a factory function`
          );
        }

        result[key] = {
          type:
            (prop.type &&
              prop.type.prototype &&
              prop.type.prototype.constructor) ||
            (prop.default &&
              (prop.default instanceof Function
                ? prop.default().constructor
                : prop.default.constructor)),
          ...(prop.required !== undefined ? { required: prop.required } : {}),
          ...(prop.default !== undefined
            ? {
                default: prop.default,
              }
            : {}),
        };
      }
    });

    return result;
  } catch (error) {
    throw new Error(`Invalid property definition(s): ${error}`);
  }
};

export const validateProp = (value, type) => {
  if (type === Object || type === Array) {
    return value instanceof type;
  }

  return typeof value === type.name.toLowerCase();
};
