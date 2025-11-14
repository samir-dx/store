import './App.css';
import Calendar from './Calendar';
import Questions from './Questions';
import Stopwatch from './StopWatch';
// import GraphQl from './GraphQL/GraphQl';
import Tree from './Tree';
// import WebSocket from './WebSocket'
// import WorkerExample from './Workers';

function App() {
  return (
    <div className="App">
      {/* <GraphQl/> */}
      {/* <WebSocket/> */}
      {/* <WorkerExample/> */}
      <Tree/>
      <Stopwatch/>
      <Questions/>
      <Calendar/>
    </div>
  );
}

export default App;
