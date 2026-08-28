import {
  Platform,
} from 'react-native';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
} from '@/constants/google';

let configured = false;

export const configureGoogleSignIn = () => {

  if (configured) {
    return;
  }

//   GoogleSignin.configure({

//     // Web / Backend OAuth Client ID
//     webClientId:
//       GOOGLE_WEB_CLIENT_ID,

//     // iOS OAuth Client ID
//     iosClientId:
//       GOOGLE_IOS_CLIENT_ID,

//   });
  GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  iosClientId: GOOGLE_IOS_CLIENT_ID,
});

  configured = true;
};


export const signInWithGoogle = async () => {
  try {
    configureGoogleSignIn();

    if (Platform.OS === 'android') {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
    }
    try {
      await GoogleSignin.signOut();
    } catch (signOutError) {
      // Ignore if there is no previous Google session
      console.log(
        'No previous Google session to sign out:',
        signOutError
      );
    }

    // --------------------------------------------------
    // GOOGLE SIGN IN
    // --------------------------------------------------

    const response = await GoogleSignin.signIn();

    // --------------------------------------------------
    // GET GOOGLE ID TOKEN
    // --------------------------------------------------

    const idToken = response.data?.idToken;

    if (!idToken) {
      throw new Error(
        'Google ID token was not returned'
      );
    }

    // --------------------------------------------------
    // RETURN GOOGLE RESULT
    // --------------------------------------------------

    return {
      success: true,
      idToken,
      user: response.data?.user,
    };

  } catch (error: any) {

    // --------------------------------------------------
    // USER CANCELLED
    // --------------------------------------------------

    if (
      error?.code ===
      statusCodes.SIGN_IN_CANCELLED
    ) {
      return {
        success: false,
        cancelled: true,
        message: 'Google sign in cancelled',
      };
    }

    // --------------------------------------------------
    // SIGN IN ALREADY IN PROGRESS
    // --------------------------------------------------

    if (
      error?.code ===
      statusCodes.IN_PROGRESS
    ) {
      return {
        success: false,
        message:
          'Google sign in already in progress',
      };
    }

    // --------------------------------------------------
    // GOOGLE PLAY SERVICES
    // --------------------------------------------------

    if (
      error?.code ===
      statusCodes.PLAY_SERVICES_NOT_AVAILABLE
    ) {
      return {
        success: false,
        message:
          'Google Play Services are not available',
      };
    }

    // --------------------------------------------------
    // UNKNOWN ERROR
    // --------------------------------------------------

    console.error(
      'GOOGLE SIGN IN ERROR:',
      error
    );

    return {
      success: false,
      message:
        error?.message ||
        'Google sign in failed',
    };
  }
};