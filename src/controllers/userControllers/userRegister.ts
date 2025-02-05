import { Request, Response } from "express";
import User from "../../models/User";
import { v4 } from "uuid";
import { hashPassword } from "../../services/password";

export const userRegister = async (request: Request, response: Response) => {
  try {
    const { email, first_name, last_name, user_name, telephone, password } =
      request.body;

    // Check if the email already exists
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      response.status(400).json({
        error: true,
        message: `${email} already exists`,
      });
      return;
    }

    // Check if the phone number already exists
    const existingPhone = await User.findOne({ where: { telephone } });
    if (existingPhone) {
      response.status(400).json({
        error: true,
        message: `${telephone} already exists`,
      });
      return;
    }

    // Generate UUID and password hash
    const id = v4();
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = await User.create({
      id,
      email,
      first_name,
      last_name,
      user_name,
      telephone,
      role: "user",
      password: hashedPassword,
    });

    // Generate OTPs for both email and SMS
    const emailOTP = String(generateOTP());

    const smsOTP = String(generateOTP());

    // Save OTP for email
    await Otp.create({
      id: v4(),
      user_id: id,
      otp_code: emailOTP,
      otp_type: "email",
      otp_expiry: expiryTime(10),
    });

    // Save OTP for SMS
    await Otp.create({
      id: v4(),
      user_id: id,
      otp_code: smsOTP,
      otp_type: "sms",
      otp_expiry: expiryTime(10),
    });

    // Send OTP via SMS
    await smsOTPVerification(smsOTP, telephone);

    // Send OTP via email
    await emailOTPVerification(emailOTP, email);

    response.status(200).json({
      message: "Registration successful, OTP sent to email and phone",
      error: false,
    });
  } catch (error: any) {
    response.status(500).json({
      error: true,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};
