import { Navbar, Dropdown, Button, Link, Text } from "@nextui-org/react";
import React from "react";

import { Layout } from "./../Components/Navbar/Layout";
import logo from "./../media/logo_lifeTaker.png";
export default function App() {
  return (
    <Layout>
      <Navbar isBordered variant="floating">
        <Navbar.Brand>
          <img src={logo} height="40" width="40" />
          <Text className="NameOfuser" b color="inherit" hideIn="xs">
            Kabbou Mohamed
          </Text>
        </Navbar.Brand>
        <Navbar.Content
          activeColor="inherit"
          hideIn="xs"
          variant="highlight-rounded"
        >
          <Navbar.Link href="#">Home</Navbar.Link>
          <Navbar.Link href="#">Education</Navbar.Link>
          <Navbar.Link href="#">Skills</Navbar.Link>
          <Navbar.Link href="#">Projects</Navbar.Link>
          <Navbar.Link href="#">Social Media</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            <Button auto flat as={Link} href="mailto:mohamed.kabbou@uha.fr" > Contactez-moi </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </Layout>
  );
}
