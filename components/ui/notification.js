import classes from './notification.module.css';

function Notification(props) {
  const {title, message, status} = props;

  let activeClass = '';
  if(status === 'pending'){
    activeClass = classes['pending'];
  }

  if(status === 'success'){    
    activeClass = classes['success'];
  }

  if(status === 'error'){
    activeClass = classes['error'];
  }

  const notificationClasses = classes.notification + ' ' + activeClass;

  return <div className={notificationClasses} onClick={props.onClick}>
    <h1>{title}</h1>
    <p>{message}</p>
  </div>
}

export default Notification;