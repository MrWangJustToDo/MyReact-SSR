import { Select, Button, Box, Fade, useDisclosure, Menu, MenuButton, MenuList, MenuItem, useColorMode, Text, Stack, Checkbox, HStack, PinInput, PinInputField } from "@chakra-ui/react";

export default function ChakraComponent() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  console.log(isOpen);
  return (
    <>
      <h2>Chakra UI</h2>
      <Button onClick={toggleColorMode}>{colorMode}</Button>
      <Select placeholder="Select option">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Text color="text">color mode!! css variable</Text>
      <hr />
      <Button onClick={onToggle}>Click Me</Button>
      <Box width="100%" height="30px" transition="opacity .5s" opacity={isOpen ? 1 : 0} border="1px">
        123
      </Box>
      <Fade in={isOpen}>
        <Box p="40px" color="white" mt="4" bg="teal.500" rounded="md" shadow="md">
          Fade
        </Box>
      </Fade>

      <Stack spacing={5} direction="row">
        <Checkbox colorScheme="red" defaultChecked>
          Checkbox
        </Checkbox>
        <Checkbox colorScheme="green" defaultChecked>
          Checkbox
        </Checkbox>
      </Stack>

      <HStack>
        <PinInput>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>

      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              px={4}
              py={2}
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
              _hover={{ bg: "gray.100" }}
              _expanded={{ bg: "red.200" }}
              _focus={{ outline: 0, boxShadow: "outline" }}
              isActive={isOpen}
              as={Button}
              rightIcon={<span>{1234}</span>}
            >
              {isOpen ? "Close" : "Open"}
            </MenuButton>
            <MenuList border="1px">
              <MenuItem>Download</MenuItem>
              <MenuItem onClick={() => alert("Kagebunshin")}>Create a Copy</MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </>
  );
}
