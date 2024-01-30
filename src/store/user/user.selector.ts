import { RootState } from "../store";

export const selectCurrentUserDetails = (state: RootState) => state.user.currentUser;

export const selectUserDetailsIsLoading = (state: RootState) => state.user.isLoading;

export const selectUserDetailsSignUpError = (state: RootState) => state.user.error.signUpError;

export const selectUserDetailsLoginError = (state: RootState) => state.user.error.loginError;

export const selectUserAddressError = (state: RootState) => state.user.error.addressError;

export const selectUserSessionError = (state: RootState) => state.user.error.sessionError;

export const selectUserDropDownVisibility = (state: RootState) => state.user.userDropDownVisibility;