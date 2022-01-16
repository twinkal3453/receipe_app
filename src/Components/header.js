import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import "./css/header.css";

const Header = (props) => {
  const [open, setOpen] = useState(false);
  const fields = {
    imageUrl: "",
    name: "",
    receipeName: "",
    ingredients: "",
  };
  const [receipe, setReceipe] = useState(fields);
  const { imageUrl, name, receipeName, ingredients } = receipe;
  const [receipes, setReceipes] = useState([]);

  const preload = () => {
    let res = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("receipeList")) {
        res = JSON.parse(localStorage.getItem("receipeList"));
      }
    }
    setReceipes(res);
    props.addChild(receipes);
  };

  useEffect(() => {
    preload();
    // eslint-disable-next-line
  }, []);

  const handleChange = (name) => (event) => {
    let value = event.target.value;
    setReceipe({ ...receipe, [name]: value });
  };

  const onSubmit = () => {
    let receipeList = [];
    if (imageUrl && name && receipeName && ingredients) {
      if (typeof window !== undefined) {
        if (localStorage.getItem("receipeList")) {
          receipeList = JSON.parse(localStorage.getItem("receipeList"));
        }
        receipeList.push({
          ...receipe,
          id: Date.now(),
        });
        localStorage.setItem("receipeList", JSON.stringify(receipeList));
        handleClose();
        preload();
      }
    } else {
      alert("all fields should be filled");
    }
  };

  // useEffect(() => {
  //   localStorage.setItem("receipeList", JSON.stringify(receipeList));
  // }, [receipeList]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setReceipe(fields);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light navbar_total">
        <div className="container-fluid">
          <h3 style={{ color: "white" }}> {props.title}</h3>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            style={{ justifyContent: "flex-end" }}
            className="collapse navbar-collapse"
            id="navbarNav"
          >
            <div className="navs">
              <ul className="navbar-nav">
                <li className="nav-item toggle_menu">
                  <i className="fas fa-list"></i>
                </li>
                <li className="nav-item add_menu">
                  <div>
                    <Button onClick={handleClickOpen}>add receipe</Button>
                    <Divider />
                    <Dialog
                      style={{ padding: "1rem" }}
                      open={open}
                      aria-labelledby="form-dialog-title"
                    >
                      <DialogTitle id="form-dialog-title">
                        add new receipe
                      </DialogTitle>
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
                        <Button
                          onClick={handleClose}
                          variant="outlined"
                          color="warning"
                        >
                          cancle
                        </Button>
                        <Button
                          onClick={onSubmit}
                          variant="outlined"
                          color="success"
                        >
                          add
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
