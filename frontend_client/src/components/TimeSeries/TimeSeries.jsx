import React, { useState } from "react";
import io from "socket.io-client";
import {
  Container,
  ListItem,
  Typography,
  List,
  Box,
  Stack,
} from "@mui/material";

const socket = io("https://127.0.0.1:3001/er");

socket.on("connect", () => {
  console.log(socket.id);
});

const TimeSeries = () => {
  const [data, setData] = useState([]);

  socket.on("frontend", (data) => {
    const dataParsed = JSON.parse(data);
    setData(dataParsed);
  });

  return (
    <Container>
      <Typography variant="h4" color={"secondary"} sx={{ textAlign: "center" }}>
        ENCRYPTED TIMESERIES LOG
      </Typography>
      <Stack sx={{ border: "3px solid black" }}>
        {data?.length > 0 && (
          <List sx={{ alignItems: "center", justifyContent: "center" }}>
            {data.map((ele, i) => {
              return (
                <ListItem key={i}>
                  <Box
                    sx={{
                      borderBottom: "1px solid gray",
                      fontFamily: "monospace",
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      textAlign: "justify",
                    }}
                  >
                    {`Name:${ele?.name}\t||\t${
                      ele?.timestamp
                    }\t||\tSuccessful Encryption:${
                      ele?.counter ? ele.counter : 0
                    }\t||\tData Integrity Success Percentage: ${
                      ((ele?.counter ?? 0) / ele?.totalCount) * 100
                    }%\t||\tData Integrity Failure Percentage ${
                      ((ele?.totalCount - ele?.counter ?? 0) /
                        ele?.totalCount) *
                      100
                    }%`}
                  </Box>
                </ListItem>
              );
            })}
          </List>
        )}
      </Stack>
    </Container>
  );
};

export default TimeSeries;
