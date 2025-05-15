import { idempotencyKeys, task } from "@trigger.dev/sdk";
import { subTask1, subTask2 } from "./tasks";

export const main = task({
  id: "main",
  maxDuration: 300,
  run: async () => {
    const idempotencyKey = await idempotencyKeys.create("per-run-idempotency-key");

    await subTask1.triggerAndWait({}, { idempotencyKey }).unwrap();
    await subTask2.triggerAndWait({}, { idempotencyKey }).unwrap();

    return {
      message: "Per run task completed",
    }
  },
});
