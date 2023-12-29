// import { FilterBy } from "./FiltesedBy";
// import { Cherwood } from "./Cherwood.js";

// export const getFilteredStravi = (
//     straviList: Cherwood[],
//     filterBy: FilterBy,
//   ): Cherwood[] => {
//     const filteredArray = straviList.filter((stravi) => {
//       switch (filterBy) {
//         case FilterBy.Rating:
//           return stravi.rating;
  
//         case FilterBy.Bread:
//           return stravi.category.toLowerCase().includes('bread');

//           case FilterBy.Soup:
//             return stravi.category.toLowerCase().includes('soup'); 
  
//         default:
//           return true;
//       }
//     });
    
//     return filteredArray;
// };