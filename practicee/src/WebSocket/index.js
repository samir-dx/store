import React, { useEffect } from 'react'

const WebSocketComp = () => {

  useEffect(() => {
    const socket = new WebSocket('wss://stream.aisstream.io/v0/stream');
    socket.onopen = () => {
      const subscriptionMessage = {
        Apikey: '424f86a1d2c66885956447761993cbaffb8e414a',
        BoundingBoxes: [[[25.835302, -80.207729], [25.602700, -79.87838232]], [[33.773323, -11.35542], [44.67654, -118.09323]]],
        FiltersShipMMSI: ["368207620"],
        FilterMessageTypes: ["PositionReport"]
        }
      socket.send(JSON.stringify(subscriptionMessage))
    }
    socket.onmessage = (event) => {
      const aisMessage = JSON.parse(event.data);
      console.log(aisMessage, 'aisMessage')
    }
    socket.onerror = (err) => {
      console.log(err, 'error???')
    }

    return () => {
      if(socket && typeof socket?.close === 'function') {
        socket.close()
      }
    }

  }, [])
  return (
    <div>WebSocket</div>
  )
}

export default WebSocketComp