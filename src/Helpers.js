export const htmlEscape = (string) => {

    return string.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

export const getRandomId = () => {
    return Math.round(Math.random() * (9999 - 1000) + 1000);
}




