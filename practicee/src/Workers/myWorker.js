
onmessage = function(e) {
  // Example: double the input
  const result = e.data * 2;
  postMessage(result);
};
