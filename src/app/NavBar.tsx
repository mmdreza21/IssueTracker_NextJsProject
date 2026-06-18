"use client";
import { Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import AuthSection from "./components/AuthSection";
import NavLinks from "./components/NavLinks";

const NavBar = () => {
  return (
    <nav className=" border-b mb-5 px-5 py-3 ">
      <Container>
        <Flex
          justify={"between"}
          align={"center"}
          direction={"row"}
          width={"100%"}
          height={"100%"}
        >
          <Flex justify={"start"} align={"center"} direction={"row"} gap={"3"}>
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthSection />
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
