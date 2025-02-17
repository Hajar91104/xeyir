import { Request, response, Response } from "express";
import { hashPassword } from "../utils/bcrypt";
import User from "../mongoose/schemas/user";
import { IUser } from "../types/user";
import { transporter } from "../utils/mail";
import crypto from "crypto";

const login = (req: Request, res: Response) => {
  res.json({
    message: "Login successful",
    user: req.user,
  });
};

const register = async (req: Request, res: Response) => {
  const user = req.body;
  user.password = hashPassword(user.password);

  const userExist = await User.findOne({
    email: user.email,
  });

  if (userExist) {
    res.status(400).json({
      message: "User already exists with this email",
    });
    return;
  }

  const newUser = new User(user);
  await newUser.save();

  const userObj: IUser = newUser.toObject();
  delete userObj.password;

  res.json({
    message: "Register successful",
    user: userObj,
  });
};

const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }

    res.json({
      message: "Logout successful",
    });
  });
};

const currentUser = (req: Request, res: Response) => {
  res.json({
    user: req.user,
  });
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "User not found with this email",
      });
      return;
    }
    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordTokenExpires = new Date(Date.now() + 3600000);
    await user.save();
    transporter.sendMail({
      from: '"Authentication 👻" <dadasovsuleyman126@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Reset Your Password", // Subject line
      html: `
              
                <head>
                  <meta charset="UTF-8">
                  <title>Reset Your Password</title>
                </head>
                <body style="margin:0; padding:0; font-family: Arial, sans-serif;">
                  <div style="background-color:#f4f4f4; padding:20px;">
                    <div style="max-width:600px; margin:0 auto; background-color:#ffffff; padding:20px; border-radius:4px;">
                      <h1 style="text-align:center;">Reset Your Password</h1>
                      <p style="font-size:16px;">
                        We received a request to reset your password. If this wasn’t you, please ignore this email.
                      </p>
                      <p style="font-size:16px;">
                        Click 
                        <a style="color:#1877f2; text-decoration:none;" href="http://localhost:5173/reset-password/${token}">
                          here
                        </a> 
                        to reset your password.
                      </p>
                      <p style="font-size:16px;">Your token will expire in 1 hour.</p>
                      <p style="font-size:16px;">
                        Your token is: <strong>${token}</strong>
                      </p>
                      <p style="font-size:16px;">
                        Thank you,<br>
                        The Team
                      </p>
                    </div>
                  </div>
                </body>
            `,
    });
    res.json({
      message: "Email sent",
    });
  } catch (error) {
    response.status(500).json({
      message: "Something went wrong!",
    });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400).json({ message: "Invalid or expired token" });
    return;
  }

  user.password = hashPassword(password);
  user.resetPasswordToken = "";
  user.resetPasswordTokenExpires = new Date(0);
  await user.save();

  res.json({
    message: "Password reset successful",
  });
};

const authController = {
  login,
  register,
  logout,
  currentUser,
  resetPassword,
  forgotPassword,
};

export default authController;
