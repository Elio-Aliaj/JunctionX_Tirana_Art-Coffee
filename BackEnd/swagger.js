export default {
    openapi: "3.0.0",
    info: {
      title: "Authentication API",
      description: "API for user authentication with register and login endpoints",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Auth",
        description: "Authentication endpoints",
      },
    ],
    paths: {
      "/api/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Register a new user",
          description: "Creates a new user account and returns a JWT token",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "password"],
                  properties: {
                    name: {
                      type: "string",
                      example: "John Doe",
                    },
                    email: {
                      type: "string",
                      format: "email",
                      example: "john@example.com",
                    },
                    password: {
                      type: "string",
                      format: "password",
                      example: "password123",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "User registered successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      token: {
                        type: "string",
                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Validation error or user already exists",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      msg: {
                        type: "string",
                        example: "User already exists",
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Server error",
            },
          },
        },
      },
      "/api/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login a user",
          description: "Authenticates a user and returns a JWT token",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: {
                      type: "string",
                      format: "email",
                      example: "john@example.com",
                    },
                    password: {
                      type: "string",
                      format: "password",
                      example: "password123",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "User logged in successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      token: {
                        type: "string",
                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Invalid credentials",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      msg: {
                        type: "string",
                        example: "Invalid credentials",
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Server error",
            },
          },
        },
      },
      "/api/auth/user": {
        get: {
          tags: ["Auth"],
          summary: "Get user data",
          description: "Returns the current user's data based on the JWT token",
          security: [
            {
              BearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "User data retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "60d0fe4f5311236168a109ca",
                      },
                      name: {
                        type: "string",
                        example: "John Doe",
                      },
                      email: {
                        type: "string",
                        example: "john@example.com",
                      },
                      date: {
                        type: "string",
                        format: "date-time",
                        example: "2023-08-24T14:15:22Z",
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: "No token or invalid token",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      msg: {
                        type: "string",
                        example: "No token, authorization denied",
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Server error",
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  }
  