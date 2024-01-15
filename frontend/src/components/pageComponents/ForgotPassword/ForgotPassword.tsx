import { useNavigate } from "react-router";
import { useAppSelector } from "../../../app/hooks";

export const ForgotPassword = () => {
  const languageReducer = useAppSelector((state) => state.language);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="forgotPassword">
      <div
        className="forgotPassword__backButton"
        onClick={handleGoBack}
        aria-hidden
        data-cy="backButton"
      >
        <div className="forgotPassword__backButton__icon" />

        <span className="forgotPassword__backButton__text">
        {languageReducer.language
            ? 'Back'
            : 'Назад'
          }
        </span>
      </div>

      <div className="forgotPassword__container">
        <p className="forgotPassword__lock" />

        <h1 className="forgotPassword__header">
          {languageReducer.language
            ? 'Forgot password?'
            : 'Забули пароль?'
          }
        </h1>

        <h2 className="forgotPassword__text">
          {languageReducer.language
            ? 'All good. Enter your account\'s email address and we\'ll send you a link to reset your password '
            : 'Все гаразд. Введіть адресу електронної пошти вашого облікового запису, і ми вам надішлемо посилання для скидання пароля.'
          }
        </h2>
      </div>

      <div className="signUpLogic__container">
        <div className="signUpLogic__miniContainer">
          <p className="signUpLogic__text">
            {languageReducer.language
              ? 'Email address*'
              : 'Адреса електронної пошти*'}
          </p>

          <input
            type="email"
            className="signUpLogic__input"
            placeholder={
              languageReducer.language
                ? 'Enter your email address'
                : 'Введіть вашу адресу електронної пошти'
            }
          />
        </div>

        <button
          className='signUpLogic__green signUpLogic__button2'
        >
          {languageReducer.language
            ? 'Confirm'
            : 'Продовжити'}
        </button>
      </div>

      <div
        className="forgotPassword__backButton"
        onClick={handleGoBack}
        aria-hidden
        data-cy="backButton"
      >
        <div className="forgotPassword__backButton__icon2" />

        <span className="forgotPassword__backButton__text">
          {languageReducer.language
            ? 'Return to login'
            : 'Повернутися до входу'
          }
        </span>
      </div>
    </div>
  );
}