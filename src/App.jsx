import { useDispatch, useSelector } from "react-redux";
import { increment, fetchCounter } from "./store/counterSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  // assignation par décomposition dans un littéral avec plusieurs clés
  const {
    c: { number, parity, step },
    ca: { count },
    s: { stars }
  } = useSelector((state) => {
    return {
      c: state.c,
      ca : state.ca,
      s : state.s
    };
  });


  return (
    <div className="App">
      <button onClick={() =>dispatch(increment()) }>Increment</button>
      <button onClick={() => dispatch(fetchCounter())}>Async counter</button>

      <p style={{ fontSize: "30px", fontWeight: "bold" }}>{number}</p>
      <p style={{ fontSize: "30px", fontWeight: "bold" }}>{count}</p>

      <p>
        Parité : {parity} et valeur de l'incrément: {step}
      </p>
      {  (
        <p>
          {stars.map((s, i) => <span key={i}>{s}</span>)}
        </p>
      )}
    </div>
  );
}

export default App;
