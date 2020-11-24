export const truncate = (input, length = 60) =>
  input.length > 5 ? `${input.substring(0, length)}...` : input;
