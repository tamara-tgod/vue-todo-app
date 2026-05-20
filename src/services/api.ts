// Base URL for the API
const BASE_URL = 'https://api.oluwasetemi.dev'

// Fetch all tasks from the API
// Returns paginated tasks (10 per page)
export const fetchTasks = async (page = 1, limit = 10) => {
  try {
    // Make the API request
    const response = await fetch(`${BASE_URL}/tasks`)
    
    // Check if request was successful
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
    
    // Parse the JSON response
    const data = await response.json()
    
    // The API returns all tasks, so we need to paginate manually
    const allTasks = data.tasks || data.data || data || []
    
    // Calculate pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTasks = allTasks.slice(startIndex, endIndex)
    
    // Return structured data
    return {
      tasks: paginatedTasks,
      total: allTasks.length,
      page: page,
      totalPages: Math.ceil(allTasks.length / limit)
    }
    
  } catch (error) {
    console.error('Error fetching tasks:', error)
    throw error
  }
}

//  Fetch a single task by ID
export const fetchTaskById = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${id}`)
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
    
    const data = await response.json()
    return data.task || data.data || data
    
  } catch (error) {
    console.error('Error fetching task:', error)
    throw error
  }
}