import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

import { Button, ButtonBase, Menu, MenuItem, TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useAppContext } from "../providers/context";
import Socket from "../providers/socket";
import { Form } from "../components/Form/Form";

const roles = ["admin", "student", "teacher"];

const { socket } = new Socket("ws://localhost:3000");

const Chat = () => {
  const { state } = useAppContext();

  const [msgInput, setMsgInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [isEditOpen, setEditOpen] = useState(false);

  const [currentMessageId, setCurrentMessageId] = useState(-1);
  const [currentMessageText, setCurrentMessageText] = useState("");
  window.currentMessageText = currentMessageText;

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log("HandleClick", currentMessageId, currentMessageText);
    setAnchorEl(event.currentTarget);
    // setCurrentMessage({ id: id, text });
  };
  // window.currentMessage = currentMessage;
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/messages/${currentMessageId}`);

    socket.emit("delete-message", JSON.stringify({ id: currentMessageId }));

    // handleClose();
  };
  const handleEdit = async () => {
    const id = currentMessageId;
    const text = editInput;
    if (!id || !text) {
      return alert(`You haven't choose a message`);
    }
    await axios.patch(`http://localhost:3000/messages/${id}`, {
      text,
    });
    handleClose();

    socket.emit("update-message", JSON.stringify({ id, text }));

    setEditOpen(false);
  };

  const getMessages = async () => {
    const msgs = await axios.get("http://localhost:3000/messages");
    setMessages(msgs.data);
  };
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server LOL");
    });
    getMessages();
    socket.on("messages", (data) => {
      setMessages((prevMsgs) => [...prevMsgs, JSON.parse(data)]);
    });
    socket.on("update-message", (data) => {
      data = JSON.parse(data);
      setMessages((prevMsgs) =>
        prevMsgs.map((msg) => {
          if (msg.id === data.id) {
            return { ...msg, text: data.text };
          }
          return msg;
        })
      );
    });
    socket.on("delete-message", function (data) {
      data = JSON.parse(data);
      setMessages((prevMsgs) => prevMsgs.filter((msg) => msg.id !== data.id));
    });
  }, []);
  const sendMessage = async () => {
    const data = {
      userId: state.id,
      text: msgInput,
      user_login: state.username,
      role: state.role,
    };
    await axios.post("http://localhost:3000/messages", data, {
      headers: { "Content-Type": "application/json" },
    });

    socket.emit("messages", JSON.stringify(data));
    try {
    } catch (error) {
      console.log("errrr ", error);
    }
    setMsgInput("");
  };

  return (
    <>
      {true && (
        <Form
          styles={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
          open={isEditOpen}
          openModal={() => setEditOpen(false)}
        >
          <TextField
            // defaultValue={currentMessageText}
            value={editInput}
            placeholder={currentMessageText}
            onChange={(e) => setEditInput(e.target.value)}
          />
          <Button
            style={{
              backgroundColor: "lightblue",
              minWidth: "69px",
              marginTop: "7px",
              marginLeft: "5px",
            }}
            onClick={handleEdit}
          >
            Edit
          </Button>
        </Form>
      )}
      <div style={{ height: "500px", overflow: "scroll" }}>
        {messages.map((m, i) => (
          <div
            key={m.id ?? i}
            style={{
              margin:
                m.user_login === state.username && state.role === m.role
                  ? "1% 0 0 50%"
                  : "1% 0 0 0",
              borderRadius: "10px",
              backgroundColor:
                m.user_login === state.username && state.role === m.role
                  ? "blueviolet"
                  : "blue",
              maxWidth: "50%",
              color: "white",
              padding: "5px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h4>
                  {m.user_login} - {m.role && m.role}
                </h4>
                <p>{m.text}</p>
              </div>
              <div>
                {m.role === state.role && m.user_login === state.username && (
                  <>
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(e) => {
                        setCurrentMessageId(m.id);
                        setCurrentMessageText(m.text);
                        console.log(m);
                        console.log("onClick", { id: m.id, text: m.text });
                        handleClick(e);
                      }}
                      sx={{ color: "white" }}
                    >
                      <MoreVertIcon sx={{ color: "white" }} />
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleDelete}>Delete</MenuItem>
                      <MenuItem
                        onClick={() => {
                          setEditInput(currentMessageText);
                          setEditOpen(true);
                        }}
                      >
                        Edit
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <TextField
        value={msgInput}
        onChange={(e) => setMsgInput(e.target.value)}
        style={{ minWidth: "70%", marginTop: "1%" }}
      />
      <Button
        onClick={sendMessage}
        style={{
          backgroundColor: "lightblue",
          minWidth: "30%",
          marginTop: "1%",
        }}
      >
        Send message
      </Button>
    </>
  );
};

export default Chat;
