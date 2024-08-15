import axios from 'axios';

export const handleAxiosError = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return {
        error:
          error.response.data.error || 'An error occurred. Please try again.',
      };
    } else if (error.request) {
      return {
        error: 'No response received from server. Please try again later.',
      };
    } else {
      return {
        error:
          'An error occurred while setting up the request. Please try again.',
      };
    }
  } else {
    return { error: 'An unexpected error occurred. Please try again.' };
  }
};
