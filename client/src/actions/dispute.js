// Functionality for future
//
// export default function addDispute(name, disc, sides, timer, referee, complete) {
//   return {
//     type: 'ADD_DISPUTE',
//     name,
//     disc,
//     sides,
//     timer,
//     referee,
//     complete
//   }
// };

import axios from 'axios';

export function fetchDispute(data) {
  const request = axios.post('/add');

  return (dispatch) => {
    request.then({data}) => {
      dispatch({type: ''})
    }
  }
}
