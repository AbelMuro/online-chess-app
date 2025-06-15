const CreateMapping = (x1, x2, y1, y2, value) => {
    const numerator = (value - x1) * (y2 - y1);
    const denominator = x2 - x1;
    return y1 + (numerator/denominator);
}

export default CreateMapping;