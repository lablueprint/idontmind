import { useState, useEffect } from 'react';
import {
  Button, Text, View, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import Journal from '../Components/Journal';

export default function JournalPage({ navigation }) {
    return(
        <Journal></Journal>
    )

};