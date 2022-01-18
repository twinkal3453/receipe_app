import Header from "./Components/header";
import { useState, useEffect } from "react";
import Receipe from "./Components/receipe";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
function App() {
  const fields = {
    imageUrl: "",
    name: "",
    receipeName: "",
    ingredients: "",
  };
  const [receipeLists, setReceipeLists] = useState([]);
  const [open, setOpen] = useState(false);
  const [receipe, setReceipe] = useState(fields);
  const { imageUrl, name, receipeName, ingredients } = receipe;

  const pull_data = (data) => {
    setReceipeLists(data);
    preload();
  };

  const extract_data = (data) => {
    let receipe = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("receipeList")) {
        receipe = JSON.parse(localStorage.getItem("receipeList"));
      }
      receipe.forEach((item, i) => {
        if (item.id === data) {
          receipe.splice(i, 1);
        }
      });
      localStorage.setItem("receipeList", JSON.stringify(receipe));
    }
    preload();
    return receipe;
  };

  const preload = () => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("receipeList") !== null) {
        setReceipeLists(JSON.parse(localStorage.getItem("receipeList")));
      }
    }
  };

  useEffect(() => {
    preload();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setReceipe(fields);
  };

  const handleChange = (name) => (event) => {
    let value = event.target.value;
    setReceipe({ ...receipe, [name]: value });
  };

  const extract_id = (data) => {
    let receipes = [];
    let edit_item;
    if (typeof window !== undefined) {
      if (localStorage.getItem("receipeList")) {
        receipes = JSON.parse(localStorage.getItem("receipeList"));
      }
    }
    receipes.forEach((item, i) => {
      if (item.id === data) {
        edit_item = item;
      }
    });
    setReceipe(edit_item);
    handleClickOpen();
  };

  const onUpdate = () => {
    let receipes = [];
    if (typeof windoe !== undefined) {
      if (localStorage.getItem("receipeList")) {
        receipes = JSON.parse(localStorage.getItem("receipeList"));
      }
      receipes.forEach((item, i) => {
        if (item.id === receipe.id) {
          receipes.splice(i, 1, receipe);
        }
      });
      localStorage.setItem("receipeList", JSON.stringify(receipes));
    }
    handleClose();
    preload();
    return receipes;
  };

  return (
    <>
      <div className="head">
        <Dialog
          style={{ padding: "1rem" }}
          open={open}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">add new receipe</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="text"
                label="Enter image Url"
                fullWidth
                value={imageUrl}
                onChange={handleChange("imageUrl")}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Fresh food"
                type="text"
                fullWidth
                value={name}
                onChange={handleChange("name")}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="receipe name"
                type="text"
                fullWidth
                value={receipeName}
                onChange={handleChange("receipeName")}
              />

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Enter ingredients, saperated by underScore(_)"
                type="text"
                fullWidth
                value={ingredients}
                onChange={handleChange("ingredients")}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="warning">
              cancle
            </Button>
            <Button onClick={onUpdate} variant="outlined" color="success">
              update
            </Button>
          </DialogActions>
        </Dialog>
        <Header addChild={pull_data} title="receipe-box" />
        <Receipe
          editChild={extract_id}
          deleteChild={extract_data}
          value={receipeLists}
        />
      </div>
    </>
  );
}

export default App;
