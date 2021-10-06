import {Provider} from "react-redux";
import {store} from "../../store/store";

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={store}>{storyFn()}</Provider>
}