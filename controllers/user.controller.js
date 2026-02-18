const { users } = require("../data/database");

exports.signup = (req, res) => {
  const { email, phone, referralCode } = req.body;

  if (!email && !phone) {
    return res.status(400).json({ message: "Email or phone required" });
  }

  const duplicate = users.find(
    (u) => u.email === email || u.phone === phone
  );

  if (duplicate) {
    return res.status(409).json({ message: "User already exists" });
  }

  const newUser = {
    id: users.length + 1,
    email,
    phone,
    referralCode: referralCode || null,
    verified: false,
    otp: "1234"
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created. Verify OTP.",
    otp: "1234"
  });
};

exports.verify = (req, res) => {
  const { email, otp } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.otp !== otp)
    return res.status(400).json({ message: "Invalid OTP" });

  user.verified = true;

  res.json({ message: "Account verified successfully" });
};
