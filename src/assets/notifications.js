import { Notify } from 'notiflix';

// export const notifications = {
//   notFound: Notify.failure(
//     'Sorry, there are no images matching your search query. Please try again.',
//     {
//       width: '500px',
//       fontSize: '28px',
//     }
//   ),
// };

export const notFound = () =>
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      width: '500px',
      fontSize: '28px',
    }
  );
