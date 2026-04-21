import type { NewPatientEntry} from "./types.ts";
import { Gender } from "./types.ts";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseText = (value: unknown, field: string): string => {
    if (!value || !isString(value)) {
        throw new Error(`Incorrect or missing ${field}: ${value}`);
    }
    return value;
};

const isDate = (date: string): boolean => {
  return Boolean(date.match(/^\d{4}-\d{2}-\d{2}$/));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
    return (Object.values(Gender) as string[]).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing date: ' + gender);
    }
    return gender;
};

const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }
    
    if ('name' in object 
        && 'dateOfBirth' in object
        && 'gender' in object
        && 'ssn' in object
        && 'occupation' in object
    ) {
        const newEntry: NewPatientEntry = {
            name: parseText(object.name, 'name'),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseText(object.ssn, 'ssn'),
            occupation: parseText(object.occupation, 'occupation'),
            gender: parseGender(object.gender)
        };
        return newEntry;
    }
    throw new Error('Some fields are missing');
};

export default parseNewPatientEntry;