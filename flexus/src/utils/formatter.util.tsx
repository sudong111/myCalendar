type Formatters = {
    twoDigitsFormatter: (value: string) => string;
    savedTimeFormatter: (value: string) => string;
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
        savedTimeFormatter: (value: string): string => {
            return value.substring(0, 5);
        }
    }

    if (functionName in formatters) {
        return formatters[functionName](target);
    } else {
        throw new Error(`Formatter function "${functionName}" does not exist.`);
    }

}

