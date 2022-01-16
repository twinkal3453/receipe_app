import * as React from "react";
import "./css/card.css";
import { Foods } from "./data";

// material ui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Receipe = ({ value }) => {
  console.log(value);
  return (
    <>
      <div className="container grid_main">
        {value &&
          value.map((item, index) => {
            return (
              <Card key={index}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="200"
                    image={item.imageUrl}
                    title="Receipe"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default Receipe;
