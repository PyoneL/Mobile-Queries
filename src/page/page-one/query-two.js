import React, { useEffect } from "react";
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
  Spinner,
  Content,
} from "native-base";
import { Row, Grid } from "react-native-easy-grid";
import { Adresses, GetData, ParseDate } from "../../services/db-services";
import Icon from "react-native-vector-icons/FontAwesome";

export default class QueryOneTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      Data: null,
      inputData: {
        distance: null,
      },
    };
  }
  Query = async () => {
    if (this.state.inputData.distance != (null || undefined || "")) {
      await this.setState({loading:true})
      var result = await GetData(this.state.inputData, Adresses.TypeOne.Two);
      if (result) {
        this.setState({ Data: result, loading:false });
      }
      else {
        this.setState({loading:false})
      }
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content style={styles.body}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.header}>
              <Card>
                <CardItem
                  header
                  style={{
                    backgroundColor: "#e85f5f",
                    flexDirection: "column",
                  }}
                >
                  <Body>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Belirli mesafenin altında en çok seyahat yapılan 5 gün ve
                      seyahat uzunlukları
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
                    <Text
                      style={{
                        fontSize: 18,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Mesafe Giriniz :
                    </Text>
                    <Form style={{ alignSelf: "stretch" }}>
                      <Item full style={{ marginBottom: 10, marginLeft: 0 }}>
                        <Icon
                          color="white"
                          style={{ fontSize: 30 }}
                          name="road"
                        />
                        <Input
                          style={{
                            color: "white",
                            fontSize: 18,
                            marginLeft: 5,
                          }}
                          keyboardType="number-pad"
                          onChangeText={(dist) => {
                            this.setState({ inputData: { distance: dist } });
                          }}
                          placeholderTextColor="white"
                          placeholder="Mesafe"
                        />
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
                                Yolculuk Edilen Gün
                              </Text>
                            </Row>
                            <Row>
                              <Text style={{ marginBottom: 5, fontSize: 18 }}>
                                {ParseDate(new Date(p.puDatetime))}
                              </Text>
                            </Row>
                            <Row>
                              <Text
                                style={{
                                  marginBottom: 5,
                                  fontSize: 18,
                                  fontWeight: "bold",
                                }}
                              >
                                Yolculuk Mesafesi{" "}
                              </Text>
                            </Row>
                            <Row>
                              <Text style={{ marginBottom: 5, fontSize: 18 }}>
                                {p.trip_distance} Mil
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
});
