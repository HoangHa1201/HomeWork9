import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const About = () => {
  const [bids, setBids] = useState([0]);
  const apiCall = {
    event: 'bts:subscribe',
    data: { channel: "order_book_btcusd"}
  }

  useEffect(() => {
    const ws = new WebSocket('wss://ws.bitstamp.net');
    ws.onopen = (event) => {
        ws.send(JSON.stringify(apiCall));
    };
    ws.onmessage = function (event) {
        const json = JSON.parse(event.data);
        try {
            if ((json.event == 'data')) {
                setBids(json.data.bids.slice(0, 10));
            }
        } catch (err) {
            console.log(err);
        }
    };
    //clean up function
    return () => ws.close();
}, []);

const firstBids = bids.map((item, index) => (
  <div key={index}>
      <p> {item}</p>
  </div>
));

  return (
    <footer>
      <div>{firstBids}</div>
      <p>Copyright &copy; 2022</p>
      <Link to='/'>Home</Link>
    </footer>
  )
}

export default About