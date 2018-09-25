import { combineReducers } from 'redux';

import usersReducer from './entities/users_reducer';
import imagesReducer from './entities/images_reducer';
import currentImageReducer from './entities/current_image_reducer';
import businessesReducer from './entities/businesses_reducer';

export default combineReducers({
    users: usersReducer,
    images: imagesReducer,
    businesses: businessesReducer,
    currentImage: currentImageReducer
})