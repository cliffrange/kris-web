export default function withServerUpdate(actionCreator) {
    return (payload) => {
        return async (dispatch) => {
            const action = actionCreator(payload);
            dispatch(action); // Optimistic update
            if (action.localOnly){
                return;
            }

            const result = await fetch('/ball', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(action)
            });
        }
    }
}
