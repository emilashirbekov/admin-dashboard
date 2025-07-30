import type { User } from "../types"
import {
  api,
  delay,
  mockActivities,
  mockChartData,
  mockMetrics,
  mockUsers,
} from "./api"

const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: "123",
  name: "John Doe",
  email: "john@example.com",
  role: "user",
  status: "active",
  avatar: "avatar.jpg",
  createdAt: "2024-01-01",
  lastLogin: "2024-07-17",
  ...overrides,
})

const advanceAndFlushTimers = async (ms: number) => {
  jest.advanceTimersByTime(ms)
  await Promise.resolve()
}

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.useRealTimers()
  mockUsers.length = 0
})

test("delay", async () => {
  const callback = jest.fn()
  const promise = delay(1000).then(callback)

  expect(callback).not.toHaveBeenCalled()

  jest.advanceTimersByTime(1000)
  await promise

  expect(callback).toHaveBeenCalled()
})

describe("api", () => {
  describe("getUsers", () => {
    test("should return all users", async () => {
      mockUsers.push(createMockUser())
      const promise = api.getUsers()
      await advanceAndFlushTimers(500)
      await expect(promise).resolves.toEqual({
        data: mockUsers,
        success: true,
      })
    })
  })

  describe("createUser", () => {
    test("should create user after delay and return correct response", async () => {
      const input: Omit<User, "id" | "createdAt" | "lastLogin"> = {
        name: "Jane Smith",
        email: "jane@example.com",
        role: "user",
        status: "inactive",
        avatar: "avatar.png",
      }


      const promise = api.createUser(input)
      await advanceAndFlushTimers(300)
      const response = await promise

      expect(response.success).toBe(true)
      expect(response.message).toBe("User created successfully")
      expect(response.data).toMatchObject(input)
      expect(response.data.id).toBeDefined()
      expect(response.data.createdAt).toBeDefined()
      expect(response.data.lastLogin).toBeDefined()

      expect(mockUsers).toHaveLength(1)
      expect(mockUsers[0]).toMatchObject(input)

      expect(input).toEqual(input)
    })
  })

  describe("updateUser", () => {
    beforeEach(() => {
      mockUsers.push(createMockUser())
    })

    test("should update an existing user", async () => {
      const updates: Partial<User> = {
        name: "Updated Name",
        status: "inactive",
      }

      const promise = api.updateUser("123", updates)
      await advanceAndFlushTimers(300)
      const response = await promise

      expect(response.success).toBe(true)
      expect(response.message).toBe("User updated successfully")
      expect(response.data).toMatchObject({
        id: "123",
        name: "Updated Name",
        status: "inactive",
      })

      expect(mockUsers[0]).toMatchObject(response.data)
    })

    test("should return error if user not found", async () => {
      const promise = api.updateUser("nonexistent", { name: "No one" })
      await advanceAndFlushTimers(300)
      const response = await promise

      expect(response.success).toBe(false)
      expect(response.message).toBe("User not found")
      expect(response.data).toEqual({})
    })
  })

  describe("deleteUser", () => {
    beforeEach(() => {
      mockUsers.push(createMockUser())
    })

    test("should delete user", async () => {
      const promise = api.deleteUser("123")
      await advanceAndFlushTimers(300)
      const response = await promise

      expect(response.success).toBe(true)
      expect(response.message).toBe("User deleted successfully")
      expect(response.data).toBe(true)
      expect(mockUsers).toHaveLength(0)
    })

    test("should return error if user not found", async () => {
      const promise = api.deleteUser("nonexistent")
      await advanceAndFlushTimers(300)
      const response = await promise

      expect(response.success).toBe(false)
      expect(response.message).toBe("User not found")
      expect(response.data).toBe(false)
      expect(mockUsers).toHaveLength(1)
    })
  })

  describe("getMetrics", () => {
    test("should return metrics data", async () => {
      const promise = api.getMetrics()
      await advanceAndFlushTimers(300)
      await expect(promise).resolves.toEqual({
        data: mockMetrics,
        success: true,
      })
    })
  })

  describe("getChartData", () => {
    test("should return chart data", async () => {
      const promise = api.getChartData()
      await advanceAndFlushTimers(400)
      await expect(promise).resolves.toEqual({
        data: mockChartData,
        success: true,
      })
    })
  })

  describe("getActivities", () => {
    test("should return activities", async () => {
      const promise = api.getActivities()
      await advanceAndFlushTimers(200)
      await expect(promise).resolves.toEqual({
        data: mockActivities,
        success: true,
      })
    })
  })
})
