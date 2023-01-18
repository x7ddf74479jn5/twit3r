import React, { useState } from "react";
import { z } from "zod";

import { api } from "../utils/api";

export const tweetSchema = z.object({
  text: z
    .string({
      required_error: "Tweet text is required",
    })
    .min(10)
    .max(128),
});
export const CreateTweet = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const utils = api.useContext();

  const { mutateAsync } = api.tweet.create.useMutation({
    onSuccess: () => {
      setText("");
      utils.tweet.timeline.invalidate();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await tweetSchema.parse({ text });
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
      return;
    }

    if (text.length < 10) {
      setError("Tweet must be at least 10 characters long");
      return;
    }

    mutateAsync({ text });
  };

  return (
    <>
      {error && JSON.stringify(error)}
      <form
        onSubmit={handleSubmit}
        className="2 flex w-full flex-col rounded-md border-2 p-4"
      >
        <textarea
          className="w-full p-4 shadow"
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="mt-4 flex justify-end">
          <button
            className="rounded-md bg-primary px-4 py-2 text-white"
            type="submit"
          >
            Tweet
          </button>
        </div>
      </form>
    </>
  );
};
