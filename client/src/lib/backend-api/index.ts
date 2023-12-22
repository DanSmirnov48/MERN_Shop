import { INewUser, UserImage } from "@/types";
import axios from "axios";

// ============================================================
// USER
// ============================================================

export async function createUserAccount(user: INewUser) {
  try {
    const account = await axios.post(`/api/users/signup`, user)
    return account
  } catch (error: any) {
    if (error.response) {
      return { error: error.response.data, status: error.response.status };
    } else if (error.request) {
      return { error: 'No response from the server', status: 500 };
    } else {
      return { error: 'An unexpected error occurred', status: 500 };
    }
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await axios.post(`/api/users/login`, user);
    return session;
  } catch (error: any) {
    if (error.response) {
      return { error: error.response.data, status: error.response.status };
    } else if (error.request) {
      return { error: 'No response from the server', status: 500 };
    } else {
      return { error: 'An unexpected error occurred', status: 500 };
    }
  }
}

export async function validateUserByJwt(jwt: string) {
  try {
    const response = await axios.get('/api/users/validate', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function signOutAccount() {
  try {
    const response = await axios.get('/api/users/logout')
    return response
  } catch (error) {
    console.log(error);
  }
}

export async function updateMyAccount(user: { firstName: string; lastName: string; photo?: UserImage }) {
  try {
    const response = await axios.patch(`/api/users/update-me`, user);
    return response;
  } catch (error: any) {
    if (error.response) {
      return { error: error.response.data, status: error.response.status };
    } else if (error.request) {
      return { error: 'No response from the server', status: 500 };
    } else {
      return { error: 'An unexpected error occurred', status: 500 };
    }
  }
}

export async function updateMyPassword(user: { password: string; passwordConfirm: string; passwordCurrent: string }) {
  try {
    const response = await axios.patch(`/api/users/update-my-password`, user);
    return response;
  } catch (error: any) {
    if (error.response) {
      return { error: error.response.data, status: error.response.status };
    } else if (error.request) {
      return { error: 'No response from the server', status: 500 };
    } else {
      return { error: 'An unexpected error occurred', status: 500 };
    }
  }
}

export async function deactivateMyAccount() {
  try {
    const response = await axios.delete(`/api/users/deactivate-me`);
    console.log(response)
    return response;
  } catch (error: any) {
    if (error.response) {
      return { error: error.response.data, status: error.response.status };
    } else if (error.request) {
      return { error: 'No response from the server', status: 500 };
    } else {
      return { error: 'An unexpected error occurred', status: 500 };
    }
  }
}

export async function getUserById(userId: string) {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    return response;
  } catch (error: any) {
    if (error.response) {
      return { error: error.response.data, status: error.response.status };
    } else if (error.request) {
      return { error: 'No response from the server', status: 500 };
    } else {
      return { error: 'An unexpected error occurred', status: 500 };
    }
  }
}

// ============================================================
// MEDIA
// ============================================================

export async function deleteMediaFilesByKey(fileKeys: string[]) {
  try {
    const response = await axios.delete('/api/media/deleteFiles', {
      data: { fileKeys },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}