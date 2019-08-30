import axios from "axios"

export default {
    createUser: function (name) {
        return axios.post('/api/newuser', name)
    },

    createFridge: function (user) {
        return axios.post('/api/fridge/' + user)
    },

    getFridge: function (user) {
        return axios.get('/api/fridge/' + user)
    },

    updateFridge: function (user, body) {
        return axios.put('/api/fridge/' + user, body)
    },

    createList: function (user) {
        return axios.post('/api/shoppinglist/' + user)
    },

    getList: function (user) {
        return axios.get('/api/shoppinglist/' + user)
    },

    updateList: function (user, body) {
        return axios.put('/api/shoppinglist/' + user, body)
    }

}