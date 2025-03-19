const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }) // Ensure only digits
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(20, { message: "Phone number must not be more than 20 digits" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }) // Fixed inconsistency
    .max(255, { message: "Password must not be more than 255 characters" }), // Fixed max limit
});

module.exports = signupSchema;
