import Validator from 'validator';
import isEmpty from 'is-empty';

export default function validateInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.giftCardsQty = !isEmpty(data.giftCardsQty) ? data.giftCardsQty : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.amount = !isEmpty(data.amount) ? data.amount : "";

    // Gift Card Quantity checks
    if(Validator.isEmpty(data.giftCardsQty)) {
        errors.giftCardsQty = "Gift card quantity is required";
    } else if (data.giftCardsQty < 1) {
        errors.giftCardsQtyIsInvalid = "You should enter a minimum of 1 gift card";
    }

    // Date checks
    if(Number(data.expiryDate.slice(6)) > (new Date().getFullYear() + 1)) {
        errors.expiryDateIsInvalid = `You shouldn't enter a date that's greater than a year from ${new Date().getFullYear()}`
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.emailIsInvalid = "Email is invalid";
    }

    // Amount checks
    if (Validator.isEmpty(data.amount)) {
        errors.amount = "Amount is required";
    } else if (data.amount < 1) {
        errors.amountIsInvalid = "You should enter a minimum of 1 rupee";
    }

    // Prefix checks
    if (data.prefix.length > 10) {
        errors.prefixIsInvalid = "Prefix should not be more than 10 characters"
    }

    return { errors, isValid: isEmpty(errors) };
};