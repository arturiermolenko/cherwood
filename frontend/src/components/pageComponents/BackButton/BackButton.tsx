import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

type Props = {
  hendlCloseModal: () => void; 
};

export const BackButton:React.FC<Props> = ({hendlCloseModal}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="backButton"
      onClick={() => {
        handleGoBack();
        hendlCloseModal();
      }}
      aria-hidden
      data-cy="backButton"
    >
      <div className="backButton__icon" />

      <span className="backButton__text">product details</span>
    </div>
  );
};
