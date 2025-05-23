import { logger, task } from "@trigger.dev/sdk";

export const subTask1 = task({
  id: "sub-task-1",
  maxDuration: 300,
  run: async (payload: any, { ctx }) => {
    logger.log("Sub task 1", { payload, ctx });
  },
});

export const subTask2 = task({
  id: "sub-task-2",
  maxDuration: 300,
  run: async (payload: any, { ctx }) => {
    logger.log("Sub task 2", { payload, ctx });
    throw new Error("This is a test error");
  },
});
