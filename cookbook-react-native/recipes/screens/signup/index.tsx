import React, { useCallback } from 'react';
import { Keyboard, TouchableWithoutFeedback, ScrollView, View } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import i18next from 'i18next';
import { Formik } from 'formik';
import CustomHighlightButton from '@buttonsRecipes/custom-highlight-button';
import { isIos } from '@constants/platform';
import { useAsyncRequest } from '@hooks/useRequest';
import { CustomTextInputFormikField } from '@inputsRecipes/custom-text-input';
import { Navigation } from '@interfaces/navigation';
import CustomText from '@textsRecipes/custom-text';
import {
  validationsWrapper,
  validateRequired,
  validateEmail,
  validateOnlyText,
  validateMinLength
} from '@utils/validations/validateUtils';

import * as AuthService from './services/AuthService';
import { FIELDS, INITIAL_VALUES } from './constants';
import './i18n';
import styles from './styles';

function SignUp({ navigation }: Navigation) {
  const [, , error, signUp] = useAsyncRequest({
    request: AuthService.signup,
    withPostSuccess: () => navigation.goBack()
  });
  const hasSignUpError = !!error;
  const handleSignUp = useCallback(
    values => {
      Keyboard.dismiss();
      signUp(values);
    },
    [signUp]
  );
  return (
    <Formik onSubmit={handleSignUp} initialValues={INITIAL_VALUES}>
      {({ handleSubmit, isValid }) => (
        <View style={styles.stretchAndFlex}>
          <ScrollView
            bounces={false}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
            style={styles.stretchAndFlex}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={[styles.stretchAndFlex, styles.form]}>
                <CustomTextInputFormikField
                  animated
                  label={i18next.t('SIGNUP:NAME')}
                  name={FIELDS.name}
                  showError={hasSignUpError}
                  validate={validationsWrapper([validateRequired, validateOnlyText])}
                />
                <CustomTextInputFormikField
                  animated
                  label={i18next.t('SIGNUP:SURNAME')}
                  name={FIELDS.surname}
                  showError={hasSignUpError}
                  validate={validationsWrapper([validateRequired, validateOnlyText])}
                />
                <CustomTextInputFormikField
                  animated
                  label={i18next.t('SIGNUP:BIRTH_DATE')}
                  name={FIELDS.birthDate}
                  placeholder={i18next.t('SIGNUP:BIRTH_DATE_PLACEHOLDER')}
                  showError={hasSignUpError}
                  validate={validateRequired}
                />
                <CustomTextInputFormikField
                  animated
                  label={i18next.t('SIGNUP:SEX')}
                  name={FIELDS.sex}
                  placeholder={i18next.t('SIGNUP:SEX_PLACEHOLDER')}
                  showError={hasSignUpError}
                  validate={validationsWrapper([validateRequired, validateOnlyText])}
                />
                <CustomTextInputFormikField
                  animated
                  keyboardType="email-address"
                  label={i18next.t('SIGNUP:MAIL')}
                  name={FIELDS.email}
                  placeholder={i18next.t('SIGNUP:MAIL_PLACEHOLDER')}
                  showError={hasSignUpError}
                  validate={validationsWrapper([validateRequired, validateEmail])}
                />
                <CustomTextInputFormikField
                  animated
                  showEye
                  secureTextEntry
                  label={i18next.t('SIGNUP:PASSWORD')}
                  name={FIELDS.password}
                  showError={hasSignUpError}
                  validate={validationsWrapper([validateRequired, validateMinLength(8)])}
                />
                <CustomTextInputFormikField
                  animated
                  isOptional
                  keyboardType="phone-pad"
                  label={i18next.t('SIGNUP:PHONE_NUMBER')}
                  name={FIELDS.phoneNumber}
                  placeholder={i18next.t('SIGNUP:PHONE_NUMBER_PLACEHOLDER')}
                  showError={hasSignUpError}
                />
                {hasSignUpError && (
                  <CustomText error center>
                    {i18next.t('SIGNUP:SIGNUP_FAILURE')}
                  </CustomText>
                )}
                <CustomHighlightButton
                  onPress={handleSubmit}
                  style={styles.formButton}
                  title={i18next.t('SIGNUP:SIGN_UP')}
                  disabled={hasSignUpError || !isValid}
                />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
          {isIos && <KeyboardSpacer />}
        </View>
      )}
    </Formik>
  );
}

export default SignUp;
