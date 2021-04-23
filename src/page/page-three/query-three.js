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
  Content,
  Spinner,
  Root,
} from "native-base";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  Adresses,
  GetData,
  GOOGLE_MAPS_APIKEY,
  ShowToast,
} from "../../services/db-services";
import MapViewDirections from "react-native-maps-directions";

export default class QueryThreeThree extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.state = {
      LocationInfo: null,
      Data: null,
      inputData: null,
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
  }

  componentDidMount() {
    this.Query();
  }

  showModal(visible) {
    this.setState({ modalShown: visible });
  }

  Query = async () => {
    await this.setState({ loading: true });
    var result = await GetData(this.state.inputData, Adresses.TypeThree.Three);
    if (result) {
      if (result.success) {
        this.setState({
          Data: result.data,
          loading: false,
        });
        ShowToast(result.success, "success");
        this.showModal(true);
      } else {
        this.setState({ loading: false });
        ShowToast(result.success, "danger");
      }
    } else {
      this.setState({ loading: false });
      ShowToast("Servise Bağlanılamadı!", "danger");
    }
  };

  fitToMarkers = () => {
    var temp = [];
    temp.push(this.state.Data[0]["longest_trip"].puLocationCoordinate);
    temp.push(this.state.Data[0]["longest_trip"].doLocationCoordinate);
    temp.push(this.state.Data[0]["shortest_trip"].puLocationCoordinate);
    temp.push(this.state.Data[0]["shortest_trip"].doLocationCoordinate);
    this.mapRef.fitToCoordinates(temp, {
      edgePadding: { top: 150, right: 150, bottom: 150, left: 150 },
      animated: true,
    });
  };

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
                    style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
                  >
                    En az 3 yolcunun bulunduğu seyahatlerden en kısa mesafeli ve
                    en uzun mesafeli yolun çizilmesi
                  </Text>
                </Body>
              </CardItem>
            </Card>
            <Card>
              <CardItem style={{ backgroundColor: "#e85f5f" }}>
                <Body>
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
                  <View>
                    <MapViewDirections
                      origin={
                        this.state.Data[0]["longest_trip"].puLocationCoordinate
                      }
                      destination={
                        this.state.Data[0]["longest_trip"].doLocationCoordinate
                      }
                      apikey={GOOGLE_MAPS_APIKEY}
                      strokeWidth={3}
                      strokeColor={
                        this.state.colors[
                          Math.floor(Math.random() * this.state.colors.length)
                        ]
                      }
                    />
                    <Marker
                      pinColor={"blue"}
                      coordinate={
                        this.state.Data[0]["longest_trip"].puLocationCoordinate
                      }
                      title={"Başlangıç Komunu"}
                      description={
                        this.state.Data[0]["longest_trip"].puLocation
                      }
                    />
                    <Marker
                      pinColor={"red"}
                      coordinate={
                        this.state.Data[0]["longest_trip"].doLocationCoordinate
                      }
                      title={"Varış Konumu"}
                      description={
                        this.state.Data[0]["longest_trip"].doLocation
                      }
                    />
                  </View>
                  <View>
                    <MapViewDirections
                      origin={
                        this.state.Data[0]["shortest_trip"].puLocationCoordinate
                      }
                      destination={
                        this.state.Data[0]["shortest_trip"].doLocationCoordinate
                      }
                      apikey={GOOGLE_MAPS_APIKEY}
                      strokeWidth={3}
                      strokeColor={
                        this.state.colors[
                          Math.floor(Math.random() * this.state.colors.length)
                        ]
                      }
                    />
                    <Marker
                      pinColor={"blue"}
                      coordinate={
                        this.state.Data[0]["shortest_trip"].puLocationCoordinate
                      }
                      title={"Başlangıç Konumu"}
                      description={
                        this.state.Data[0]["shortest_trip"].puLocation
                      }
                    />
                    <Marker
                      coordinate={
                        this.state.Data[0]["shortest_trip"].doLocationCoordinate
                      }
                      title={"Varış Konumu"}
                      description={
                        this.state.Data[0]["shortest_trip"].doLocation
                      }
                    />
                  </View>
                </MapView>
              </Modal>
            )}
          </View>
        </Content>
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
