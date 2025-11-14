import React, { useEffect, useRef, useState } from 'react'



const WorkerExample = () => {
  const [result, setResult] = useState(null);
  const workerRef = useRef();

  useEffect(() => {
    workerRef.current = new Worker(new URL('./myWorker.js', import.meta.url));
    workerRef.current.onmessage = (e) => {
      setResult(e.data);
    };
    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const handleSend = () => {
    workerRef.current.postMessage(5); // Example: send 5
  };

  return (
    <div>
      <h2>Web Worker Example</h2>
      <button onClick={handleSend}>Send 5 to Worker</button>
      {result !== null && <p>Result from worker: {result}</p>}
    </div>
  );
};

export default WorkerExample
