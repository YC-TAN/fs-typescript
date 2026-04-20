const isNotNumber = (arg: string): boolean => {
    return isNaN(Number(arg));
};

export default isNotNumber;