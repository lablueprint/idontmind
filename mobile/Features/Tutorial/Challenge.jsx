import {
  View, Text, TouchableOpacity, StyleSheet, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import completed from '../../assets/images/green_check.png';
import calendar from '../../assets/images/date_cal.png';
import styles from './ChallengeStyle';

export default function Challenge({ day, description, isUnfolded, onToggle, onComplete, isCompleted, completionDate, title }) {
  return (
    <TouchableOpacity style={styles.challengeContainer} onPress={onToggle}>
      {!isUnfolded ? (
        <View style={styles.foldedContainer}>
          <View style={styles.foldedFlex}>
            <Image source={calendar} style={styles.calendar}/>
            <View style={styles.contains}>
              <Text style={styles.header}>
                {isUnfolded ? `Today's Challenge: ${day}` : `${day}: ${title}`}
              </Text>
              <Text style={{color: '#676C6C', fontFamily: 'Cabinet Grotesk'}}>
                {isCompleted ? `Completed: ${completionDate}` : 'Not Completed'}
              </Text>
            </View>
          </View>
        </View>
        ) : (
          isCompleted ? (
            <View style={styles.unfoldedContainer}>
              <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%', alignItems: 'center'}}>
                <Image source={completed} style={styles.completedImage} />
                <Text style={{fontSize: 24, fontFamily: 'Recoleta'}}>{`${day} Challenge`}</Text>
                <Text style={styles.completedOnText}>{`Completed on ${completionDate}`}</Text>
                <Text style={{paddingLeft: 15, paddingRight: 15, fontFamily: 'Cabinet Grotesk'}}>{`${description}`}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.unfoldedContainer}>
              <View style={{width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'center'}}>
                <Text style={styles.cardHeader}>
                  {`Today's Challenge: ${day}`}
                </Text>
              </View>
              <View style={{width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'center'}}>
                <Text style={styles.cardDescription}>{description}</Text>
              </View>
              {completionDate && <Text>Completed on: {completionDate}</Text>}
              {!isCompleted && (
                <View style={{width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'center'}}>
                  <TouchableOpacity style={styles.continue} onPress={onComplete}>
                    <Text style={styles.contText}>Mark as Complete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            )
        )}
    </TouchableOpacity>
  );
}

Challenge.propTypes = {
  day: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isUnfolded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  completionDate: PropTypes.string,
};
