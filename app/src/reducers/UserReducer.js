export const initialState = {
    avatar: '',
    favorites: [],
    appointments: []
};

export const UserRedurect = (state, action) => {
    switch ((action.type)) {
        case 'setAvatar':
            return { ...state, avatar: action.payload.avatar };            
            break;

        default:
            break;
    }
}