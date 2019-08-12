import React from "react";
import {
  Container,
  Code,
  Nav,
  NavItem,
  NavText,
  SignOutButton,
  SignOutButtonText
} from "./styles";
import QrCode from "react-native-qrcode";
import Icon from "react-native-vector-icons/MaterialIcons";
export default function Menu({ translateY }) {
  return (
    <Container
      style={{
        opacity: translateY.interpolate({
          inputRange: [0, 150],
          outputRange: [0, 1]
        })
      }}
    >
      <Code>
        <QrCode
          value="www.google.com"
          size={80}
          bgColor="#8B10AE"
          fgColor="#fff"
        />
      </Code>

      <Nav>
        <NavItem>
          <Icon name="help-outline" color="#fff" size={20} />
          <NavText>Me Ajuda</NavText>
        </NavItem>
        <NavItem>
          <Icon name="person-outline" color="#fff" size={20} />
          <NavText>Perfil</NavText>
        </NavItem>
        <NavItem>
          <Icon name="credit-card" color="#fff" size={20} />
          <NavText>Configurar Cartão</NavText>
        </NavItem>
        <NavItem>
          <Icon name="smartphone" color="#fff" size={20} />
          <NavText>Me Ajuda</NavText>
        </NavItem>
      </Nav>

      <SignOutButton onPress={() => {}}>
        <SignOutButtonText>Sair</SignOutButtonText>
      </SignOutButton>
    </Container>
  );
}
