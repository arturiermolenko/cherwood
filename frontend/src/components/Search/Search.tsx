import { useSearchParams } from "react-router-dom";
import "./Search.scss";
import { useAppSelector } from "../../app/hooks";

type SearchParams = {
  [key: string]: string | string[] | null,
};

function getSearchWith(
 currentParams: URLSearchParams,
 paramsToUpdate: SearchParams,
): string {
 const newParams = new URLSearchParams(currentParams);

 for (const [key, value] of Object.entries(paramsToUpdate)) {
   if (value === null) {
     newParams.delete(key);
   } else if (Array.isArray(value)) {
     newParams.set(key, value.join(','));
   } else {
     newParams.set(key, value);
   }
 }

 return newParams.toString();
}

export const Search = () => {
 const [searchQuery, setSearchQuery] = useSearchParams();
 const languageReducer = useAppSelector(state => state.language);

 const query = searchQuery.get('query') || '';

 const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   setSearchQuery(getSearchWith(searchQuery,
     { query: event.target.value || null }));
 };

 const isClearSearch = () => {
   setSearchQuery('');
 };

 const formInput = document.querySelector('.form__input');
 const form = document.querySelector('.form');

 if (form !== null  && formInput !== null) {
  formInput.addEventListener('focus', function() {
    form.classList.add('focused');
   });
 
   formInput.addEventListener('blur', function() {
    form.classList.remove('focused');
   });
 }

 return (
   <div className="form">
     <label
       className="form__label"
       htmlFor="searchInput"
     >
      <button
       type="button"
       className='form__img form__search'
       onClick={isClearSearch}
     />
       <input
         type="text"
         className="form__input"
         value={query}
         placeholder= {
          languageReducer.language 
            ?('Search')
            :('Пошук')
        }
         onChange={onQueryChange}
       />
     </label>
   </div>
 );
};