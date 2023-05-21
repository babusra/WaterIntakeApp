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
import {moderateScale} from '../constant/Dimension';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {urls} from '../API';
import CustomModal from '../components/CustomModal';
import {Intake} from '../models/IntakeModel';
import IntakeList from '../components/IntakeList';
import CustomCircleChart from '../components/CustomCircleChart';

interface Props {
  navigation?: any;
}

const HomeScreen = (props: Props) => {
  const [progress, setProgress] = useState<any>(30);
  const [inputVisible, setInputVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState<Boolean>(false);
  const [modalVisible2, setModalVisible2] = useState<Boolean>(false);

  const [selectedIntake, setSelectedIntake] = useState<Intake>({
    amount: 0,
    unit: '',
    id: '',
    createdAt: '',
  });
  const [newIntake, setNewIntake] = useState<any>(0);
  const [intakes, setIntakes] = useState<Intake[]>([]);
  const [filteredIntakes, setFilteredIntakes] = useState<any[]>([]);

  const [dateFilterType, setDateFilterType] = useState<any[]>([
    {type: 'daily', active: true},
    {type: 'weekly', active: false},
    {type: 'monthly', active: false},
  ]);

  const [goals, setGoals] = useState<any>({
    dailyGoal: 0,
    weeklyGoal: 0,
    monthlyGoal: 0,
    userId: '1',
  });

  const [currentGoalType, setCurrentGoalType] = useState<any>();
  const activeRange = dateFilterType.find(a => a.active).type;
  const openModal = (item: Intake) => {
    setSelectedIntake(item);
    setModalVisible(true);
  };

  const getIntakes = async () => {
    axios.get(urls.intake).then(response => {
      //GET intake
      setIntakes(prevIntakes => {
        filterDataByDateType(response.data, activeRange);
        return response.data;
      });
    });
  };

  const onSaveIntake = async () => {
    axios
      .post(urls.intake, {
        amount: parseInt(newIntake),
        unit: 'ml', //POST intake
        createdAt: new Date().toISOString(),
      })
      .finally(() => getIntakes());

    setModalVisible2(false);
  };

  const onDeleteIntake = async (item: Intake) => {
    axios.delete(urls.intake + `/${item.id}`).finally(() => getIntakes()); //DELETE intake
    setModalVisible(false);
  };

  const onUpdateIntake = async (item: Intake) => {
    axios
      .put(urls.intake + `/${item.id}`, {
        amount: parseInt(newIntake), //PUT intake
        unit: selectedIntake.unit,
        createdAt: selectedIntake.createdAt,
      })
      .finally(() => getIntakes());

    setModalVisible(false);
  };

  const getGoals = async () => {
    await axios.get(urls.goal + `/1`).then(res => {
      //GET goals
      setGoals(res.data);
    });
  };

  const currentDate = new Date();
  const oneDayAgo = new Date();
  oneDayAgo.setDate(currentDate.getDate() - 1); //günlük verileri filtreleyebilmek için

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(currentDate.getDate() - 7); //haftalık verileri filtreleyebilmek için

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(currentDate.getMonth() - 1); //aylık verileri filtreleyebilmek için

  const filterDataByDateType = (data: Intake[], range: any) => {
    // seçilen tarih aralığına göre verileri filtreleyen method
    switch (range) {
      case 'daily':
        const d = data.filter(item => {
          const createdAt = new Date(item.createdAt);
          return createdAt >= oneDayAgo && createdAt <= currentDate;
        });
        setFilteredIntakes(d);
        setCurrentGoalType(goals.dailyGoal);
        break;

      case 'weekly':
        const w = data.filter(item => {
          const createdAt = new Date(item.createdAt);
          return createdAt >= oneWeekAgo && createdAt <= currentDate;
        });
        setFilteredIntakes(w);
        setCurrentGoalType(goals.weeklyGoal);

        break;

      case 'monthly':
        const m = data.filter(item => {
          const createdAt = new Date(item.createdAt);
          return createdAt >= oneMonthAgo && createdAt <= currentDate;
        });
        setFilteredIntakes(m);
        setCurrentGoalType(goals.monthlyGoal);

        break;

      default:
        return data;
    }
  };
  const sum: number = filteredIntakes.reduce(
    // seçilen tarih aralığındaki su verilerinin miktarlarının toplamı
    (total, num) => total + num.amount,
    0,
  );

  useEffect(() => {
    getGoals();
    getIntakes();
  }, []);

  useEffect(() => {
    filterDataByDateType(intakes, activeRange);
    setProgress(parseInt((sum * 100) / currentGoalType));
  }, [intakes, activeRange, currentGoalType]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{alignItems: 'flex-end'}}
        onPress={() => {
          props.navigation.navigate('GoalScreen');
        }}>
        <Icon size={40} color={'#67666E'} name={'menu'} />
      </TouchableOpacity>
      <CustomCircleChart
        progress={progress}
        formatText={() => {
          return (
            <View>
              <Text style={{fontSize: 40, color: '#67666E'}}>%{progress}</Text>
            </View>
          );
        }}
      />

      <View>
        <TouchableOpacity
          style={{alignSelf: 'center', margin: moderateScale(20)}}
          onPress={() => setModalVisible2(true)}>
          <Icon size={55} color={'#67666E'} name={'plus-circle-outline'} />
        </TouchableOpacity>

        <CustomModal
          visible={modalVisible2}
          children={
            <View>
              <Text style={styles.modalMessage}>
                {'Tüketilen yeni su miktarı'}
              </Text>
              <TextInput
                style={styles.input}
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
      <View style={styles.subContainer}>
        {dateFilterType.map(item => {
          return (
            <TouchableOpacity
              onPress={() => {
                let temp = [];
                temp = dateFilterType.slice();
                temp.map(x => {
                  if (x.type === item.type) {
                    x.active = true;
                  } else {
                    x.active = false;
                  }
                });
                setDateFilterType(temp);
              }}>
              <Icon
                name={'cup-water'}
                color={item.active ? '#4488FF' : '#67666E'}
                size={30}
                style={{alignSelf: 'center'}}
              />
              <Text style={{color: item.active ? '#4488FF' : '#67666E'}}>
                {item.type}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <CustomModal
        visible={modalVisible}
        children={
          <View>
            <Text style={styles.modalTitle}>{'Kaydı sil veya güncelle'}</Text>

            {inputVisible ? (
              <TextInput
                style={styles.input}
                keyboardType={'number-pad'}
                onChangeText={(amount: any) => {
                  setNewIntake(amount);
                }}
              />
            ) : (
              <Text style={styles.modalMessage}>
                {selectedIntake.amount} {selectedIntake.unit}
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
                    onUpdateIntake(selectedIntake);
                    setInputVisible(false);
                  } else {
                    setInputVisible(true);
                  }
                }}>
                <Text style={styles.closeButtonText}>Güncelle</Text>
              </TouchableOpacity>

              {!inputVisible ? (
                <TouchableOpacity
                  style={{...styles.closeButton, marginVertical: 5}}
                  onPress={() => onDeleteIntake(selectedIntake)}>
                  <Text style={styles.closeButtonText}>Sil</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        }
      />

      <IntakeList data={filteredIntakes} onLongPress={openModal} />
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
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: moderateScale(20),
    paddingTop: moderateScale(20),
    borderTopWidth: 1,
    borderTopColor: '#67666E',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
  },
  modalMessage: {
    fontSize: 20,
    paddingVertical: moderateScale(5),
    textAlign: 'center',
  },
  closeButton: {
    padding: moderateScale(10),
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginHorizontal: moderateScale(10),
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    height: moderateScale(30),
    marginVertical: moderateScale(15),
    color: '#000',
    padding: moderateScale(5),
  },
});
