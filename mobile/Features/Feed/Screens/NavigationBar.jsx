import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function FirstScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Screen 1!</Text>
        </View>
    );
}

function SecondScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Screen 2!</Text>
        </View>
    );
}

function ThirdScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Screen 3!</Text>
        </View>
    );
}

function FourthScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Screen 4!</Text>
        </View>
    );
}

function FifthScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Screen 5!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator>
                <Tab.Screen name="Screen 1" component={FirstScreen} />
                <Tab.Screen name="Screen 2" component={SecondScreen} />
                <Tab.Screen name="Screen 3" component={ThirdScreen} />
                <Tab.Screen name="Screen 4" component={FourthScreen} />
                <Tab.Screen name="Screen 5" component={FifthScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}