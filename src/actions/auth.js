import Action from 'seed/helpers/action'

class Auth extends Action
{
  constructor()
  {
    super(
      `AUTH`,
      `auth`,
      state => state.auth
    )
  }

  signup(body, callback)
  {
    const onSignup = res =>
      callback(res);

    return this.request(
      'POST', `/sign_up`, '', body, onSignup);
  }

  recoverPassword(body, callback)
  {
    const onRecover = res =>
      callback(res);

    return this.request(
      'POST', `/recover`, '', body, onRecover);
  }

  changePassword(body, callback)
  {
    const onChangePassword = res =>
      callback(res);

    return this.request(
      'POST', `/change_password`, '', body, onChangePassword);
  }


}

export default Auth;