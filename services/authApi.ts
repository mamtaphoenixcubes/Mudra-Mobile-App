import axios from 'axios';

export const googleLogin = async (
  idToken: string
) => {
  try {
    const response = await 
      axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/google`,
      {
        idToken,
      }
    );
console.log(response,"responseeeeeeeeeeeeeee");

    return response.data;

  } catch (error: any) {
    console.error(
      'GOOGLE LOGIN API ERROR:',
      error?.response?.data ||
      error.message
    );

    throw error;
  }
};