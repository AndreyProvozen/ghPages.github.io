interface ObjectType {
  [key: string]: boolean;
}

type Props = string | ObjectType;

/**
 * A utility function for generating a string of concatenated class names based on input values.
 *
 * @example
 * ```typescript
 * const combinedClasses = ClassNames('my-class', 'another-class', { active: true, disabled: false });
 * // Returns: 'my-class another-class active'
 * ```
 *
 * @param {...Props} classes - One or more class names or objects representing conditional class names.
 * @returns {string} - A string containing concatenated class names.
 */

const ClassNames = (...classes: Props[]): string => {
  const newClasses: string[] = [];

  classes.forEach(value => {
    if (typeof value === 'string') return newClasses.push(value);

    Object.keys(value).forEach(key => {
      if (value[key]) newClasses.push(key);
    });
  });

  return newClasses.join(' ');
};

export default ClassNames;
