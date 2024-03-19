/*
__Seed builder__v0.2.0
*/

/*
* Custom actions (endpoint) format:
* import CustomAction from 'actions/custom';
* const custom = new CustomAction();
* actions = [
*  {
*    className: CustomAction,
*    object: custom
*   }
* ]
*/

import Auth from 'actions/auth';
import Stats from 'actions/stats'
const auth = new Auth();
const stats = new Stats();

const actions = [
  {
    className: Auth,
    object: auth
  },
  {
    className: Stats,
    object: stats
  }
]
export default actions;