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
  Spinner,
  Root,
} from "native-base";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  Adresses,
  GetData,
  ParseDate,
  GOOGLE_MAPS_APIKEY,
  ShowToast,
} from "../../services/db-services";
import MapViewDirections from "react-native-maps-directions";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";

export default class QueryThreeOne extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.state = {
      inputData: {},
      Data: null,
      date: new Date("2020-12-01"),
      showDatePicker: false,
      modalShown: false,
    };
    this.setDate = this.setDate.bind(this);
  }

  showModal(visible) {
    this.setState({ modalShown: visible });
  }

  Query = async () => {
    await this.setState({
      loading: true,
      inputData: { firstDate: this.state.date },
    });
    var result = await GetData(this.state.inputData, Adresses.TypeThree.One);

    if (result) {
      if (result.success) {
        await this.setState({
          Data: result.data,
          loading: false
        });
        this.showModal(true);
        ShowToast(result.message, "success");
        return true;
      } else {
        this.setState({ loading: false });
        ShowToast(result.message, "danger");
        return true;
      }
    } else {
      this.setState({ loading: false });
      ShowToast("Servise Bağlanılamadı!", "danger");
      return false;
    }
  };

  fitToMarkers = () => {
    this.mapRef.fitToCoordinates(
      [
        this.state.Data[0].puLocationCoordinate,
        this.state.Data[0].doLocationCoordinate,
      ],
      {
        edgePadding: { top: 150, right: 150, bottom: 150, left: 150 },
        animated: true,
      }
    );
  };

  showMode = () => {
    this.setState({ showDatePicker: true });
  };

  setDate(e, newDate) {
    const currentDate = newDate || new Date("2020-12-01");
    this.setState({ date: currentDate, showDatePicker: false });
  }

  render() {
    return (
      <Root>
        <Container style={styles.container}>
          <Content style={styles.body}>
            <View style={styles.header}>
              <Card>
                <CardItem style={{ backgroundColor: "#e85f5f" }}>
                  <Body>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Belirli bir günde en uzun seyahatin harita üstünde yolunun
                      çizilmesi
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
                          style={{
                            color: "white",
                            fontSize: 18,
                            marginLeft: 10,
                          }}
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
                      <Button
                        full
                        style={{ backgroundColor: "#FFF" }}
                        onPress={() => this.Query()}
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
              {this.state.modalShown && (
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
                    <MapViewDirections
                      origin={this.state.Data[0].puLocationCoordinate}
                      destination={this.state.Data[0].doLocationCoordinate}
                      apikey={GOOGLE_MAPS_APIKEY}
                      strokeWidth={3}
                      strokeColor="red"
                    />

                    <Marker
                      pinColor={"blue"}
                      coordinate={this.state.Data[0].puLocationCoordinate}
                      title={"Başlagıç Konumu"}
                      description={this.state.Data[0].puLocation}
                    />
                    <Marker
                      pinColor={"red"}
                      coordinate={this.state.Data[0].doLocationCoordinate}
                      title={"Varış Konumu"}
                      description={this.state.Data[0].doLocation}
                    />
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
      </Root>
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
