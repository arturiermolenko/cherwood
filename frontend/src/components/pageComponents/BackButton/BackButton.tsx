import './BackButton.scss';
import { useAppSelector } from '../../../app/hooks';

type Props = {
  hendlCloseModal: () => void; 
};

export const BackButton:React.FC<Props> = ({hendlCloseModal}) => {
  const languageReducer = useAppSelector(state => state.language);

  return (
    <div
      className="backButton"
      onClick={() => hendlCloseModal()}
      aria-hidden
      data-cy="backButton"
    >
      <div className="backButton__icon" />

      <span className="backButton__text">
        {
          languageReducer.language 
            ?('product details')
            :('назад до товарів')
        }
      </span>
    </div>
  );
};
