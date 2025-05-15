import { idempotencyKeys, task } from "@trigger.dev/sdk";
import { subTask1, subTask2 } from "./tasks";

export const main = task({
  id: "global",
  maxDuration: 300,
  run: async () => {
    const idempotencyKey = await idempotencyKeys.create("global-idempotency-key", { scope: "global" });

    await subTask1.triggerAndWait({}, { idempotencyKey }).unwrap();
    await subTask2.triggerAndWait({}, { idempotencyKey }).unwrap();

    return {
      message: "Global task completed",
    }
  },
});
