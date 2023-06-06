import React, { useState, useRef, useLayoutEffect, useCallback } from "react";
import Button from "./Button";
import ProfileImage from "./ProfileImage";
import { useSession } from "next-auth/react";
import { FormEvent } from "react";

import { api } from "~/utils/api";
function updateTextAreaSize(textArea?: HTMLTextAreaElement | null) {
  if (textArea == null) {
    return;
  }
  textArea.style.height = "0";
  textArea.style.height = `${textArea?.scrollHeight}px`;
}

export function NewTweetForm() {
  const session = useSession();
  if (session.status !== "authenticated") return null;

  return <Form />;
}
function Form() {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);
  const createTweet = api.tweet.create.useMutation({
    onSuccess: (newTweet) => {
      console.log(newTweet);
      setInputValue("");
    },
  });
  if (session.status !== "authenticated") return null;
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createTweet.mutate({ text: inputValue });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col gap-2 border-b px-4 py-2"
      >
        <div className="flex gap-4">
          <ProfileImage src={session.data.user.image}></ProfileImage>
          <textarea
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
            placeholder="give me ex."
            name=""
            id=""
            style={{ height: 0 }}
            value={inputValue}
            ref={inputRef}
          ></textarea>
        </div>
        <Button className="self-end">share</Button>
      </form>
    </>
  );
}
