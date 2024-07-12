import request from "supertest";
import app from "../app";

jest.mock("../src/controllers/taskController.ts", () => ({
  createTaskHandler: jest.fn((req, res) => {
    res.status(201).send({
      data: {
        id: "649c9ec1-c00c-44b4-92f3-5dd40bc0038b",
        title: "lorem ipsum 4",
        description: "tes redis 4",
        dateCreated: "2024-07-12T07:52:50.717Z",
      },
    });
  }),
  getTaskByIdHandler: jest.fn((req, res) => {
    res.status(200).send({
      id: "22aeb66f-9154-4c88-8ffc-126f75afb895",
      title: "lorem ipsum 3",
      description: "tes redis 3",
    });
  }),
  getAllTasksHandler: jest.fn((req, res) => {
    res.status(200).send({
      data: [
        {
          id: "22aeb66f-9154-4c88-8ffc-126f75afb895",
          title: "lorem ipsum 3",
          description: "tes redis 3",
          dateCreated: "2024-07-11T10:22:14.582Z",
        },
      ],
    });
  }),
  updateTaskHandler: jest.fn((req, res) => {
    res.status(201).send({
      message: "Successfully updated task",
      data: {
        id: "649c9ec1-c00c-44b4-92f3-5dd40bc0038b",
        title: "lorem ipsum 4",
        description: "tes redis 4",
        dateCreated: "2024-07-12T07:52:50.717Z",
      },
    });
  }),
  deleteTaskHandler: jest.fn((req, res) => {
    res.status(204).send({});
  }),
}));

describe("Task Management Redis API", () => {
  it("should create a new task", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({
        data: {
          id: "649c9ec1-c00c-44b4-92f3-5dd40bc0038b",
          title: "lorem ipsum 4",
          description: "tes redis 4",
          dateCreated: "2024-07-12T07:52:50.717Z",
        },
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      data: {
        id: "649c9ec1-c00c-44b4-92f3-5dd40bc0038b",
        title: "lorem ipsum 4",
        description: "tes redis 4",
        dateCreated: "2024-07-12T07:52:50.717Z",
      },
    });
  });

  it("should get task by id", async () => {
    const response = await request(app).get(
      "/api/tasks/22aeb66f-9154-4c88-8ffc-126f75afb895"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: "22aeb66f-9154-4c88-8ffc-126f75afb895",
      title: "lorem ipsum 3",
      description: "tes redis 3",
    });
  });

  it("should get all tasks", async () => {
    const response = await request(app).get("/api/tasks");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: [
        {
          id: "22aeb66f-9154-4c88-8ffc-126f75afb895",
          title: "lorem ipsum 3",
          description: "tes redis 3",
          dateCreated: "2024-07-11T10:22:14.582Z",
        },
      ],
    });
  });

  it("should update a task", async () => {
    const response = await request(app)
      .put("/api/tasks/649c9ec1-c00c-44b4-92f3-5dd40bc0038b")
      .send({
        message: "Successfully updated task",
        data: {
          id: "649c9ec1-c00c-44b4-92f3-5dd40bc0038b",
          title: "lorem ipsum 4",
          description: "tes redis 4",
          dateCreated: "2024-07-12T07:52:50.717Z",
        },
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Successfully updated task",
      data: {
        id: "649c9ec1-c00c-44b4-92f3-5dd40bc0038b",
        title: "lorem ipsum 4",
        description: "tes redis 4",
        dateCreated: "2024-07-12T07:52:50.717Z",
      },
    });
  });

  it("should delete a task", async () => {
    const response = await request(app).delete(
      "/api/tasks/649c9ec1-c00c-44b4-92f3-5dd40bc0038b"
    );

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });
});
