import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Animated } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import Header from "~/components/Header";
import {
  Container,
  Content,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Title,
  Description,
  Annotation
} from "./styles";
import Tabs from "~/components/Tabs";
import Menu from "~/components/Menu";
export default function Main() {
  let offset = 0;
  const translateY = new Animated.Value(0);
  // const translateX = new Animated.Value(0);
  const animatedEvent = new Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY
          // translationX: translateX
        }
      }
    ],
    {
      useNativeDriver: true
    }
  );
  function onHandlerStateChanged(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      //verifica se o estado do evento anterior era ativo, e não é mais.
      const { translationY } = event.nativeEvent;

      offset += translationY;

      if (translationY >= 100) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }
      //empurra o menu para baixo
      Animated.timing(translateY, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true
      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }
  //onGestureEvent={}
  return (
    <Container>
      <Header />
      <Content>
        <Menu translateY={translateY} />
        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={onHandlerStateChanged}
        >
          <Card
            style={{
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [-350, 0, 380], //limite de scroll
                    outputRange: [-50, 0, 380],
                    extrapolate: "clamp" //evita de passar(obrigatório)
                  })
                }
              ]
            }}
          >
            <CardHeader>
              <Icon name="attach-money" size={28} color="#666" />
              <Icon name="visibility-off" size={28} color="#666" />
            </CardHeader>
            <CardContent>
              <Title>Saldo Disponível</Title>
              <Description>R$ 1.127.323,11</Description>
            </CardContent>
            <CardFooter>
              <Annotation>
                Transferência de R$ 20,00 recebida de Isaias Domato hoje ás
                18:00h
              </Annotation>
            </CardFooter>
          </Card>
        </PanGestureHandler>
      </Content>
      <Tabs translateY={translateY} />
    </Container>
  );
}
