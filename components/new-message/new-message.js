import { useState, useEffect, Fragment } from "react";
import ReactDom from "react-dom";

import Notification from "../ui/notification";
import classes from "./new-message.module.css";

function NewMessage(props) {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');
  const [notification, setNotification] = useState();

  useEffect(() => {
    if(notification){
      if(notification.status === 'error' || notification.status === 'success'){
        const timer = setTimeout(() => {
          setNotification(null);
        }, 3000);

        return () => { clearTimeout(timer); }
      }
    }
  }, [notification]);

  async function messageHandler(event) {
    event.preventDefault();

    const messageData = {
      email: enteredEmail,
      name: enteredName,
      text: enteredMessage,
    };

    try {
      setNotification({
        title: 'Sending message!!!!',
        message: 'Your message is on the way.',
        status: 'pending'
      });
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const result = await response.json();
      console.log('Result is ', result)
      setNotification({
        title: 'Success!',
        message: 'Your message was registered successfully.',
        status: 'success'
      });
    } catch (error) {
      setNotification({
        title: 'Error!',
        message: error.message || 'Your message was not submitted!',
        status: 'error'
      });
    }

    setEnteredEmail("");
    setEnteredName("");
    setEnteredMessage("");
  }

  function removeNotificationHandler(event){
    setNotification(null);
  }

  return (
    <Fragment>
    <section className={classes.message}>
      <h1>How can I help you?</h1>
      <form onSubmit={messageHandler} className={classes.form}>
        <div className={classes["form-controls"]}>
          <div className={classes["form-control"]}>
            <label htmlFor="email">Your Email</label>
            <input
              onChange={(event) => {
                setEnteredEmail(event.target.value);
              }}
              id="email"
              type="email"
              value={enteredEmail}
              required
            />
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="name">Your Name</label>
            <input
              onChange={(event) => {
                setEnteredName(event.target.value);
              }}
              id="name"
              type="text"
              value={enteredName}
              required
            />
          </div>
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="message">Your Message</label>
          <textarea
            onChange={(event) => {
              setEnteredMessage(event.target.value);
            }}
            id="message"
            rows="5"
            value={enteredMessage}
            required
          ></textarea>
        </div>
        <div className={classes["form-actions"]}>
          <button>Send Message</button>
        </div>
      </form>      
    </section>
    {notification && (
        ReactDom.createPortal(
        <Notification onClick={removeNotificationHandler}
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />,
        document.getElementById('notification')
        )
      )}
    </Fragment>
  );
}

export default NewMessage;
