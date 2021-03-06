import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui';
import { translate } from 'react-i18next';

import { Form, styles, Row } from 'elements/Form';
import Button from 'elements/Button';
import SelectField from 'elements/Form/SelectField';
import DashboardButton from 'components/common/DashboardButton';
import { Checkbox } from 'redux-form-material-ui';

import screen from '../../store/wallet/screen';
import settings from '../../store/wallet/settings';
import accounts from '../../store/vault/accounts';
import i18n from '../../i18n/i18n';

class SettingsRender extends React.Component {
  render() {
    const { goDashboard, handleSubmit, t } = this.props;
    return (
      <Form caption="Settings" backButton={ <DashboardButton onClick={ goDashboard } /> } >
        <div>
          <Row>
            <div style={styles.left}>
              <div style={ styles.fieldName }>{ t('currency') }</div>
            </div>
            <div style={ styles.right }>
              <Field
                name="currency"
                component={ SelectField }
                underlineShow={ false }
                fullWidth={ true } >
                <MenuItem key="eur" value="eur" label="EUR" primaryText="EUR" />
                <MenuItem key="usd" value="usd" label="USD" primaryText="USD" />
                <MenuItem key="cny" value="cny" label="CNY" primaryText="CNY" />
                <MenuItem key="rub" value="rub" label="RUB" primaryText="RUB" />
                <MenuItem key="krw" value="krw" label="KRW" primaryText="KRW" />
              </Field>
            </div>
          </Row>
          <Row>
            <div style={styles.left}>
              <div style={styles.fieldName}>
                { t('lang') }
              </div>
            </div>
            <div style={styles.right}>
              <Field name="language"
                component={ SelectField }
                underlineShow={false}
                fullWidth={true}>
                <MenuItem
                  key="en-US"
                  value="en-US"
                  label="English (US)"
                  primaryText="English (US)"
                />
                <MenuItem
                  key="zh-CN"
                  value="zh-CN"
                  label="中文"
                  primaryText="中文"
                />
                <MenuItem
                  key="pt-BR"
                  value="pt-BR"
                  label="Portugese"
                  primaryText="Portugese"
                />
                <MenuItem
                  key="ko-KR"
                  value="ko-KR"
                  label="Korean"
                  primaryText="Korean"
                />
              </Field>
            </div>
          </Row>
          <Row>
            <div style={styles.left}>
              <div style={styles.fieldName}>
                { t('showHiddenAccounts') }
              </div>
            </div>
            <div style={styles.right}>
              <Field
                name="showHiddenAccounts"
                component={ Checkbox }
              />
            </div>
          </Row>
          <Row>
            <div style={ styles.left } />
            <div style={ styles.right }>
              <Button primary label="SAVE" onClick={ handleSubmit } />
            </div>
          </Row>
        </div>
      </Form>
    );
  }
}

const SettingsForm = translate('settings')(reduxForm({
  form: 'settings',
  fields: ['language', 'currency', 'showHiddenAccounts'],
})(SettingsRender));

const Settings = connect(
  (state, ownProps) => {
    return {
      initialValues: {
        language: i18n.language,
        currency: state.wallet.settings.get('localeCurrency', '').toLowerCase(),
        showHiddenAccounts: state.wallet.settings.get('showHiddenAccounts', false),
      },
    };
  },
  (dispatch, ownProps) => ({
    goDashboard: () => {
      dispatch(screen.actions.gotoScreen('home'));
    },

    onSubmit: (data) => {
      i18n.changeLanguage(data.language);
      dispatch(settings.actions.update({
        localeCurrency: data.currency,
        showHiddenAccounts: data.showHiddenAccounts,
      }));
      dispatch(accounts.actions.loadAccountsList());
    },
  })
)(SettingsForm);

export default Settings;
