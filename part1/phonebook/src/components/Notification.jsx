const Notification = ({ message, type }) => {

  if (!message) return null;

  const styles = {
    success: {
        color: "green",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
    },
    error: {
        color: "red",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
    }
  };

  return <div style={styles[type]}>{message}</div>;
}


export default Notification