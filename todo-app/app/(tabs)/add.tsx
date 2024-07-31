import React, { useState } from 'react'
import { Text, View, TextInput, Button, StyleSheet } from 'react-native'
import { useMutation, useQueryClient } from 'react-query'
import { useRouter } from 'expo-router'
import { createTodo } from '../../src/api/todos'

export default function AddTodoScreen() {
  const [title, setTitle] = useState('')
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
      setTitle('')
      router.push('/')
    },
  })

  const handleSubmit = () => {
    if (title.trim()) {
      mutation.mutate({ title })
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter todo title"
      />
      {mutation.isLoading ? (
        <Text>Adding todo...</Text>
      ) : (
        <Button title="Add Todo" onPress={handleSubmit} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
  },
})
