import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';


const App = () => {
  const [movie, setMovie] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getFoodList()
  }, [])

  const getFoodList = async () => {
    try {
      const response = await
        fetch('https://www.omdbapi.com/?s=Batman&page=2&apikey=663be951')
      const json = await response.json();
      setMovie(json.Search);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }

  }

  const Item = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image style={styles.images} source={{ uri: item.Poster }} resizeMode={'contain'} />

      <View style={styles.containerItem}>
        <Text style={styles.itemTitle}>{item.Title} </Text>
        <Text style={styles.itemText}>{item.Year} </Text>
        <Text style={styles.itemTextSmall}>{item.Type} </Text>
      </View>
    </View>

  );

  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  const separator = () => {
    return <View style={{ width: '100%', backgroundColor: 'grey', marginVertical:3,height:1 }} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeaderStyle}>Movies</Text>

      {isLoading ? <ActivityIndicator /> : (
        <FlatList style={styles.listStyle} data={movie}
          ItemSeparatorComponent={separator}
          renderItem={renderItem} />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 2,
  },
  containerItem: {
    flex: 1,
    flexDirection: 'column',
  },
  textHeaderStyle: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: '500',
  },
  itemTitle: {
    paddingHorizontal: 8,
    fontSize: 22,
    fontWeight: '400',
  },
  itemText: {
    paddingHorizontal: 8,
    fontSize: 20,
    paddingVertical: 1,
    fontWeight: '300',
  },
  itemTextSmall: {
    paddingHorizontal: 8,
    fontSize: 18,
    fontWeight: '300',
  },
  images: {
    height: 90,
    width: 70,
    alignSelf: 'center'
  },
  listStyle: {
    marginTop: 10,
    width: '100%'
  }

});

export default App;
