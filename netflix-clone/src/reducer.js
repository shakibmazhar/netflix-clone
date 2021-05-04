

const reducer = (state, action) => {

    switch(action.type){
        case "SET_MOVIE":
            return{
                ...state,
                movie: {
                    ...state.movie,
                    id: action.id,
                    name: action.name,
                    poster: action.poster,
                    description: action.description,
                }                
            }
        
        default:
            return{
                ...state
            }
    }
}

export default reducer