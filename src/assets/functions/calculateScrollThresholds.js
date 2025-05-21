const calculateScrollThreshold = (offsetFromTop, offsetHeight) => {

    const scrollableHeight = document.documentElement.scrollHeight;
    const offsetFromBottom = offsetFromTop + offsetHeight;
    const topScrollThreshold = offsetFromTop / scrollableHeight;
    const bottomScrollThreshold = offsetFromBottom / scrollableHeight;

    return [topScrollThreshold, bottomScrollThreshold];
}

export default calculateScrollThreshold;