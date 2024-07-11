import { Box, Spinner, Text, VStack } from "@chakra-ui/react";

const LoadingScreen = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="black"
      zIndex="9999"
    >
      <VStack>
        <Spinner size="xl" color="green.400" />
        <Text color="white" mt={4}>Loading...</Text>
      </VStack>
    </Box>
  );
};

export default LoadingScreen;
