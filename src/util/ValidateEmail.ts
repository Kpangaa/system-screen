export const validateEmail = (e: string) => {
    let re = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    if (!re.test(String(e).toLowerCase())) {
        return false;
    } return true
}