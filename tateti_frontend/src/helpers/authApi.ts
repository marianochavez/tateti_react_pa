/* eslint-disable no-console */
import axios from "axios";

export const signIn = async (username: string, password: string) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/v1/users/sign-in`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export const logout = async (token: string) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/users/sign-out`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.status === 200;
  } catch (error) {
    console.log(error);

    return false;
  }
};
