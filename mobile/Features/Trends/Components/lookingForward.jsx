import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Art from '../../../assets/images/art.png';
import Dumbell from '../../../assets/images/dumbbell.png';
import Friends from '../../../assets/images/friends.png';
import Nature from '../../../assets/images/nature.png';
import Readingbook from '../../../assets/images/readingbook.png';
import Forward from '../../../assets/images/forward-solid.png';

function CircleIcon({
  paddingAmount, icon, color, priority, whitePadding,
}) {
  const activityImagesPaths = {
    Exercise: require('../../../assets/images/activity/activity1.png'),
    Eating: require('../../../assets/images/activity/activity2.png'),
    Reading: require('../../../assets/images/activity/activity3.png'),
    Nature: require('../../../assets/images/activity/activity4.png'),
    TV: require('../../../assets/images/activity/activity5.png'),
    Music: require('../../../assets/images/activity/activity6.png'),
    Art: require('../../../assets/images/activity/activity7.png'),
    Friends: require('../../../assets/images/activity/activity8.png'),
    Family: require('../../../assets/images/activity/activity9.png'),

  };
  return (
    <View style={{
      marginRight: -9, flex: priority, width: '100%', height: undefined, aspectRatio: 1, backgroundColor: icon.activity === '' ? '#F6FCFC' : 'white', borderRadius: 80, padding: whitePadding,
    }}
    >
      <View style={{
        padding: paddingAmount, backgroundColor: color, borderRadius: 80,
      }}
      >
        {
          icon.activityImg.includes('#') ? 
          <View style ={{ width: '100%', height: undefined, aspectRatio: 1, backgroundColor: icon.activityImg }} />
        :
        <Image style={{ width: '100%', height: undefined, aspectRatio: 1 }} source={activityImagesPaths[icon.activity]} />
        }
      </View>
    </View>
  );
}

CircleIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  priority: PropTypes.number.isRequired,
  paddingAmount: PropTypes.number.isRequired,
  whitePadding: PropTypes.number.isRequired,
};

export default function LookingForward({ top5Values }) {
  const circleConfig = [
    { priority: 12, paddingAmount: 20, whitePadding: 5 },
    { priority: 10, paddingAmount: 18, whitePadding: 4 },
    { priority: 7, paddingAmount: 12, whitePadding: 3 },
    { priority: 4, paddingAmount: 8, whitePadding: 2 },
    { priority: 2, paddingAmount: 4, whitePadding: 1 },
  ];
  return (
    <TouchableOpacity style={{
      flex: 1,
      flexDirection: 'column',
      paddingVertical: 20,
      paddingHorizontal: 12,
      gap: 8,
      backgroundColor: '#F6FCFC',
      borderRadius: 10,
      shadowColor: '#748384',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.40,
      shadowRadius: 5,
    }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ gap: 8, flexDirection: 'row' }}>
          <Image source={Forward} style={{ height: 17, width: 19 }} />
          <Text style={{ fontSize: 16, fontWeight: 700, fontFamily: 'cabinet-grotesk-bold' }}>
            What brought you joy today?
          </Text>
        </View>
      </View>
      <View style={{
        flexDirection: 'row', paddingHorizontal: 14, justifyContent: 'center', alignItems: 'center',
      }}
      >
        {top5Values.map((value, index) => {
          let color = '#BFDBD7';
          if (value.activity === '') {
            color = '#F6FCFC';
          }
          return (<CircleIcon icon={value} color={color} priority={circleConfig[index].priority} paddingAmount={circleConfig[index].paddingAmount} whitePadding={circleConfig[index].whitePadding} />);
        })}
      </View>
    </TouchableOpacity>
  );
}

LookingForward.propTypes = {
  top5Values: PropTypes.arrayOf(PropTypes.shape({
    activity: PropTypes.string,
    activityImg: PropTypes.string,
  })).isRequired,
};
