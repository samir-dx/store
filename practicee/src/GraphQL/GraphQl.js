import React from 'react'
import { gql } from "@apollo/client";
import {  useQuery } from "@apollo/client/react";
import CreateUser from './CreateUser';

const GET_DATA = gql`
   query Query {
    getUsers {
        age
        id
        isMarried
        name
    }
}
`
const GraphQl = () => {
    const {data, loading, error, refetch} = useQuery(GET_DATA)
    // const [fetchData, {data, loading, error}] = useLazyQuery(GET_DATA)
    if(loading) return <p>loading...</p>
    if(error) return <p>something went wrong</p>
  return (
    <div style={{maxWidth: '600px', margin: '1rem auto'}}>
        <CreateUser/>
        <button onClick={() => refetch()}>refetch</button>
        <ul>
            {data.getUsers.map(item => {
                const {age, name,isMarried, id} = item;
                return  <li style={{textAlign: 'left'}}>
                    <p>name: {name}</p>
                    <p>age: {age}</p>
                    <p>Married: {isMarried ? 'Yes' : 'No'}</p>
                    <p>ID: {id}</p>
                </li>
            })}
        </ul>
    </div>
  )
}

export default GraphQl