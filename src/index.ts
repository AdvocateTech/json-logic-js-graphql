import _ from 'lodash'
import jsonLogic from 'json-logic-js';
import {
    differenceInDays,
    differenceInHours,
    differenceInMilliseconds,
    differenceInMinutes,
    differenceInMonths,
    differenceInSeconds,
    differenceInYears,
    isFuture,
    isPast,
    parseISO,
} from 'date-fns';

import { lodashOperators } from './operators';

enum DURATION_UNITS {
    MILLISECONDS = 'milliseconds',
    SECONDS = 'seconds',
    MINUTES = 'minutes',
    HOURS = 'hours',
    DAYS = 'days',
    MONTHS = 'months',
    YEARS = 'years',
}

const differenceInDuration = (dateInputs: string[] | Date[], unit: DURATION_UNITS) => {
    const dateString1 = dateInputs[0] instanceof Date ? dateInputs[0].toISOString() : dateInputs[0];
    const dateString2 = dateInputs[1] instanceof Date ? dateInputs[1].toISOString() : dateInputs[1];

    const date1 = parseISO(dateString1);
    const date2 = parseISO(dateString2);

    const isSomeDateInvalid = [date1, date2].find((d) => isNaN(d.getTime()));

    if (isSomeDateInvalid) {
        return 0
    }

    switch (unit) {
        case DURATION_UNITS.MILLISECONDS:
            return -differenceInMilliseconds(date1, date2);
        case DURATION_UNITS.SECONDS:
            return -differenceInSeconds(date1, date2);
        case DURATION_UNITS.MINUTES:
            return -differenceInMinutes(date1, date2);
        case DURATION_UNITS.HOURS:
            return -differenceInHours(date1, date2);
        case DURATION_UNITS.DAYS:
            return -differenceInDays(date1, date2);
        case DURATION_UNITS.MONTHS:
            return -differenceInMonths(date1, date2);
        case DURATION_UNITS.YEARS:
            return -differenceInYears(date1, date2);
    }

    return 0;
};

lodashOperators.forEach((name) => jsonLogic.add_operation(`_${name}`, _[name]));

jsonLogic.add_operation('_isPastDate', (date: string) =>
    isPast(new Date(date))
);

jsonLogic.add_operation('_isFutureDate', (date: string) =>
    isFuture(new Date(date))
);

jsonLogic.add_operation('_getDate', (date: string) =>
    new Date(date).toISOString()
);

jsonLogic.add_operation(
    '_gteDate',
    (dateStrings: string[] | Date[], durationUnits: [number, DURATION_UNITS]) =>
        differenceInDuration(dateStrings, durationUnits[1]) >= durationUnits[0]
);

jsonLogic.add_operation(
    '_gtDate',
    (dateStrings: string[] | Date[], durationUnits: [number, DURATION_UNITS]) =>
        differenceInDuration(dateStrings, durationUnits[1]) > durationUnits[0]
);

jsonLogic.add_operation(
    '_lteDate',
    (dateStrings: string[] | Date[], durationUnits: [number, DURATION_UNITS]) =>
        differenceInDuration(dateStrings, durationUnits[1]) <= durationUnits[0]
);

jsonLogic.add_operation(
    '_ltDate',
    (dateStrings: string[] | Date[], durationUnits: [number, DURATION_UNITS]) =>
        differenceInDuration(dateStrings, durationUnits[1]) < durationUnits[0]
);

jsonLogic.add_operation(
    '_eqDate',
    (dateStrings: string[] | Date[], durationUnits: [number, DURATION_UNITS]) =>
        differenceInDuration(dateStrings, durationUnits[1]) === durationUnits[0]
);

jsonLogic.add_operation('_nonZeroMin', (a: number[]) =>
    Math.min(...a.filter((n) => n !== 0))
);

jsonLogic.add_operation('_nonZeroMax', (a: number[]) =>
    Math.max(...a.filter((n) => n !== 0))
);

jsonLogic.add_operation('_neq', (a: string, b: string) => a != b);

export {jsonLogic};
