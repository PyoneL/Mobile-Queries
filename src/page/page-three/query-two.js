import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Modal } from "react-native";
import {
  Container,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Form,
  Item,
  Input,
  Content,
  Picker,
  Spinner,
} from "native-base";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  Adresses,
  GetData,
  ParseDate,
  GOOGLE_MAPS_APIKEY,
} from "../../services/db-services";
import MapViewDirections from "react-native-maps-directions";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";

export default class QueryThreeTwo extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.state = {
      LocationInfo: {},
      Data: null,
      inputData: {},
      date: new Date("2020-12-01"),
      showDatePicker: false,
      modalShown: false,
      selectedLocation: "0",
      puLocationID: 0,
      colors: [
        "red",
        "olive",
        "fuchsia",
        "black",
        "orange",
        "navy",
        "maroon",
        "purple",
        "green",
        "teal",
      ],
    };
    this.setDate = this.setDate.bind(this);
  }

  componentDidMount() {
    this.GetLocationInfo();
  }

  ShowCoordinates = async () => {
    await this.setState({
      loading: true,
      inputData: {
        firstDate: this.state.date,
        puLocationID: this.state.puLocationID,
      },
    });
    var res = await this.Query();
    if (res) {
      this.setState({ loading: false });
      this.showModal(true);
    } else {
      this.setState({ loading: false });
    }
  };

  showModal(visible) {
    this.setState({ modalShown: visible });
  }

  GetLocationInfo = async () => {
    this.setState({ loading: true });
    let result = await GetData(null, Adresses.Location.GetAll);
    if (result) {
      this.setState({ LocationInfo: result, loading: false });
    } else {
      this.setState({ loading: false });
    }
  };

  Query = async () => {
    if (
      this.state.firstDate != (null || undefined) ||
      this.state.secondDate != (null || undefined) ||
      this.state.puLocationID != (null || undefined)
    ) {
      var result = await GetData(this.state.inputData, Adresses.TypeThree.Two);
      console.log(result);
      if (result) {
        await this.setState({ Data: result });
        return true;
      } else return false;
    }
  };

  fitToMarkers = () => {
    var temp = [];
    this.state.Data.forEach((p) => {
      temp.push(p.puLocationCoordinate);
      temp.push(p.doLocationCoordinate);
    });
    this.mapRef.fitToCoordinates(temp, {
      edgePadding: { top: 150, right: 150, bottom: 150, left: 150 },
      animated: true,
    });
  };

  showMode = () => {
    this.setState({ showDatePicker: true });
  };

  setDate(e, newDate) {
    const currentDate = newDate || new Date("2020-12-01");
    this.setState({ date: currentDate, showDatePicker: false });
  }

  async onValueChange(value) {
    await this.setState({
      puLocationID: Number(this.state.LocationInfo[value].locationId),
      selectedLocation: value,
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content style={styles.body}>
          <View style={styles.header}>
            <Card>
              <CardItem style={{ backgroundColor: "#e85f5f" }}>
                <Body>
                  <Text
                    style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
                  >
                    Belirli bir günde aynı konumdan hareket eden araçların
                    rasgele 5’inin yolunun çizilmesi
                  </Text>
                </Body>
              </CardItem>
            </Card>
            <Card>
              <CardItem style={{ backgroundColor: "#e85f5f" }}>
                <Body>
                  <Form style={{ alignSelf: "stretch" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Tarih seçiniz :
                    </Text>
                    <Item full style={{ marginBottom: 10, marginLeft: 0 }}>
                      <Icon
                        color="white"
                        style={{ fontSize: 30 }}
                        name="calendar"
                      />
                      <Input
                        style={{ color: "white", fontSize: 18, marginLeft: 10 }}
                        value={ParseDate(this.state.date)}
                        placeholderTextColor="white"
                        placeholder="Tarih"
                      />
                    </Item>
                    <Button
                      full
                      style={{ backgroundColor: "#FFF", marginBottom: 10 }}
                      onPress={() => this.showMode()}
                    >
                      <Text
                        style={{
                          color: "#e85f5f",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        Tarih Seç
                      </Text>
                    </Button>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: 10,
                      }}
                    >
                      Lokasyon seçiniz :
                    </Text>
                    <Item full style={{ marginBottom: 10, marginLeft: 0 }}>
                      <Icon
                        color="white"
                        style={{ fontSize: 30 }}
                        name="map-marker"
                      />
                      <Picker
                        style={{
                          height: 50,
                          color: "white",
                          marginLeft: 10,
                          fontSize: 23,
                        }}
                        mode="dropdown"
                        selectedValue={this.state.selectedLocation}
                        onValueChange={this.onValueChange.bind(this)}
                      >
                        {Object.keys(this.state.LocationInfo).map((key) => {
                          return (
                            <Picker.Item
                              label={
                                this.state.LocationInfo[key].locationId +
                                " ) " +
                                this.state.LocationInfo[key].borough +
                                " - " +
                                this.state.LocationInfo[key].zone
                              }
                              value={key}
                              key={key}
                            />
                          );
                        })}
                      </Picker>
                    </Item>
                    <Button
                      full
                      style={{ backgroundColor: "#FFF" }}
                      onPress={() => this.ShowCoordinates()}
                    >
                      <Text
                        style={{
                          color: "#e85f5f",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        Görüntüle
                      </Text>
                    </Button>
                  </Form>
                </Body>
              </CardItem>
            </Card>
          </View>
          <View style={{ width: "100%", height: "100%" }}>
            {this.state.modalShown && this.state.Data.length != 0 && (
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalShown}
                onRequestClose={() => {
                  this.mapRef = null;
                  this.setState({ modalShown: false });
                }}
              >
                <MapView
                  ref={(ref) => {
                    this.mapRef = ref;
                  }}
                  provider={PROVIDER_GOOGLE}
                  style={{ width: "100%", height: "100%" }}
                  onMapReady={() => this.fitToMarkers()}
                >
                  <Marker
                    pinColor={"blue"}
                    coordinate={this.state.Data[0].puLocationCoordinate}
                    title={"Başlangıç Konumu"}
                    description={this.state.Data[0].puLocation}

                  />
                  {this.state.Data != null &&
                    this.state.Data.length != 0 &&
                    Object.values(this.state.Data).map((key, index) => {
                     return (
                        <View key={index}>
                          <MapViewDirections
                            origin={key.puLocationCoordinate}
                            destination={key.doLocationCoordinate}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor={this.state.colors[index % this.state.colors.length]}
                          />

                          <Marker
                            pinColor={"red"}
                            coordinate={key.doLocationCoordinate}
                            title={"Varış Konumu"}
                            description={key.doLocation}
                          />
                        </View>
                      );
                    })}
                </MapView>
              </Modal>
            )}
          </View>
        </Content>
        {this.state.showDatePicker && (
          <DateTimePicker
            defaultDate={new Date("2020-12-01")}
            minimumDate={new Date("2020-12-01")}
            maximumDate={new Date("2020-12-31")}
            testID="Date"
            value={this.state.date}
            mode="date"
            is24Hour={true}
            display="spinner"
            onChange={this.setDate}
          />
        )}
        {this.state.loading && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            <Spinner color="red" />
          </View>
        )}
        <StatusBar style="light" />
      </Container>
    );
  }
}

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#deded5",
    height: "100%",
  },
  body: {
    flex: 1,
    padding: 10,
    height: "100%",
  },
  header: {
    marginBottom: 10,
  },
});
