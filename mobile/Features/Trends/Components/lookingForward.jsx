import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Arrow from '../../../assets/images/arrow.png';
import Art from '../../../assets/images/art.png';
import Dumbell from '../../../assets/images/dumbbell.png';
import Friends from '../../../assets/images/friends.png';
import Nature from '../../../assets/images/nature.png';
import Readingbook from '../../../assets/images/readingbook.png';
import Right from '../../../assets/images/right.png';
import Forward from '../../../assets/images/forward-solid.png';

function CircleIcon({
  paddingAmount, icon, color, priority, whitePadding,
}) {
  return (
    <View style={{
      marginRight: -9, flex: priority, width: '100%', height: undefined, aspectRatio: 1, backgroundColor: 'white', borderRadius: 80, padding: whitePadding,
    }}
    >
      <View style={{
        padding: paddingAmount, backgroundColor: color, borderRadius: 80,
      }}
      >
        <Image style={{ width: '100%', height: undefined, aspectRatio: 1 }} source={icon} />
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

export default function LookingForward() {
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
            What You
            &apos;
            re Looking Forward To
          </Text>
        </View>
        <Image source={Right} style={{ height: 10, width: 10, marginTop: 5 }} />
      </View>
      <View style={{
        flexDirection: 'row', paddingHorizontal: 14, justifyContent: 'center', alignItems: 'center',
      }}
      >
        <CircleIcon icon={Dumbell} color="#BFDBD7" priority={12} paddingAmount={20} whitePadding={5} />
        <CircleIcon icon={Art} color="#BFDBD7" priority={10} paddingAmount={18} whitePadding={4} />
        <CircleIcon icon={Friends} color="#BFDBD7" priority={7} paddingAmount={12} whitePadding={3} />
        <CircleIcon icon={Nature} color="#BFDBD7" priority={4} paddingAmount={8} whitePadding={2} />
        <CircleIcon icon={Readingbook} color="#BFDBD7" priority={2} paddingAmount={4} whitePadding={1} />
      </View>
    </TouchableOpacity>
  );
}

LookingForward.propTypes = {
};
