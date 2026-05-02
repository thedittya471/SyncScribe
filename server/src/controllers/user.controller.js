import { apiError } from '../utils/ApiError.js';
import { apiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Error generating tokens:', error);
    throw new apiError(
      500,
      'Something went wrong while generating access and refresh tokens'
    );
  }
};

const registerUser = async (req, res) => {
  const { username, email, password, fullName, role = 'user' } = req.body;

  if (!fullName || !email || !username || !password) {
    throw new apiError(400, 'All fields are required');
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new apiError(400, 'Username or email already exists');
  }

  const user = await User.create({
    fullName,
    email,
    username: username.toLowerCase(),
    password,
    role,
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  if (!createdUser) {
    throw new apiError(500, 'Failed to create user');
  }

  return res
    .status(201)
    .json(
      new apiResponse(201, createdUser, 'User registered successfully')
    );
};

const loginUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username || email)) {
    throw new apiError(400, 'username or email is required');
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  }).select('+password');

  if (!user) {
    throw new apiError(400, 'Invalid username/email or password');
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new apiError(400, 'Invalid password');
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        'User loggin In Successfully'
      )
    );
};

export { registerUser, loginUser };

