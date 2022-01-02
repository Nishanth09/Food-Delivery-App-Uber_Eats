import axios from 'axios';
import {PLACE_ORDER, GET_ORDERS, GET_CUSTOMER_ORDERS, UPDATE_ORDER, ERROR} from '../types'
import { placeOrder, updateOrder } from './mutations';

export const placeOrderRedux = (data) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    await axios.post('/api/order/add-order', data)
    .then((response) => {
        dispatch({
            type : PLACE_ORDER,
            payload : response.data
        })
    })
    .catch(error => {
        dispatch({
            type: ERROR,
            payload: error
        }) 
    })
    // console.log("data : ", data)
    // const mutation = placeOrder(data)
    // console.log("mutation : ", mutation)
    // await axios.post('/api/graphql', {
    //     'query': mutation
    // },
    // {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     }
    // }).then((response) => {
    //     dispatch({
    //         type : PLACE_ORDER,
    //         payload : response.data
    //     })
    //   }).catch(error => {
    //     dispatch({
    //         type: ERROR,
    //         payload: error
    //     })
    // });
}

export const updateOrderRedux = (data) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    // await axios.put('/api/order/update-order', data)
    // .then((response) => {
    //     dispatch({
    //         type : UPDATE_ORDER,
    //         payload : response.data
    //     })
    // })
    // .catch(error => {
    //     dispatch({
    //         type: ERROR,
    //         payload: error
    //     })
    // })
    const mutation = updateOrder(data)
    await axios.post('/api/graphql', {
        'query': mutation
    },
    {
        headers: {
          'Content-Type': 'application/json',
        }
    }).then((response) => {
        dispatch({
            type : UPDATE_ORDER,
            payload : response.data
        })
      }).catch(error => {
        dispatch({
            type: ERROR,
            payload: error
        })
    });
}

export const getOrdersRedux = (data) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    // await axios.get('/api/order/fetch-orders', {
    //     params:data
    // })
    // .then((response) => {
    //     dispatch({
    //         type : GET_ORDERS,
    //         payload : response.data
    //     })
    // })
    // .catch(error => {
    //     dispatch({
    //         type: ERROR,
    //         payload: error
    //     })
    // })
    const query =  `{getUserOrders {
                        _id
                        userid {
                            _id
                        }
                        restid {
                            _id
                        }
                        order_status
                        order_items {
                            dishName
                            dishimage
                            description
                            ingredients
                            price
                            category
                            instructions
                            qty
                        }
                        price
                        delivery_address
                        order_time
                    }}`
    await axios.post('/api/graphql', {
        'query': query
    },
    {
        headers: {
          'Content-Type': 'application/json',
        }
    }).then((response) => {
        dispatch({
            type : GET_ORDERS,
            payload : response.data
        })
      }).catch(error => {
        dispatch({
            type: ERROR,
            payload: error
        })
    });
}

export const getCustomerOrdersRedux = () => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    // await axios.get('/api/order/customer-orders')
    // .then((response) => {
    //     dispatch({
    //         type : GET_CUSTOMER_ORDERS,
    //         payload : response.data
    //     })
    // })
    // .catch(error => {
    //     dispatch({
    //         type: ERROR,
    //         payload: error
    //     })
    // })
    const query =  `{getCustOrders {
                        _id
                        userid {
                            _id
                        }
                        restid {
                            _id
                        }
                        order_status
                        order_items {
                            dishName
                            dishimage
                            description
                            ingredients
                            price
                            category
                            instructions
                            qty
                        }
                        price
                        delivery_address
                        order_time
                    }}`
    await axios.post('/api/graphql', {
        'query': query
    },
    {
        headers: {
          'Content-Type': 'application/json',
        }
    }).then((response) => {
        dispatch({
            type : GET_CUSTOMER_ORDERS,
            payload : response.data
        })
      }).catch(error => {
        dispatch({
            type: ERROR,
            payload: error
        })
    });
}
