interface ObjectType {
  [key: string]: boolean;
}

type Props = string | ObjectType;

const ClassNames = (...classes: Props[]) => {
  const newClasses = [];

  classes.forEach(value => {
    if (typeof value === 'string') {
      return newClasses.push(value);
    }

    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key) && value[key]) {
        newClasses.push(key);
      }
    }
  });

  return newClasses.join(' ');
};

export default ClassNames;
