export default (state = false, action) => {
    switch (action.type){
        case "setCollapsed":
            return action.payload;   
        default:
            return state;
    }
}