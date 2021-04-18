import {
  Badge,
  Body,
  CardItem,
  Col,
  Container,
  Content,
  Row,
  Text,
  View,
} from "native-base";
import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { getTypeOneArticleTwo } from "../../services/fetch-services";

export default class articleTwo extends Component {
  state = {
    distance: Number,
    Data: Array,
    Success: Boolean,
    Message: String,
  };
  constructor(props) {
    super(props);
    this.setDistance = this.setDistance.bind(this);
  }
  setDistance(text) {
    console.log(text);
    this.setState({ distance: text });
  }
  getData = () => {
    getTypeOneArticleTwo(this.state.distance).then((x) => {
      this.setState({ Data: x.data });
      this.setState({ Success: x.success });
      this.setState({ Message: x.message });
    });
  };
  /*
 {puDatetime: "2020-12-16T16:35:05", trip_distance: 4.99}
puDatetime: "2020-12-16T16:35:05"
trip_distance: 4.99
*/

  getView() {
    let data = this.state.Data.map((value, key) => (
      <Card padder>
        <CardItem cardBody>
          <Content>
            <Col>
              <Text>puDatetime : </Text>
            </Col>
            <Col>
              <Badge info>
                <Text>{value.puDatetime}</Text>
              </Badge>
            </Col>

            <Col>
              <Text>trip_distance : </Text>
            </Col>
            <Col>
              <Badge warning>
                <Text>{value.trip_distance}</Text>
              </Badge>
            </Col>
          </Content>
        </CardItem>
      </Card>
    ));

    return <View>{data}</View>;
  }
  render() {
    return (
      <>
        <Container>
          <View>
            <View>
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
                      Belirli mesafenin altında en çok seyahat yapılan gün ve
                      seyahat uzunluğu
                    </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card>
                <CardItem>
                  <SafeAreaView>
                    <TextInput
                      style={styles.input}
                      onChangeText={this.setDistance}
                      placeholder="useless placeholder"
                      keyboardType="numeric"
                    />
                    <TouchableOpacity
                      style={styles.button}
                      onPress={this.getData}
                    >
                      <Text>Press Here</Text>
                    </TouchableOpacity>
                  </SafeAreaView>
                </CardItem>
              </Card>
            </View>
          </View>
          <ScrollView>
                {this.state.Data != null &&
                  this.state.Success == true &&
                  this.getView()}
              </ScrollView>
        </Container>
      </>
    );
  }
}

const styles = new StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
