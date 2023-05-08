export default (baseString: string, stringToCompare: string): boolean =>
    baseString
        .replace(/ /g, '')
        .toUpperCase()
        .includes(stringToCompare.replace(/ /g, '').toUpperCase());
