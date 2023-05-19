import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Progress from 'react-native-progress';
import {moderateScale} from '../constant/Dimension';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {urls} from '../API';
import CustomModal from '../components/CustomModal';

interface Props {
  navigation?: any;
}

interface Intake {
  createdAt: string;
  amount: number | string;
  unit: string;
  id: string;
}

const HomeScreen = (props: Props) => {
  const [progress, setProgress] = useState(30);
  const [newIntake, setNewIntake] = useState<any>(0);
  const [inputVisible, setInputVisible] = useState(false);

  const [selectIntake, setSelectIntake] = useState<Intake>({
    amount: 0,
    unit: '',
    id: '',
    createdAt: '',
  });
  const [intakes, setIntakes] = useState<Intake[]>([]);
  const date = new Date().toISOString();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const openModal = (item:Intake) => {
    setSelectIntake(item);
    setModalVisible(true);
  };

  const openModal2 = () => {
    setModalVisible2(true);
  };

  const onSaveIntake = async () => {
    axios
      .post(urls.getIntake, {
        amount: parseInt(newIntake),
        unit: 'ml',
        createdAt: new Date().toISOString(),
      })
      .then(response => console.log(response))
      .finally(() => getIntakes());

    setModalVisible2(false);
  };

  const onDeleteIntake = async (item: Intake) => {
    axios.delete(urls.getIntake + `/${item.id}`).finally(() => getIntakes());
    setModalVisible(false);
  };

  const onUpdateIntake = async (item:Intake) => {
    axios
      .put(urls.getIntake + `/${item.id}`, {
        amount: parseInt(newIntake),
        unit: selectIntake.unit,
        createdAt: selectIntake.createdAt,
      })
      .finally(() => getIntakes());

    setModalVisible(false);
  };

  const getIntakes = async () => {
    axios.get(urls.getIntake).then(response => setIntakes(response.data));
  };

  useEffect(() => {
    getIntakes();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{alignItems: 'flex-end'}}
        onPress={() => {
          props.navigation.navigate('GoalScreen');
        }}>
        <Icon size={40} name={'menu'} />
      </TouchableOpacity>
      <Progress.Circle
        style={{alignSelf: 'center'}}
        progress={progress / 100}
        size={300}
        borderWidth={5}
        borderColor={'#00C9FF'}
        color={'#00C9FF'}
        thickness={30}
        showsText
        formatText={() => {
          return (
            <View>
              <Text style={{fontSize: 40}}>%{progress}</Text>
            </View>
          );
        }}
        allowFontScaling
      />

      <View>
        <TouchableOpacity
          style={{alignSelf: 'center', margin: moderateScale(20)}}
          onPress={openModal2}>
          <Icon size={55} name={'plus-circle-outline'} />
        </TouchableOpacity>

        <CustomModal
          visible={modalVisible2}
          children={
            <View>
              <Text style={styles.modalMessage}>
                {'Tüketilen yeni su miktarı'}
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: 'grey',
                  height: moderateScale(30),
                  marginVertical: moderateScale(15),
                  color: '#000',
                  padding: moderateScale(5),
                }}
                keyboardType={'number-pad'}
                onChangeText={(amount: any) => {
                  setNewIntake(amount);
                }}
              />
              <View
                style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible2(false)}>
                  <Text style={styles.closeButtonText}>Geri</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => onSaveIntake()}>
                  <Text style={styles.closeButtonText}>Kaydet</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: moderateScale(20),
          paddingTop: moderateScale(20),
          borderTopWidth: 2,
        }}>
        <TouchableOpacity>
          <Icon name={'cup-water'} size={30} style={{alignSelf: 'center'}} />
          <Text>Günlük</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name={'cup-water'} size={30} style={{alignSelf: 'center'}} />
          <Text>Haftalık</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name={'cup-water'} size={30} style={{alignSelf: 'center'}} />
          <Text>Aylık</Text>
        </TouchableOpacity>
      </View>

      <CustomModal
        visible={modalVisible}
        children={
          <View>
            <Text style={styles.modalTitle}>{'Kaydı sil veya güncelle'}</Text>

            {inputVisible ? (
              <TextInput
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: 'grey',
                  height: moderateScale(30),
                  marginVertical: moderateScale(15),
                  color: '#000',
                  padding: moderateScale(5),
                }}
                keyboardType={'number-pad'}
                onChangeText={(amount: any) => {
                  setNewIntake(amount);
                }}
              />
            ) : (
              <Text style={styles.modalMessage}>
                {selectIntake.amount} {selectIntake.unit}
              </Text>
            )}

            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'column',
              }}>
              <TouchableOpacity
                style={{...styles.closeButton, marginVertical: 5}}
                onPress={() => {
                  if (inputVisible) {
                    onUpdateIntake(selectIntake);
                    setInputVisible(false)
                  } else {
                    setInputVisible(true);
                  }
                }}>
                <Text style={styles.closeButtonText}>Güncelle</Text>
              </TouchableOpacity>

              {!inputVisible ? (
                <TouchableOpacity
                  style={{...styles.closeButton, marginVertical: 5}}
                  onPress={() => onDeleteIntake(selectIntake)}>
                  <Text style={styles.closeButtonText}>Sil</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        }
      />
      <FlatList
        data={intakes}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View>
            <ActivityIndicator />
          </View>
        }
        renderItem={({item, index}) => {
          return (
            <View>
              <TouchableOpacity
                style={{
                  height: moderateScale(40),
                  borderWidth: 1,
                  borderRadius: 8,
                  marginVertical: moderateScale(5),
                  justifyContent: 'center',
                }}
                onLongPress={() =>
                  openModal(item)
                }>
                <Text>
                  {item.amount} <Text>{item.unit}</Text>
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: moderateScale(60),
    paddingHorizontal: moderateScale(15),
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 20,
    paddingVertical: 5,
    textAlign: 'center',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginHorizontal: 10,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
