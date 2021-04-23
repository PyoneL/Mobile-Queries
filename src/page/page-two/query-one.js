import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Container,
  Card,
  CardItem,
  Text,
  Body,
  Item,
  Input,
  Button,
  Form,
  Picker,
  Spinner,
  Content,
  Root,
} from "native-base";
import {
  Adresses,
  GetData,
  ParseDate,
  ShowToast,
} from "../../services/db-services";
import { Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";

export default class QueryTwoOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      LocationInfo: {},
      Data: null,
      inputData: {
        firstDate: new Date(),
        secondDate: new Date(),
        puLocationID: new Number(),
      },
      selectedLocation: "0",

      firstDate: new Date("2020-12-01"),
      secondDate: new Date("2020-12-31"),
      puLocationID: 0,

      showDatePicker: false,
      selectedDate: 0, // 0 first, 1 second
    };
    this.setDate = this.setDate.bind(this);
  }

  componentDidMount() {
    this.GetLocationInfo();
  }

  GetLocationInfo = async () => {
    await this.setState({ loading: true });
    var result = await GetData(null, Adresses.Location.GetAll);
    if (result) {
      if (result.success) {
        this.setState({
          LocationInfo: result.data,
          loading: false,
        });
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
        ShowToast(result.message, "danger");
      }
    } else {
      this.setState({ loading: false });
      ShowToast("Servise Bağlanılamadı.", "danger");
    }
  };

  Query = async () => {
    await this.setState({ loading: true });
    if (
      (this.state.firstDate &&
        this.state.secondDate &&
        this.state.puLocationID) != null
    ) {
      await this.setState({
        inputData: {
          firstDate: this.state.firstDate,
          secondDate: this.state.secondDate,
          puLocationID: this.state.puLocationID,
        },
      });
      var result = await GetData(this.state.inputData, Adresses.TypeTwo.One);
      if (result) {
        if (result.success) {
          this.setState({
            Data: result.data,
            loading: false,
          });
          this.setState({ loading: false });
          ShowToast(result.message, "success");
        } else {
          this.setState({ loading: false });
          ShowToast(result.message, "danger");
        }
      } else {
        this.setState({ loading: false });
        ShowToast("Servise Bağlanılamadı.", "danger");
      }
    } else {
      this.setState({ loading: false });
      ShowToast("Değerler boş bırakılamaz.", "warning");
    }
  };

  async onValueChange(value) {
    await this.setState({
      puLocationID: Number(this.state.LocationInfo[value].locationId),
      selectedLocation: value,
    });
  }

  setDate(e, newDate) {
    const currentDate = newDate || new Date();
    if (this.state.selectedDate == 0) {
      this.setState({ firstDate: currentDate, showDatePicker: false });
      if (this.state.secondDate.getDate() < this.state.firstDate.getDate())
        this.setState({ secondDate: currentDate });
    } else this.setState({ secondDate: currentDate, showDatePicker: false });
  }

  showMode = (props) => {
    this.setState({ selectedDate: props, showDatePicker: true });
  };

  render() {
    return (
      <Root>
        <Container style={styles.container}>
          <Content style={styles.body}>
            <ScrollView style={styles.scrollView}>
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
                        İki tarih arasında belirli bir lokasyondan hareket eden
                        araç sayısı
                      </Text>
                    </Body>
                  </CardItem>
                </Card>
                <Card>
                  <CardItem
                    header
                    style={{
                      backgroundColor: "#e85f5f",
                      flexDirection: "column",
                    }}
                  >
                    <Body>
                      <Form style={{ alignSelf: "stretch" }}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          Birinci tarihi seçiniz :
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
                            value={ParseDate(this.state.firstDate)}
                            placeholderTextColor="white"
                            placeholder="Birinci Tarih"
                          />
                        </Item>
                        <Button
                          full
                          style={{ backgroundColor: "#FFF", marginBottom: 10 }}
                          onPress={() => this.showMode(0)}
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
                          }}
                        >
                          İkinci tarihi seçiniz :
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
                            value={ParseDate(this.state.secondDate)}
                            placeholderTextColor="white"
                            placeholder="İkinci Tarih"
                          />
                        </Item>
                        <Button
                          full
                          style={{ backgroundColor: "#FFF", marginBottom: 10 }}
                          onPress={() => this.showMode(1)}
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
                          onPress={() => this.Query()}
                        >
                          <Text
                            style={{
                              color: "#e85f5f",
                              fontSize: 18,
                              fontWeight: "bold",
                            }}
                          >
                            Sorgula
                          </Text>
                        </Button>
                      </Form>
                    </Body>
                  </CardItem>
                </Card>
              </View>
              <View style={{ flex: 1 }}>
                {this.state.Data != null &&
                  this.state.Data.map((p, key) => {
                    return (
                      <Card key={key}>
                        <CardItem header>
                          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            {key + 1}. Kayıt
                          </Text>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Grid>
                              <Row>
                                <Text
                                  style={{
                                    marginBottom: 5,
                                    fontSize: 18,
                                    fontWeight: "bold",
                                  }}
                                >
                                  Toplam Taksi sayısı
                                </Text>
                              </Row>
                              <Row>
                                <Text style={{ marginBottom: 5, fontSize: 18 }}>
                                  {p.taxi_count}
                                </Text>
                              </Row>
                            </Grid>
                          </Body>
                        </CardItem>
                      </Card>
                    );
                  })}
              </View>
            </ScrollView>
            {this.state.showDatePicker && (
              <DateTimePicker
                defaultDate={
                  this.state.selectedDate == 1
                    ? this.state.firstDate
                    : new Date("2020-12-01")
                }
                minimumDate={
                  this.state.selectedDate == 1
                    ? this.state.firstDate
                    : new Date("2020-12-01")
                }
                maximumDate={new Date("2020-12-31")}
                testID="Date"
                value={
                  this.state.selectedDate == 0
                    ? this.state.firstDate
                    : this.state.secondDate
                }
                mode="date"
                is24Hour={true}
                display="spinner"
                onChange={this.setDate}
              />
            )}
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
                backgroundColor: "rgba(0,0,0,0.3)",
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
  },
  body: {
    flex: 1,
    padding: 10,
    paddingBottom: 30,
  },
  header: {
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
});
