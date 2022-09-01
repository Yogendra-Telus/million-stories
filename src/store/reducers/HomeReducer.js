const HomeReducer = (state=[], action) => {
    switch(action.type){
        case 'LOAD_NEWS':
            return [...state, ...action.payload]
        case 'UPDATE_NEWS' :
            return state.map( (data) => (
                data.id === action.id ? {...data, isActive: true} : {...data, isActive:false}
            ))
        default:
            return state;
    }
}

export default HomeReducer;