import { createStackNavigator } from "react-navigation";
import { InternalApp } from './components/InternalApp';
import Services from './components/Services';

const AppNavigator = createStackNavigator({
    InternalApp: { screen: InternalApp },
    Services: { screen: Services}
});