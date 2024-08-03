import {actionForTesting} from '../../src/redux/actions/authActions';
import * as categoryActions from '../../src/redux/actions/categoryActions';
import * as channelsActions from '../../src/redux/actions/channelsActions';
import * as chatActions from '../../src/redux/actions/chatActions';
import * as storesActions from '../../src/redux/actions/storesActions';
import {test, expect} from '@jest/globals';

// const userCredintials = {
//   data: {
//     username: 'tameradel209@icloud.com',
//     password: 'Tamer$209',
//     fcmTokenOld: null,
//     fcmTokenNew: null,
//   },
//   keepMeSignIn: false,
//   callback: () => null,
// };

// test('authenticate user', () =>
//   expect(authActions.signin(userCredintials)).toBe({}));

test('authenticate user', () =>
  expect(
    actionForTesting({
      username: 'tameradel209@icloud.com',
      password: 'Tamer209',
    }),
  ).toBe({username: 'tameradel209@icloud.com', password: 'Tamer209'}));
