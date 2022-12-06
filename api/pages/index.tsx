import * as React from "react";

import {
  Button,
  Box,
  Flex,
  Text,
  Image,
  Textarea,
  Input,
} from "@chakra-ui/react";

export const Index: React.FC = () => {
  const [prompt, setPrompt] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const chatRequest = {
    prompt: prompt,
  };

  const onClick = async () => {
    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chatRequest),
    });
    const result = await response.json();
    console.log("result :", result);
    setMessage(result.message);
  };

  return (
    <Box
      overflow="hidden"
      backgroundColor="white"
      id="top"
      maxWidth="390px"
      minHeight="100vh"
      margin="0 auto"
    >
      <Box
        padding="40px 0 "
        backgroundImage="/background-top.png"
        backgroundSize=""
        height="620px"
      >
        <Box paddingX="12px">
          <Text
            marginTop="40px"
            fontWeight="extrabold"
            fontSize="32px"
            color="white"
          >
            Ask Me Anything
          </Text>
          <Text fontWeight="bold" fontSize="14px" marginTop="20px">
            Wrappy is an suppourt AI assistant service for NFT gift.
          </Text>
          <Box textAlign="center">
            <Textarea
              border="1px solid black"
              onChange={(value) => {
                console.log("value :", value.target.value);
                setPrompt(value.target.value);
              }}
              width="90%"
              fontSize="16px"
              padding="10px"
              borderRadius="6px"
            />
          </Box>

          <Button
            onClick={onClick}
            background="#FFF"
            padding="6px"
            cursor="pointer"
            marginTop="20px"
          >
            送信
          </Button>
        </Box>
        {message && (
          <Box
            padding="10px"
            marginTop="10px"
            backgroundColor="white"
            border="1px solid black"
            borderRadius="16px"
            fontWeight="bold"
          >
            AIからの回答：
            <Text
              fontWeight="normal"
              fontSize="16px"
              dangerouslySetInnerHTML={{
                __html: message,
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Index;
