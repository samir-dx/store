import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import React from 'react'

const CREATE_USER = gql`mutation Mutation($name: String!, $age: Int!, $isMarried: Boolean!) {
  createUser(name: $name, age: $age, isMarried: $isMarried) {
    id
    age
    isMarried
    name
  }
}`


const CreateUser = () => {
  const [createUser] = useMutation(CREATE_USER, {
   update(cache, { data: { createUser } }) {
      cache.modify({
        fields: {
          getUsers(existingUsers = []) {
            return [...existingUsers, createUser];
          }
        }
      });
    }
});

const handleFormSubmit = async(e) => {
  e.preventDefault()
  console.log('here?')
  const form = e.target;
  const name = form.name.value;
  const age = Number(form.age.value);
  const isMarried = form.isMarried.checked;

  await createUser({variables: {name, age, isMarried}})
}
  return (
    <div>
        <form onSubmit={handleFormSubmit}>
            <input name="name" required type="text" placeholder="User Name"/>
            <input name="age" required type="number" placeholder="User Age"/>
            <input type="checkbox" id="isMarried" name="isMarried" />
            <label htmlFor="isMarried">Is Married</label>
            <button type="submit">Create User</button>
        </form>
    </div>
  )
}

export default CreateUser