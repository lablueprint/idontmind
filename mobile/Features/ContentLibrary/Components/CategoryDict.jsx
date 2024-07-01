import Relationships from '../../../assets/images/Relationships.png';
import Coping from '../../../assets/images/coping.png';
import Emotional from '../../../assets/images/emotional.png';
import Identity from '../../../assets/images/identity.png';
import Lifestyle from '../../../assets/images/lifestyle.png';
import Mental from '../../../assets/images/mental.png';
import Support from '../../../assets/images/support.png';
import Trauma from '../../../assets/images/trauma.png';
import Self from '../../../assets/images/improvement.png';

const CategoryDict = {
  relationships: {
    image: Relationships,
    color: '#556A93',
    name: 'Relationships',
  },
  coping: {
    image: Coping,
    color: '#BD2B2B',
    name: 'Coping',
  },
  ewb: {
    image: Emotional,
    color: '#ED713E',
    name: 'Emotional Well-Being',
  },
  identity: {
    image: Identity,
    color: '#CCA827',
    name: 'Identity + Self - Perception',
  },
  lifestyle: {
    image: Lifestyle,
    color: '#438373',
    name: 'Lifestyle + Wellness',
  },
  mental: {
    image: Mental,
    color: '#91A8D1',
    name: 'Mental Health Condition',
  },
  self: {
    image: Self,
    color: '#6E6891',
    name: 'Self-Improvement + Growth',
  },
  support: {
    image: Support,
    color: '#A86969',
    name: 'Support',
  },
  trauma: {
    image: Trauma,
    color: '#9B8C8C',
    name: 'Trauma + Recovery',
  },
};

export default CategoryDict;
