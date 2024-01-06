export const checkValidate = (email, password) => {

    const isEmailValid = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);

    if (!isEmailValid) return "Email is not valid";
    if (!isPasswordValid) return "password is not valid";

    return null
}