import { useState } from 'react';
import { View, Button } from 'react-native';
import SearchBar from '../Components/SearchBar';

export default function ContentScreen({navigation}) {
  const [isOpen, setOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const navigateToFilter = () => {
    navigation.navigate('Filter');
  };

  const openSearch = () => {
    setOpen(true);
  };

  const closeSearch = () => {
    setOpen(false);
  };

  const handleSearch = (query) => {
    // search logic
    if (query.trim() !== '') {
      setRecentSearches((prevSearches) => [query, ...prevSearches]);
    }
    console.log('query: ', query);
  };

  return (
    <View style={{ marginTop: 40 }}>
      <Button title="Search" onPress={openSearch} />
      <SearchBar
        visible={isOpen}
        onClose={closeSearch}
        onSearch={handleSearch}
        recentSearches={recentSearches}
      />
      <Button title="Filter" onPress={navigateToFilter} />
    </View>
  );
}
