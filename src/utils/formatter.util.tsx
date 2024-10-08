type Formatters = {
    twoDigitsFormatter: (value: string) => string;
    timeFormatter: (value: string) => string;
    dayFormatter: (value: string) => string;
};

export default function Formatter(functionName: keyof Formatters, target: string) {

    const formatters = {
        twoDigitsFormatter: (value: string): string => {
            if(Number(value) < 10) {
                return '0' + value;
            }
            else {
                return value.toString();
            }
        },

        timeFormatter: (value: string): string => {
            return value.substring(0, 5);
        },

        dayFormatter: (value: string): string => {
            const date = new Date(value);
            return date.getFullYear() + '-' +
                Formatter('twoDigitsFormatter',(date.getMonth()+1).toString()) + '-' +
                Formatter('twoDigitsFormatter', (date.getDate()).toString());
        }
    }

    return formatters[functionName](target);
}

