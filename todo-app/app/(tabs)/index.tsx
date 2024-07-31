import React from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getTodos, deleteTodo, updateTodo } from '../../src/api/todos'
import { Todo } from '../../src/api/types'

export default function TodoListScreen() {
  const queryClient = useQueryClient()

  const { data: todos, isLoading, isError } = useQuery(['todos'], getTodos)

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  const updateMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id)
  }

  const handleToggleComplete = (todo: Todo) => {
    updateMutation.mutate({ ...todo, completed: !todo.completed })
  }

  if (isLoading) return <Text>Loading...</Text>

  if (isError) return <Text>Error</Text>

  if (todos.length === 0) return <Text>No todos</Text>

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => handleToggleComplete(item)}>
              <Text style={item.completed ? styles.completedTodo : styles.todo}>
                {item.title}
              </Text>
            </TouchableOpacity>
            {deleteMutation.isLoading ? (
              <Text>Deleting...</Text>
            ) : (
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  todo: {
    fontSize: 18,
  },
  completedTodo: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteButton: {
    color: 'red',
  },
})
