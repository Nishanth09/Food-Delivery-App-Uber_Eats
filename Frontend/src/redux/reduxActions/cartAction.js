import { CART } from '../types';

export const cartRedux = () => (dispatch) => {
    console.log("action cart");
    dispatch({
        type : CART,
        payload : [0]
    })
}
