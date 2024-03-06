import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E3F5F4',
    },
    arrowContainer: {
        position: 'absolute',
        top: 100,
        left: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
    },
    inputContainer: {
        marginTop: 20,
        alignItems: 'flex-start',
    },
    inputWrapper: {
        flexDirection: 'row', 
        alignItems: 'center',
        height: 63,
        width: 350,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 5,
        paddingLeft: 10,
        backgroundColor: 'white',
    },
    inputBox: {
        height: 40,
        width: 300,
        marginTop: 5,
        paddingLeft: 10,
        backgroundColor: 'white',
    },
    buttonShape: {
        backgroundColor: '#C0C0C0',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginTop: 20,
        width: 258,
        height: 70,
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 12,
    },
    eyeIcon: {
        marginTop: 5,
    },
    paginationContainer: {
        flexDirection: 'row',
        marginTop: 20,
        width: 62,
        justifyContent: 'center',
    },
    activePaginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: 'black',
    },
    inactivePaginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: 'gray',
    },
    ageWrapper: {
        flexDirection: 'row', 
        alignItems: 'center',
        height: 63,
        width: 96,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 5,
        paddingLeft: 10,
        backgroundColor: 'white',
    },
    genderTitle: {
        paddingLeft: 80,
    },
    genderWrapper: {
        flexDirection: 'row', 
        alignItems: 'center',
        height: 63,
        width: 255,
        marginTop: 5,
        paddingTop: 22,
        paddingLeft: 10,
    },
    countryDropdown: {
        width: 350,
        height: 63,
        marginTop: 5,
        borderRadius: 8,
    },
    ageInputBox: {
        height: 40,
        width: 40,
        marginTop: 5,
        paddingLeft: 10,
        backgroundColor: 'white',
    },
    ageGenderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    allPasswordConditionsContainer: {
        alignitems: 'flex-start',
        marginTop: 5,
    },
    passwordConditionRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordConditionLastRow: {
        marginRight: 180,
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordConditionText: {
        fontSize: 14,
    },
    lowerCondition: {
        marginRight: 3,
    },
    upperCondition: {
        marginLeft: 30,
        marginRight: 3,
    },
    numsymCondition: {
        marginRight: 3,
    },
    lengthCondition: {
        marginLeft: 15.5,
        marginRight: 3
    },
    matchPassCondition: {
        marginRight: 3
    }
});
