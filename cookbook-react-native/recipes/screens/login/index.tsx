import React, { useCallback } from 'react';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import i18next from 'i18next';
import { Formik } from 'formik';
import CustomHighlightButton from '@buttonsRecipes/custom-highlight-button';
import Routes from '@constants/routes';
import { Navigation } from '@interfaces/navigation';
import CustomText from '@textsRecipes/custom-text';
import { CustomTextInputFormikField } from '@inputsRecipes/custom-text-input';
import { validationsWrapper, validateRequired, validateEmail } from '@utils/validations/validateUtils';
import CustomRadioButtonGroup from '@radioButtonsRecipes/custom-radio-button-group';
import CustomCheckBoxGroup from '@checkboxesRecipes/custom-checkbox-group';

import { AuthState } from './interfaces/authInterfaces';
import { actionCreators as AuthActions } from './redux/auth/actions';
import { FIELDS, INITIAL_VALUES, WITHOUT_OPACITY } from './constants';
import './i18n';
import styles from './styles';

interface State {
  auth: AuthState;
}

function Login({ navigation }: Navigation) {
  const dispatch = useDispatch();
  const hasLoginError = useSelector<State, boolean>(store => !!store.auth.currentUserError);
  const handleLogin: (values: any) => void = useCallback(values => dispatch(AuthActions.login(values)), [
    dispatch
  ]);
  const handleGoToSignUp = () => navigation.navigate(Routes.SignUp);
  return (
    <TouchableOpacity activeOpacity={WITHOUT_OPACITY} onPress={Keyboard.dismiss} style={styles.container}>
      <Formik onSubmit={handleLogin} initialValues={INITIAL_VALUES}>
        {({ handleSubmit, isValid }) => (
          <>
            <View style={styles.form}>
              <CustomTextInputFormikField
                animated
                keyboardType="email-address"
                label={i18next.t('LOGIN:MAIL')}
                name={FIELDS.email}
                placeholder={i18next.t('LOGIN:MAIL_PLACEHOLDER')}
                showError={hasLoginError}
                validate={validationsWrapper([validateRequired, validateEmail])}
              />
              <CustomTextInputFormikField
                animated
                showEye
                secureTextEntry
                label={i18next.t('LOGIN:PASSWORD')}
                name={FIELDS.password}
                showError={hasLoginError}
                validate={validateRequired}
              />
              {hasLoginError && (
                <CustomText error center>
                  {i18next.t('LOGIN:LOGIN_FAILURE')}
                </CustomText>
              )}
            </View>
            <CustomHighlightButton
              onPress={handleSubmit}
              style={styles.formButton}
              title={i18next.t('LOGIN:LOG_IN')}
              disabled={hasLoginError || !isValid}
            />
            <CustomHighlightButton
              onPress={handleGoToSignUp}
              style={styles.formButton}
              title={i18next.t('LOGIN:SIGN_UP')}
            />
          </>
        )}
      </Formik>
    </TouchableOpacity>
  );
}

export default Login;
