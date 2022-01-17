import * as React from "react";
import "./css/card.css";

// material ui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const Receipe = (props) => {
  const splitData = (data) => {
    return data.split("_").join(",");
  };
  const handleDelete = (id) => {
    props.deleteChild(id);
  };
  return (
    <>
      <div className="container grid_main">
        {props.value &&
          props.value.map((item, index) => {
            return (
              <Card key={index}>
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
                <div className="card__content">
                  <div className="sec__card">
                    <Typography gutterBottom component="h5">
                      {item.receipeName}
                    </Typography>
                    <Typography gutterBottom component="h5">
                      {splitData(item.ingredients)}
                    </Typography>
                  </div>
                  <DeleteRoundedIcon
                    onClick={() => handleDelete(item.id)}
                    className="delete__button"
                  />
                </div>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default Receipe;
