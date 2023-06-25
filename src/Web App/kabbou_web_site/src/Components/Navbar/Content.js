import React, { useState, useEffect } from "react";
import { Text, Spacer } from "@nextui-org/react";
import { Box } from "./Box.js";

export const Content = () => {
  const [texts, setTexts] = useState("");

  useEffect(() => {
    fetchTexts();
  }, []);

  const fetchTexts = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/texts");
      const data = await response.json();
      setTexts(data);
    } catch (error) {
      console.error("Error fetching texts:", error);
    }
  };

  return (
    <div className="HomePage">
      {texts && (
        <Box  css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
          <h2>{texts[0].content.toUpperCase()}</h2>
          <p size="$lg">{texts[1].content}</p>
          <Spacer y={1} />
          <p size="$lg">{texts[2].content}</p>
        </Box>
      )}
    </div>
  );
}