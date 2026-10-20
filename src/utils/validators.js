// Returns an object of { fieldName: true } for every invalid field.
// Messages live in data/content.js, keyed by the same field names.
const PHONE_PATTERN = /^(09|\+639)\d{9}$/;

export function validateCheckout(values) {
  const errors = {};
  if (values.customerName.trim().length < 2) errors.customerName = true;
  if (!PHONE_PATTERN.test(values.phone.replace(/[\s-]/g, ""))) errors.phone = true;
  if (values.address.trim().length < 10) errors.address = true;
  if (!values.paymentMethod) errors.paymentMethod = true;
  return errors;
}

export function validateReview(values) {
  const errors = {};
  if (values.author.trim().length < 2) errors.author = true;
  if (values.comment.trim().length < 10) errors.comment = true;
  return errors;
}
