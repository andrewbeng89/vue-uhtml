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

      const isTypeDefinition = prop.prototype && prop.prototype.constructor;
      const isArrayTypeDefinition =
        prop instanceof Array &&
        prop.every((t) => t.prototype && t.prototype.constructor);

      if (
        prop.type === Function ||
        (isArrayTypeDefinition && prop.some((type) => type === Function))
      ) {
        throw new Error(
          `Properties should be JSON serializable: please change type of prop ${key} from Function.`
        );
      }

      if (isTypeDefinition || isArrayTypeDefinition) {
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
          ...(prop.validator && prop.validator instanceof Function
            ? { validator: prop.validator }
            : {}),
        };
      }
    });

    return result;
  } catch (error) {
    throw new Error(`Invalid property definition(s): ${error}`);
  }
};

export const validateProp = (value, type, validator) => {
  if (validator) {
    return validator(value);
  }

  if (type === Object || type === Array) {
    return value instanceof type;
  } else if (type instanceof Array) {
    return type.some((t) => validateProp(value, t));
  }

  if ((type === Boolean && value === "") || value === null) {
    return true;
  }

  return typeof value === type.name.toLowerCase();
};
